"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { getDomainColors } from "@/components/TechTag";

const DOMAIN_CURSOR_COLORS: Record<string, string> = {
  backend: "#34d399",
  ai:      "#22d3ee",
  ml:      "#a78bfa",
  deploy:  "#fbbf24",
  data:    "#2dd4bf",
  arch:    "#818cf8",
};

const CustomCursor: React.FC = () => {
  const { hoveredDomain } = useRole();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const labelX = useMotionValue(-100);
  const labelY = useMotionValue(-100);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth outer ring — spring-damped
  const springConfig = { damping: 32, stiffness: 280, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Label follows cursor directly (no spring)
  const rawX = useRef(-100);
  const rawY = useRef(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      labelX.set(e.clientX + 18);
      labelY.set(e.clientY + 14);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor-label]")
        || target.closest("button")
        || target.closest("a")
        || target.closest("[role='button']");

      if (interactive) {
        setHovered(true);
        const label = (interactive as HTMLElement).getAttribute("data-cursor-label");
        setHoverLabel(label || null);
      } else {
        setHovered(false);
        setHoverLabel(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, labelX, labelY, isVisible]);

  // Semantic color based on domain
  const domainColor = hoveredDomain
    ? DOMAIN_CURSOR_COLORS[hoveredDomain]
    : hovered
    ? "#e4e4e7"
    : "rgba(255,255,255,0.35)";

  const ringSize = hovered ? 36 : 24;

  return (
    <>
      {/* Outer precision ring — spring-tracked */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: domainColor,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.25s ease, opacity 0.3s ease",
          borderWidth: hovered ? "1.5px" : "1px",
          boxShadow: hoveredDomain
            ? `0 0 12px ${DOMAIN_CURSOR_COLORS[hoveredDomain]}40`
            : "none",
        }}
      >
        {/* Corner ticks — precision reticle */}
        <div className="absolute w-[2px] h-[5px] bg-current" style={{ top: -2, left: "50%", transform: "translateX(-50%)", color: domainColor, opacity: 0.6 }} />
        <div className="absolute w-[2px] h-[5px] bg-current" style={{ bottom: -2, left: "50%", transform: "translateX(-50%)", color: domainColor, opacity: 0.6 }} />
        <div className="absolute h-[2px] w-[5px] bg-current" style={{ left: -2, top: "50%", transform: "translateY(-50%)", color: domainColor, opacity: 0.6 }} />
        <div className="absolute h-[2px] w-[5px] bg-current" style={{ right: -2, top: "50%", transform: "translateY(-50%)", color: domainColor, opacity: 0.6 }} />
      </motion.div>

      {/* Inner dot — direct follow, no spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          background: domainColor,
          opacity: isVisible ? 1 : 0,
          transition: "background 0.2s ease, opacity 0.3s ease",
        }}
      />

      {/* Floating label — appears only when there's a label */}
      {hoverLabel && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center gap-1"
          style={{
            x: labelX,
            y: labelY,
            opacity: isVisible ? 1 : 0,
          }}
        >
          <span
            className="font-mono text-[0.55rem] tracking-wider px-1.5 py-0.5 rounded border"
            style={{
              background: "rgba(5, 5, 7, 0.92)",
              borderColor: `${domainColor}50`,
              color: domainColor,
              whiteSpace: "nowrap",
            }}
          >
            {hoverLabel}
          </span>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
