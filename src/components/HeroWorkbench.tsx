"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Download, Code2 as Github, Network as Linkedin, Mail } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { EngineeringDomain, PortfolioProject, portfolioIdentity, projects, stackDomains } from "@/data/portfolioContent";
import { useRole } from "@/context/RoleContext";

type Props = { onExplore: () => void; onTechnology: (domain: EngineeringDomain, index?: number) => void; onProject: (project: PortfolioProject) => void; isCaseStudyOpen: boolean; };
const shelfIds = ["businessos", "sentiment", "attrition", "quizlab", "startup"];
const cyclicDistance = (index: number, active: number, total: number) => {
  const distance = (index - active + total) % total;
  return distance > total / 2 ? distance - total : distance;
};

export default function HeroWorkbench({ onExplore, onTechnology, onProject, isCaseStudyOpen }: Props) {
  const shelf = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pointer = useRef({ x: 0, y: 0 });
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
  const featured = useMemo(() => shelfIds.map((id) => projects.find((project) => project.id === id)).filter((project): project is PortfolioProject => Boolean(project)).sort((a, b) => a.rolePriority[priorityRole] - b.rolePriority[priorityRole]), [priorityRole]);
  const activeProject = featured[activeIndex];
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
    if (!isVisible || hoverPaused || manualPaused || isCaseStudyOpen || reducedMotion) return;
    const timer = window.setTimeout(() => move(1), 4000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, hoverPaused, isCaseStudyOpen, isVisible, manualPaused, move, reducedMotion]);

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

  const activateTech = (technology: string) => {
    const normalized = technology.replace(" API", "").toLowerCase();
    for (const domain of stackDomains) {
      const index = domain.technologies.findIndex((item) => {
        const name = item.name.toLowerCase();
        return name === normalized || name.includes(normalized) || normalized.includes(name.split(" /")[0]);
      });
      if (index >= 0) { onTechnology(domain.id, index); return; }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); pauseAfterInteraction(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); pauseAfterInteraction(); move(1); }
  };

  return <section id="home" className="hero-rebuilt">
    <div className="hero-personal">
      <p className="hero-eyebrow">PERSONAL ENGINEERING WORKSPACE</p>
      <h1 className="hero-name"><span>MEET</span><em>CHHUGANI</em></h1>
      <p className="hero-role-line">AI / ML ENGINEER <i /> PYTHON BACKEND DEVELOPER</p>
      <h2>I learn by <span>building.</span></h2>
      <p className="hero-manifesto">I build practical Python systems, machine learning models, and AI applications to understand how real software works.</p>
      <p className="hero-support">From backend APIs and data workflows to explainable ML and LLM-powered applications, I turn ideas into working systems.</p>
      <div className="hero-buttons"><button onClick={onExplore} data-cursor-label="OPEN" className="hero-primary">EXPLORE MY WORK <ArrowDownRight size={18} /></button><a data-cursor-label="OPEN" href="/Meet_Chhugani_Resume.pdf" download className="hero-secondary">DOWNLOAD RESUME <Download size={14} /></a></div>
      <div className="hero-links"><a href={portfolioIdentity.github} target="_blank" rel="noopener noreferrer"><Github size={16} />GitHub</a><a href={portfolioIdentity.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} />LinkedIn</a><a href={`mailto:${portfolioIdentity.email}`}><Mail size={16} />Email</a></div>
    </div>
    <div className="hero-motion-proof">
      <div className="hero-motion-heading"><p className="hero-eyebrow">PROJECTS IN MOTION</p><span>{String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")} · {activeProject.title}</span></div>
      <div ref={shelf} className="hero-motion-showcase" tabIndex={0} role="region" aria-label="Featured projects carousel. Use left and right arrow keys to change project." onKeyDown={onKeyDown} onPointerMove={(event) => { parallax(event); const start = dragStart.current; if (start !== null && Math.abs(event.clientX - start) > 12 && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId); }} onPointerEnter={() => setHoverPaused(true)} onPointerLeave={() => setHoverPaused(false)} onFocus={() => setHoverPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHoverPaused(false); }} onPointerDown={(event) => { const target = event.target as HTMLElement; if (target.closest(".hero-carousel-controls, .motion-card-link, .motion-card-tags")) return; pauseAfterInteraction(); dragStart.current = event.clientX; }} onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); const start = dragStart.current; dragStart.current = null; if (start === null) return; const delta = event.clientX - start; if (Math.abs(delta) > 42) move(delta > 0 ? -1 : 1); }}>
        <div className="hero-carousel-stage">
          {featured.map((project, index) => {
            const distance = cyclicDistance(index, activeIndex, featured.length);
            return <article key={project.id} className={`hero-motion-card domain-${project.domain} position-${distance < 0 ? `minus-${Math.abs(distance)}` : distance}`} aria-hidden={Math.abs(distance) > 1}>
              <button type="button" data-cursor-label="VIEW PROJECT" className="motion-card-open" onClick={() => { pauseAfterInteraction(); onProject(project); }} aria-label={`Open ${project.title} case study`} tabIndex={Math.abs(distance) > 1 ? -1 : 0} />
              <div className="motion-card-registration" aria-hidden="true" />
              <div className="motion-card-topline"><span>CASE {String(index + 1).padStart(2, "0")}</span><small>{project.status}</small><i aria-hidden="true" /></div>
              <p className="motion-card-category">{project.tag}</p><h3>{project.title}</h3><p className="motion-card-summary">{project.solution}</p>
              <div className="motion-card-tags">{project.stack.slice(0, 4).map((technology) => <button key={technology} type="button" onClick={() => { pauseAfterInteraction(); activateTech(technology); }} onPointerEnter={() => activateTech(technology)} onFocus={() => activateTech(technology)} tabIndex={Math.abs(distance) > 1 ? -1 : 0}>{technology}</button>)}</div>
              <button type="button" data-cursor-label="VIEW PROJECT" className="motion-card-link" onClick={(event) => { event.stopPropagation(); pauseAfterInteraction(); onProject(project); }}>VIEW CASE <ArrowUpRight size={15} /></button>
            </article>;
          })}
        </div>
        <div className="hero-carousel-controls"><button type="button" onClick={() => { pauseAfterInteraction(); move(-1); }} aria-label="Show previous project"><ChevronLeft size={17} /></button><div className="hero-carousel-dots" aria-label={`${activeProject.title}, project ${activeIndex + 1} of ${featured.length}`}>{featured.map((project, index) => <button type="button" key={project.id} onClick={() => { pauseAfterInteraction(); setActiveIndex(index); }} aria-label={`Show ${project.title}`} aria-current={index === activeIndex} className={index === activeIndex ? "is-active" : ""} />)}</div><button type="button" onClick={() => { pauseAfterInteraction(); move(1); }} aria-label="Show next project"><ChevronRight size={17} /></button></div>
      </div>
    </div>
  </section>;
}
