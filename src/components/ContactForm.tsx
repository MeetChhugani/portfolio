"use client";

import React, { useState } from "react";
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
  const iconColor = isBackend ? "text-emerald-400" : "text-purple-400";
  const focusBorder = isBackend ? "focus:border-emerald-500" : "focus:border-purple-500";
  const submitButtonClass = isBackend
    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10"
    : "bg-purple-600 hover:bg-purple-500 shadow-purple-500/10";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      // 1. Try internal Next.js API route first
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
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      // 2. Direct client-side fallback to Formsubmit.co AJAX endpoint
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
        setTimeout(() => setStatus("idle"), 5000);
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
    <div className="w-full bg-[#08090e] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden select-none">
      
      <div className="flex items-center gap-3 border-b border-zinc-850 pb-4 mb-6">
        <Terminal className={`w-5 h-5 ${iconColor}`} />
        <span className="font-mono text-[0.65rem] text-zinc-500 tracking-[3px] uppercase">
          SMTP_CONVERSATIONAL_PROTOCOL // DIRECT_MESSAGE_DISPATCH
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-12 h-12 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-title font-bold text-zinc-200 text-lg">EMAIL DISPATCHED SUCCESSFULLY</h4>
            <p className="text-xs text-zinc-400 mt-2 font-mono tracking-wide max-w-[400px]">
              Transmission routed directly to Meet&apos;s personal inbox (<span className="text-emerald-400 font-bold">meetchhugani81@gmail.com</span>). He will respond shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <noscript>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-[0.7rem] font-mono text-zinc-400">
                You can email Meet directly at meetchhugani81@gmail.com.
              </div>
            </noscript>

            {/* Clean Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label htmlFor="contact-name" className="text-zinc-400 text-[0.7rem] uppercase font-bold">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-[#050609] border border-zinc-800 ${focusBorder} text-zinc-100 placeholder-zinc-600 outline-none p-3 rounded-xl font-mono text-xs transition-colors`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label htmlFor="contact-company" className="text-zinc-400 text-[0.7rem] uppercase font-bold">Company / Organization</label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="e.g. Acme Corp / Hiring Team"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`bg-[#050609] border border-zinc-800 ${focusBorder} text-zinc-100 placeholder-zinc-600 outline-none p-3 rounded-xl font-mono text-xs transition-colors`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs sm:col-span-2">
                <label htmlFor="contact-project" className="text-zinc-400 text-[0.7rem] uppercase font-bold">Project Focus / Role Discussion</label>
                <input
                  id="contact-project"
                  type="text"
                  placeholder="e.g. Full-time Python Backend / Applied ML Engineering Role"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className={`bg-[#050609] border border-zinc-800 ${focusBorder} text-zinc-100 placeholder-zinc-600 outline-none p-3 rounded-xl font-mono text-xs transition-colors`}
                />
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs sm:col-span-2">
                <label htmlFor="contact-email" className="text-zinc-400 text-[0.7rem] uppercase font-bold">Your Direct Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-[#050609] border border-zinc-800 ${focusBorder} text-zinc-100 placeholder-zinc-600 outline-none p-3 rounded-xl font-mono text-xs transition-colors`}
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={`flex items-center justify-center gap-3 disabled:opacity-50 text-white font-mono text-xs font-bold px-6 py-3.5 rounded-xl self-end mt-2 shadow-lg cursor-pointer transition-colors ${submitButtonClass}`}
            >
              <Send className="w-4 h-4" />
              <span>{status === "sending" ? "DISPATCHING EMAIL..." : "TRANSMIT EMAIL ENVELOPE"}</span>
            </button>
            
          </motion.form>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ContactForm;
