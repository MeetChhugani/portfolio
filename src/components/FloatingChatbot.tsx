"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Download, 
  Terminal, 
  FileText, 
  User
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Message {
  role: "user" | "bot";
  text: string;
  isStreaming?: boolean;
  projectCard?: "attrition" | "startup" | "sentiment" | "quizlab";
  resumeCard?: boolean;
}

const FloatingChatbot: React.FC = () => {
  const { role } = useRole();
  const isBackend = role === "backendDev";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      text: "Hello! I am Meet's AI Recruiter Assistant. Ask me anything about his ML projects, tech stack, experience, chess achievements, or download his resume." 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const suggestions = [
    "Summarize Meet 👤",
    "Show Backend Projects 🐍",
    "Show AI Projects 🤖",
    "Explain Employee Risk Radar 📊",
    "Show Skills ⚡",
    "Download Resume 📄",
    "Explain Tech Stack 🛠️"
  ];

  // Rotate suggestions every 4.5s when chat window is closed
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setSuggestionIdx((prev) => (prev + 1) % suggestions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen, suggestions.length]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Keyboard Shortcuts: '/' to open, 'ESC' to minimize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        // Prevent typing '/' into active inputs
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.getAttribute("contenteditable") === "true")) {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Listen for external open trigger
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);

  const streamResponse = useCallback((fullText: string, projectCard?: "attrition" | "startup" | "sentiment" | "quizlab", resumeCard?: boolean) => {
    setIsTyping(true);
    
    // Add an empty bot message structure to start typing stream
    setMessages((prev) => [...prev, { role: "bot", text: "", isStreaming: true }]);
    
    let currentText = "";
    let index = 0;
    const words = fullText.split(" ");
    
    const interval = setInterval(() => {
      if (index >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "bot") {
            updated[updated.length - 1] = { 
              role: "bot", 
              text: fullText, 
              projectCard, 
              resumeCard 
            };
          }
          return updated;
        });
        return;
      }
      
      currentText += (index === 0 ? "" : " ") + words[index];
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === "bot") {
          updated[updated.length - 1] = { 
            role: "bot", 
            text: currentText, 
            isStreaming: true 
          };
        }
        return updated;
      });
      index++;
    }, 20); // Fast word-by-word streaming effect
  }, []);

  const handleSend = useCallback((textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg = textToSend.trim();
    const newMessages = [...messages, { role: "user" as const, text: userMsg }];
    setMessages(newMessages);
    setInput("");

    const lower = userMsg.toLowerCase();
    let reply = "";
    let projectCard: "attrition" | "startup" | "sentiment" | "quizlab" | undefined;
    let resumeCard = false;

    // --- MULTI-PASS INTENT MATCHING ENGINE ---

    // 1. SPECIFIC SKILLS & TECHNICAL EXPERIENCE
    if (lower.includes("python")) {
      reply = "**Python Experience**:\nMeet uses Python as his primary development language across all his backend systems and ML pipelines.\n\n• **Backend APIs**: RESTful APIs with FastAPI & database applications with Django.\n• **ML & Data Processing**: Model training in Scikit-Learn, data manipulation in Pandas/NumPy, and SHAP explainability.\n• **Experience**: Python with Django Intern at Brainybeam Info-Tech (Jun 2025 – Jul 2025).";
    } else if (lower.includes("django")) {
      reply = "**Django Experience**:\nMeet developed RESTful APIs and backend modules using Python and Django during his internship at **Brainybeam Info-Tech** (Jun 2025 – Jul 2025). He worked on backend routing, database queries, and modular feature development.";
    } else if (lower.includes("fastapi")) {
      reply = "**FastAPI Experience**:\nMeet built high-performance asynchronous REST endpoints using **FastAPI** for his *AI-Powered Mock Interview Analyzer*. The FastAPI service streams real-time audio telemetry, NLP sentiment scoring, and MediaPipe pose parameters.";
    } else if (lower.includes("scikit") || lower.includes("scikit-learn") || lower.includes("sklearn")) {
      reply = "**Scikit-Learn & ML Experience**:\nMeet designs and evaluates supervised machine learning models using **Scikit-Learn**.\n\n• **Employee Attrition Risk Radar**: XGBoost binary classifier (0.77 ROC-AUC) explained via SHAP.\n• **Startup Success Predictor**: Random Forest classifier (0.81 ROC-AUC) trained on Crunchbase data.";
    } else if (lower.includes("sql") || lower.includes("database") || lower.includes("postgres")) {
      reply = "**SQL & Database Experience**:\nMeet uses **SQL** and **PostgreSQL** for relational schema design, database querying, and structuring analytical datasets. He applied SQL data extraction techniques during his Data Analytics Internship at **iStudio**.";
    } else if (lower.includes("pandas") || lower.includes("numpy") || lower.includes("eda")) {
      reply = "**Pandas & Data Analytics**:\nMeet uses **Pandas** and **NumPy** for exploratory data analysis (EDA), missing value imputation, feature engineering, and statistical summary routines across all data projects.";
    } else if (lower.includes("shap") || lower.includes("explainability") || lower.includes("explainable")) {
      reply = "**SHAP & Model Explainability**:\nMeet integrates **SHAP (SHapley Additive exPlanations)** to break open black-box ML models, generating local feature-importance metrics (e.g. assessing Overtime and Monthly Income impact in the Employee Attrition Radar).";
    } else if (lower.includes("machine learning") || lower.includes(" ml ") || lower.endsWith(" ml") || lower === "ml") {
      reply = "**Machine Learning Expertise**:\nMeet specializes in end-to-end ML workflows:\n\n1. **Data Preprocessing & Feature Engineering** (Pandas, NumPy, SMOTE)\n2. **Supervised Algorithms** (Scikit-Learn, XGBoost, Random Forest, Regression)\n3. **Model Evaluation & Explainability** (ROC-AUC metrics, Cross-Validation, SHAP)";
    } else if (lower.includes("artificial intelligence") || lower.includes(" ai ") || lower.endsWith(" ai") || lower === "ai") {
      reply = "**AI & LLM Integrations**:\nMeet builds applied AI systems including:\n\n• **AI Mock Interview Analyzer**: Real-time MediaPipe computer vision & speech NLP telemetry.\n• **QuizLab**: Document parsing engine generating structured JSON flashcard arrays from LLM/OCR text streams.";

    // 2. PROJECT-SPECIFIC INQUIRIES
    } else if (lower.includes("businessos") || lower.includes("business os") || lower.includes("erp") || lower.includes("saas")) {
      reply = "**AI BusinessOS - Enterprise SaaS ERP Foundation**:\nA production-grade Enterprise ERP foundation built with Clean Architecture.\n\n• **Backend**: FastAPI async application with SQLAlchemy 2 connection pools & PostgreSQL 16.\n• **Security**: Redis token rotation, JWT blacklist & 7-role RBAC access control (Super Admin to Employee).\n• **DevOps**: Alembic DB migrations, Pytest suite, Docker Compose, and glassmorphic React frontend.";
    } else if (lower.includes("attrition") || lower.includes("employee predictor") || lower.includes("radar")) {
      reply = "The **Employee Attrition Risk Radar** is an XGBoost binary classification pipeline (0.77 ROC-AUC) that predicts staff turnover risks and provides local SHAP value factor attribution.";
      projectCard = "attrition";
    } else if (lower.includes("startup") || lower.includes("success predictor")) {
      reply = "The **Startup Success Predictor** is a Random Forest classification model (0.81 ROC-AUC) trained on Crunchbase venture metrics to project early-stage funding viability.";
      projectCard = "startup";
    } else if (lower.includes("mock interview") || lower.includes("interview")) {
      reply = "The **AI-Powered Mock Interview Analyzer** is a multi-modal assessment tool combining Flutter, Python, FastAPI, and MediaPipe to evaluate candidate speech, posture, and expression telemetry in real time.";
    } else if (lower.includes("sentiment") || lower.includes("fintech") || lower.includes("stock")) {
      reply = "The **Fintech News Sentiment Analyzer** indexes 3,000+ financial headlines across NSE/BSE stock markers to map daily market sentiment swings to index price volatility.";
      projectCard = "sentiment";
    } else if (lower.includes("quizlab") || lower.includes("flashcard")) {
      reply = "**QuizLab** is an adaptive study system that parses document slides and lecture texts into structured JSON flashcard decks using LLM and OCR text extraction pipelines.";
      projectCard = "quizlab";
    } else if (lower.includes("project") || lower.includes("built") || lower.includes("repos")) {
      reply = "Meet has developed 4 key applications:\n\n1. **AI Mock Interview Analyzer** (FastAPI, MediaPipe, Speech NLP)\n2. **QuizLab Engine** (Document parsing, JSON flashcards)\n3. **Employee Attrition Risk Radar** (XGBoost, 0.77 ROC-AUC, SHAP)\n4. **Startup Success Predictor** (Random Forest, 0.81 ROC-AUC)\n\nAsk about any of these to see live details!";

    // 3. EXPERIENCE & INTERNSHIPS
    } else if (lower.includes("intern") || lower.includes("experience") || lower.includes("job") || lower.includes("work") || lower.includes("brainybeam") || lower.includes("istudio")) {
      reply = "**Work Experience**:\n\n1. **Data Analytics Intern @ iStudio** (Jan 2026 – Feb 2026)\n   Cleaned datasets, built decision-support dashboards, and applied Excel/SQL data routines.\n\n2. **Python with Django Intern @ Brainybeam Info-Tech** (Jun 2025 – Jul 2025)\n   Developed RESTful APIs and backend web modules in Python and Django.";

    // 4. RESUME & DOCUMENTS
    } else if (lower.includes("resume") || lower.includes("download") || lower.includes("cv") || lower.includes("pdf")) {
      reply = "Here is Meet's professional resume. You can download the PDF copy directly using the card below!";
      resumeCard = true;

    // 5. CONTACT & SOCIALS
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("reach") || lower.includes("github") || lower.includes("linkedin")) {
      reply = "**Contact Details**:\n\n• **Email**: meetchhugani81@gmail.com\n• **Phone**: +91-7862806190\n• **GitHub**: [github.com/MeetChhugani](https://github.com/MeetChhugani)\n• **LinkedIn**: [linkedin.com/in/meet-chhugani](https://linkedin.com/in/meet-chhugani)";

    // 6. CERTIFICATIONS & EDUCATION & CHESS
    } else if (lower.includes("cert") || lower.includes("credential")) {
      reply = "Meet holds verified certificates in:\n\n• **IBM Data Science Professional**\n• **Machine Learning Specialization** (DeepLearning.AI & Stanford)\n• **Google Advanced Data Analytics**\n• **Deloitte Data Analytics**\n• **Green Skills & AI Foundation**";
    } else if (lower.includes("education") || lower.includes("degree") || lower.includes("college") || lower.includes("university")) {
      reply = "Meet is a final-year Information Technology student (B.Tech IT) at **Gyanmanjari Innovative University** (Graduating 2026).";
    } else if (lower.includes("chess") || lower.includes("rank")) {
      reply = "Meet is a competitive chess player who achieved **2nd Position in the University Chess Competition**, applying tactical search tree logic directly to algorithmic problem solving!";

    // 7. GREETINGS & INTROS
    } else if (lower === "hi" || lower === "hello" || lower === "hey" || lower.startsWith("hi ") || lower.startsWith("hello ") || lower.includes("who is meet") || lower.includes("about meet") || lower.includes("tell me about")) {
      reply = "Hello! I am Meet's AI Recruiter Assistant. Meet Chhugani is a Final Year B.Tech IT student, Python/Backend Developer, and Data Scientist.\n\nAsk me about his skills (*'hows meet in python'*, *'does meet know django'*), projects, internships, or download his resume!";

    // FALLBACK
    } else {
      reply = `I didn't quite catch that phrasing, but I can tell you about Meet's experience! Try asking:\n\n• *"How's Meet in Python?"*\n• *"Does Meet know Django or FastAPI?"*\n• *"Where did Meet intern?"*\n• *"Show me his ML projects"*\n• Or type *"download resume"*.`;
    }

    setTimeout(() => {
      streamResponse(reply, projectCard, resumeCard);
    }, 400);
  }, [messages, isTyping, streamResponse]);

  const renderMessageText = (text: string) => {
    // Basic Markdown formatting helper
    return text.split("\n").map((line, i) => {
      let content: React.ReactNode = line;
      
      // Headers/Bullet point formatting
      const isBullet = line.startsWith("• ") || line.startsWith("- ");
      const cleanLine = isBullet ? line.substring(2) : line;

      // Bold formatter (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="text-zinc-100 font-semibold font-mono">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      content = parts.length > 0 ? parts : cleanLine;

      if (isBullet) {
        return (
          <div key={i} className="flex items-start gap-2 pl-1 my-0.5">
            <span className="text-cyan-400 mt-1 select-none text-[0.5rem]">•</span>
            <span className="flex-1">{content}</span>
          </div>
        );
      }

      return (
        <p key={i} className={line === "" ? "h-2" : "my-0.5"}>
          {content}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] select-none font-sans">
      <AnimatePresence>
        {/* Modern Glassmorphism Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[340px] md:w-[380px] h-[520px] bg-[#070709]/80 border border-zinc-900/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between backdrop-blur-md"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-900/60 flex justify-between items-center bg-[#070709]/40 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="font-mono text-[0.68rem] text-zinc-300 font-bold tracking-[2px] uppercase">Meet_AI_Recruiter</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-zinc-900/50 transition-colors text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Logs */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin select-none">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} gap-1`}>
                  <div className="flex items-center gap-1.5 px-1">
                    {m.role === "user" ? (
                      <>
                        <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">Recruiter</span>
                        <User className="w-3 h-3 text-purple-400" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">Meet AI</span>
                      </>
                    )}
                  </div>
                  
                  {/* Chat bubble text */}
                  {m.text && (
                    <div 
                      className={`text-[0.72rem] leading-relaxed p-3 rounded-2xl border max-w-[88%] whitespace-pre-wrap ${
                        m.role === "user" 
                          ? "bg-purple-950/20 text-purple-200 border-purple-900/40 rounded-tr-none" 
                          : "bg-zinc-900/30 text-zinc-300 border-zinc-900/50 rounded-tl-none"
                      }`}
                    >
                      {renderMessageText(m.text)}
                    </div>
                  )}

                  {/* Render Custom Project Component Cards inside Chat */}
                  {m.projectCard === "attrition" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 bg-zinc-950/80 border border-zinc-900/60 p-3 rounded-xl max-w-[88%] flex flex-col gap-2 font-sans select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-200">Employee Attrition Risk Radar</span>
                      </div>
                      <p className="text-[0.62rem] text-zinc-400 leading-normal">
                        Binary classification pipeline built with tuned XGBoost and evaluated using SHAP explainers to diagnose attrition indicators.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "XGBoost", "SHAP", "FastAPI"].map((t) => (
                          <span key={t} className="text-[0.52rem] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-1.5">
                        <a 
                          href="https://github.com/MeetChhugani/employee-risk-radar" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-[0.58rem] px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                          <GithubIcon className="w-2.5 h-2.5" />
                          <span>Code</span>
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {m.projectCard === "startup" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 bg-zinc-950/80 border border-zinc-900/60 p-3 rounded-xl max-w-[88%] flex flex-col gap-2 font-sans select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-200">Startup Success Predictor</span>
                      </div>
                      <p className="text-[0.62rem] text-zinc-400 leading-normal">
                        Random Forest classification algorithm tuned to predict startup funding outcomes (0.81 ROC-AUC).
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Scikit-Learn", "RandomForest", "Crunchbase"].map((t) => (
                          <span key={t} className="text-[0.52rem] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {m.projectCard === "sentiment" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 bg-zinc-950/80 border border-zinc-900/60 p-3 rounded-xl max-w-[88%] flex flex-col gap-2 font-sans select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-200">Fintech Sentiment Analyzer</span>
                      </div>
                      <p className="text-[0.62rem] text-zinc-400 leading-normal">
                        Real-time news correlator parsing and compiling 3,000+ NSE/BSE stock headlines.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "NLTK", "Matplotlib", "Streamlit"].map((t) => (
                          <span key={t} className="text-[0.52rem] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {m.projectCard === "quizlab" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 bg-zinc-950/80 border border-zinc-900/60 p-3 rounded-xl max-w-[88%] flex flex-col gap-2 font-sans select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-200">QuizLab Cards Synthesizer</span>
                      </div>
                      <p className="text-[0.62rem] text-zinc-400 leading-normal">
                        Intelligent document content parser generating structured review flashcards.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Java", "NLP Rules", "Regex", "JSON"].map((t) => (
                          <span key={t} className="text-[0.52rem] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Render Download Resume Card */}
                  {m.resumeCard && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 bg-zinc-950/80 border border-zinc-900/60 p-3 rounded-xl max-w-[88%] flex flex-col gap-2 font-sans select-none w-full"
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-200">Meet_Chhugani_Resume.pdf</span>
                      </div>
                      <p className="text-[0.62rem] text-zinc-400 leading-normal">
                        PDF Format, listing skills in Python, Scikit-Learn, PyTorch, Azure AI, and XGBoost modeling.
                      </p>
                      <a 
                        href="/Meet_Chhugani_Resume.pdf" 
                        download="Meet_Chhugani_Resume.pdf"
                        className="flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[0.6rem] px-3 py-1.5 rounded-lg transition-colors cursor-pointer w-full mt-1"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>Download Resume (PDF)</span>
                      </a>
                    </motion.div>
                  )}

                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Premium suggested questions strip */}
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-zinc-900/30">
              {[
                "Tell me about Meet",
                "Show AI projects",
                "What technologies does Meet use?",
                "Explain the Employee Attrition Predictor",
                "Explain the Startup Success Predictor",
                "Show certifications",
                "Download resume",
                "How can I contact Meet?"
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 hover:text-cyan-400 text-[0.62rem] text-zinc-400 font-mono px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-4 border-t border-zinc-900 bg-[#08080a]"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a query... (Press '/' to open, 'ESC' to minimize)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={`flex-1 bg-[#0d0d0f] border border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none ${isBackend ? "focus:border-emerald-500" : "focus:border-cyan-500"} transition-colors`}
                />
                <button
                  type="submit"
                  className={`${isBackend ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10" : "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/10"} text-white rounded-lg p-2 flex items-center justify-center cursor-pointer shadow-md`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Suggestions Tooltip Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute right-14 bottom-1 bg-[#0c0c0e]/95 border border-zinc-800 text-[0.68rem] text-zinc-300 font-mono px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap cursor-pointer hover:border-zinc-700 flex items-center gap-1.5 backdrop-blur-sm shadow-cyan-500/5"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className={`w-3 h-3 ${isBackend ? "text-emerald-400" : "text-cyan-400"} animate-pulse`} />
            <span>{suggestions[suggestionIdx]}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button with breathing glow ring */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-12 h-12 rounded-full ${isBackend ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-400/20" : "bg-cyan-600 hover:bg-cyan-500 border-cyan-400/20"} text-white flex items-center justify-center shadow-lg cursor-pointer border relative`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: isBackend ? "0 0 15px rgba(16, 185, 129, 0.4)" : "0 0 15px rgba(6, 182, 212, 0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageSquare className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Breathing / Glow Animation Outer Ring */}
        {!isOpen && (
          <span className={`absolute -inset-0.5 rounded-full border ${isBackend ? "border-emerald-500/40" : "border-cyan-500/40"} animate-ping opacity-75`} />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingChatbot;
