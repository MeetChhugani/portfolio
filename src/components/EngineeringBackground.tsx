"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRole } from "@/context/RoleContext";

// Ghost annotations that drift across the canvas at very low opacity
const GHOST_ANNOTATIONS = [
  "// NODE_INIT",
  "[SYS: 0x1A4F]",
  "LATENCY: 2ms",
  "REF_CLK: 100MHz",
  "// PIPELINE_OK",
  "STATUS: NOMINAL",
  "PKT_DROP: 0%",
  "// BUILD_PASS",
  "ASYNC_QUEUE: 0",
  "[ARCH: v2.6]",
  "DB_CONN: ALIVE",
  "// INFERENCE_OK",
  "UPTIME: 99.97%",
  "MODEL: LOADED",
];

// Fixed topology node positions (% of viewport)
const TOPOLOGY_NODES = [
  { x: 8, y: 15 },
  { x: 22, y: 42 },
  { x: 38, y: 8 },
  { x: 55, y: 68 },
  { x: 72, y: 22 },
  { x: 85, y: 55 },
  { x: 15, y: 78 },
  { x: 48, y: 35 },
  { x: 65, y: 82 },
  { x: 92, y: 38 },
  { x: 30, y: 60 },
  { x: 78, y: 10 },
];

// Topology connection pairs (indices into TOPOLOGY_NODES)
const TOPOLOGY_EDGES = [
  [0, 1], [1, 2], [2, 7], [7, 4], [4, 9], [9, 5],
  [1, 6], [6, 10], [10, 3], [3, 5], [7, 3], [4, 11],
];

const EngineeringBackground: React.FC = () => {
  const { hoveredDomain } = useRole();
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas draw loop — topology nodes + edges
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      timeRef.current += 0.003;
      const t = timeRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Convert % positions to px
      const nodes = TOPOLOGY_NODES.map(n => ({
        x: (n.x / 100) * W,
        y: (n.y / 100) * H,
      }));

      // Draw edges
      TOPOLOGY_EDGES.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.028)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes with pulse
      nodes.forEach((node, i) => {
        const pulse = Math.sin(t * 1.2 + i * 0.8) * 0.5 + 0.5; // 0..1
        const opacity = 0.08 + pulse * 0.18;
        const radius = 2 + pulse * 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Domain-based ambient spotlight color
  const domainSpotlightMap: Record<string, string> = {
    backend: "rgba(52, 211, 153, 0.04)",
    ai: "rgba(34, 211, 238, 0.04)",
    ml: "rgba(167, 139, 250, 0.04)",
    deploy: "rgba(251, 191, 36, 0.04)",
    data: "rgba(45, 212, 191, 0.04)",
    arch: "rgba(129, 140, 248, 0.04)",
  };
  const spotlightColor = hoveredDomain
    ? domainSpotlightMap[hoveredDomain]
    : "rgba(255, 255, 255, 0.025)";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden w-full h-full">
      {/* Base color */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Topology dot grid */}
      <div className="absolute inset-0 bg-topology-dots opacity-100" />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-grid-fine opacity-60" />

      {/* Animated canvas — topology nodes + edges */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Ghost annotations — drifting at very low opacity */}
      {GHOST_ANNOTATIONS.map((label, i) => (
        <div
          key={i}
          className="absolute font-mono text-[0.55rem] text-white pointer-events-none select-none"
          style={{
            left: `${((i * 137.5) % 90) + 2}%`,
            top: `${((i * 97.3 + 10) % 85) + 5}%`,
            animation: `annotation-drift ${18 + (i % 7) * 4}s ease-in-out ${(i * 2.3) % 12}s infinite alternate`,
          }}
        >
          {label}
        </div>
      ))}

      {/* Mouse cursor spotlight — semantic domain color */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Soft vignette — edges fade to pure black */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,5,7,0.6) 100%)",
        }}
      />

      {/* Top + bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507] opacity-50 pointer-events-none" />
    </div>
  );
};

export default EngineeringBackground;
