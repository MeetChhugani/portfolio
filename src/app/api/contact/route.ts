import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory rate limiter (for basic protection)
// In production, use Redis or Supabase Edge Functions for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 submissions per hour per IP

function checkRateLimit(ip: string): { allowed: boolean; resetAt?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true };
}

function hashIP(ip: string): string {
  // Simple hash for logging/rate limiting without storing raw IP
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = ((hash << 5) - hash) + ip.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting (Vercel provides this via headers)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const ipHash = hashIP(ip);
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Rate limiting check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const retryAfter = rateLimit.resetAt ? Math.ceil((rateLimit.resetAt - Date.now()) / 1000) : 3600;
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        { status: 429, headers: { "Retry-After": retryAfter.toString() } }
      );
    }

    const body = await req.json();
    const name = asText(body?.name);
    const email = asText(body?.email);
    const company = asText(body?.company);
    const project = asText(body?.project);

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (name.length > 100 || company.length > 120 || project.length > 160) {
      return NextResponse.json(
        { success: false, error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const safeName = name.replace(/[\r\n]+/g, " ").replace(/[<>]/g, "");
    const safeCompany = company.replace(/[\r\n]+/g, " ").replace(/[<>]/g, "");
    const safeProject = project.replace(/[\r\n]+/g, " ").replace(/[<>]/g, "");
    const safeEmail = email.replace(/[\r\n]+/g, "").replace(/[<>]/g, "");

    // Prepare message content for email
    const messageContent = `
NEW PORTFOLIO INQUIRY RECEIVED:

• Sender Name: ${safeName}
• Sender Email: ${safeEmail}
• Company / Representation: ${safeCompany || "N/A"}
• Project Focus: ${safeProject || "N/A"}

Sent via Meet Chhugani's Portfolio
    `.trim();

    // 1. Store in Supabase (primary persistence)
    let dbSuccess = false;
    let dbError: string | null = null;

    try {
      const supabase = createServerClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name: safeName,
        email: safeEmail,
        company: safeCompany || null,
        project: safeProject || null,
        message: messageContent,
        ip_hash: ipHash,
        user_agent: userAgent,
      });

      if (error) {
        dbError = error.message;
        console.error("Supabase insert error:", error);
      } else {
        dbSuccess = true;
      }
    } catch (err) {
      dbError = err instanceof Error ? err.message : "Unknown database error";
      console.error("Supabase connection error:", err);
    }

    // 2. Send email via FormSubmit.co (primary notification)
    let emailSuccess = false;
    let emailError: string | null = null;

    try {
      const formSubmitRes = await fetch("https://formsubmit.co/ajax/meetchhugani81@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          company: safeCompany || "N/A",
          project: safeProject || "N/A",
          message: messageContent,
          _subject: `[Portfolio Message] New inquiry from ${safeName}`,
          _captcha: "false",
        }),
      });

      if (formSubmitRes.ok) {
        emailSuccess = true;
      } else {
        const data = await formSubmitRes.json().catch(() => ({}));
        emailError = data.error || `FormSubmit returned ${formSubmitRes.status}`;
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Network error";
    }

    // 3. Fallback: Web3Forms if configured
    if (!emailSuccess && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: safeName,
            email: safeEmail,
            to: "meetchhugani81@gmail.com",
            subject: `[Portfolio Inquiry] New message from ${safeName}`,
            message: messageContent,
          }),
        });

        const web3Data = await web3Res.json();
        if (web3Res.ok && web3Data.success) {
          emailSuccess = true;
        } else {
          emailError = web3Data.message || "Web3Forms submission failed";
        }
      } catch (err) {
        emailError = err instanceof Error ? err.message : "Web3Forms network error";
      }
    }

    // Determine overall success
    const overallSuccess = dbSuccess || emailSuccess;

    if (overallSuccess) {
      const messages: string[] = [];
      if (dbSuccess) messages.push("Stored in database");
      if (emailSuccess) messages.push("Email sent");

      return NextResponse.json({
        success: true,
        message: `Message received successfully. ${messages.join("; ")}.`,
        dbStored: dbSuccess,
        emailSent: emailSuccess,
      });
    }

    // If both failed, return error but don't expose internal details
    console.error("Contact form failed:", { dbError, emailError, ipHash });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your message. Please try again or email directly.",
      },
      { status: 500 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}