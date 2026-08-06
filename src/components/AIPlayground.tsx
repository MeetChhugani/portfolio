"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Smile, Banknote, Search } from "lucide-react";
import { useRole } from "@/context/RoleContext";

type DemoType = "sentiment" | "spam" | "salary" | "resume";

const AIPlayground: React.FC = () => {
  const { role } = useRole();
  const [activeDemo, setActiveDemo] = useState<DemoType>("sentiment");

  const isBackend = role === "backendDev";

  const activeBorderColor = isBackend ? "#10b981" : "#a855f7";
  const activeIconColor = isBackend ? "text-emerald-400" : "text-cyan-400";
  const ctaButtonClass = isBackend
    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10"
    : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10";
  const focusBorderClass = isBackend ? "focus:border-emerald-500" : "focus:border-purple-500";
  const accentSliderClass = isBackend ? "accent-emerald-500" : "accent-purple-500";
  const matchedTagClass = isBackend
    ? "bg-emerald-950/60 border-emerald-900/50 text-emerald-400"
    : "bg-purple-950/60 border-purple-900/50 text-purple-400";

  // --- DEMO 1: SENTIMENT ANALYSIS ---
  const [sentimentText, setSentimentText] = useState("TCS shares jump 5% on strong quarterly revenue guidance");
  const [sentimentResult, setSentimentResult] = useState<{ label: string; score: number } | null>(null);

  const runSentiment = () => {
    const text = sentimentText.toLowerCase();
    let score = 0.0;
    if (text.includes("jump") || text.includes("rise") || text.includes("strong") || text.includes("gain") || text.includes("climb")) {
      score = 0.65 + Math.random() * 0.3;
    } else if (text.includes("drop") || text.includes("fall") || text.includes("lower") || text.includes("decline") || text.includes("sell-off")) {
      score = -(0.55 + Math.random() * 0.4);
    } else {
      score = (Math.random() - 0.5) * 0.2;
    }

    setSentimentResult({
      label: score > 0.25 ? "POSITIVE" : score < -0.25 ? "NEGATIVE" : "NEUTRAL",
      score: Number(score.toFixed(2))
    });
  };

  // --- DEMO 2: SPAM DETECTION ---
  const [spamText, setSpamText] = useState("CONGRATULATIONS! You won $10,000 lottery cash. Click here to claim!");
  const [spamResult, setSpamResult] = useState<{ isSpam: boolean; probability: number } | null>(null);

  const runSpam = () => {
    const text = spamText.toLowerCase();
    let score = 0.05;
    if (text.includes("claim") || text.includes("win") || text.includes("won") || text.includes("free") || text.includes("money") || text.includes("cash") || text.includes("click here")) {
      score += 0.55;
    }
    if (text.includes("congratulations") || text.includes("selected") || text.includes("lottery") || text.includes("urgent")) {
      score += 0.35;
    }
    setSpamResult({
      isSpam: score > 0.5,
      probability: Number(Math.min(score, 1).toFixed(2))
    });
  };

  // --- DEMO 3: SALARY PREDICTION ---
  const [experience, setExperience] = useState(3);
  const [isLead, setIsLead] = useState(false);
  const [predSalary, setPredSalary] = useState<number | null>(null);

  const runSalary = () => {
    let base = 60000 + experience * 8500;
    if (isLead) base *= 1.35;
    setPredSalary(Number(base.toFixed(0)));
  };

  // --- DEMO 4: RESUME ANALYZER ---
  const [resumeText, setResumeText] = useState("Experienced Python developer specializing in Scikit-Learn pipelines and SQL database processing.");
  const [resumeMatches, setResumeMatches] = useState<string[] | null>(null);

  const runResume = () => {
    const skills = ["python", "pytorch", "scikit-learn", "sql", "java", "tensorflow", "pandas", "numpy", "plotly", "streamlit", "fastapi", "git", "github", "azure"];
    const found = skills.filter((skill) => resumeText.toLowerCase().includes(skill));
    setResumeMatches(found.map((s) => s.toUpperCase()));
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative select-none">
      
      {/* Side selection nodes (col-4) */}
      <div className="lg:col-span-4 flex flex-col gap-2.5">
        {[
          { id: "sentiment", label: "Sentiment Analysis", icon: <Smile className="w-4 h-4" /> },
          { id: "spam", label: "Spam Detection", icon: <ShieldAlert className="w-4 h-4" /> },
          { id: "salary", label: "Salary Projection", icon: <Banknote className="w-4 h-4" /> },
          { id: "resume", label: "Resume Parsing", icon: <Search className="w-4 h-4" /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveDemo(item.id as DemoType)}
            className="flex items-center gap-3 p-3 rounded-lg border text-left cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: activeDemo === item.id ? (isBackend ? "rgba(16, 185, 129, 0.05)" : "rgba(168, 85, 247, 0.05)") : "rgba(10, 10, 12, 0.4)",
              borderColor: activeDemo === item.id ? activeBorderColor : "rgba(255, 255, 255, 0.04)"
            }}
          >
            <div className={activeDemo === item.id ? activeIconColor : "text-zinc-500"}>
              {item.icon}
            </div>
            <span className="font-mono text-xs text-zinc-200">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Demo Sandbox pane (col-8) */}
      <div className="lg:col-span-8 bg-[rgba(10,10,12,0.45)] border border-zinc-900 rounded-xl p-6 min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* DEMO 1: SENTIMENT ANALYSIS */}
          {activeDemo === "sentiment" && (
            <motion.div
              key="sentiment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-wider">SANDBOX_MODULE // SENTIMENT</span>
                <h4 className="font-title font-semibold text-zinc-200 mt-1">NSE/BSE Financial Sentiment Classifier</h4>
                <p className="text-xs text-zinc-500 mt-1">Classify market headlines into positive, neutral, or negative signals.</p>
                
                <input
                  type="text"
                  value={sentimentText}
                  onChange={(e) => setSentimentText(e.target.value)}
                  className={`w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg p-2.5 text-xs mt-4 text-zinc-200 outline-none ${focusBorderClass} transition-colors`}
                />
              </div>

              {sentimentResult && (
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[0.55rem] font-mono text-zinc-500">PREDICTED CATEGORY</span>
                    <span className={`font-mono text-sm font-bold mt-1 ${
                      sentimentResult.label === "POSITIVE" ? "text-emerald-400" : sentimentResult.label === "NEGATIVE" ? "text-rose-400" : "text-zinc-400"
                    }`}>
                      {sentimentResult.label}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[0.55rem] font-mono text-zinc-500">CONFIDENCE INDEX</span>
                    <span className="font-mono text-xs font-semibold text-zinc-300 mt-1">
                      {sentimentResult.score > 0 ? `+${sentimentResult.score}` : sentimentResult.score}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={runSentiment}
                className={`w-full rounded-lg p-2 text-xs font-mono font-bold transition-colors cursor-pointer ${ctaButtonClass}`}
              >
                RUN IN-BROWSER PIPELINE
              </button>
            </motion.div>
          )}

          {/* DEMO 2: SPAM DETECTION */}
          {activeDemo === "spam" && (
            <motion.div
              key="spam"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-wider">SANDBOX_MODULE // SPAM_SHIELD</span>
                <h4 className="font-title font-semibold text-zinc-200 mt-1">Bayesian Spam Token Analyzer</h4>
                <p className="text-xs text-zinc-500 mt-1">Runs token checks to flag clickbait and phishing triggers.</p>
                
                <textarea
                  value={spamText}
                  onChange={(e) => setSpamText(e.target.value)}
                  rows={2}
                  className={`w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg p-2.5 text-xs mt-4 text-zinc-200 outline-none ${focusBorderClass} transition-colors resize-none`}
                />
              </div>

              {spamResult && (
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[0.55rem] font-mono text-zinc-500">SPAM VERDICT</span>
                    <span className={`font-mono text-sm font-bold mt-1 ${spamResult.isSpam ? "text-rose-400" : "text-emerald-400"}`}>
                      {spamResult.isSpam ? "SPAM DETECTED" : "NOMINAL MESSAGE"}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[0.55rem] font-mono text-zinc-500">SPAM COEFFICIENT</span>
                    <span className="font-mono text-xs font-semibold text-zinc-300 mt-1">{(spamResult.probability * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )}

              <button
                onClick={runSpam}
                className={`w-full rounded-lg p-2 text-xs font-mono font-bold transition-colors cursor-pointer ${ctaButtonClass}`}
              >
                RUN SHIELD AUDIT
              </button>
            </motion.div>
          )}

          {/* DEMO 3: SALARY PROJECTION */}
          {activeDemo === "salary" && (
            <motion.div
              key="salary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-wider">SANDBOX_MODULE // SALARY</span>
                <h4 className="font-title font-semibold text-zinc-200 mt-1">Salary Regression Calculator</h4>
                <p className="text-xs text-zinc-500 mt-1">Project baseline incomes based on tenure and role scales.</p>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Years of Experience</span>
                      <span>{experience} years</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={12}
                      value={experience}
                      onChange={(e) => setExperience(Number(e.target.value))}
                      className={`w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer ${accentSliderClass}`}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="leadCheck"
                      checked={isLead}
                      onChange={(e) => setIsLead(e.target.checked)}
                      className={`rounded border-zinc-800 bg-zinc-950 ${isBackend ? "text-emerald-500 focus:ring-emerald-600" : "text-purple-500 focus:ring-purple-600"} focus:ring-offset-zinc-950`}
                    />
                    <label htmlFor="leadCheck" className="text-xs text-zinc-400 cursor-pointer">
                      Tech Lead / Senior Role (+35%)
                    </label>
                  </div>
                </div>
              </div>

              {predSalary && (
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[0.55rem] font-mono text-zinc-500">PROJECTED INCOME (EST)</span>
                    <span className="font-mono text-sm font-bold text-emerald-400 mt-1">
                      ${predSalary.toLocaleString()}/yr
                    </span>
                  </div>
                  <span className="text-[0.6rem] font-mono text-zinc-600">PREDICTIVE LINEAR MODEL</span>
                </div>
              )}

              <button
                onClick={runSalary}
                className={`w-full rounded-lg p-2 text-xs font-mono font-bold transition-colors cursor-pointer ${ctaButtonClass}`}
              >
                CALCULATE FORECAST
              </button>
            </motion.div>
          )}

          {/* DEMO 4: RESUME PARSING */}
          {activeDemo === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full justify-between gap-4"
            >
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-wider">SANDBOX_MODULE // RESUME_PARSER</span>
                <h4 className="font-title font-semibold text-zinc-200 mt-1">Resume Keywords Matching Scan</h4>
                <p className="text-xs text-zinc-500 mt-1">Scans technical resume strings against target portfolio skills.</p>
                
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={2}
                  className={`w-full bg-[#0d0d0f] border border-zinc-800 rounded-lg p-2.5 text-xs mt-4 text-zinc-200 outline-none ${focusBorderClass} transition-colors resize-none`}
                />
              </div>

              {resumeMatches && (
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-4">
                  <span className="text-[0.55rem] font-mono text-zinc-500 block">IDENTIFIED TARGET SKILLS</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {resumeMatches.length > 0 ? (
                      resumeMatches.map((m, idx) => (
                        <span key={idx} className={`font-mono text-[0.65rem] px-2 py-0.5 rounded ${matchedTagClass}`}>
                          {m}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-600 text-xs font-mono">0 keywords matched</span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={runResume}
                className={`w-full rounded-lg p-2 text-xs font-mono font-bold transition-colors cursor-pointer ${ctaButtonClass}`}
              >
                SCAN RESUME STREAM
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default AIPlayground;
