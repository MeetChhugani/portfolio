"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { Sparkles, ArrowRight, Database, Cpu, ShieldCheck, Layers3 } from "lucide-react";

export const CurrentFocus: React.FC = () => {
  const { role } = useRole();
  const isBackend = role === "backendDev";
  const isHybrid = role === "hybrid";

  const primaryAccent = isBackend ? "text-sky-400" : isHybrid ? "text-emerald-400" : "text-purple-400";
  const borderAccent = isBackend ? "border-sky-500/30" : isHybrid ? "border-emerald-500/30" : "border-purple-500/30";
  const badgeBg = isBackend ? "bg-sky-950/30 border-sky-900/50 text-sky-300" : isHybrid ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-300" : "bg-purple-950/30 border-purple-900/50 text-purple-300";

  const evidenceCards = isBackend
    ? [
        { title: "100+ REST APIs", detail: "Built across AI BusinessOS and backend services", icon: Layers3 },
        { title: "PostgreSQL + Redis", detail: "Relational modeling and auth/cache layers", icon: Database },
        { title: "Docker + CI", detail: "Containerized services and deployment-ready workflows", icon: ShieldCheck },
        { title: "JWT + RBAC", detail: "Secure access control and production-grade auth", icon: Cpu },
      ]
    : isHybrid
      ? [
          { title: "100+ REST APIs", detail: "Backend surfaces with production architecture discipline", icon: Layers3 },
          { title: "0.77 ROC-AUC", detail: "Employee Risk Radar uses explainable XGBoost outputs", icon: Cpu },
          { title: "3,000+ headlines", detail: "Fintech sentiment pipeline built from real market data", icon: Database },
          { title: "4+ verified certs", detail: "Evidence-backed capability across analytics and delivery", icon: ShieldCheck },
        ]
      : [
          { title: "0.77 ROC-AUC", detail: "Explainable attrition model with SHAP outputs", icon: Cpu },
          { title: "3,000+ headlines", detail: "NLP pipeline for fintech sentiment analysis", icon: Database },
          { title: "4+ verified certs", detail: "Structured learning across data science and analytics", icon: ShieldCheck },
          { title: "Groq + LLM layers", detail: "Applied AI modules paired with production backends", icon: Layers3 },
        ];

  const nextTarget = isBackend ? "Kubernetes & microservices" : isHybrid ? "Operational observability" : "Model context protocol (MCP)";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6 select-none py-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.6rem] text-zinc-500 tracking-[3px] uppercase">
              <Sparkles className={`w-3 h-3 ${primaryAccent} animate-pulse`} />
              <span>VERIFIED_CAPABILITY // EVIDENCE_BOARD</span>
            </div>
            <h2 className="text-3xl font-bold font-title text-zinc-100 mt-1">
              One evidence-backed view of what is already built
            </h2>
            <p className="text-xs text-zinc-400 max-w-[550px] mt-1 leading-relaxed">
              The strongest signals here are the systems already shipped: APIs, data pipelines, explainability layers, and deployment-ready services.
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 font-mono text-[0.65rem] px-3 py-1.5 rounded-full border ${badgeBg} w-fit`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isBackend ? "bg-sky-400" : isHybrid ? "bg-emerald-400" : "bg-purple-400"} animate-pulse`} />
            <span>{isBackend ? "PYTHON BACKEND EVIDENCE" : isHybrid ? "SYSTEMS + DATA SIGNALS" : "AI / ML EVIDENCE"}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evidenceCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-[#08080b] border border-zinc-850 hover:${borderAccent} rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 group`}
              >
                <div className={`w-9 h-9 rounded-lg border ${borderAccent} flex items-center justify-center ${primaryAccent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[2px] text-zinc-500">verified signal</div>
                  <div className="font-bold text-zinc-100 mt-1">{item.title}</div>
                </div>
                <p className="text-[0.7rem] text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Next Target Banner */}
        <div className="bg-[#09090d] border border-zinc-850 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-[0.6rem] text-zinc-500 uppercase tracking-wider font-bold">UPNEXT TARGET:</span>
            <span className={`font-bold ${primaryAccent}`}>{nextTarget}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[0.65rem] text-zinc-500">
            <span>IN PROGRESS</span>
            <ArrowRight className="w-3 h-3 text-zinc-400" />
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
