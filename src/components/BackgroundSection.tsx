"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, GraduationCap, Briefcase, Award, ChevronDown, Sparkles } from "lucide-react";
import { projects, PortfolioProject } from "@/data/portfolioContent";

interface BackgroundSectionProps {
  onSelectProject?: (project: PortfolioProject) => void;
}

export default function BackgroundSection({ onSelectProject }: BackgroundSectionProps) {
  const [showMoreCerts, setShowMoreCerts] = useState(false);

  // Helper to trigger project modal if available
  const handleViewCaseStudy = (titleSubstring: string) => {
    if (!onSelectProject) return;
    const match = projects.find((p) =>
      p.title.toLowerCase().includes(titleSubstring.toLowerCase())
    );
    if (match) {
      onSelectProject(match);
    }
  };

  const primaryCertificates = [
    {
      title: "Machine Learning Specialization",
      issuer: "DeepLearning.AI × Stanford",
      skills: "Supervised Learning, Neural Networks, TensorFlow, Scikit-learn",
      relatedProject: "Employee Risk Radar",
      badge: "Core AI",
    },
    {
      title: "IBM Data Science Professional Certificate",
      issuer: "IBM",
      skills: "Python, SQL, Data Analysis, Machine Learning, Dashboards",
      relatedProject: "Fintech Sentiment Analyzer",
      badge: "Data Science",
    },
    {
      title: "Google Advanced Data Analytics Professional Certificate",
      issuer: "Google",
      skills: "Statistical Analysis, Predictive Modeling, Regression, EDA",
      relatedProject: "Employee Risk Radar",
      badge: "Analytics",
    },
  ];

  const secondaryCertificates = [
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM",
      skills: "Python, Data Structures, Web Scraping, REST APIs",
    },
    {
      title: "Deloitte Data Analytics Virtual Experience",
      issuer: "Deloitte",
      skills: "Data Cleaning, Forensic Analytics, Business Insights",
    },
    {
      title: "Green Skills & AI Foundation Program",
      issuer: "Emerging Tech & AI Institute",
      skills: "AI Ethics, Sustainable Computing, Foundation Models",
    },
  ];

  return (
    <section id="background" className="py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient Subtle Accent Glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-14 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <p className="font-mono text-[0.68rem] tracking-[0.25em] text-emerald-400 uppercase font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            03 / EXPERIENCE & FOUNDATION
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-title text-zinc-100 tracking-tight">
            Background & <span className="text-emerald-400">Credentials.</span>
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mt-1 font-sans">
            Formal IT engineering foundation, practical industry internships, and verified specialization certificates in machine learning and data analytics.
          </p>
        </div>

        {/* MAIN 3-COLUMN / GRID LAYOUT FOR EDUCATION, EXPERIENCE & VERIFIED LEARNING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: EDUCATION & EXPERIENCE (COL-SPAN 7) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* 1. EDUCATION SUBSECTION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-wider uppercase border-b border-zinc-900 pb-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>1. EDUCATION</span>
              </div>

              <div className="group relative bg-[#09090d]/90 border border-zinc-900 hover:border-emerald-500/30 rounded-xl p-5 sm:p-6 transition-all duration-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-lg font-bold font-title text-zinc-100 group-hover:text-emerald-300 transition-colors">
                    B.Tech. in Information Technology
                  </h3>
                  <span className="font-mono text-[0.7rem] px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 self-start sm:self-auto font-medium">
                    Expected 2027
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1 font-medium">
                  Gyanmanjari Innovative University
                </p>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Focusing on core software engineering, algorithms, database systems, machine learning architectures, and cloud microservices.
                </p>
              </div>
            </div>

            {/* 2. EXPERIENCE SUBSECTION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-wider uppercase border-b border-zinc-900 pb-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>2. EXPERIENCE</span>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Subtle vertical connector line */}
                <div className="absolute left-4 sm:left-6 top-6 bottom-6 w-px bg-zinc-900/80 pointer-events-none hidden sm:block" />

                {/* Experience 1 */}
                <div className="group relative bg-[#09090d]/90 border border-zinc-900 hover:border-emerald-500/30 rounded-xl p-5 sm:p-6 transition-all duration-300 sm:ml-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base sm:text-lg font-bold font-title text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      Data Analytics Intern
                    </h3>
                    <span className="font-mono text-[0.68rem] text-zinc-500">
                      Jan 2026 – Feb 2026
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-400/90 mt-0.5 font-medium">
                    iStudio
                  </p>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                    Built Python data engineering pipelines and ETL processes to validate, clean, and structure raw transaction datasets, yielding a ~25% runtime-error reduction. Performed EDA and statistical modeling using SQL, Pandas, and NumPy.
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900/80">
                    <div className="flex flex-wrap gap-1.5">
                      {["Python", "SQL", "Pandas", "NumPy", "ETL"].map((tech) => (
                        <span key={tech} className="font-mono text-[0.62rem] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience 2 */}
                <div className="group relative bg-[#09090d]/90 border border-zinc-900 hover:border-emerald-500/30 rounded-xl p-5 sm:p-6 transition-all duration-300 sm:ml-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base sm:text-lg font-bold font-title text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      Python with Django Intern
                    </h3>
                    <span className="font-mono text-[0.68rem] text-zinc-500">
                      Jun 2025 – Jul 2025
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-400/90 mt-0.5 font-medium">
                    Brainybeam Info-Tech Pvt. Ltd.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                    Developed modular Python backend components and database schemas, implementing Django REST Framework endpoints. Automated testing and backend query optimization, achieving a ~30% response-time improvement.
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900/80">
                    <div className="flex flex-wrap gap-1.5">
                      {["Python", "Django", "REST APIs", "PostgreSQL"].map((tech) => (
                        <span key={tech} className="font-mono text-[0.62rem] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VERIFIED LEARNING (COL-SPAN 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 tracking-wider uppercase border-b border-zinc-900 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>3. VERIFIED LEARNING</span>
              </div>
              <span className="text-[0.65rem] text-zinc-500">SPECIALIZATION CREDENTIALS</span>
            </div>

            {/* Featured Primary Certifications */}
            <div className="flex flex-col gap-3">
              {primaryCertificates.map((cert) => (
                <div
                  key={cert.title}
                  className="group bg-[#09090d]/90 border border-zinc-900 hover:border-emerald-500/40 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[0.6rem] text-emerald-400 font-medium tracking-wider uppercase bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded">
                        {cert.badge}
                      </span>
                      <span className="text-[0.68rem] font-mono text-zinc-400 font-medium">
                        {cert.issuer}
                      </span>
                    </div>
                    <h4 className="font-title font-bold text-sm text-zinc-100 group-hover:text-emerald-300 transition-colors leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-[0.72rem] text-zinc-400 mt-2 font-mono leading-relaxed">
                      <span className="text-zinc-500">Skills:</span> {cert.skills}
                    </p>
                  </div>

                  {cert.relatedProject && onSelectProject && (
                    <button
                      onClick={() => handleViewCaseStudy(cert.relatedProject)}
                      className="mt-3.5 pt-2.5 border-t border-zinc-900/80 flex items-center justify-between text-[0.68rem] font-mono text-zinc-400 hover:text-emerald-300 transition-colors text-left group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        Applied in {cert.relatedProject}
                      </span>
                      <span className="flex items-center gap-0.5 text-emerald-400 group-hover/btn:translate-x-0.5 transition-transform">
                        VIEW CASE STUDY <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Expandable Area for Remaining 3 Certifications */}
            <div className="mt-1">
              <button
                onClick={() => setShowMoreCerts(!showMoreCerts)}
                className="w-full bg-[#08080c] border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 text-zinc-300 font-mono text-xs py-3 px-4 rounded-xl flex items-center justify-between transition-all duration-200"
                aria-expanded={showMoreCerts}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {showMoreCerts ? "HIDE EXTRA CREDENTIALS" : "+ 3 MORE VERIFIED CREDENTIALS"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                    showMoreCerts ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showMoreCerts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-2.5 mt-3"
                  >
                    {secondaryCertificates.map((cert) => (
                      <div
                        key={cert.title}
                        className="bg-[#07070a]/90 border border-zinc-900/80 hover:border-zinc-800 rounded-lg p-3.5 transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-title font-semibold text-xs text-zinc-200">
                            {cert.title}
                          </h5>
                          <span className="font-mono text-[0.62rem] text-zinc-400 shrink-0">
                            {cert.issuer}
                          </span>
                        </div>
                        <p className="text-[0.68rem] text-zinc-400 font-mono mt-1">
                          {cert.skills}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
