"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Code2 as Github,
  Download,
  Menu,
  Network as Linkedin,
  X,
} from "lucide-react";
import { portfolioIdentity } from "@/data/portfolioContent";
import "./SiteNav.css";

const LINKS = [
  { id: "work", index: "01", label: "WORK" },
  { id: "lab", index: "02", label: "LAB" },
  { id: "contact", index: "03", label: "CONTACT" },
] as const;

interface SiteNavProps {
  onOpenPalette: () => void;
}

export function SiteNav({ onOpenPalette }: SiteNavProps) {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      let current: string | null = null;
      for (const link of LINKS) {
        const element = document.getElementById(link.id);
        if (element && element.getBoundingClientRect().top <= 150) current = link.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() =>
      firstLinkRef.current?.focus({ preventScroll: true })
    );
    return () => {
      document.body.style.overflow = previous;
      window.cancelAnimationFrame(frame);
    };
  }, [menu]);

  const closeMenu = useCallback(() => {
    setMenu(false);
    window.requestAnimationFrame(() =>
      menuButtonRef.current?.focus({ preventScroll: true })
    );
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, closeMenu]);

  const go = useCallback(
    (id: string) => {
      setMenu(false);
      const element = document.getElementById(id);
      if (!element) return;
      window.setTimeout(
        () => element.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }),
        90
      );
    },
    [reduced]
  );

  const spotlight = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const pillTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  return (
    <>
      <header className={`deck ${scrolled ? "is-scrolled" : ""}`}>
        <span className="deck-tick deck-tick-tl" aria-hidden="true" />
        <span className="deck-tick deck-tick-tr" aria-hidden="true" />
        <span className="deck-tick deck-tick-bl" aria-hidden="true" />
        <span className="deck-tick deck-tick-br" aria-hidden="true" />

        <div className="deck-inner">
          <button
            type="button"
            className="deck-brand"
            data-cursor-label="HOME"
            onClick={() => go("home")}
            aria-label="Meet Chhugani — home"
            suppressHydrationWarning
          >
            <span className="deck-sigil" aria-hidden="true">
              <i />
            </span>
            <span className="deck-wordmark">
              MC<span>.</span>
            </span>
            <span className="deck-name">MEET CHHUGANI</span>
          </button>

          <nav
            className="deck-links"
            aria-label="Primary"
            onPointerMove={spotlight}
          >
            <span className="deck-links-grid" aria-hidden="true" />
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  className={`deck-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => go(link.id)}
                  suppressHydrationWarning
                >
                  {isActive && (
                    <motion.span
                      layoutId="deck-active-pill"
                      className="deck-pill"
                      aria-hidden="true"
                      transition={pillTransition}
                    />
                  )}
                  <span className="deck-link-index">{link.index}</span>
                  <span className="deck-link-label">{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="deck-actions">
            <div className="deck-socials">
              <a
                className="deck-icon"
                data-label="GITHUB"
                data-cursor-label="OPEN"
                href={portfolioIdentity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                className="deck-icon"
                data-label="LINKEDIN"
                data-cursor-label="OPEN"
                href={portfolioIdentity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>

            <span className="deck-badge" title="Open to AI engineer roles">
              <i aria-hidden="true" />
              AI ENGINEER
            </span>

            <button
              type="button"
              className="deck-kbd"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              title="Search (Ctrl / ⌘ + K)"
              suppressHydrationWarning
            >
              <span>⌘</span>K
            </button>

            <a
              className="deck-resume"
              data-cursor-label="OPEN"
              href="/Meet_Chhugani_Resume.pdf"
              download
            >
              <span>RESUME</span>
              <Download size={13} />
            </a>

            <button
              type="button"
              className="deck-menu"
              ref={menuButtonRef}
              onClick={() => setMenu(true)}
              aria-label="Open navigation"
              aria-expanded={menu}
              aria-controls="deck-overlay"
              suppressHydrationWarning
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="deck-overlay"
            className="deck-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.24, ease: "easeOut" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <div className="deck-overlay-grid" aria-hidden="true" />
            <div className="deck-overlay-glow" aria-hidden="true" />

            <div className="deck-overlay-inner">
              <div className="deck-overlay-head">
                <span className="deck-overlay-brand">
                  MC<span>.</span>
                </span>
                <button
                  type="button"
                  className="deck-overlay-close"
                  data-cursor-label="CLOSE"
                  onClick={closeMenu}
                  suppressHydrationWarning
                >
                  CLOSE <X size={14} />
                </button>
              </div>

              <nav className="deck-overlay-links" aria-label="Primary">
                {LINKS.map((link, index) => (
                  <motion.button
                    key={link.id}
                    ref={index === 0 ? firstLinkRef : undefined}
                    type="button"
                    onClick={() => go(link.id)}
                    initial={reduced ? false : { opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.08 + index * 0.06,
                      duration: reduced ? 0 : 0.42,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    suppressHydrationWarning
                  >
                    <span>{link.index}</span>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </motion.button>
                ))}
              </nav>

              <div className="deck-overlay-meta">
                <span className="deck-badge deck-badge-solid">
                  <i aria-hidden="true" />
                  AI ENGINEER
                </span>
                <div className="deck-overlay-socials">
                  <a
                    href={portfolioIdentity.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="OPEN"
                  >
                    GITHUB <ArrowUpRight size={12} />
                  </a>
                  <a
                    href={portfolioIdentity.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="OPEN"
                  >
                    LINKEDIN <ArrowUpRight size={12} />
                  </a>
                </div>
                <a
                  className="deck-overlay-resume"
                  href="/Meet_Chhugani_Resume.pdf"
                  download
                  data-cursor-label="OPEN"
                >
                  RESUME <Download size={14} />
                </a>
              </div>

              <p className="deck-overlay-note">
                AI ENGINEER · APPLIED ML · RAG / LLM SYSTEMS · NEXT.JS / TYPESCRIPT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
