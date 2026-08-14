"use client";

import { useMemo, useRef, type MouseEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Download, Code2 as Github, Network as Linkedin, Mail } from "lucide-react";
import { EngineeringDomain, PortfolioProject, portfolioIdentity, projects, stackDomains } from "@/data/portfolioContent";
import { useRole } from "@/context/RoleContext";

type Props = {
  onExplore: () => void;
  onTechnology: (domain: EngineeringDomain, index?: number) => void;
  onProject: (project: PortfolioProject) => void;
};

const shelfIds = ["businessos", "attrition", "quizlab", "startup", "sentiment"];

export default function HeroWorkbench({ onExplore, onTechnology, onProject }: Props) {
  const shelf = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pointer = useRef({ x: 0, y: 0 });
  const { role } = useRole();
  const priorityRole = role === "dataScience" ? "dataScience" : "backendDev";
  const featured = useMemo(() => shelfIds.map((id) => projects.find((project) => project.id === id)!).sort((a, b) => a.rolePriority[priorityRole] - b.rolePriority[priorityRole]), [priorityRole]);

  const parallax = (event: MouseEvent<HTMLDivElement>) => {
    const element = shelf.current;
    if (!element) return;
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

  const ProjectCard = ({ project, index, duplicate = false }: { project: PortfolioProject; index: number; duplicate?: boolean }) => (
    <article className={`hero-motion-card domain-${project.domain}`} aria-hidden={duplicate || undefined}>
      <div className="motion-card-registration" aria-hidden="true" />
      <div className="motion-card-topline"><span>{String(index + 1).padStart(2, "0")}</span><small>CASE FILE</small><i aria-label={project.status} /></div>
      <p className="motion-card-category">{project.tag}</p>
      <h3>{project.title}</h3>
      <p className="motion-card-summary">{project.solution}</p>
      <div className="motion-card-tags">
        {project.stack.slice(0, 4).map((technology) => duplicate ? <span key={technology}>{technology}</span> : <button key={technology} type="button" onClick={() => activateTech(technology)} onMouseEnter={() => activateTech(technology)} onFocus={() => activateTech(technology)}>{technology}</button>)}
      </div>
      {duplicate ? <span className="motion-card-link">VIEW CASE <ArrowUpRight size={15} /></span> : <button type="button" data-cursor-label="VIEW PROJECT" className="motion-card-link" onClick={() => onProject(project)}>VIEW CASE <ArrowUpRight size={15} /></button>}
    </article>
  );

  return <section id="home" className="hero-rebuilt">
    <div className="hero-personal">
      <p className="hero-eyebrow">PERSONAL ENGINEERING WORKSPACE</p><h1>MEET <em>CHHUGANI</em></h1><p className="hero-role-line">AI / ML ENGINEER <i /> PYTHON BACKEND DEVELOPER</p><h2>I learn by <span>building.</span></h2><p className="hero-manifesto">I build practical Python systems, machine learning models, and AI applications to understand how real software works.</p><p className="hero-support">Python backend engineering × applied machine learning × Generative AI</p>
      <div className="hero-buttons"><button onClick={onExplore} data-cursor-label="OPEN" className="hero-primary">EXPLORE MY WORK <ArrowDownRight size={18} /></button><a data-cursor-label="OPEN" href="/Meet_Chhugani_Resume.pdf" download className="hero-secondary">DOWNLOAD RESUME <Download size={14} /></a></div>
      <div className="hero-links"><a href={portfolioIdentity.github} target="_blank"><Github size={16} />GitHub</a><a href={portfolioIdentity.linkedin} target="_blank"><Linkedin size={16} />LinkedIn</a><a href={`mailto:${portfolioIdentity.email}`}><Mail size={16} />Email</a></div>
    </div>
    <div className="hero-motion-proof">
      <div className="hero-motion-heading"><p className="hero-eyebrow">PROJECTS IN MOTION</p><span>REAL WORK · OPEN A CASE FILE</span></div>
      <div ref={shelf} className="hero-motion-showcase" onMouseMove={parallax}><div className="hero-motion-stage"><div className="hero-motion-track">
        {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        {featured.map((project, index) => <ProjectCard key={`${project.id}-copy`} project={project} index={index} duplicate />)}
      </div></div></div>
    </div>
  </section>;
}
