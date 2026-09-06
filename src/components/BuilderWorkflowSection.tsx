"use client";

import React from "react";
import { Cpu, ArrowRight } from "lucide-react";

export default function BuilderWorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "DATA",
      details: "Understand → clean → explore",
      tech: "Pandas · NumPy · SQL",
    },
    {
      num: "02",
      title: "FEATURES",
      details: "Engineer → select → validate",
      tech: "EDA · SMOTE · Scikit-learn",
    },
    {
      num: "03",
      title: "MODEL",
      details: "Train → evaluate → optimize",
      tech: "XGBoost · PyTorch · MLflow",
    },
    {
      num: "04",
      title: "EXPLAIN",
      details: "Interpret → visualize → deploy",
      tech: "SHAP · Streamlit · FastAPI",
    },
  ];

  return (
    <section id="workflow" className="py-16 px-4 sm:px-6 lg:px-12 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* TOP SECTION: BUILDER'S NOTE EDITORIAL BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 bg-[#09090d]/90 border border-zinc-900 rounded-xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-emerald-400 uppercase font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>BUILDER&apos;S NOTE & WORKING PHILOSOPHY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-title text-zinc-100 tracking-tight">
              Learn by making the system work.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2 font-sans max-w-3xl">
              I&apos;m a B.Tech Information Technology student who learns through implementation: shaping an idea, debugging it, and improving it into a useful application.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#09090d]/50 border border-zinc-900/80 rounded-xl p-6 flex flex-col justify-center">
            <span className="font-mono text-[0.62rem] text-zinc-500 uppercase tracking-widest block">
              ENGINEERING APPROACH
            </span>
            <p className="text-xs text-zinc-300 font-mono mt-1.5 leading-normal">
              Practical Python architecture paired with explainable machine learning workflows.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: VISUAL 4-STEP ML WORKFLOW */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase font-medium">
              ML WORKFLOW // DATA → FEATURES → MODEL → EXPLANATION
            </span>
            <span className="font-mono text-[0.65rem] text-emerald-400/90 hidden sm:inline-block">
              4-STAGE PIPELINE
            </span>
          </div>

          {/* 4-Step Progression Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="group relative bg-[#09090d]/90 border border-zinc-900 hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded">
                      {step.num}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all hidden lg:block" />
                    )}
                  </div>

                  {/* Step Title & Details */}
                  <h4 className="font-title font-bold text-base text-zinc-100 group-hover:text-emerald-300 transition-colors tracking-wide">
                    {step.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-300 mt-1">
                    {step.details}
                  </p>
                </div>

                {/* Subordinate Tech Details */}
                <div className="mt-4 pt-3 border-t border-zinc-900/80">
                  <span className="font-mono text-[0.62rem] text-zinc-500 block">
                    {step.tech}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
