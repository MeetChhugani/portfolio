"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { RoleType } from "@/data/contentByRole";

interface RoleTogglePillProps {
  className?: string;
}

export const RoleTogglePill: React.FC<RoleTogglePillProps> = ({ 
  className = ""
}) => {
  const { role, setRole } = useRole();

  const options: { id: RoleType; label: string; emoji: string }[] = [
    {
      id: "backendDev",
      label: "Python Backend Developer",
      emoji: "🐍",
    },
    {
      id: "dataScience",
      label: "AI / ML Engineer",
      emoji: "🤖",
    },
  ];

  const activeColor = role === "backendDev" ? "text-emerald-300" : "text-cyan-300";
  const glowBorder = role === "backendDev" ? "border-emerald-500/40" : "border-cyan-500/40";

  return (
    <div className={`relative flex items-center bg-[#07070a]/90 border border-zinc-800/90 rounded-xl p-1 font-mono text-[0.68rem] tracking-wider select-none shadow-xl ${className}`}>
      {options.map((opt) => {
        const isActive = role === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setRole(opt.id)}
            className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              isActive ? `${activeColor} font-bold` : "text-zinc-400 hover:text-zinc-200"
            }`}
            aria-label={`Switch specialization to ${opt.label}`}
          >
            <span>{opt.emoji}</span>
            <span className="whitespace-nowrap">{opt.label}</span>

            {isActive && (
              <motion.div
                layoutId="activeRoleSegment"
                className={`absolute inset-0 z-[-1] rounded-lg bg-zinc-900 border ${glowBorder} shadow-[0_0_12px_rgba(2,132,199,0.15)]`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
