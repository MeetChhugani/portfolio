"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useRole } from "@/context/RoleContext";

export const ContactForm: React.FC = () => {
  const { role } = useRole();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isBackend = role === "backendDev";
  const iconColor = isBackend ? "text-[#d4ff24]" : "text-[#7fa9ff]";
  const focusRing =
    "focus:border-[#d4ff24] focus:ring-2 focus:ring-[#d4ff24]/20 focus:outline-none";

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, project }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setCompany("");
        setProject("");
        setEmail("");
        return;
      }

      const fallbackRes = await fetch("https://formsubmit.co/ajax/meetchhugani81@gmail.com", {
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
          message: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject Focus: ${project}`,
          _subject: `[Portfolio Direct] Message from ${name}`,
          _captcha: "false",
        }),
      });

      if (fallbackRes.ok) {
        setStatus("success");
        setName("");
        setCompany("");
        setProject("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage("Transmission failed. Please try again or email meetchhugani81@gmail.com directly.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage("Network connection error. Please email meetchhugani81@gmail.com directly.");
    }
  };

  return (
    <div className="contact-form-panel w-full bg-[#060b16] border border-[rgba(127,164,255,0.2)] rounded-2xl p-6 sm:p-8 relative overflow-hidden select-none shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#d4ff24] via-[#1558c9] to-transparent" aria-hidden="true" />

      <div className="flex items-center justify-between gap-3 border-b border-[rgba(127,164,255,0.16)] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Terminal className={`w-5 h-5 ${iconColor}`} />
          <span className="font-mono text-[0.65rem] text-[#94a5c3] tracking-[3px] uppercase">
            A DIRECT MESSAGE TO MEET
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[2px] text-[#7284a6] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff24] shadow-[0_0_8px_rgba(212,255,36,0.8)]" />
          SECURE CHANNEL
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-12 h-12 rounded-full border border-[#d4ff24] flex items-center justify-center text-[#d4ff24] mb-4 shadow-[0_0_30px_rgba(212,255,36,0.18)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-title font-bold text-[#eef3ff] text-lg">MESSAGE DISPATCHED</h4>
            <p className="text-xs text-[#9fadc8] mt-2 font-mono tracking-wide max-w-[400px]">
              Routed directly to Meet&apos;s inbox (<span className="text-[#d4ff24] font-bold">meetchhugani81@gmail.com</span>). Expect a reply within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            {status === "error" && (
              <div role="alert" className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <noscript>
              <div className="rounded-lg border border-[rgba(127,164,255,0.2)] bg-[#04070e] p-3 text-[0.7rem] font-mono text-[#9fadc8]">
                You can email Meet directly at meetchhugani81@gmail.com.
              </div>
            </noscript>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label htmlFor="contact-name" className="text-[#94a5c3] text-[0.7rem] uppercase font-bold">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={100}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-[#04070e] border border-[rgba(127,164,255,0.2)] text-[#eef3ff] placeholder-[#5e6d89] p-3 rounded-xl font-mono text-xs transition-colors ${focusRing}`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label htmlFor="contact-company" className="text-[#94a5c3] text-[0.7rem] uppercase font-bold">Company / Organization</label>
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  placeholder="e.g. Acme Corp / Hiring Team"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`bg-[#04070e] border border-[rgba(127,164,255,0.2)] text-[#eef3ff] placeholder-[#5e6d89] p-3 rounded-xl font-mono text-xs transition-colors ${focusRing}`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs sm:col-span-2">
                <label htmlFor="contact-project" className="text-[#94a5c3] text-[0.7rem] uppercase font-bold">Project Focus / Role Discussion</label>
                <input
                  id="contact-project"
                  type="text"
                  maxLength={160}
                  placeholder="e.g. Full-time AI Engineer / Applied ML Role"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className={`bg-[#04070e] border border-[rgba(127,164,255,0.2)] text-[#eef3ff] placeholder-[#5e6d89] p-3 rounded-xl font-mono text-xs transition-colors ${focusRing}`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs sm:col-span-2">
                <label htmlFor="contact-email" className="text-[#94a5c3] text-[0.7rem] uppercase font-bold">Your Direct Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-[#04070e] border border-[rgba(127,164,255,0.2)] text-[#eef3ff] placeholder-[#5e6d89] p-3 rounded-xl font-mono text-xs transition-colors ${focusRing}`}
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-1">
              <span className="font-mono text-[0.58rem] tracking-[1.5px] text-[#7284a6] uppercase">
                NO SPAM · REPLY WITHIN 24H
              </span>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center justify-center gap-3 disabled:opacity-50 bg-[#d4ff24] hover:bg-[#e6ff7a] text-[#030407] font-mono text-xs font-bold px-6 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(212,255,36,0.14)] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(212,255,36,0.26)]"
              >
                <Send className="w-4 h-4" />
                <span>{status === "sending" ? "SENDING..." : "SEND MESSAGE"}</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
