"use client";

import { useRole } from "@/context/RoleContext";
import { useEffect, useRef, type CSSProperties } from "react";

const colors: Record<string, string> = {
  backend: "rgba(212,255,36,.07)", ai: "rgba(77,141,255,.09)",
  ml: "rgba(138,166,255,.07)", data: "rgba(91,209,255,.065)", deploy: "rgba(199,232,92,.06)",
};

/** Static CSS background: no canvas loop or mouse-driven React state. */
export default function EngineeringBackground() {
  const { hoveredDomain } = useRole();
  const background = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pointer = useRef({ x: 50, y: 22 });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      pointer.current = { x: event.clientX / window.innerWidth * 100, y: event.clientY / window.innerHeight * 100 };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        background.current?.style.setProperty("--spotlight-x", `${pointer.current.x}%`);
        background.current?.style.setProperty("--spotlight-y", `${pointer.current.y}%`);
        frame.current = undefined;
      });
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => { window.removeEventListener("pointermove", update); if (frame.current) cancelAnimationFrame(frame.current); };
  }, []);

  return <div ref={background} aria-hidden="true" className="portfolio-background" style={{ "--ambient-accent": colors[hoveredDomain || ""] || "rgba(127,164,255,.04)" } as CSSProperties} />;
}
