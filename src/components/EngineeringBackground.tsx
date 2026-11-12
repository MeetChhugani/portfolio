"use client";

import { useRole } from "@/context/RoleContext";
import { useEffect, useRef, type CSSProperties } from "react";

const colors: Record<string, string> = {
  backend: "rgba(212,255,36,.07)", ai: "rgba(77,141,255,.09)",
  ml: "rgba(138,166,255,.07)", data: "rgba(91,209,255,.065)", deploy: "rgba(199,232,92,.06)",
};

const particles = [
  [5, 14, 12, -22, 0, 2], [12, 38, -16, -28, 2, 1], [18, 8, 18, 24, 4, 1],
  [23, 68, -12, -24, 1, 2], [29, 27, 20, -18, 6, 1], [34, 88, 15, -26, 3, 1],
  [39, 48, -18, 20, 5, 2], [44, 17, 11, 30, 7, 1], [49, 77, -14, -20, 2, 1],
  [54, 34, 16, 25, 8, 2], [59, 92, -20, -24, 1, 1], [64, 13, 13, 22, 5, 1],
  [69, 57, -15, -28, 3, 2], [74, 29, 18, 20, 9, 1], [79, 82, -12, -22, 4, 1],
  [84, 7, 16, 26, 6, 2], [89, 44, -18, 18, 2, 1], [94, 72, 12, -28, 7, 1],
  [9, 91, 15, -20, 8, 1], [27, 52, -13, 23, 10, 1], [47, 62, 19, -24, 11, 1],
  [71, 96, -16, -20, 12, 1], [91, 21, 13, 26, 13, 1], [57, 5, -12, 20, 14, 1],
] as const;

/** Static CSS background: no canvas loop or mouse-driven React state. */
export default function EngineeringBackground() {
  const { hoveredDomain } = useRole();
  const background = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const scrollFrame = useRef<number | undefined>(undefined);
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastScrollY = window.scrollY;
    let direction = 1;
    let energy = 0;

    const animateStars = () => {
      const root = background.current;
      if (!root) {
        scrollFrame.current = undefined;
        return;
      }

      energy *= 0.94;
      if (energy < 0.01) {
        energy = 0;
        root.querySelectorAll<HTMLElement>(".signal-particle-layer").forEach((star) => {
          star.style.transform = "";
        });
        scrollFrame.current = undefined;
        return;
      }

      root.querySelectorAll<HTMLElement>(".signal-particle-layer").forEach((star, index) => {
        const depth = Number(star.dataset.depth || 0.5);
        const sway = Math.sin(index * 1.4 + energy * 3) * energy * 9;
        const travel = direction * energy * depth * 20;
        star.style.transform = `translate3d(${sway}px, ${travel}px, 0)`;
      });
      scrollFrame.current = requestAnimationFrame(animateStars);
    };

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      if (delta === 0) return;

      const root = background.current;
      if (!root) return;

      direction = Math.sign(delta);
      energy = Math.min(0.8, energy + Math.min(Math.abs(delta) / 220, 0.22));
      root.classList.add("is-scroll-active");
      root.style.setProperty("--grid-scroll", `${Math.min(scrollY * 0.05, 100)}px`);
      root.style.setProperty("--ambient-scroll-far", `${Math.min(scrollY * 0.035, 90)}px`);
      root.style.setProperty("--ambient-scroll-near", `${Math.min(scrollY * 0.075, 180)}px`);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        root.classList.remove("is-scroll-active");
        scrollTimeout.current = undefined;
      }, 180);
      if (scrollFrame.current === undefined) {
        scrollFrame.current = requestAnimationFrame(animateStars);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (scrollFrame.current !== undefined) cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  return (
    <div ref={background} aria-hidden="true" className="portfolio-background" style={{ "--ambient-accent": colors[hoveredDomain || ""] || "rgba(127,164,255,.04)" } as CSSProperties}>
      <div className="signal-grid-layer" />
      {particles.map(([x, y, dx, dy, delay, size], index) => (
        <span key={index} className={`signal-particle-layer${index % 7 === 0 ? " signal-particle-layer-lime" : ""}`} style={{ top: `${y}%`, left: `${x}%` }} data-depth={[0.35, 0.65, 1][index % 3]}>
          <span
            className={`signal-particle${index % 7 === 0 ? " signal-particle-lime" : ""}`}
            style={{
              "--dx": `${dx * 2}px`,
              "--dy": `${dy * 2}px`,
              "--delay": `${-delay}s`,
              "--size": `${size}px`,
            } as CSSProperties}
          />
        </span>
      ))}
    </div>
  );
}
