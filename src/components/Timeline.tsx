"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/context/RoleContext";

interface WaveformChannel {
  channelId: string;
  channelName: string;
  periods: { startX: number; endX: number; label: string; details: string; tech: string[] }[];
}

export const Timeline: React.FC = () => {
  const { role, content } = useRole();
  const isBackend = role === "backendDev";
  const primaryAccent = isBackend ? "text-sky-400" : "text-purple-400";
  const accentText = isBackend ? "text-sky-300" : "text-purple-300";

  // State to hold the selected experience detail from the waveform
  const [selectedSpec, setSelectedSpec] = useState<{
    title: string;
    org: string;
    period: string;
    details: string;
    tech: string[];
  }>({
    title: "Data Analytics Intern",
    org: "iStudio",
    period: "Jan 2026 – Feb 2026",
    details: "Performed data cleaning and preprocessing on structured datasets. Built analytical reports and dashboards supporting business decision-making. Applied Excel, SQL, and data visualization techniques.",
    tech: ["SQL", "Pandas", "Excel", "Data Visualization"]
  });

  // Timeline Waveform Data mapped horizontally (X axis from 0 to 100 representing 2023 - 2026)
  const channels: WaveformChannel[] = [
    {
      channelId: "CH_01",
      channelName: "IT_ACADEMICS // DEGREE",
      periods: [
        {
          startX: 10,
          endX: 95,
          label: "B.Tech Information Technology",
          details: "Studying core software engineering, relational databases, data analytics, machine learning structures, and cognitive computing. Maintained standard academic focus across modern software paradigms.",
          tech: ["Python", "SQL", "Machine Learning", "System Design"]
        }
      ]
    },
    {
      channelId: "CH_02",
      channelName: "DJANGO_DEV // INTERN",
      periods: [
        {
          startX: 65,
          endX: 72,
          label: "Python & Django Intern @ Brainybeam",
          details: "Assisted in building relational backend databases and Django endpoints. Debugged production modules, formulated REST requests, and verified endpoint payloads.",
          tech: ["Python", "Django", "REST APIs", "SQL"]
        }
      ]
    },
    {
      channelId: "CH_03",
      channelName: "DATA_ANALYTICS // INTERN",
      periods: [
        {
          startX: 85,
          endX: 90,
          label: "Data Analytics Intern @ iStudio",
          details: "Built ingestion scripts in Python to scrub multi-source tabular data. Formulated SQL reporting scripts and designed clean diagnostic visual dashboards for stakeholders.",
          tech: ["SQL", "Pandas", "NumPy", "Plotly", "Excel"]
        }
      ]
    }
  ];

  const certificates = [
    {
      title: "IBM Data Science Professional",
      issuer: "IBM",
      date: "2024",
      skills: "Python, SQL, ML, Dashboards",
      backDesc: "Covers data analysis, SQL databases, data visualization with Dashboards, and machine learning models."
    },
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI & Stanford",
      date: "2024",
      skills: "Supervised Learning, Neural Networks",
      backDesc: "Build ML models with NumPy & Scikit-learn, train neural networks in TensorFlow."
    },
    {
      title: "Google Advanced Data Analytics",
      issuer: "Google",
      date: "2024",
      skills: "Statistical Analysis, Predictive Modeling",
      backDesc: "Explores statistical testing, regression modeling, and machine learning architectures."
    },
    {
      title: "Deloitte Data Analytics Experience",
      issuer: "Deloitte",
      date: "2024",
      skills: "Data Scrubbing, Forensic Analysis",
      backDesc: "Completed practical tasks in forensic analytics, data scrubbing, and business insights formulation."
    }
  ];

  return (
    <div className="flex flex-col gap-12 select-none py-6">
      
      {/* 1. LEARNING ROADMAP REGISTER (THEMATICALLY ADAPTIVE) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div>
            <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
              LEARNING_TIMELINE // SYSTEM_SHIFT_REGISTER
            </span>
            <h2 className="text-3xl font-bold font-title text-zinc-100 mt-1">
              Learning Roadmap
            </h2>
            <p className="text-xs text-zinc-400 max-w-[550px] mt-1 leading-relaxed">
              Targeted skill evolution trajectory from foundational core tools to production microservices.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {content.roadmap.steps.map((st) => (
              <div 
                key={st.step} 
                className={`bg-[#0b0b0c]/80 border ${st.isFuture ? "border-dashed border-zinc-800 text-zinc-600" : "border-zinc-900 text-zinc-200"} rounded-xl p-4 flex flex-col justify-between`}
                data-cursor-label={`roadmap: stage ${st.step}`}
              >
                <div>
                  <span className={`font-mono text-[0.6rem] font-bold ${st.isFuture ? "text-zinc-700" : accentText}`}>{st.step}</span>
                  <h4 className="font-mono text-xs font-bold text-zinc-100 mt-1 leading-none">{st.label}</h4>
                </div>
                <p className="text-[0.65rem] text-zinc-400 leading-tight mt-3">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 2. LOGIC ANALYZER WAVEFORM EXPERIENCE CHRONOLOGY */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
            CHRONOLOGY // LOGIC_ANALYZER_WAVEFORMS
          </span>
          <h2 className="text-3xl font-bold font-title text-zinc-100 mt-1">
            Experience Waveforms
          </h2>
          <p className="text-xs text-zinc-400 max-w-[600px] leading-relaxed">
            Click on active high-states (pulses) in the signal streams to extract diagnostic logs and job summaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Logic Analyzer Waveform (col-8) */}
          <div className="lg:col-span-8 bg-[#07070a]/90 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            <div className="absolute inset-0 bg-grid-blueprint-dots opacity-40 pointer-events-none" />

            {/* Time markers axis */}
            <div className="w-full flex justify-between font-mono text-[0.6rem] text-zinc-650 border-b border-zinc-900 pb-2 relative z-10 select-none">
              <span>AXIS_T: [START]</span>
              <span style={{ marginLeft: "10%" }}>2023 // SYS_INIT</span>
              <span style={{ marginLeft: "25%" }}>2024 // MOD_STAGE</span>
              <span style={{ marginLeft: "30%" }}>2025 // PROD_BUILD</span>
              <span>2026 // [RUN]</span>
            </div>

            {/* Waveform Channels */}
            <div className="flex flex-col gap-6 mt-4 relative z-10 w-full">
              {channels.map((chan) => {
                const isActive = selectedSpec.org.includes(chan.channelName.split(" // ")[0].split("_")[0]);
                
                return (
                  <div key={chan.channelId} className="flex flex-col gap-1.5 w-full">
                    {/* Channel ID & Header */}
                    <div className="flex justify-between items-center font-mono text-[0.55rem] text-zinc-500">
                      <span>{chan.channelId} {"//"} {chan.channelName}</span>
                      <span>SIG_LEVEL: {isActive ? "HIGH" : "LOW"}</span>
                    </div>

                    {/* Waveform Canvas Area */}
                    <div className="w-full h-12 bg-[#040406]/70 border border-zinc-900/60 rounded-lg relative overflow-hidden flex items-center">
                      
                      {/* Interactive Pulses */}
                      <svg viewBox="0 0 100 20" className="w-full h-full preserve-aspect-ratio" preserveAspectRatio="none">
                        {/* Static Low State background line */}
                        <line x1="0" y1="17" x2="100" y2="17" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

                        {chan.periods.map((p, pIdx) => {
                          const isPeriodActive = selectedSpec.title === p.label.split(" @ ")[0] || selectedSpec.title === p.label;
                          
                          // Draw step wave (Low -> High -> Low)
                          const pathData = `
                            M 0 17 
                            L ${p.startX} 17 
                            L ${p.startX} 3 
                            L ${p.endX} 3 
                            L ${p.endX} 17 
                            L 100 17
                          `;

                          return (
                            <g key={pIdx}>
                              {/* Glowing background path for active state */}
                              {isPeriodActive && (
                                <path
                                  d={`M ${p.startX} 17 L ${p.startX} 3 L ${p.endX} 3 L ${p.endX} 17`}
                                  fill="none"
                                  stroke={isBackend ? "#38bdf8" : "#c084fc"}
                                  strokeWidth="3.5"
                                  opacity="0.15"
                                  className="blur-[2px]"
                                />
                              )}

                              {/* Core waveform stroke */}
                              <path
                                d={pathData}
                                fill="none"
                                stroke={
                                  isPeriodActive
                                    ? (isBackend ? "#38bdf8" : "#c084fc")
                                    : "rgba(255, 255, 255, 0.15)"
                                }
                                strokeWidth="1.2"
                                className="transition-all duration-300"
                              />

                              {/* Interactive clickable pulse region */}
                              <rect
                                x={p.startX}
                                y="0"
                                width={p.endX - p.startX}
                                height="20"
                                fill="rgba(255,255,255,0)"
                                className="cursor-pointer"
                                onMouseEnter={() => {
                                  setSelectedSpec({
                                    title: p.label.split(" @ ")[0],
                                    org: p.label.includes(" @ ") ? p.label.split(" @ ")[1] : "Gyanmanjari University",
                                    period: chan.channelId === "CH_01" ? "2023 – Present" : chan.channelId === "CH_02" ? "Jun 2025 – Jul 2025" : "Jan 2026 – Feb 2026",
                                    details: p.details,
                                    tech: p.tech
                                  });
                                }}
                                onClick={() => {
                                  setSelectedSpec({
                                    title: p.label.split(" @ ")[0],
                                    org: p.label.includes(" @ ") ? p.label.split(" @ ")[1] : "Gyanmanjari University",
                                    period: chan.channelId === "CH_01" ? "2023 – Present" : chan.channelId === "CH_02" ? "Jun 2025 – Jul 2025" : "Jan 2026 – Feb 2026",
                                    details: p.details,
                                    tech: p.tech
                                  });
                                }}
                                data-cursor-label={`inspect: ${chan.channelId}`}
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-zinc-900/60 pt-4 font-mono text-[0.6rem] text-zinc-650 flex justify-between uppercase mt-4 select-none">
              <span>analyzer_run: active</span>
              <span>sample_frequency: 1.2ghz</span>
            </div>
          </div>

          {/* Logic Spec Details Box (col-4) */}
          <div className="lg:col-span-4 bg-[#07070a]/90 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between select-none">
            <div className="flex flex-col h-full justify-between gap-6">
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase block">
                  SPEC_SPECIFICATION // TIMELINE_LOGS
                </span>
                
                <h3 className="text-lg font-bold font-title text-zinc-100 mt-3 leading-tight">
                  {selectedSpec.title}
                </h3>
                <span className={`font-mono text-xs font-semibold block mt-0.5 ${primaryAccent}`}>
                  {selectedSpec.org}
                </span>

                <div className="mt-4 bg-[#0b0b0d] border border-zinc-850 rounded-xl p-4 flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-mono text-zinc-500 uppercase tracking-wider block">
                    JOB SUMMARY & METRICS
                  </span>
                  <p className="text-[0.72rem] text-zinc-300 leading-relaxed font-normal">
                    {selectedSpec.details}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[0.55rem] text-zinc-500 uppercase tracking-wider block mb-1.5">
                  INTEGRATED TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpec.tech.map((t) => (
                    <span 
                      key={t} 
                      className="px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-850 font-mono text-[0.6rem] text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VERIFIED CREDENTIALS / CERTIFICATIONS */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
            VERIFIED_CREDENTIALS // CERTIFICATIONS
          </span>
          <h2 className="text-2xl font-bold font-title text-zinc-100 mt-1">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((c, i) => (
            <div
              key={i}
              className="bg-[#0b0b0c]/80 border border-zinc-900/90 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-800 transition-all group"
              data-cursor-label={`cert: ${c.issuer}`}
            >
              <div>
                <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">{c.issuer} • {c.date}</span>
                <h4 className="font-title font-bold text-xs text-zinc-100 mt-1 group-hover:text-emerald-400 transition-colors">{c.title}</h4>
                <p className="text-[0.68rem] text-zinc-400 leading-relaxed mt-2">{c.backDesc}</p>
              </div>
              <span className={`font-mono text-[0.58rem] mt-3 block ${accentText}`}>
                Skills: {c.skills}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Timeline;
