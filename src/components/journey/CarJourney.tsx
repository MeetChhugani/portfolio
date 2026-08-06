"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useVelocity, useSpring, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { 
  Server, 
  Database, 
  Cpu, 
  Sparkles, 
  Activity, 
  ArrowUpRight, 
  Gauge, 
  FolderGit2,
  X,
  Play,
  List,
  ArrowUp,
  ArrowDown,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

// Check prefers-reduced-motion
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// Low-Poly 3D Car Primitive Mesh with Dynamic Color Accent
function LowPolyJourneyCar({ speedRef, activeColor }: { speedRef: React.MutableRefObject<number>; activeColor: string }) {
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelRL = useRef<THREE.Mesh>(null);
  const wheelRR = useRef<THREE.Mesh>(null);
  const bodyGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const currentSpeed = speedRef.current;
    const rot = delta * (10 + currentSpeed * 25);
    
    if (wheelFL.current) wheelFL.current.rotation.x += rot;
    if (wheelFR.current) wheelFR.current.rotation.x += rot;
    if (wheelRL.current) wheelRL.current.rotation.x += rot;
    if (wheelRR.current) wheelRR.current.rotation.x += rot;

    if (bodyGroup.current) {
      bodyGroup.current.position.y = Math.sin(Date.now() * 0.008) * (0.02 + currentSpeed * 0.03);
      bodyGroup.current.rotation.x = currentSpeed * -0.04;
    }
  });

  return (
    <group ref={bodyGroup} position={[0, 0.4, 0]}>
      {/* Chassis Base */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.5, 0.4, 3.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Hood Slope */}
      <mesh position={[0, 0.35, 1.0]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.4, 0.25, 1.0]} />
        <meshStandardMaterial color={activeColor} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cabin Roof */}
      <mesh position={[0, 0.7, -0.2]}>
        <boxGeometry args={[1.2, 0.45, 1.5]} />
        <meshStandardMaterial color="#0369a1" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.72, 0.5]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[1.15, 0.35, 0.08]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </mesh>

      {/* Spoiler */}
      <mesh position={[0, 0.82, -1.5]}>
        <boxGeometry args={[1.4, 0.06, 0.3]} />
        <meshStandardMaterial color={activeColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Headlights (Glowing) */}
      <mesh position={[-0.5, 0.35, 1.61]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#e0f2fe" emissive={activeColor} emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.5, 0.35, 1.61]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#e0f2fe" emissive={activeColor} emissiveIntensity={3} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.5, 0.4, -1.61]}>
        <boxGeometry args={[0.35, 0.08, 0.05]} />
        <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.5, 0.4, -1.61]}>
        <boxGeometry args={[0.35, 0.08, 0.05]} />
        <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={3} />
      </mesh>

      {/* Wheels */}
      <mesh ref={wheelFL} position={[-0.8, 0.2, 0.9]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh ref={wheelFR} position={[0.8, 0.2, 0.9]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh ref={wheelRL} position={[-0.8, 0.2, -0.9]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh ref={wheelRR} position={[0.8, 0.2, -0.9]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Road & Environment Scene
function JourneyEnvironment({ 
  velocityRef,
  activeColor,
  reduced 
}: { 
  velocityRef: React.MutableRefObject<number>;
  activeColor: string;
  reduced: boolean;
}) {
  const roadGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduced) return;

    const vel = Math.abs(velocityRef.current);
    const speed = 0.05 + vel * 1.5;
    
    if (roadGroup.current) {
      roadGroup.current.position.z += delta * speed * 20;
      if (roadGroup.current.position.z > 6) {
        roadGroup.current.position.z = 0;
      }
    }
  });

  return (
    <group>
      {/* Road Base Strip */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 60]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.8} />
      </mesh>

      {/* Dashed Center Lane Lines with Active Semantic Color */}
      <group ref={roadGroup}>
        {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map((zPos, i) => (
          <mesh key={i} position={[0, 0.01, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 2.5]} />
            <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.8} />
          </mesh>
        ))}

        {/* Side Road Border Arches */}
        {[-20, -10, 0, 10, 20].map((zPos, i) => (
          <group key={`arch-${i}`} position={[0, 0, zPos]}>
            <mesh position={[-3.2, 1.5, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[3.2, 1.5, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 3.0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 6.4, 8]} />
              <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={1} />
            </mesh>
          </group>
        ))}
      </group>

      <LowPolyJourneyCar speedRef={velocityRef} activeColor={activeColor} />
    </group>
  );
}

// Milestone Project Dossier Interface
export interface MilestoneProject {
  id: number;
  minProg: number;
  maxProg: number;
  domain: string;
  domainColorHex: string;
  badgeStyle: string;
  accentText: string;
  title: string;
  subtitle: string;
  overview: string;
  problem: string;
  whyBuilt: string;
  architectureNodes: string[];
  engineeringDecisions: string;
  tradeoffs: string;
  challenges: string;
  lessonsLearned: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function CarJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Mode States
  const [isDriveMode, setIsDriveMode] = useState(false);
  const [showPlainList, setShowPlainList] = useState(reduced);
  const [selectedModalProject, setSelectedModalProject] = useState<MilestoneProject | null>(null);

  // Manual drive distance (0.0 to 1.0) and speed state
  const [manualDistance, setManualDistance] = useState(0);
  const [manualSpeed, setManualSpeed] = useState(0.05);

  const isAcceleratingRef = useRef(false);
  const isBrakingRef = useRef(false);
  const manualDistanceRef = useRef(0);
  const manualSpeedRef = useRef(0.05);

  // Scroll Progress & Scroll Velocity tracking via Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rawVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(rawVelocity, { damping: 25, stiffness: 200 });

  const [effectiveProgress, setEffectiveProgress] = useState(0);

  const progressRef = useRef(0);
  const velocityRef = useRef(0);

  // 5 Flagship Milestones Data
  const milestones: MilestoneProject[] = [
    {
      id: 0,
      minProg: 0,
      maxProg: 0.2,
      domain: "Backend",
      domainColorHex: "#10b981",
      badgeStyle: "bg-emerald-950/70 text-emerald-300 border-emerald-800/80",
      accentText: "text-emerald-400",
      title: "AI BusinessOS Platform",
      subtitle: "FastAPI, PostgreSQL 16, Redis, Docker, 100+ REST APIs",
      overview: "Production-grade enterprise ERP microservice platform built with Clean Architecture.",
      problem: "Small & medium enterprises struggle with fragmented operations across HR, CRM, and Inventory without centralized role authorization.",
      whyBuilt: "To replace siloed legacy tools with an integrated FastAPI backend, async PostgreSQL ORM, and an AI copilot.",
      architectureNodes: ["Authentication", "REST APIs", "PostgreSQL 16", "Redis", "Groq AI Layer"],
      engineeringDecisions: "Chose FastAPI async event loops over Flask to handle high-concurrency reporting queries.",
      tradeoffs: "Implemented Alembic migrations over raw SQL scripts to guarantee zero-downtime database schema evolution.",
      challenges: "Designing normalized schemas across 8 modules while maintaining sub-50ms endpoint latency.",
      lessonsLearned: "Redis token rotation dramatically cuts database lookup load during high-frequency API authorization.",
      stack: ["FastAPI", "PostgreSQL 16", "Redis", "Docker", "Groq LLaMA RAG"],
      githubUrl: "https://github.com/MeetChhugani/AI-BusinessOS"
    },
    {
      id: 1,
      minProg: 0.2,
      maxProg: 0.4,
      domain: "Machine Learning",
      domainColorHex: "#a855f7",
      badgeStyle: "bg-purple-950/70 text-purple-300 border-purple-800/80",
      accentText: "text-purple-400",
      title: "Employee Risk Radar",
      subtitle: "XGBoost, SHAP Explainer, SMOTE, Groq Chatbot",
      overview: "Explainable binary classification engine predicting employee turnover probabilities.",
      problem: "HR managers lack quantitative warning signals and feature importance driver transparency before key talent resigns.",
      whyBuilt: "To bridge the gap between black-box ML predictions and trusted HR strategic decision-making.",
      architectureNodes: ["Dataset", "EDA", "Feature Engineering", "XGBoost", "SHAP Explainer", "Deployment"],
      engineeringDecisions: "Selected XGBoost over Neural Networks for tabular data accuracy and SHAP tree explainability.",
      tradeoffs: "Applied SMOTE synthetic oversampling to balance minority attrition classes despite higher training latency.",
      challenges: "Preventing model overfitting on high-dimensional employee survey features.",
      lessonsLearned: "Local SHAP waterfall plots transform raw risk probabilities into actionable retention insights.",
      stack: ["Python", "XGBoost", "SHAP", "SMOTE", "Groq API", "Streamlit"],
      githubUrl: "https://github.com/MeetChhugani/Employee_Attrition_Predictor"
    },
    {
      id: 2,
      minProg: 0.4,
      maxProg: 0.6,
      domain: "Artificial Intelligence",
      domainColorHex: "#06b6d4",
      badgeStyle: "bg-cyan-950/70 text-cyan-300 border-cyan-800/80",
      accentText: "text-cyan-400",
      title: "QuizLab – AI Study Decks",
      subtitle: "PyPDF OCR, Adaptive Difficulty, Groq LLaMA 3.3 70B",
      overview: "Intelligent document parsing pipeline generating structured JSON flashcard study decks.",
      problem: "Students spend hours manually creating revision cards from lengthy textbook PDFs and lecture slides.",
      whyBuilt: "To automate study material creation directly from lecture slides and textbook scans.",
      architectureNodes: ["Document Upload", "PyPDF OCR", "NLP Chunking", "Groq LLaMA 3.3", "JSON Decks"],
      engineeringDecisions: "Enforced strict JSON schema validation in Groq system prompts for deterministic deck rendering.",
      tradeoffs: "Chunked large PDFs into 2,000-token overlapping segments rather than single large prompt injections.",
      challenges: "Extracting clean text from low-resolution scanned PDF slides.",
      lessonsLearned: "Few-shot prompt engineering is vital for consistent JSON array parsing in LLM endpoints.",
      stack: ["Python", "PyPDF OCR", "Groq LLaMA 3.3", "Streamlit"],
      githubUrl: "https://github.com/MeetChhugani/QuizLab"
    },
    {
      id: 3,
      minProg: 0.6,
      maxProg: 0.8,
      domain: "Database",
      domainColorHex: "#14b8a6",
      badgeStyle: "bg-teal-950/70 text-teal-300 border-teal-800/80",
      accentText: "text-teal-400",
      title: "Fintech Sentiment Analyzer",
      subtitle: "3,000+ Headlines, NSE/BSE Mapping, Groq Market Commentary",
      overview: "Automated news headline sentiment processing pipeline mapped against Indian equity markets.",
      problem: "Manual market sentiment tracking across thousands of financial news feeds is slow and subjective.",
      whyBuilt: "To automate daily financial news sentiment scoring and correlate headlines with market movement.",
      architectureNodes: ["Headline Streams", "Python Ingestion", "NSE/BSE Mapping", "Groq Commentary"],
      engineeringDecisions: "Built an automated daily ingestion script cleaning headline noise before feeding into LLM sentiment scoring.",
      tradeoffs: "Cached daily stock ticker mappings to minimize external financial API query rate limits.",
      challenges: "Handling ambiguous headline syntax and financial jargon.",
      lessonsLearned: "Domain-specific sentiment prompt templates outperform generic pre-trained sentiment dictionaries.",
      stack: ["Python", "NLP", "Groq API", "Pandas", "Streamlit"],
      githubUrl: "https://github.com/MeetChhugani/Fintech-Sentiment-Analyzer"
    },
    {
      id: 4,
      minProg: 0.8,
      maxProg: 1.0,
      domain: "Machine Learning",
      domainColorHex: "#a855f7",
      badgeStyle: "bg-purple-950/70 text-purple-300 border-purple-800/80",
      accentText: "text-purple-400",
      title: "Startup Success Predictor",
      subtitle: "~88K Records, XGBoost & Random Forest Classifier",
      overview: "Predictive longevity model evaluating early-stage venture funding viability.",
      problem: "Venture investors need objective statistical evaluation of funding round milestones and survival metrics.",
      whyBuilt: "To discover key operational and funding predictors that correlate with startup longevity.",
      architectureNodes: ["Crunchbase Data", "Pandas Cleaning", "Random Forest", "0.81 ROC-AUC"],
      engineeringDecisions: "Trained 5-fold cross-validated Random Forest & XGBoost ensembles on ~88,000 Crunchbase records.",
      tradeoffs: "Dropped sparse categorical columns with over 40% missing data to maintain high feature quality.",
      challenges: "Handling extreme variance in funding amounts across early-stage vs late-stage companies.",
      lessonsLearned: "Total funding rounds and time between investment series are stronger survival indicators than raw initial capital.",
      stack: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
      githubUrl: "https://github.com/MeetChhugani/Startup_Success_Predictor"
    }
  ];

  useEffect(() => {
    if (reduced) setShowPlainList(true);
  }, [reduced]);

  // Sync scroll progress in scroll mode
  useEffect(() => {
    if (isDriveMode || showPlainList) return;

    const unsubProgress = scrollYProgress.on("change", (latest) => {
      progressRef.current = latest;
      setEffectiveProgress(latest);
      manualDistanceRef.current = latest;
    });

    const unsubVel = smoothVelocity.on("change", (latest) => {
      velocityRef.current = Math.abs(latest);
    });

    return () => {
      unsubProgress();
      unsubVel();
    };
  }, [scrollYProgress, smoothVelocity, isDriveMode, showPlainList]);

  // Keyboard Event Listeners for Drive Mode
  useEffect(() => {
    if (!isDriveMode || showPlainList) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") isAcceleratingRef.current = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") isBrakingRef.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") isAcceleratingRef.current = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") isBrakingRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isDriveMode, showPlainList]);

  // Drive Mode Physics Loop
  useEffect(() => {
    if (!isDriveMode || showPlainList) return;

    const interval = setInterval(() => {
      let speed = manualSpeedRef.current;
      let dist = manualDistanceRef.current;

      if (isAcceleratingRef.current) {
        speed = Math.min(0.7, speed + 0.04);
      } else if (isBrakingRef.current) {
        speed = Math.max(-0.2, speed - 0.05);
      } else {
        if (speed > 0.05) speed = Math.max(0.05, speed - 0.02);
        if (speed < 0.05) speed = Math.min(0.05, speed + 0.02);
      }

      dist = dist + speed * 0.003;
      if (dist > 1.0) dist = 0;
      if (dist < 0) dist = 1.0;

      manualSpeedRef.current = speed;
      manualDistanceRef.current = dist;

      velocityRef.current = Math.abs(speed);
      setEffectiveProgress(dist);
      setManualDistance(dist);
      setManualSpeed(speed);
    }, 30);

    return () => clearInterval(interval);
  }, [isDriveMode, showPlainList]);

  const activeMilestone = milestones.find(
    (m) => effectiveProgress >= m.minProg && effectiveProgress <= m.maxProg
  ) || milestones[0];

  const activeColor = activeMilestone.domainColorHex;

  return (
    <div ref={containerRef} className="relative w-full bg-[#030304] select-none">
      
      {/* Detailed Checkpoint Engineering Dossier Lightbox Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="workspace-card rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-white/20 bg-[#06070b] shadow-2xl relative flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                aria-label="Close Engineering Dossier"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Dossier Header */}
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[0.65rem] font-bold px-3 py-1 rounded-full border ${selectedModalProject.badgeStyle}`}>
                  {selectedModalProject.domain.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-zinc-500">ENGINEERING DOSSIER 0{selectedModalProject.id + 1} / 05</span>
              </div>

              <div>
                <h3 className="font-title font-bold text-3xl text-zinc-100">{selectedModalProject.title}</h3>
                <span className={`font-mono text-xs block mt-1 font-semibold ${selectedModalProject.accentText}`}>
                  {selectedModalProject.subtitle}
                </span>
              </div>

              {/* Overview & Problem & Why Built */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-zinc-500 uppercase font-bold">PROBLEM STATEMENT</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-zinc-500 uppercase font-bold">WHY I BUILT IT</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.whyBuilt}</p>
                </div>
              </div>

              {/* Roadside Process Visualization Sequence */}
              <div>
                <span className="font-mono text-[0.6rem] text-zinc-500 uppercase block mb-2 font-bold">ENGINEERING PROCESS FLOW</span>
                <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs">
                  {selectedModalProject.architectureNodes.map((node, i) => (
                    <React.Fragment key={node}>
                      <span className={`px-2.5 py-1 rounded-lg border text-[0.7rem] font-bold ${
                        i === selectedModalProject.architectureNodes.length - 1 
                          ? `${selectedModalProject.badgeStyle}` 
                          : "bg-zinc-900 border-zinc-800 text-zinc-300"
                      }`}>
                        {node}
                      </span>
                      {i < selectedModalProject.architectureNodes.length - 1 && (
                        <span className="text-zinc-600 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Engineering Decisions & Trade-offs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col gap-1">
                  <span className={`font-mono text-[0.6rem] uppercase font-bold ${selectedModalProject.accentText}`}>KEY ENGINEERING DECISION</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.engineeringDecisions}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-amber-400 uppercase font-bold">ARCHITECTURAL TRADE-OFF</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.tradeoffs}</p>
                </div>
              </div>

              {/* Challenges & Lessons Learned */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-red-400 uppercase font-bold">PRIMARY CHALLENGE</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.challenges}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col gap-1">
                  <span className="font-mono text-[0.6rem] text-sky-400 uppercase font-bold">LESSONS LEARNED</span>
                  <p className="text-zinc-300 leading-relaxed">{selectedModalProject.lessonsLearned}</p>
                </div>
              </div>

              {/* Stack Badges */}
              <div>
                <span className="font-mono text-[0.6rem] text-zinc-500 uppercase block mb-2 font-bold">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-2">
                  {selectedModalProject.stack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 font-mono text-xs text-zinc-200 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Footer */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <a
                  href={selectedModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-500/20"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setSelectedModalProject(null)}
                  className="font-mono text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  Dismiss & Continue Journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAIN PROJECT LIST VIEW (Triggered by Skip Button or prefers-reduced-motion) */}
      {showPlainList ? (
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[0.6rem] text-emerald-400 tracking-[3px] uppercase">
                [PROJECT_INDEX // 5_FLAGSHIP_PROJECTS]
              </span>
              <h2 className="text-3xl font-bold font-title text-zinc-100 mt-1">
                Engineering Work Directory
              </h2>
            </div>

            {!reduced && (
              <button
                onClick={() => setShowPlainList(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 hover:text-emerald-400 font-mono text-xs font-bold cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Start Interactive 3D Journey</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {milestones.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedModalProject(item)}
                className="workspace-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:border-emerald-500/40 transition-colors group"
              >
                <div className="flex flex-col gap-2 max-w-2xl">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className={`font-bold px-2.5 py-0.5 rounded border ${item.badgeStyle}`}>
                      {item.domain.toUpperCase()}
                    </span>
                    <span className="text-zinc-500">PROJECT 0{item.id + 1}</span>
                  </div>

                  <h3 className="font-title font-bold text-xl text-zinc-100 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {item.overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[0.6rem] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 hover:text-emerald-400 font-mono text-xs font-semibold shrink-0"
                >
                  <FolderGit2 className="w-4 h-4 text-emerald-400" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3D ENGINEERING JOURNEY VIEWPORT */
        <div className="h-[320vh] w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10">
            
            {/* Minimal Elegant HUD Header */}
            <div className="relative z-20 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-[0.6rem] text-zinc-500 tracking-[3px] uppercase">
                  <Activity className={`w-3.5 h-3.5 ${activeMilestone.accentText}`} />
                  <span>[ENGINEERING_JOURNEY // PROJECT_DOSSIERS]</span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-zinc-100">
                    Engineering Journey
                  </h2>

                  {/* Start / Drive Toggle */}
                  <button
                    onClick={() => setIsDriveMode(!isDriveMode)}
                    className={`font-mono text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                      isDriveMode 
                        ? "bg-emerald-950/70 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]" 
                        : "bg-zinc-900/90 border-white/15 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40"
                    }`}
                  >
                    <Play className={`w-3.5 h-3.5 ${isDriveMode ? "fill-emerald-400 text-emerald-400" : ""}`} />
                    <span>{isDriveMode ? "MANUAL DRIVE ACTIVE" : "START JOURNEY 🏎️"}</span>
                  </button>
                </div>
              </div>

              {/* Minimal HUD Indicators & Persistent Skip Button */}
              <div className="flex items-center gap-3">
                
                {/* ALWAYS-VISIBLE SKIP BUTTON */}
                <button
                  onClick={() => setShowPlainList(true)}
                  className="flex items-center gap-1.5 bg-zinc-950/90 border border-white/20 hover:border-emerald-500/50 text-zinc-300 hover:text-white font-mono text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-all shadow-xl backdrop-blur-md"
                >
                  <span>Skip Journey → View Projects</span>
                </button>

                {/* Minimal HUD Info Card */}
                <div className="hidden md:flex bg-zinc-950/90 border border-white/10 rounded-2xl p-3 px-4 items-center gap-5 font-mono shadow-2xl backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-[0.55rem] text-zinc-500 uppercase tracking-wider">PROGRESS</span>
                    <span className="text-xs font-bold text-zinc-200">
                      {activeMilestone.id + 1} / 05 Projects Explored
                    </span>
                  </div>
                  <div className="w-px h-7 bg-zinc-800" />
                  <div className="flex flex-col">
                    <span className="text-[0.55rem] text-zinc-500 uppercase tracking-wider">DOMAIN</span>
                    <span className={`text-xs font-bold ${activeMilestone.accentText}`}>
                      {activeMilestone.domain}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* 3D Canvas Scene */}
            <div className="absolute inset-0 z-0">
              <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "low-power" }}
                camera={{ position: [0, 2.2, 5.5], fov: 45 }}
                frameloop={reduced ? "never" : "always"}
              >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 8, 3]} intensity={1.2} />
                <pointLight position={[0, 2, 2]} intensity={2} color={activeColor} />
                
                <Suspense fallback={null}>
                  <JourneyEnvironment 
                    velocityRef={velocityRef} 
                    activeColor={activeColor}
                    reduced={reduced}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Roadside Process Visualization Floating Bar (Engineering Storytelling) */}
            <div className="relative z-20 max-w-xl mx-auto w-full pointer-events-none mb-4">
              <div className="bg-zinc-950/90 border border-white/10 rounded-2xl p-3 px-4 flex items-center justify-between gap-2 font-mono text-[0.68rem] shadow-2xl backdrop-blur-md">
                <span className="text-zinc-500 uppercase text-[0.55rem] font-bold">PROCESS FLOW:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeMilestone.architectureNodes.map((node, i) => (
                    <React.Fragment key={node}>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        i === activeMilestone.architectureNodes.length - 1 
                          ? `${activeMilestone.accentText} bg-zinc-900 border border-white/10` 
                          : "text-zinc-400"
                      }`}>
                        {node}
                      </span>
                      {i < activeMilestone.architectureNodes.length - 1 && (
                        <span className="text-zinc-600">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Checkpoint Dossier Card Overlay (On Screen Right/Center) */}
            <div className="relative z-20 max-w-md ml-auto w-full my-auto pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.id}
                  onClick={() => setSelectedModalProject(activeMilestone)}
                  initial={{ opacity: 0, x: 30, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="workspace-card rounded-2xl p-6 border border-white/15 bg-[#05060a]/90 backdrop-blur-md shadow-2xl flex flex-col gap-3 cursor-pointer hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-[0.62rem] font-bold px-3 py-1 rounded-full border ${activeMilestone.badgeStyle}`}>
                      {activeMilestone.domain.toUpperCase()}
                    </span>
                    <span className="font-mono text-[0.6rem] text-emerald-400 font-bold">
                      OPEN DOSSIER ↗
                    </span>
                  </div>

                  <div>
                    <h3 className="font-title font-bold text-xl text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      {activeMilestone.title}
                    </h3>
                    <span className={`font-mono text-[0.7rem] block mt-0.5 font-semibold ${activeMilestone.accentText}`}>
                      {activeMilestone.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {activeMilestone.overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activeMilestone.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[0.6rem] text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[0.65rem]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5" /> READ FULL CASE FILE
                    </span>

                    <span className="text-zinc-500">
                      {isDriveMode ? "USE PEDALS / KEYS" : "SCROLL TO TRAVERSE ↓"}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* On-Screen Touch / Mouse Pedal Controls (If Manual Drive Active) */}
            {isDriveMode ? (
              <div className="relative z-30 flex items-center justify-center gap-4 bg-zinc-950/95 border border-white/15 p-3 rounded-2xl shadow-2xl backdrop-blur-md max-w-md mx-auto w-full">
                <button
                  onMouseDown={() => { isAcceleratingRef.current = true; }}
                  onMouseUp={() => { isAcceleratingRef.current = false; }}
                  onTouchStart={() => { isAcceleratingRef.current = true; }}
                  onTouchEnd={() => { isAcceleratingRef.current = false; }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all select-none"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>ACCELERATE 🏎️</span>
                </button>

                <button
                  onMouseDown={() => { isBrakingRef.current = true; }}
                  onMouseUp={() => { isBrakingRef.current = false; }}
                  onTouchStart={() => { isBrakingRef.current = true; }}
                  onTouchEnd={() => { isBrakingRef.current = false; }}
                  className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 hover:text-red-300 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all select-none"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>BRAKE 🛑</span>
                </button>

                <button
                  onClick={() => setIsDriveMode(false)}
                  className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white font-mono text-xs font-bold cursor-pointer"
                  title="Exit Drive Mode"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Minimal Progress Tracker Line */
              <div className="relative z-20 w-full bg-zinc-900/80 border border-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, Math.max(0, effectiveProgress * 100))}%`,
                    backgroundColor: activeColor
                  }}
                />
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
