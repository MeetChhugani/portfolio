"use client";

import { useRole } from "@/context/RoleContext";
import type { CSSProperties } from "react";

const colors: Record<string, string> = {
  backend: "rgba(52,211,153,.055)", ai: "rgba(34,211,238,.055)",
  ml: "rgba(167,139,250,.055)", data: "rgba(45,212,191,.055)", deploy: "rgba(251,191,36,.055)",
};

/** Static CSS background: no canvas loop or mouse-driven React state. */
export default function EngineeringBackground() {
  const { hoveredDomain } = useRole();
  return <div aria-hidden="true" className="portfolio-background" style={{ "--ambient-accent": colors[hoveredDomain || ""] || "rgba(255,255,255,.025)" } as CSSProperties} />;
}
