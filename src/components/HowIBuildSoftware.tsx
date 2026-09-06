"use client";

import React, { useState, useCallback } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Node, 
  Edge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { 
  ArrowUpRight,
  Layers,
  FolderGit2
} from "lucide-react";

interface SystemNodeData {
  isSelected: boolean;
  activeBorder: string;
  activeBg: string;
  statusPing: string;
  category: string;
  label: string;
  tech: string;
}

export const SystemNodeCard = ({ data }: { data: SystemNodeData }) => {
  const isSelected = data.isSelected;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 select-none min-w-[200px] font-mono shadow-2xl ${
      isSelected 
        ? `${data.activeBorder} ${data.activeBg} scale-105 shadow-[0_0_20px_rgba(16,185,129,0.2)]` 
        : "border-zinc-800 bg-[#0a0c12]/90 hover:border-zinc-700 text-zinc-300"
    }`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[0.55rem] font-bold text-zinc-500 tracking-wider uppercase">{data.category}</span>
        <span className={`w-2 h-2 rounded-full ${isSelected ? data.statusPing : "bg-zinc-700"}`} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-zinc-200 font-bold text-xs">{data.label}</span>
      </div>
      <span className="text-[0.62rem] text-zinc-400 block mt-1 leading-snug">{data.tech}</span>
    </div>
  );
};

export const HowIBuildSoftware: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("api_gateway");

  // Node details dictionary with real production code evidence
  const nodeDetails: Record<string, {
    title: string;
    category: string;
    tech: string;
    description: string;
    evidenceRepo: string;
    evidenceRepoUrl: string;
    keyDecisions: string[];
    connections: string[];
  }> = {
    "client_layer": {
      title: "Client & UI Gateway Layer",
      category: "PRESENTATION LAYER",
      tech: "Next.js 15, TypeScript, Streamlit, Tailwind v4",
      description: "Responsive user interface rendering telemetry dashboards, case studies, and interactive stream controls.",
      evidenceRepo: "MeetChhugani/portfolio",
      evidenceRepoUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
      keyDecisions: [
        "Client-side state hydration for sub-second role context switching",
        "Accessible, trap-free keyboard focus loops on all controls"
      ],
      connections: ["api_gateway", "ml_inference"]
    },
    "api_gateway": {
      title: "FastAPI Async REST Gateway",
      category: "BACKEND API LAYER",
      tech: "FastAPI, Python 3.11, Pydantic v2, Clean Architecture",
      description: "High-concurrency microservice entrypoint providing 100+ REST endpoints with strict request payload validation.",
      evidenceRepo: "AI BusinessOS (100+ REST APIs)",
      evidenceRepoUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
      keyDecisions: [
        "FastAPI async event loop to handle concurrent reporting demands",
        "Clean Architecture separation (Domain → Service → Repository)"
      ],
      connections: ["auth_security", "db_persistence", "ai_llm_layer"]
    },
    "auth_security": {
      title: "Redis Cache & Token Rotation",
      category: "SECURITY & CACHING",
      tech: "Redis 7, JWT Blacklist, 7-Role RBAC",
      description: "Sub-millisecond token verification, rate-limiting, and session cache preventing database load spikes.",
      evidenceRepo: "AI BusinessOS Auth Module",
      evidenceRepoUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
      keyDecisions: [
        "Redis token rotation for 7-tier role-based authorization",
        "In-memory blacklisting to immediately revoke compromised JWT tokens"
      ],
      connections: ["db_persistence"]
    },
    "db_persistence": {
      title: "PostgreSQL 16 Persistence",
      category: "RELATIONAL PERSISTENCE",
      tech: "PostgreSQL 16, SQLAlchemy 2, Alembic Migrations",
      description: "ACID-compliant relational database modeling core business entities, migration history, and operational logs.",
      evidenceRepo: "AI BusinessOS Database Schema",
      evidenceRepoUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
      keyDecisions: [
        "SQLAlchemy 2 async engine with connection pooling",
        "Strict Alembic schema versioning for zero-downtime evolution"
      ],
      connections: ["devops_container"]
    },
    "ml_inference": {
      title: "XGBoost & SHAP Explainability Engine",
      category: "APPLIED MACHINE LEARNING",
      tech: "XGBoost, SHAP, SMOTE, Scikit-learn",
      description: "Explainable binary classification engine (0.77 ROC-AUC) calculating feature importance waterfall values.",
      evidenceRepo: "Employee Risk Radar",
      evidenceRepoUrl: "https://github.com/MeetChhugani/Employee_Attrition_Predictor",
      keyDecisions: [
        "SMOTE synthetic oversampling to balance minority attrition data",
        "Local SHAP value extraction to explain prediction drivers"
      ],
      connections: ["ai_llm_layer"]
    },
    "ai_llm_layer": {
      title: "Groq LLaMA 3.3 RAG Copilot",
      category: "ARTIFICIAL INTELLIGENCE",
      tech: "Groq LLaMA 3.3 70B, PyPDF OCR, RAG Pipeline",
      description: "Low-latency LLM inference engine executing document OCR extraction and multi-turn conversational responses.",
      evidenceRepo: "QuizLab Study Decks",
      evidenceRepoUrl: "https://github.com/MeetChhugani/QuizLab",
      keyDecisions: [
        "Strict JSON schema system prompts for deterministic parsing",
        "2,000-token overlapping PDF text chunking"
      ],
      connections: ["devops_container"]
    },
    "devops_container": {
      title: "Docker Containerization & Ops",
      category: "INFRASTRUCTURE & DEPLOY",
      tech: "Docker, Docker Compose, Git, Vercel",
      description: "Multi-stage container builds orchestrating web, backend, and cache containers in reproducible environments.",
      evidenceRepo: "AI BusinessOS Docker Compose",
      evidenceRepoUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
      keyDecisions: [
        "Multi-stage Dockerfile builds reducing image footprint",
        "Isolated virtual networks connecting Redis, Postgres, and FastAPI"
      ],
      connections: []
    }
  };

  const selectedData = nodeDetails[selectedNodeId] || nodeDetails["api_gateway"];

  // React Flow Nodes
  const initialNodes: Node[] = [
    {
      id: "client_layer",
      position: { x: 50, y: 140 },
      data: { 
        label: "Client Gateway", 
        category: "PRESENTATION", 
        tech: "Next.js / Streamlit",
        isSelected: selectedNodeId === "client_layer",
        activeBorder: "border-sky-500",
        activeBg: "bg-sky-950/40",
        statusPing: "bg-sky-400"
      },
      type: "default"
    },
    {
      id: "api_gateway",
      position: { x: 290, y: 140 },
      data: { 
        label: "FastAPI REST Service", 
        category: "BACKEND API", 
        tech: "100+ Endpoints / Async",
        isSelected: selectedNodeId === "api_gateway",
        activeBorder: "border-emerald-500",
        activeBg: "bg-emerald-950/40",
        statusPing: "bg-emerald-400"
      },
      type: "default"
    },
    {
      id: "auth_security",
      position: { x: 550, y: 40 },
      data: { 
        label: "Redis Cache & Auth", 
        category: "SECURITY", 
        tech: "JWT / 7-Role RBAC",
        isSelected: selectedNodeId === "auth_security",
        activeBorder: "border-amber-500",
        activeBg: "bg-amber-950/40",
        statusPing: "bg-amber-400"
      },
      type: "default"
    },
    {
      id: "db_persistence",
      position: { x: 550, y: 240 },
      data: { 
        label: "PostgreSQL 16", 
        category: "PERSISTENCE", 
        tech: "SQLAlchemy 2 / Alembic",
        isSelected: selectedNodeId === "db_persistence",
        activeBorder: "border-teal-500",
        activeBg: "bg-teal-950/40",
        statusPing: "bg-teal-400"
      },
      type: "default"
    },
    {
      id: "ml_inference",
      position: { x: 290, y: 340 },
      data: { 
        label: "XGBoost & SHAP", 
        category: "APPLIED ML", 
        tech: "0.77 ROC-AUC / SMOTE",
        isSelected: selectedNodeId === "ml_inference",
        activeBorder: "border-purple-500",
        activeBg: "bg-purple-950/40",
        statusPing: "bg-purple-400"
      },
      type: "default"
    },
    {
      id: "ai_llm_layer",
      position: { x: 550, y: 440 },
      data: { 
        label: "Groq LLaMA 3.3", 
        category: "AI LAYER", 
        tech: "PyPDF OCR / RAG",
        isSelected: selectedNodeId === "ai_llm_layer",
        activeBorder: "border-cyan-500",
        activeBg: "bg-cyan-950/40",
        statusPing: "bg-cyan-400"
      },
      type: "default"
    },
    {
      id: "devops_container",
      position: { x: 800, y: 240 },
      data: { 
        label: "Docker Compose", 
        category: "INFRASTRUCTURE", 
        tech: "Multi-stage Builds",
        isSelected: selectedNodeId === "devops_container",
        activeBorder: "border-emerald-500",
        activeBg: "bg-emerald-950/40",
        statusPing: "bg-emerald-400"
      },
      type: "default"
    }
  ];

  // React Flow Edges
  const initialEdges: Edge[] = [
    { id: "e1", source: "client_layer", target: "api_gateway", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
    { id: "e2", source: "api_gateway", target: "auth_security", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 } },
    { id: "e3", source: "api_gateway", target: "db_persistence", animated: true, style: { stroke: "#14b8a6", strokeWidth: 2 } },
    { id: "e4", source: "client_layer", target: "ml_inference", animated: true, style: { stroke: "#a855f7", strokeWidth: 2 } },
    { id: "e5", source: "ml_inference", target: "ai_llm_layer", animated: true, style: { stroke: "#06b6d4", strokeWidth: 2 } },
    { id: "e6", source: "auth_security", target: "devops_container", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
    { id: "e7", source: "db_persistence", target: "devops_container", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
    { id: "e8", source: "ai_llm_layer", target: "devops_container", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } }
  ];

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  return (
    <section id="skills" className="w-full bg-[#0d0e12] border-y border-zinc-800/80 py-16 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.6rem] text-emerald-400 tracking-[3px] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>[SIGNATURE_ARCHITECTURE // INTERACTIVE_STACK_DEPENDENCY_MAP]</span>
            </div>
            <h2 className="text-3xl font-bold font-title text-zinc-100 mt-1">
              Production Stack Architecture
            </h2>
          </div>

          <span className="font-mono text-xs text-zinc-400">
            CLICK ANY NODE TO INSPECT LIVE ARCHITECTURAL DECISIONS & CODE EVIDENCE
          </span>
        </div>

        {/* Main Content Grid: React Flow Canvas (Left) + Telemetry Dossier Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* React Flow Graph Container */}
          <div className="lg:col-span-8 bg-[#08090e] border border-zinc-800 rounded-2xl h-[520px] relative overflow-hidden shadow-2xl">
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              onNodeClick={onNodeClick}
              fitView
              attributionPosition="bottom-right"
              nodesDraggable={false}
              zoomOnScroll={false}
            >
              <Background color="#1e293b" gap={20} size={1} />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>

          {/* Telemetry Dossier Details Panel */}
          <div className="lg:col-span-4 bg-[#08090e] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 h-[520px] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <span className="font-mono text-[0.6rem] text-emerald-400 uppercase tracking-widest font-bold">
                {selectedData.category}
              </span>
              <span className="font-mono text-[0.55rem] text-zinc-500 uppercase">NODE: {selectedNodeId}</span>
            </div>

            <div>
              <h3 className="font-title font-bold text-xl text-zinc-100">{selectedData.title}</h3>
              <span className="font-mono text-xs text-sky-400 block mt-1 font-semibold">{selectedData.tech}</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {selectedData.description}
            </p>

            {/* Key Engineering Decisions */}
            <div className="flex flex-col gap-2 pt-2 border-t border-zinc-850">
              <span className="font-mono text-[0.6rem] text-zinc-500 uppercase font-bold">KEY ENGINEERING DECISIONS</span>
              <div className="flex flex-col gap-1.5 font-mono text-[0.68rem]">
                {selectedData.keyDecisions.map((dec, i) => (
                  <div key={i} className="flex items-start gap-2 text-zinc-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{dec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Repository Evidence Link */}
            <div className="mt-auto pt-4 border-t border-zinc-850 flex justify-between items-center">
              <a
                href={selectedData.evidenceRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 font-mono text-xs font-semibold transition-colors"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedData.evidenceRepo}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HowIBuildSoftware;
