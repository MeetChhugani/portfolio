"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Clipboard, Check, FileText, Briefcase, GraduationCap, Code } from "lucide-react";
import { useRole } from "@/context/RoleContext";

type TabType = "experience" | "projects" | "skills" | "education";

const ResumeViewer: React.FC = () => {
  const { role, content } = useRole();
  const [activeTab, setActiveTab] = useState<TabType>("experience");
  const [copied, setCopied] = useState(false);

  const isBackend = role === "backendDev";
  const activeTabBg = isBackend ? "rgba(56, 189, 248, 0.05)" : "rgba(168, 85, 247, 0.05)";
  const activeTabBorder = isBackend ? "rgba(56, 189, 248, 0.3)" : "rgba(168, 85, 247, 0.3)";
  const activeTextColor = isBackend ? "text-sky-400" : "text-purple-400";
  const buttonAccentClass = isBackend
    ? "bg-sky-600 hover:bg-sky-700 shadow-sky-500/10"
    : "bg-purple-600 hover:bg-purple-700 shadow-purple-500/10";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content.resume.rawSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#07070a]/90 border border-zinc-900 rounded-2xl p-6 md:p-8 font-mono select-none relative z-10 overflow-hidden">
      
      {/* CAD technical coordinate ticks on the borders */}
      <div className="absolute top-0 left-0 right-0 h-4 border-b border-zinc-900/60 flex justify-between px-10 text-[0.45rem] text-zinc-650 items-center">
        <span>0.00mm // REF_A</span>
        <span>50.00mm</span>
        <span>100.00mm</span>
        <span>150.00mm // REF_B</span>
        <span>200.00mm</span>
      </div>
      <div className="absolute left-0 top-10 bottom-10 w-4 border-r border-zinc-900/60 flex flex-col justify-between py-10 text-[0.45rem] text-zinc-650 items-center">
        <span>SEC_01</span>
        <span>SEC_02</span>
        <span>SEC_03</span>
        <span>SEC_04</span>
      </div>

      <div className="pt-6 relative z-10 pl-6">
        
        {/* Document Action Control Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/60 pb-6 mb-6">
          <div>
            <span className="text-[0.6rem] text-zinc-500 tracking-[3px] uppercase block">
              {content.eyebrows.resumeHeader}
            </span>
            <h3 className="text-xl font-bold font-title text-zinc-100 mt-1">
              {content.resume.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 border border-zinc-850 hover:border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 transition-all text-[0.65rem] px-3.5 py-2 rounded-lg cursor-pointer"
              data-cursor-label="copy raw spec document"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> COPIED RAW DATA
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" /> COPY RAW DATA
                </>
              )}
            </button>

            <a 
              href="/Meet_Chhugani_Continental_AI_Engineer_Intern_Resume.pdf" 
              download="Meet_Chhugani_Continental_AI_Engineer_Intern_Resume.pdf"
              className={`flex items-center gap-2 text-white transition-all text-[0.65rem] px-3.5 py-2 rounded-lg cursor-pointer shadow-md ${buttonAccentClass}`}
              data-cursor-label="download pdf blueprint"
            >
              <Download className="w-3.5 h-3.5" /> DOWNLOAD RESUME
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Tab Columns (Col-3) */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {[
              { id: "experience", label: content.resume.tabLabels.experience, icon: <Briefcase className="w-4 h-4" /> },
              { id: "projects", label: content.resume.tabLabels.projects, icon: <FileText className="w-4 h-4" /> },
              { id: "skills", label: content.resume.tabLabels.skills, icon: <Code className="w-4 h-4" /> },
              { id: "education", label: content.resume.tabLabels.education, icon: <GraduationCap className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="flex items-center gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 w-full"
                style={{
                  backgroundColor: activeTab === tab.id ? activeTabBg : "transparent",
                  borderColor: activeTab === tab.id ? activeTabBorder : "rgba(255, 255, 255, 0.03)"
                }}
                data-cursor-label={`sheet: ${tab.id}`}
              >
                <div className={activeTab === tab.id ? activeTextColor : "text-zinc-650"}>
                  {tab.icon}
                </div>
                <span className={`text-[0.68rem] font-bold ${activeTab === tab.id ? "text-zinc-100" : "text-zinc-400"}`}>
                  {tab.label.toUpperCase()}
                </span>
              </button>
            ))}

            {/* Spec Sheet Metadata stamp */}
            <div className="mt-8 border border-dashed border-zinc-900 rounded-xl p-4 flex flex-col gap-1 text-[0.55rem] text-zinc-600">
              <div>REV_NO: v2.6.0</div>
              <div>SHEET: {activeTab === "experience" ? "01/04" : activeTab === "projects" ? "02/04" : activeTab === "skills" ? "03/04" : "04/04"}</div>
              <div>VERIFY_HASH: [Nominal]</div>
              <div>DESIGNER: Meet Chhugani</div>
            </div>
          </div>

          {/* Active Specification Sheet Display (Col-9) */}
          <div className="lg:col-span-9 bg-[#040406]/60 border border-zinc-900 rounded-xl p-6 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + role}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col justify-between"
              >
                
                {/* 1. EXPERIENCE SPECIFICATION */}
                {activeTab === "experience" && (
                  <div className="flex flex-col gap-6">
                    <span className="text-[0.6rem] text-zinc-500 uppercase tracking-widest">[SPEC_SHEET // PROFESSIONAL_EXPERIENCE]</span>
                    
                    <div className="flex flex-col gap-6">
                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <div className="flex justify-between items-baseline font-mono text-[0.65rem] border-b border-zinc-900 pb-2 mb-3">
                          <span className="font-bold text-zinc-200">PYTHON & DJANGO DEV INTERN</span>
                          <span className="text-zinc-500">Jun 2025 – Jul 2025 // STG_02</span>
                        </div>
                        <div className="text-[0.65rem] font-bold text-sky-400 uppercase tracking-wider mb-2">Brainybeam Info-Tech Pvt. Ltd.</div>
                        <p className="text-[0.7rem] text-zinc-400 leading-relaxed">
                          Developed backend modules and database-driven features for production Django applications. Debugged existing endpoints, verified payloads, and implemented features end-to-end.
                        </p>
                      </div>

                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <div className="flex justify-between items-baseline font-mono text-[0.65rem] border-b border-zinc-900 pb-2 mb-3">
                          <span className="font-bold text-zinc-200">DATA ANALYTICS INTERN</span>
                          <span className="text-zinc-500">Jan 2026 – Feb 2026 // STG_01</span>
                        </div>
                        <div className="text-[0.65rem] font-bold text-emerald-400 uppercase tracking-wider mb-2">iStudio</div>
                        <p className="text-[0.7rem] text-zinc-400 leading-relaxed">
                          Cleaned and structured multi-source datasets utilizing SQL queries and Python ETL scripts. Built analytical dashboards to translate raw metrics into strategic reports.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SELECTED PROJECTS BRIEF */}
                {activeTab === "projects" && (
                  <div className="flex flex-col gap-6">
                    <span className="text-[0.6rem] text-zinc-500 uppercase tracking-widest">[SPEC_SHEET // SELECT_PROJECTS]</span>
                    
                    <table className="w-full text-left text-[0.68rem]">
                      <thead>
                        <tr className="border-b border-zinc-900 text-zinc-500">
                          <th className="pb-2">SPEC_ID</th>
                          <th className="pb-2">PROJECT TITLE</th>
                          <th className="pb-2">METRIC VALUE</th>
                          <th className="pb-2">PRIMARY WORKLOAD</th>
                        </tr>
                      </thead>
                      <tbody className="text-zinc-300">
                        <tr className="border-b border-zinc-900/60">
                          <td className="py-2.5 font-bold text-zinc-500">PROJ_01</td>
                          <td className="py-2.5 font-bold text-zinc-100">Employee Risk Radar</td>
                          <td className="py-2.5 text-rose-400">0.77 ROC-AUC</td>
                          <td className="py-2.5 text-zinc-400">XGBoost + SHAP prediction</td>
                        </tr>
                        <tr className="border-b border-zinc-900/60">
                          <td className="py-2.5 font-bold text-zinc-500">PROJ_02</td>
                          <td className="py-2.5 font-bold text-zinc-100">AI BusinessOS ERP</td>
                          <td className="py-2.5 text-sky-400">100+ APIs serve</td>
                          <td className="py-2.5 text-zinc-400">FastAPI, PostgreSQL schemas</td>
                        </tr>
                        <tr className="border-b border-zinc-900/60">
                          <td className="py-2.5 font-bold text-zinc-500">PROJ_03</td>
                          <td className="py-2.5 font-bold text-zinc-100">QuizLab Platform</td>
                          <td className="py-2.5 text-teal-400">OCR parsing engine</td>
                          <td className="py-2.5 text-zinc-400">Tesseract, Groq LLaMA JSON</td>
                        </tr>
                        <tr className="border-b border-zinc-900/60">
                          <td className="py-2.5 font-bold text-zinc-500">PROJ_04</td>
                          <td className="py-2.5 font-bold text-zinc-100">Mock Interview Analyzer</td>
                          <td className="py-2.5 text-purple-400">Real-time telemetry</td>
                          <td className="py-2.5 text-zinc-400">MediaPipe posture tracking</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-zinc-500">PROJ_05</td>
                          <td className="py-2.5 font-bold text-zinc-100">Fintech Sentiment</td>
                          <td className="py-2.5 text-emerald-400">3,000+ headlines</td>
                          <td className="py-2.5 text-zinc-400">NLP stock core matching</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. TECHNICAL COMPETENCIES */}
                {activeTab === "skills" && (
                  <div className="flex flex-col gap-6">
                    <span className="text-[0.6rem] text-zinc-500 uppercase tracking-widest">[SPEC_SHEET // SKILLS_REGISTER]</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <span className="text-[0.55rem] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-900 pb-1.5 mb-2.5">
                          SYSTEM LANGUAGES
                        </span>
                        <div className="flex flex-col gap-2 text-[0.65rem]">
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Python 3.11 (Core Runtime)</span>
                            <span className={activeTextColor}>95%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">SQL (PostgreSQL / Relational)</span>
                            <span className={activeTextColor}>85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">TypeScript / Vanilla JS</span>
                            <span className={activeTextColor}>75%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <span className="text-[0.55rem] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-900 pb-1.5 mb-2.5">
                          BACKEND & DATABASE INFRA
                        </span>
                        <div className="flex flex-col gap-2 text-[0.65rem]">
                          <div className="flex justify-between">
                            <span className="text-zinc-300">FastAPI Async Server</span>
                            <span className={activeTextColor}>90%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Django MVC Architecture</span>
                            <span className={activeTextColor}>80%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Redis Cache & Celery broker</span>
                            <span className={activeTextColor}>85%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <span className="text-[0.55rem] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-900 pb-1.5 mb-2.5">
                          MACHINE LEARNING & NLP
                        </span>
                        <div className="flex flex-col gap-2 text-[0.65rem]">
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Scikit-Learn Classifier Core</span>
                            <span className={activeTextColor}>92%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">XGBoost & SHAP interpretability</span>
                            <span className={activeTextColor}>88%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Groq LLM RAG pipelines</span>
                            <span className={activeTextColor}>85%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <span className="text-[0.55rem] font-bold text-zinc-500 uppercase tracking-wider block border-b border-zinc-900 pb-1.5 mb-2.5">
                          DEVOPS & INTEGRATIONS
                        </span>
                        <div className="flex flex-col gap-2 text-[0.65rem]">
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Docker isolated container runs</span>
                            <span className={activeTextColor}>85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Git / GitHub code pipelines</span>
                            <span className={activeTextColor}>90%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-300">Streamlit dashboard service</span>
                            <span className={activeTextColor}>90%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ACADEMICS AND VERIFICATIONS */}
                {activeTab === "education" && (
                  <div className="flex flex-col gap-6">
                    <span className="text-[0.6rem] text-zinc-500 uppercase tracking-widest">[SPEC_SHEET // ACADEMICS_AND_DEGREES]</span>
                    
                    <div className="flex flex-col gap-4">
                      <div className="border border-zinc-900 rounded-xl p-4 bg-zinc-950/20">
                        <div className="flex justify-between items-baseline font-mono text-[0.65rem] border-b border-zinc-900/60 pb-1.5 mb-3">
                          <span className="font-bold text-zinc-200">BACHELOR OF TECHNOLOGY (IT)</span>
                          <span className="text-zinc-500">2023 – 2026 // Active run</span>
                        </div>
                        <h4 className="text-[0.68rem] font-bold text-zinc-300">Gyanmanjari Innovative University</h4>
                        <p className="text-[0.65rem] text-zinc-400 mt-2 leading-relaxed">
                          Concentrations: Relational databases, async client-server models, machine learning models, statistical evaluation parameters.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spec Sheet Footer signature */}
                <div className="border-t border-zinc-900/60 pt-4 flex justify-between font-mono text-[0.55rem] text-zinc-650 mt-6 select-none uppercase">
                  <span>document_class: spec_sheet</span>
                  <span>verified: m.chhugani</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeViewer;
