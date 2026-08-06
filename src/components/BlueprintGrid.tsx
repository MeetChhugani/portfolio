"use client";

import React, { useRef, useEffect } from "react";
import { useRole } from "@/context/RoleContext";

const BlueprintGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { role } = useRole();

  // Primary accent colors based on role
  const isBackend = role === "backendDev";
  const accentColor = isBackend ? "rgba(56, 189, 248, 0.4)" : "rgba(192, 132, 252, 0.4)"; // light blue / light purple
  const centerAccent = isBackend ? "rgba(56, 189, 248, 0.8)" : "rgba(192, 132, 252, 0.8)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const gridSize = 48; // Spacing of grid cells in pixels
    const maxDist = 220; // Radius of mouse illumination

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw grid lines
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);

        if (mouse.active) {
          // Distance from vertical line to mouse X
          const dist = Math.abs(x - mouse.x);
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist; // 0 to 1
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.015 + factor * 0.055})`;
          } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
          }
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
        }
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

        if (mouse.active) {
          const dist = Math.abs(y - mouse.y);
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.015 + factor * 0.055})`;
          } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
          }
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
        }
        ctx.stroke();
      }

      // 2. Draw grid intersection points (tiny nodes)
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const factor = 1 - dist / maxDist;
              ctx.beginPath();
              ctx.arc(x, y, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = factor > 0.6 ? centerAccent : accentColor;
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.arc(x, y, 0.8, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
              ctx.fill();
            }
          } else {
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
            ctx.fill();
          }
        }
      }

      // 3. Draw alignment crosshairs and coordinate overlays if mouse is on screen
      if (mouse.active) {
        // Find nearest grid intersection
        const nearX = Math.round(mouse.x / gridSize) * gridSize;
        const nearY = Math.round(mouse.y / gridSize) * gridSize;

        // Draw crosshairs to the grid lines
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 0.8;
        
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        ctx.setLineDash([]); // reset

        // Draw small indicator circle at mouse cursor
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.strokeStyle = centerAccent;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Coordinates text indicator near cursor
        ctx.font = "8px Share Tech Mono, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        const label = `SYS_X:${Math.round(mouse.x)} Y:${Math.round(mouse.y)}`;
        ctx.fillText(label, mouse.x + 12, mouse.y - 12);

        // Draw alignment target bracket
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.arc(nearX, nearY, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [accentColor, centerAccent]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default BlueprintGrid;
