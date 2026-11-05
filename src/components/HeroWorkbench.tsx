"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Download, Code2 as Github, Network as Linkedin, Mail } from "lucide-react";
import { useReducedMotion, useAnimation, animate, motion, AnimatePresence } from "framer-motion";
import { EngineeringDomain, PortfolioProject, portfolioIdentity, projects, stackDomains } from "@/data/portfolioContent";
import { useRole } from "@/context/RoleContext";

type Props = { onExplore: () => void; onTechnology: (domain: EngineeringDomain, index?: number) => void; onProject: (project: PortfolioProject) => void; isCaseStudyOpen: boolean; };
const cyclicDistance = (index: number, active: number, total: number) => {
  const distance = (index - active + total) % total;
  return distance > total / 2 ? distance - total : distance;
};

export default function HeroWorkbench({ onExplore, onTechnology, onProject, isCaseStudyOpen }: Props) {
  const shelf = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pointer = useRef({ x: 0, y: 0 });
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const smokeInput = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false, hasPoint: false });
  const smokeBurst = useRef<((x: number, y: number, vx: number, vy: number) => void) | null>(null);
  const dragStart = useRef<number | null>(null);
  const manualPauseTimer = useRef<number | undefined>(undefined);
  const wasCaseStudyOpen = useRef(false);
  const { role } = useRole();
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const priorityRole = role === "dataScience" ? "dataScience" : "backendDev";
  const featured = useMemo(() => [...projects].sort((a, b) => a.rolePriority[priorityRole] - b.rolePriority[priorityRole]), [priorityRole]);
  const safeIndex = featured.length ? activeIndex % featured.length : 0;
  const activeProject = featured[safeIndex];
  const move = useCallback((direction: number) => setActiveIndex((index) => (index + direction + featured.length) % featured.length), [featured.length]);
  const pauseAfterInteraction = useCallback((duration = 5000) => {
    setManualPaused(true);
    window.clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = window.setTimeout(() => setManualPaused(false), duration);
  }, []);

  useEffect(() => { setActiveIndex(0); }, [priorityRole]);
  useEffect(() => {
    const element = shelf.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!wasCaseStudyOpen.current && isCaseStudyOpen) { wasCaseStudyOpen.current = true; return; }
    if (wasCaseStudyOpen.current && !isCaseStudyOpen) { wasCaseStudyOpen.current = false; pauseAfterInteraction(1200); }
  }, [isCaseStudyOpen, pauseAfterInteraction]);
  useEffect(() => () => window.clearTimeout(manualPauseTimer.current), []);
  useEffect(() => {
    if (!isVisible || isCaseStudyOpen || reducedMotion) return;
    const timer = window.setTimeout(() => move(1), 3000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isCaseStudyOpen, isVisible, move, reducedMotion]);

  const parallax = (event: PointerEvent<HTMLDivElement>) => {
    const element = shelf.current;
    if (!element || event.pointerType === "touch") return;
    const rect = element.getBoundingClientRect();
    pointer.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--mx", `${pointer.current.x}`);
      element.style.setProperty("--my", `${pointer.current.y}`);
      frame.current = undefined;
    });
  };

  const resolveTechnology = (technology: string) => {
    const normalized = technology.replace(" API", "").toLowerCase();
    for (const domain of stackDomains) {
      const index = domain.technologies.findIndex((item) => {
        const name = item.name.toLowerCase();
        return name === normalized || name.includes(normalized) || normalized.includes(name.split(" /")[0]);
      });
      if (index >= 0) return { domain: domain.id, index };
    }
    return null;
  };

  const activateTech = (technology: string) => {
    const match = resolveTechnology(technology);
    if (match) onTechnology(match.domain, match.index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); pauseAfterInteraction(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); pauseAfterInteraction(); move(1); }
  };

  const driveSmoke = (event: PointerEvent<HTMLHeadingElement>) => {
    const input = smokeInput.current;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (input.hasPoint) {
      input.vx = input.vx * 0.5 + (x - input.x) * 0.5;
      input.vy = input.vy * 0.5 + (y - input.y) * 0.5;
    } else {
      input.vx = 0;
      input.vy = 0;
      input.hasPoint = true;
    }
    input.x = x;
    input.y = y;
    input.active = true;
    if (input.hasPoint) smokeBurst.current?.(x, y, input.vx, input.vy);
  };

  const settleSmoke = () => {
    smokeInput.current.active = false;
    smokeInput.current.hasPoint = false;
  };

  useEffect(() => {
    const h1 = heroNameRef.current;
    const canvas = smokeCanvasRef.current;
    if (!h1 || !canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    const plume = document.createElement("canvas");
    const plumeCtx = plume.getContext("2d");
    if (!ctx || !plumeCtx) return;

    type Stop = { offset: number; color: string };
    type GlyphLine = {
      text: string;
      x: number;
      baseline: number;
      font: string;
      spacing: string;
      paint: string;
      gradient: { angle: number; x: number; y: number; w: number; h: number; stops: Stop[] } | null;
    };
    type Puff = { x: number; y: number; vx: number; vy: number; age: number; life: number; r: number; grow: number; a: number; tint: number; phase: number; freq: number; rot: number; spin: number };

    const tints = [
      [9, 20, 44],
      [21, 88, 201],
      [77, 141, 255],
      [212, 255, 36],
    ];
    const maxPuffs = 150;
    const spriteSize = 192;

    const noiseAlpha = (() => {
      const values = new Float32Array(spriteSize * spriteSize);
      const octaves = [4, 9, 18];
      const weights = [0.55, 0.3, 0.15];
      for (let level = 0; level < octaves.length; level += 1) {
        const grid = octaves[level];
        const points = new Float32Array((grid + 1) * (grid + 1));
        for (let i = 0; i < points.length; i += 1) points[i] = Math.random();
        for (let y = 0; y < spriteSize; y += 1) {
          const gy = (y / spriteSize) * grid;
          const y0 = Math.floor(gy);
          const ty = gy - y0;
          const sy = ty * ty * (3 - 2 * ty);
          for (let x = 0; x < spriteSize; x += 1) {
            const gx = (x / spriteSize) * grid;
            const x0 = Math.floor(gx);
            const tx = gx - x0;
            const sx = tx * tx * (3 - 2 * tx);
            const top = points[y0 * (grid + 1) + x0] * (1 - sx) + points[y0 * (grid + 1) + x0 + 1] * sx;
            const bottom = points[(y0 + 1) * (grid + 1) + x0] * (1 - sx) + points[(y0 + 1) * (grid + 1) + x0 + 1] * sx;
            values[y * spriteSize + x] += (top * (1 - sy) + bottom * sy) * weights[level];
          }
        }
      }
      const alpha = new Uint8ClampedArray(spriteSize * spriteSize);
      for (let y = 0; y < spriteSize; y += 1) {
        for (let x = 0; x < spriteSize; x += 1) {
          const nx = (x / (spriteSize - 1)) * 2 - 1;
          const ny = (y / (spriteSize - 1)) * 2 - 1;
          const falloff = Math.pow(1 - Math.min(1, Math.hypot(nx, ny)), 1.7);
          const value = Math.min(1, Math.max(0, (values[y * spriteSize + x] - 0.34) / 0.5));
          alpha[y * spriteSize + x] = Math.round(falloff * value * 255);
        }
      }
      return alpha;
    })();

    const sprites = tints.map((color) => {
      const sprite = document.createElement("canvas");
      sprite.width = spriteSize;
      sprite.height = spriteSize;
      const spriteCtx = sprite.getContext("2d");
      if (spriteCtx) {
        const image = spriteCtx.createImageData(spriteSize, spriteSize);
        for (let i = 0; i < noiseAlpha.length; i += 1) {
          image.data[i * 4] = color[0];
          image.data[i * 4 + 1] = color[1];
          image.data[i * 4 + 2] = color[2];
          image.data[i * 4 + 3] = noiseAlpha[i];
        }
        spriteCtx.putImageData(image, 0, 0);
      }
      return sprite;
    });

    const puffs: Puff[] = [];
    const lines: GlyphLine[] = [];
    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    let density = 1;
    let ready = false;
    let running = false;
    let raf = 0;
    let prevNow = 0;
    let ambient = 0;
    let lastCursorSpawn = 0;
    let wasActive = false;
    let settle = 1;

    const splitTopLevel = (source: string) => {
      const parts: string[] = [];
      let depth = 0;
      let start = 0;
      for (let i = 0; i < source.length; i += 1) {
        const char = source[i];
        if (char === "(") depth += 1;
        else if (char === ")") depth -= 1;
        else if (char === "," && depth === 0) {
          parts.push(source.slice(start, i));
          start = i + 1;
        }
      }
      parts.push(source.slice(start));
      return parts.map((part) => part.trim());
    };

    const parseGradient = (value: string) => {
      if (!value.startsWith("linear-gradient(")) return null;
      const inner = value.slice(value.indexOf("(") + 1, value.lastIndexOf(")"));
      const parts = splitTopLevel(inner);
      let angle = 180;
      if (parts[0] && parts[0].endsWith("deg")) {
        angle = parseFloat(parts[0]);
        parts.shift();
      }
      const stops: Stop[] = [];
      for (const part of parts) {
        const match = part.match(/^(.+?)\s+([\d.]+)%$/);
        if (match) stops.push({ offset: parseFloat(match[2]) / 100, color: match[1] });
        else stops.push({ offset: stops.length / Math.max(parts.length - 1, 1), color: part });
      }
      return stops.length ? { angle, stops } : null;
    };

    const setLetterSpacing = (context: CanvasRenderingContext2D, value: string) => {
      if ("letterSpacing" in context) {
        (context as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = value;
      }
    };

    const measure = () => {
      const box = h1.getBoundingClientRect();
      cssW = Math.max(1, box.width);
      cssH = Math.max(1, box.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      density = Math.min(1.1, Math.max(0.45, (cssW * cssH) / (525 * 218)));
      for (const target of [canvas, plume]) {
        const w = Math.round(cssW * dpr);
        const h = Math.round(cssH * dpr);
        if (target.width !== w || target.height !== h) {
          target.width = w;
          target.height = h;
        }
      }

      lines.length = 0;
      const glyphs = Array.from(h1.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.tagName !== "CANVAS",
      );

      for (const glyph of glyphs) {
        const rect = glyph.getBoundingClientRect();
        const style = getComputedStyle(glyph);
        const size = parseFloat(style.fontSize);
        const font = `${style.fontStyle} ${style.fontWeight} ${size}px ${style.fontFamily}`;
        const spacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
        ctx.font = font;
        setLetterSpacing(ctx, spacing);
        const metrics = ctx.measureText(glyph.textContent ?? "");
        const ascent = metrics.fontBoundingBoxAscent || size * 0.8;
        const descent = metrics.fontBoundingBoxDescent || size * 0.22;
        const baseline = rect.top - box.top + (rect.height - (ascent + descent)) / 2 + ascent;
        const gradient = parseGradient(style.backgroundImage);
        lines.push({
          text: glyph.textContent ?? "",
          x: rect.left - box.left,
          baseline,
          font,
          spacing,
          paint: style.color.startsWith("rgb") ? style.color : "#f6f9ff",
          gradient: gradient
            ? { angle: gradient.angle, x: rect.left - box.left, y: rect.top - box.top, w: rect.width, h: rect.height, stops: gradient.stops }
            : null,
        });
      }
    };

    const paintBase = () => {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      for (const line of lines) {
        ctx.font = line.font;
        setLetterSpacing(ctx, line.spacing);
        if (line.gradient) {
          const { angle, x, y, w, h, stops } = line.gradient;
          const radians = (angle * Math.PI) / 180;
          const dx = Math.sin(radians);
          const dy = -Math.cos(radians);
          const length = Math.abs(w * dx) + Math.abs(h * dy);
          const cx = x + w / 2;
          const cy = y + h / 2;
          const gradient = ctx.createLinearGradient(cx - (dx * length) / 2, cy - (dy * length) / 2, cx + (dx * length) / 2, cy + (dy * length) / 2);
          for (const stop of stops) {
            try {
              gradient.addColorStop(Math.min(1, Math.max(0, stop.offset)), stop.color);
            } catch {
              gradient.addColorStop(0, stop.color);
            }
          }
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = line.paint;
        }
        ctx.fillText(line.text, line.x, line.baseline);
      }
      ctx.restore();
    };

    const spawn = (x: number, y: number, vx: number, vy: number, scale: number) => {
      if (puffs.length >= maxPuffs) return;
      const roll = Math.random();
      const tint = roll < 0.46 ? 0 : roll < 0.76 ? 1 : roll < 0.92 ? 2 : 3;
      puffs.push({
        x,
        y,
        vx,
        vy,
        age: 0,
        life: 2100 + Math.random() * 2100,
        r: (24 + Math.random() * 34) * scale,
        grow: 14 + Math.random() * 30,
        a: ((tint === 0 ? 0.13 : tint === 3 ? 0.06 : 0.095) + Math.random() * (tint === 0 ? 0.1 : 0.08)) * density,
        tint,
        phase: Math.random() * Math.PI * 2,
        freq: 0.0006 + Math.random() * 0.0012,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.00016,
      });
    };

    const loop = (now: number) => {
      if (!running) return;
      const elapsed = Math.min(48, now - prevNow || 16.7);
      const dt = elapsed / 16.667;
      prevNow = now;
      const input = smokeInput.current;

      if (input.active && !wasActive) {
        const burst = Math.max(5, Math.round(10 * density));
        for (let i = 0; i < burst; i += 1) {
          spawn(
            input.x + (Math.random() - 0.5) * 150,
            input.y + (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 1.2,
            -0.35 - Math.random() * 0.8,
            0.9 + Math.random() * 0.7,
          );
        }
        ambient = 0;
      }
      wasActive = input.active;

      if (input.active) {
        ambient += dt * 0.3 * density;
        while (ambient >= 1) {
          ambient -= 1;
          spawn(
            Math.random() * cssW,
            cssH * (0.82 + Math.random() * 0.18),
            (Math.random() - 0.5) * 0.5,
            -0.2 - Math.random() * 0.4,
            0.85 + Math.random() * 0.75,
          );
        }
        const speed = Math.hypot(input.vx, input.vy);
        if (speed <= 0.32 && now - lastCursorSpawn > 90) {
          lastCursorSpawn = now;
          spawn(input.x + (Math.random() - 0.5) * 18, input.y + (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 0.4, -0.42, 0.85);
        }
        input.vx *= Math.pow(0.85, dt);
        input.vy *= Math.pow(0.85, dt);
        settle = 1;
      } else {
        settle *= Math.pow(0.9, dt);
        if (settle < 0.03) {
          puffs.length = 0;
          settle = 1;
          wasActive = false;
        }
      }

      for (let i = puffs.length - 1; i >= 0; i -= 1) {
        const puff = puffs[i];
        puff.age += elapsed;
        if (puff.age >= puff.life) {
          puffs.splice(i, 1);
          continue;
        }
        puff.vx += Math.sin(puff.y * 0.026 + now * puff.freq + puff.phase) * 0.05 * dt;
        puff.vy += Math.cos(puff.x * 0.032 + now * puff.freq * 0.7 + puff.phase) * 0.016 * dt - 0.012 * dt;
        puff.x += puff.vx * dt;
        puff.y += puff.vy * dt;
        puff.r += puff.grow * 0.012 * dt;
      }

      plumeCtx.setTransform(1, 0, 0, 1, 0, 0);
      plumeCtx.globalCompositeOperation = "destination-out";
      plumeCtx.fillStyle = `rgba(0,0,0,${Math.min(0.4, (input.active ? 0.075 : 0.13) * dt)})`;
      plumeCtx.fillRect(0, 0, plume.width, plume.height);
      plumeCtx.globalCompositeOperation = "source-over";
      plumeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const puff of puffs) {
        const t = puff.age / puff.life;
        const envelope = t < 0.18 ? t / 0.18 : Math.pow(1 - (t - 0.18) / 0.82, 1.35);
        const alpha = puff.a * envelope * settle;
        if (alpha <= 0.002) continue;
        plumeCtx.save();
        plumeCtx.globalAlpha = Math.min(1, alpha * 2.9);
        plumeCtx.translate(puff.x, puff.y);
        plumeCtx.rotate(puff.rot + now * puff.spin);
        plumeCtx.drawImage(sprites[puff.tint], -puff.r * 1.35, -puff.r * 1.35, puff.r * 2.7, puff.r * 2.7);
        plumeCtx.restore();
      }

      paintBase();
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(plume, 0, 0, cssW, cssH);
      ctx.restore();

      if (input.active || puffs.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
        plumeCtx.setTransform(1, 0, 0, 1, 0, 0);
        plumeCtx.clearRect(0, 0, plume.width, plume.height);
      }
    };

    const start = () => {
      if (!ready || running) return;
      running = true;
      prevNow = performance.now();
      raf = requestAnimationFrame(loop);
    };

    smokeBurst.current = (x, y, vx, vy) => {
      const speed = Math.hypot(vx, vy);
      const count = Math.max(1, Math.round(Math.min(5, 1 + speed * 0.35) * density));
      for (let i = 0; i < count; i += 1) {
        spawn(
          x + (Math.random() - 0.5) * 26,
          y + (Math.random() - 0.5) * 26,
          vx * 0.34 + (Math.random() - 0.5) * 0.9,
          vy * 0.34 - 0.18 + (Math.random() - 0.5) * 0.9,
          0.8 + Math.random() * 0.7,
        );
      }
      start();
    };

    const wake = () => start();
    const stop = () => {
      smokeInput.current.active = false;
    };

    const boot = () => {
      measure();
      paintBase();
      h1.classList.add("is-smoke-live");
      ready = true;
    };

    h1.addEventListener("pointerenter", wake);
    h1.addEventListener("pointermove", wake, { passive: true });
    h1.addEventListener("pointerdown", wake);
    h1.addEventListener("pointerleave", stop);
    h1.addEventListener("pointercancel", stop);
    const resizeObserver = new ResizeObserver(() => {
      if (!ready) return;
      measure();
      paintBase();
    });
    resizeObserver.observe(h1);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      boot();
    });

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      h1.removeEventListener("pointerenter", wake);
      h1.removeEventListener("pointermove", wake);
      h1.removeEventListener("pointerdown", wake);
      h1.removeEventListener("pointerleave", stop);
      h1.removeEventListener("pointercancel", stop);
      h1.classList.remove("is-smoke-live");
      smokeBurst.current = null;
      puffs.length = 0;
    };
  }, [reducedMotion]);

  // 3D Flip Card Deck state
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = useCallback((direction: number) => {
    if (isFlipping || featured.length <= 1) return;
    setFlipDirection(direction > 0 ? "forward" : "backward");
    setIsFlipping(true);
    pauseAfterInteraction();
    move(direction);
  }, [isFlipping, featured.length, pauseAfterInteraction, move]);

  const onFlipComplete = useCallback(() => {
    setIsFlipping(false);
    setFlipDirection(null);
  }, []);

  // Auto-flip when visible
  useEffect(() => {
    if (!isVisible || hoverPaused || manualPaused || isCaseStudyOpen || reducedMotion || featured.length <= 1) return;
    const timer = window.setTimeout(() => {
      if (!isFlipping) {
        setFlipDirection("forward");
        setIsFlipping(true);
        move(1);
      }
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, hoverPaused, isCaseStudyOpen, isVisible, manualPaused, move, reducedMotion, featured.length, isFlipping]);

  return <section id="home" className="hero-rebuilt">
    <div className="hero-personal">
      <p className="hero-eyebrow">AI/ML ENGINEER @ <span style={{ color: 'var(--lime)' }}>3i Infotech</span></p>
      <div className="hero-meta">
        <span className="meta-live">OPEN TO 2026 AI ROLES</span>
        <span>APPLIED AI</span>
        <span>RAG / LLM SYSTEMS</span>
      </div>
      <h1
        ref={heroNameRef}
        className="hero-name"
        onPointerEnter={driveSmoke}
        onPointerMove={driveSmoke}
        onPointerDown={driveSmoke}
        onPointerLeave={settleSmoke}
        onPointerCancel={settleSmoke}
      >
        <span>MEET</span><em>CHHUGANI</em>
        <canvas ref={smokeCanvasRef} className="hero-name-smoke-canvas" aria-hidden="true" />
      </h1>
      <p className="hero-role-line">AI / ML ENGINEER <i /> APPLIED AI SYSTEMS</p>
      <h2>I learn by <span>building.</span></h2>
      <p className="hero-manifesto">I build practical Python systems, machine learning models, and AI applications to understand how real software works.</p>
      <p className="hero-support">From backend APIs and data workflows to explainable ML and LLM-powered applications, I turn ideas into working systems.</p>
      <div className="hero-buttons"><button onClick={onExplore} data-cursor-label="OPEN" className="hero-primary">EXPLORE MY WORK <ArrowDownRight size={18} /></button><a data-cursor-label="OPEN" href="/Meet_Chhugani_Resume.pdf" download="Meet_Chhugani_Resume.pdf" className="hero-secondary">DOWNLOAD RESUME <Download size={14} /></a></div>
      <div className="hero-links"><a href={portfolioIdentity.github} target="_blank" rel="noopener noreferrer"><Github size={16} />GitHub</a><a href={portfolioIdentity.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn</a><a href={`mailto:${portfolioIdentity.email}`}><Mail size={16} />Email</a></div>
      <div className="hero-metrics" aria-label="Selected engineering metrics">
        <div><b>{String(projects.length).padStart(2, "0")}</b><span>SYSTEMS BUILT</span></div>
        <div><b>0.89</b><span>ROC-AUC · RISK ML</span></div>
        <div><b>{"<150ms"}</b><span>REAL-TIME CV</span></div>
      </div>
    </div>
    <div className="hero-motion-proof">
      <div className="hero-motion-heading">
        <p className="hero-eyebrow">PROJECTS IN MOTION</p>
        <span>{String(safeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")} · {activeProject?.title}</span>
      </div>
      <div className="hero-drawer-container" ref={shelf} tabIndex={0} role="region" aria-label="Project cards drawer. Use arrow keys to navigate." onKeyDown={onKeyDown}>
        <div className="hero-drawer-stage" style={{ position: 'relative', width: '100%', maxWidth: 1200, minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 80, flexShrink: 0, flexDirection: 'row-reverse', paddingLeft: 60 }}>
          {/* Deck Stack on the right */}
          <div className="hero-deck-stack" aria-hidden="true" style={{ position: 'relative', width: 280, height: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
            {featured.map((project, index) => {
              const isActive = index === safeIndex;
              const isInDeck = !isActive;
              const deckPosition = isInDeck ? index - (index > safeIndex ? 1 : 0) : -1;
              const totalInDeck = featured.length - 1;
              
              if (!isInDeck) return null;
              
              const stackOffset = deckPosition * 3; // px offset for fanned look
              const stackRotation = (deckPosition - totalInDeck / 2) * 3; // slight rotation for fanned effect
              const stackZ = totalInDeck - deckPosition;
              
              return (
                <motion.article
                  key={`deck-${project.id}`}
                  className={`hero-deck-card domain-${project.domain} in-stack`}
                  style={{
                    zIndex: stackZ,
                    opacity: 0.6 + (deckPosition / totalInDeck) * 0.3,
                  }}
                  initial={{ opacity: 0, x: 30, yPercent: -50, rotate: stackRotation + 15, scale: 0.9 }}
                  animate={{ opacity: 0.6 + (deckPosition / totalInDeck) * 0.3, x: stackOffset, yPercent: -50, rotate: stackRotation, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    delay: deckPosition * 0.06,
                    mass: 0.8
                  }}
                >
                  <div className="stack-card-preview">
                    <div className="card-topline"><span>CASE {String(index + 1).padStart(2, "0")}</span><small>{project.status}</small><i aria-hidden="true" /></div>
                    <h3>{project.title}</h3>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Center Draw Indicator */}
          <div className="hero-draw-center" style={{
            position: 'relative',
            width: 1,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            opacity: 0.4,
          }}>
            <div style={{
              width: 4,
              height: 60,
              background: 'linear-gradient(180deg, transparent, var(--accent, #72e0a6), transparent)',
              borderRadius: 2,
              animation: 'drawPulse 2s ease-in-out infinite',
            }} />
            <span style={{
              font: '700 10px var(--font-mono)',
              color: 'var(--accent, #72e0a6)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}>
              DRAW
            </span>
            <div style={{
              width: 4,
              height: 60,
              background: 'linear-gradient(180deg, transparent, var(--accent, #72e0a6), transparent)',
              borderRadius: 2,
              animation: 'drawPulse 2s ease-in-out infinite reverse',
            }} />
          </div>

          {/* Active Card in Center */}
          <AnimatePresence mode="wait">
            <motion.article
              key={`active-${activeProject.id}`}
              className={`hero-deck-card domain-${activeProject.domain} active-card`}
              style={{
                position: 'relative',
                zIndex: 10,
              }}
              initial={{ opacity: 0, x: 100, scale: 0.88, rotate: 8 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: -100, scale: 0.88, rotate: -8 }}
              transition={{ 
                type: "spring",
                stiffness: 160,
                damping: 18,
                mass: 0.9
              }}
            >
              <div className="card-inner">
                <div className="card-face card-front">
                  <div className="card-topline"><span>CASE {String(safeIndex + 1).padStart(2, "0")}</span><small>{activeProject.status}</small><i aria-hidden="true" /></div>
                  <p className="card-category">{activeProject.tag}</p>
                  <h3>{activeProject.title}</h3>
                  <p className="card-summary">{activeProject.solution}</p>
                  <div className="card-tags">
                    {activeProject.stack.slice(0, 4).map((technology) =>
                    resolveTechnology(technology) ? (
                      <button
                        key={technology}
                        type="button"
                        onClick={() => { pauseAfterInteraction(); activateTech(technology); }}
                        onPointerEnter={() => activateTech(technology)}
                        onFocus={() => activateTech(technology)}
                        tabIndex={0}
                      >
                        {technology}
                      </button>
                    ) : (
                      <span key={technology}>{technology}</span>
                    )
                  )}
                </div>
                <button
                  type="button"
                  data-cursor-label="VIEW PROJECT"
                  className="card-link"
                  onClick={(event) => { event.stopPropagation(); pauseAfterInteraction(); onProject(activeProject); }}
                >
                  VIEW CASE <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="hero-drawer-controls">
          <button
            type="button"
            onClick={() => { pauseAfterInteraction(); move(-1); }}
            aria-label="Previous project"
            className="drawer-btn"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => { pauseAfterInteraction(); move(1); }}
            aria-label="Next project"
            className="drawer-btn"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <p className="drawer-hint">← → arrow keys to draw</p>
      </div>
    </div>
  </section>;
}