import { NextResponse } from "next/server";

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = asText(body?.name);
    const email = asText(body?.email);
    const company = asText(body?.company);
    const project = asText(body?.project);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required parameters." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (name.length > 100 || company.length > 120 || project.length > 160) {
      return NextResponse.json({ error: "One or more fields exceed the allowed length." }, { status: 400 });
    }

    const safeName = name.replace(/[\r\n]+/g, " ");

    const messageContent = `
NEW PORTFOLIO INQUIRY RECEIVED:

• Sender Name: ${name}
• Sender Email: ${email}
• Company / Representation: ${company || "N/A"}
• Project Focus: ${project || "N/A"}

Sent via Meet Chhugani's Portfolio (https://meetchhugani.vercel.app)
    `.trim();

    // 1. Primary: Use Formsubmit.co AJAX endpoint (No API Key required, sends directly to meetchhugani81@gmail.com)
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/meetchhugani81@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company: company || "N/A",
        project: project || "N/A",
        message: messageContent,
        _subject: `[Portfolio Message] New inquiry from ${safeName}`,
        _captcha: "false",
      }),
    });

    if (formSubmitRes.ok) {
      const data = await formSubmitRes.json();
      return NextResponse.json({ success: true, message: "Email sent successfully via FormSubmit!", data });
    }

    // 2. Fallback: If WEB3FORMS_ACCESS_KEY env variable is provided
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          to: "meetchhugani81@gmail.com",
          subject: `[Portfolio Inquiry] New message from ${name}`,
          message: messageContent,
        }),
      });

      const web3Data = await web3Res.json();
      if (web3Res.ok && web3Data.success) {
        return NextResponse.json({ success: true, message: "Email sent via Web3Forms!" });
      }
    }

    return NextResponse.json(
      { success: false, error: "Failed to deliver email." },
      { status: 500 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
