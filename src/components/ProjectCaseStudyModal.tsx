"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export interface ProjectDetail {
  id: string;
  tag: string;
  metric: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  architectureFlow: string[];
  challenges: string[];
  metrics: { label: string; val: string }[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCaseStudyModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  primaryAccentColor: string;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  primaryAccentColor,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030407]/85 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[88vh] bg-[#050a14] border border-[rgba(127,164,255,0.22)] rounded-2xl shadow-[0_50px_140px_rgba(0,0,0,0.75)] overflow-y-auto p-5 sm:p-6 md:p-8 font-sans"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#d4ff24] via-[#1558c9] to-transparent" aria-hidden="true" />

            <div className="flex justify-between items-start gap-4 border-b border-[rgba(127,164,255,0.16)] pb-5">
              <div>
                <span className={`text-[0.6rem] font-mono tracking-[3px] uppercase ${primaryAccentColor}`}>
                  CASE_STUDY // {project.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-title text-[#f4f7ff] mt-1">
                  {project.title}
                </h2>
                <p className="text-xs text-[#94a5c3] font-mono mt-1">
                  {project.subtitle}
                </p>
                <span className="inline-flex mt-3 border border-[rgba(212,255,36,0.35)] bg-[rgba(212,255,36,0.06)] px-2.5 py-1 text-[0.58rem] font-mono tracking-[1.5px] uppercase text-[#d4ff24]">
                  {project.metric}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-[rgba(127,164,255,0.2)] hover:border-[#d4ff24]/60 bg-[#0a1424] text-[#94a5c3] hover:text-[#d4ff24] transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div className="flex flex-col gap-4">
                <div className="bg-[#070d19] border border-[rgba(127,164,255,0.14)] rounded-xl p-4">
                  <span className="text-[0.58rem] font-mono text-[#7284a6] uppercase tracking-wider block">
                    PROBLEM STATEMENT
                  </span>
                  <p className="text-xs text-[#c6d4ee] mt-1.5 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="bg-[#070d19] border border-[rgba(127,164,255,0.14)] rounded-xl p-4">
                  <span className="text-[0.58rem] font-mono text-[#7284a6] uppercase tracking-wider block">
                    ENGINEERING SOLUTION
                  </span>
                  <p className="text-xs text-[#c6d4ee] mt-1.5 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-[#070d19] border border-[rgba(127,164,255,0.14)] rounded-xl p-4">
                  <span className="text-[0.58rem] font-mono text-[#7284a6] uppercase tracking-wider block mb-2">
                    MINI ARCHITECTURE OVERVIEW
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem]">
                    {project.architectureFlow.map((node, i) => (
                      <React.Fragment key={i}>
                        <span className="p-1.5 rounded bg-[#0a1424] border border-[rgba(127,164,255,0.18)] text-[#c6d4ee]">
                          {node}
                        </span>
                        {i < project.architectureFlow.length - 1 && (
                          <span className="text-[#4d8dff]">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="bg-[#070d19] border border-[rgba(127,164,255,0.14)] rounded-xl p-4">
                  <span className="text-[0.58rem] font-mono text-[#7284a6] uppercase tracking-wider block mb-2">
                    TECHNICAL CHALLENGES &amp; DECISIONS
                  </span>
                  <ul className="list-disc list-inside text-xs text-[#aebbd6] space-y-1.5 leading-relaxed">
                    {project.challenges.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[rgba(127,164,255,0.16)] pt-5">
              <span className="text-[0.58rem] font-mono text-[#7284a6] uppercase tracking-wider block mb-3">
                MEASURABLE METRICS &amp; SYSTEM PERFORMANCE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-[#070d19] border border-[rgba(127,164,255,0.14)] rounded-lg p-3">
                    <span className="text-[0.52rem] font-mono text-[#7284a6] block uppercase">
                      {m.label}
                    </span>
                    <span className={`text-sm font-mono font-bold mt-0.5 block ${primaryAccentColor}`}>
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between items-center gap-4 border-t border-[rgba(127,164,255,0.16)] pt-5">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="bg-[#04070e] border border-[rgba(127,164,255,0.18)] text-[#aebbd6] font-mono text-[0.6rem] px-2.5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[rgba(127,164,255,0.24)] hover:border-[#4d8dff] bg-[#0a1424] text-[#c6d4ee] hover:text-white font-mono text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span>GITHUB</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#d4ff24] bg-[#d4ff24] text-[#030407] hover:bg-[#e6ff7a] font-mono text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
