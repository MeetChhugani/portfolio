"use client";

import React from "react";
import { Cpu } from "lucide-react";

interface IdentityBadgeProps {
  className?: string;
}

export const RoleTogglePill: React.FC<IdentityBadgeProps> = ({ 
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-[0.68rem] tracking-wider select-none px-3 py-1.5 rounded-lg bg-[#09090d]/90 border border-emerald-900/50 text-emerald-300 ${className}`}>
      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
      <span className="font-bold uppercase tracking-widest text-zinc-100">AI / ML ENGINEER</span>
      <span className="text-zinc-600 font-normal">|</span>
      <span className="text-zinc-400 text-[0.62rem]">Python · ML · GenAI · RAG</span>
    </div>
  );
};
