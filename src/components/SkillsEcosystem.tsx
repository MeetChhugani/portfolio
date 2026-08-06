"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRole } from "@/context/RoleContext";

interface DependencyNode {
  id: string;
  name: string;
  category: string;
  desc: string;
  x: number;
  y: number;
  roleSpecific?: "backend" | "ml" | "all";
}

interface TracePath {
  from: string;
  to: string;
}

const SkillsEcosystem: React.FC = () => {
  const { role, hoveredTech, setHoveredTech } = useRole();

  // Positions on an 800x400 schematic grid
  const nodes: DependencyNode[] = [
    // Column 1: Foundations
    { id: "python", name: "Python 3.11 Runtime", category: "Language", desc: "Core async I/O, micro-services, and modeling runtime.", x: 80, y: 70, roleSpecific: "all" },
    { id: "sql", name: "PostgreSQL & SQL", category: "Data Layer", desc: "Schema design, relational algebra, indices, and querying.", x: 80, y: 200, roleSpecific: "all" },
    { id: "typescript", name: "TypeScript / JS", category: "Frontend Integration", desc: "Typings, interactive dashboards, dynamic UI components.", x: 80, y: 330, roleSpecific: "all" },

    // Column 2: Engines & Libraries
    { id: "pandas", name: "Pandas & NumPy", category: "Data Engine", desc: "Vector transformation arrays, matrices, and tabular ETL.", x: 290, y: 60, roleSpecific: "all" },
    { id: "scikit", name: "Scikit-Learn", category: "Machine Learning", desc: "XGBoost, ensembles, SMOTE imbalance, cross-validation.", x: 290, y: 160, roleSpecific: "ml" },
    { id: "tensorflow", name: "TensorFlow Deep Learning", category: "Neural Networks", desc: "Dense networks, sequential model layers, and embeddings.", x: 290, y: 270, roleSpecific: "ml" },
    { id: "sqlalchemy", name: "SQLAlchemy & Alembic", category: "ORM Mapping", desc: "Object-relational mapping, async execution, migrations.", x: 290, y: 340, roleSpecific: "backend" },

    // Column 3: Frameworks & Hubs
    { id: "fastapi", name: "FastAPI Async API", category: "REST Gateway", desc: "Pydantic validation, low-latency microservice serving.", x: 500, y: 110, roleSpecific: "all" },
    { id: "django", name: "Django Framework", category: "Web Services", desc: "Robust database endpoints, admin panels, auth modules.", x: 500, y: 210, roleSpecific: "backend" },
    { id: "streamlit", name: "Streamlit Service", category: "Inference UI", desc: "Fast UI prototypes, dashboard bindings for ML outputs.", x: 500, y: 310, roleSpecific: "all" },

    // Column 4: Infrastructure & Clouds
    { id: "docker", name: "Docker Containerization", category: "Infrastructure", desc: "Multi-stage production build isolation, compose mesh.", x: 710, y: 90, roleSpecific: "all" },
    { id: "azure", name: "Azure AI & Cloud Services", category: "Cloud Engine", desc: "Azure storage, VM scale networks, and cognitive services.", x: 710, y: 200, roleSpecific: "all" },
    { id: "plotly", name: "Plotly & Reporting", category: "Analytics Dashboard", desc: "Interactive dashboards, real-time telemetry plots.", x: 710, y: 310, roleSpecific: "all" }
  ];

  const connections: TracePath[] = [
    // Column 1 -> 2
    { from: "python", to: "pandas" },
    { from: "python", to: "scikit" },
    { from: "python", to: "tensorflow" },
    { from: "sql", to: "sqlalchemy" },
    { from: "sql", to: "scikit" },
    
    // Column 2 -> 3
    { from: "pandas", to: "fastapi" },
    { from: "scikit", to: "streamlit" },
    { from: "scikit", to: "fastapi" },
    { from: "tensorflow", to: "fastapi" },
    { from: "sqlalchemy", to: "django" },
    { from: "sqlalchemy", to: "fastapi" },
    { from: "typescript", to: "fastapi" },

    // Column 3 -> 4
    { from: "fastapi", to: "docker" },
    { from: "fastapi", to: "azure" },
    { from: "streamlit", to: "plotly" },
    { from: "django", to: "docker" }
  ];

  // Filters based on role specialization
  const activeNodes = nodes.filter(n => {
    if (n.roleSpecific === "all") return true;
    if (role === "backendDev") return n.roleSpecific === "backend";
    if (role === "dataScience") return n.roleSpecific === "ml";
    return true;
  });

  const activeNodeIds = activeNodes.map(n => n.id);

  const activeConnections = connections.filter(
    c => activeNodeIds.includes(c.from) && activeNodeIds.includes(c.to)
  );

  // Check if connection involves hovered node
  const isConnectionHighlighted = (c: TracePath) => {
    if (!hoveredTech) return false;
    return c.from === hoveredTech || c.to === hoveredTech;
  };

  // Find node details by id
  const selectedNode = activeNodes.find(n => n.id === hoveredTech) || activeNodes.find(n => n.id === "python") || activeNodes[0];

  const primaryAccent = role === "backendDev" ? "sky" : role === "dataScience" ? "purple" : "emerald";
  const glowClass = role === "backendDev" ? "shadow-sky-500/20 border-sky-500" : role === "dataScience" ? "shadow-purple-500/20 border-purple-500" : "shadow-emerald-500/20 border-emerald-500";

  return (
    <div className="w-full flex flex-col gap-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">
        
        {/* SVG schematic representation (col-8) */}
        <div className="lg:col-span-8 bg-[#07070a]/90 border border-zinc-900 rounded-2xl p-4 relative overflow-hidden flex items-center justify-center min-h-[380px]">
          
          {/* Subtle grid pattern inside schematic box */}
          <div className="absolute inset-0 bg-grid-blueprint-dots opacity-40 pointer-events-none" />

          <svg viewBox="0 0 800 400" className="w-full h-auto relative z-10 font-mono">
            {/* 1. Draw connecting traces (lines) */}
            <g>
              {activeConnections.map((conn, idx) => {
                const fromNode = activeNodes.find(n => n.id === conn.from);
                const toNode = activeNodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const isHighlighted = isConnectionHighlighted(conn);

                // Right angle trace paths for a cleaner diagram look
                const midX = (fromNode.x + toNode.x) / 2;
                const pathData = `M ${fromNode.x} ${fromNode.y} L ${midX} ${fromNode.y} L ${midX} ${toNode.y} L ${toNode.x} ${toNode.y}`;

                return (
                  <g key={`trace-${idx}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isHighlighted ? (primaryAccent === "sky" ? "#38bdf8" : primaryAccent === "purple" ? "#c084fc" : "#34d399") : "rgba(255, 255, 255, 0.05)"}
                      strokeWidth={isHighlighted ? 1.5 : 1}
                      className="transition-colors duration-300"
                    />
                    {isHighlighted && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={primaryAccent === "sky" ? "#0284c7" : primaryAccent === "purple" ? "#a855f7" : "#10b981"}
                        strokeWidth={2}
                        strokeDasharray="8 20"
                        className="animate-[dash_1.5s_linear_infinite]"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* 2. Draw nodes */}
            <g>
              {activeNodes.map((node) => {
                const isHovered = hoveredTech === node.id;
                const isConnected = hoveredTech
                  ? activeConnections.some(
                      c => (c.from === hoveredTech && c.to === node.id) || (c.to === hoveredTech && c.from === node.id)
                    )
                  : false;

                const nodeAccent = isHovered 
                  ? (primaryAccent === "sky" ? "fill-[#0c1f2e] stroke-[#38bdf8]" : primaryAccent === "purple" ? "fill-[#240a2b] stroke-[#c084fc]" : "fill-[#09251d] stroke-[#34d399]")
                  : isConnected
                  ? (primaryAccent === "sky" ? "fill-[#07131c] stroke-[#0284c7]" : primaryAccent === "purple" ? "fill-[#14061a] stroke-[#a855f7]" : "fill-[#071b14] stroke-[#10b981]")
                  : "fill-[#0b0b0d] stroke-zinc-800";

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredTech(node.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="cursor-pointer group"
                    data-cursor-label={`skill: ${node.id}`}
                  >
                    {/* Glowing shadow under hovered node */}
                    {isHovered && (
                      <rect
                        x={node.x - 65}
                        y={node.y - 20}
                        width={130}
                        height={40}
                        rx={6}
                        fill={primaryAccent === "sky" ? "#38bdf8" : primaryAccent === "purple" ? "#c084fc" : "#34d399"}
                        opacity={0.12}
                        className="blur-md"
                      />
                    )}

                    {/* Outer card shell */}
                    <rect
                      x={node.x - 65}
                      y={node.y - 20}
                      width={130}
                      height={40}
                      rx={6}
                      className={`${nodeAccent} transition-all duration-300`}
                      strokeWidth={isHovered ? 1.5 : 1}
                    />

                    {/* Node text */}
                    <text
                      x={node.x}
                      y={node.y - 2}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isHovered ? "#fff" : "#d4d4d8"}
                      className="transition-colors duration-300 select-none"
                    >
                      {node.name.length > 20 ? node.name.slice(0, 18) + ".." : node.name}
                    </text>

                    {/* Node category label */}
                    <text
                      x={node.x}
                      y={node.y + 10}
                      textAnchor="middle"
                      fontSize="7"
                      fill={isHovered ? (primaryAccent === "sky" ? "#38bdf8" : primaryAccent === "purple" ? "#c084fc" : "#34d399") : "#52525b"}
                      className="transition-colors duration-300 tracking-wider select-none"
                    >
                      {node.category.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Text Details & Spec panel (col-4) */}
        <div className="lg:col-span-4 bg-[#07070a]/90 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between select-none">
          {selectedNode ? (
            <div className="flex flex-col h-full justify-between gap-6">
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase block">
                  SYSTEM_SPEC // NODE_DETAILS
                </span>
                
                <h3 className="text-xl font-bold font-title text-zinc-100 mt-2 flex items-center gap-2">
                  {selectedNode.name}
                  <span 
                    className={`w-2 h-2 rounded-full inline-block animate-pulse`} 
                    style={{
                      backgroundColor: primaryAccent === "sky" ? "#38bdf8" : primaryAccent === "purple" ? "#c084fc" : "#34d399",
                      boxShadow: `0 0 8px ${primaryAccent === "sky" ? "#38bdf8" : primaryAccent === "purple" ? "#c084fc" : "#34d399"}`
                    }}
                  />
                </h3>
                
                <div className="mt-4 bg-[#0b0b0d] border border-zinc-850 rounded-xl p-3.5 flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-mono text-zinc-500 uppercase tracking-wider block">
                    FUNCTIONAL ROLE
                  </span>
                  <p className="text-[0.75rem] text-zinc-300 leading-relaxed font-normal">
                    {selectedNode.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-4 flex flex-col gap-2 font-mono text-[0.6rem] text-zinc-500">
                <div className="flex justify-between">
                  <span>TARGET_NODE_ID:</span>
                  <span className="text-zinc-300 font-semibold">{selectedNode.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>INTERFACE_TYPE:</span>
                  <span className="text-zinc-300 font-semibold">{selectedNode.category.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>DEPENDENCIES:</span>
                  <span className="text-zinc-300 font-semibold">
                    {activeConnections.filter(c => c.to === selectedNode.id).length} IN / {activeConnections.filter(c => c.from === selectedNode.id).length} OUT
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-zinc-500 italic">
              Hover over schematic node to map system.
            </div>
          )}
        </div>

      </div>

      {/* CSS injection for drawing connection trace animations */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -28;
          }
        }
      `}</style>

    </div>
  );
};

export default SkillsEcosystem;
