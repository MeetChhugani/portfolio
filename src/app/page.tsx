"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import {
  EngineeringDomain,
  portfolioIdentity,
  projects,
  stackDomains,
  experiences,
  verifiedLearning,
  technologyFlows,
} from "@/data/portfolioContent";
import { SiteNav } from "@/components/SiteNav";
import { ProjectCaseStudyModal } from "@/components/ProjectCaseStudyModal";
import { CommandPalette } from "@/components/CommandPalette";
import ContactForm from "@/components/ContactForm";
import CustomCursor from "@/components/CustomCursor";
import EngineeringBackground from "@/components/EngineeringBackground";
import HeroWorkbench from "@/components/HeroWorkbench";
import ScrollProgress from "@/components/ScrollProgress";
import { ProjectRoom } from "@/components/ProjectRoom";

const colors: Record<EngineeringDomain, string> = {
  backend: "emerald",
  ai: "cyan",
  ml: "violet",
  data: "teal",
  infra: "amber",
};

const findTechnology = (name: string) => {
  const normalized = name.toLowerCase().replace(" api", "");
  for (const domain of stackDomains) {
    const index = domain.technologies.findIndex((item) => {
      const candidate = item.name.toLowerCase();
      return candidate === normalized || candidate.includes(normalized) || normalized.includes(candidate.split(" /")[0]);
    });
    if (index >= 0) return { domain: domain.id, index };
  }
  return null;
};

const findProjectForTech = (usedIn: string[]) =>
  projects.find((project) =>
    usedIn.some((name) => {
      const item = name.toLowerCase();
      const title = project.title.toLowerCase();
      return title.includes(item) || item.includes(title);
    })
  );

export default function Home() {
  const { role, setHoveredDomain, setHoveredTech } = useRole();
  const reduced = useReducedMotion();
  const [detail, setDetail] = useState<typeof projects[number] | null>(null);
  const [domain, setDomain] = useState<EngineeringDomain>("backend");
  const [techIndex, setTechIndex] = useState(0);
  const [palette, setPalette] = useState(false);
  const [backgroundOpen, setBackgroundOpen] = useState(false);

  const priority = role === "backendDev" ? "backendDev" : "dataScience";
  const ordered = useMemo(
    () => [...projects].sort((a, b) => a.rolePriority[priority] - b.rolePriority[priority]),
    [priority]
  );

  const stack = stackDomains.find((item) => item.id === domain) ?? stackDomains[0];
  const tech = stack.technologies[techIndex] ?? stack.technologies[0];
  const flowKey = Object.keys(technologyFlows).find((key) =>
    tech.name.toLowerCase().includes(key.toLowerCase())
  );
  const flow = (flowKey && technologyFlows[flowKey]) || {
    nodes: [tech.name, tech.role, "Project context"],
    related: tech.usedIn,
  };
  const techProject = findProjectForTech(tech.usedIn);

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });

  const activateDomain = (next: EngineeringDomain, index = 0) => {
    const nextStack = stackDomains.find((item) => item.id === next);
    setDomain(next);
    setTechIndex(index);
    setHoveredDomain(next === "infra" ? "deploy" : next);
    setHoveredTech(nextStack?.technologies[index]?.name.toLowerCase() ?? null);
  };

  const selectTechnology = (name: string) => {
    const match = findTechnology(name);
    if (match) activateDomain(match.domain, match.index);
    return Boolean(match);
  };

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  return (
    <main className="meet-site" suppressHydrationWarning>
      <a href="#work" className="skip-link">Skip to selected work</a>
      <ScrollProgress />
      <EngineeringBackground />
      <CustomCursor />

      <SiteNav onOpenPalette={() => setPalette(true)} />

      <HeroWorkbench
        onExplore={() => scroll("#work")}
        onTechnology={(next, index) => { activateDomain(next, index); scroll("#lab"); }}
        onProject={setDetail}
        isCaseStudyOpen={Boolean(detail)}
      />

      <section id="work" className="work-section-new" aria-label="Selected work">
        <ProjectRoom projects={ordered} onOpenCaseStudy={setDetail} suspended={Boolean(detail)} />
      </section>

      <section id="lab" className="lab-section">
        <div className="section-heading-new">
          <p className="micro-label">02 / HOW I BUILD</p>
          <h2>Tools Behind<br />the Work.</h2>
          <p>Technologies I use to turn ideas into working backend systems, ML models, and AI applications.</p>
        </div>

        <div className={`stack-action domain-${colors[domain]}`}>
          <aside className="technology-shelf">
            <p>TECHNOLOGY SHELF</p>
            {stackDomains.map((item) => (
              <button key={item.id} onClick={() => activateDomain(item.id)} className={domain === item.id ? "is-active" : ""}>
                {item.label}
              </button>
            ))}
            <div className="shelf-technologies">
              {stack.technologies.map((item, index) => (
                <button key={item.name} onClick={() => activateDomain(domain, index)} className={techIndex === index ? "is-active" : ""}>
                  {item.name}
                </button>
              ))}
            </div>
          </aside>

          <div className="stack-stage">
            <div className="stage-kicker">HOW I USE IT</div>
            <div className="flow-chain" aria-label={`${tech.name} technology flow`}>
              {flow.nodes.map((node, index) => (
                <div key={`${tech.name}-${node}`} className={node === tech.name ? "flow-node active" : "flow-node"}>
                  <span>{node}</span>
                  {index < flow.nodes.length - 1 && <i />}
                </div>
              ))}
            </div>
            <div className="related-strip">
              <span>RELATED</span>
              {flow.related.map((item) =>
                findTechnology(item) ? (
                  <button key={item} onClick={() => selectTechnology(item)}>{item}</button>
                ) : (
                  <span key={item} className="related-static">{item}</span>
                )
              )}
            </div>
            <button
              className="build-stack"
              onClick={() => (techProject ? setDetail(techProject) : scroll("#work"))}
            >
              SEE IT IN A PROJECT <ArrowUpRight size={15} />
            </button>
          </div>

          <aside className="stack-evidence">
            <p className="micro-label">PROJECT EVIDENCE</p>
            <h3>{tech.name}</h3>
            <span>{stack.label}</span>
            <dl>
              <div><dt>WHY I USE IT</dt><dd>{tech.why}</dd></div>
              <div><dt>USED IN</dt><dd>{tech.usedIn.join(" · ")}</dd></div>
              <div><dt>ROLE</dt><dd>{tech.role}</dd></div>
            </dl>
            {techProject && (
              <button onClick={() => setDetail(techProject)}>
                VIEW CASE STUDY <ArrowUpRight size={16} />
              </button>
            )}
            <button
              className="background-toggle"
              onClick={() => setBackgroundOpen(!backgroundOpen)}
              aria-expanded={backgroundOpen}
              aria-controls="lab-background-drawer"
            >
              BACKGROUND {backgroundOpen ? "−" : "+"}
            </button>
            {backgroundOpen && (
              <div id="lab-background-drawer" className="background-drawer">
                <p>{portfolioIdentity.education}</p>
                {experiences.map((item) => (
                  <p key={item.role}><b>{item.role}</b><br />{item.organization}</p>
                ))}
                <p className="lab-subtitle">VERIFIED LEARNING</p>
                {verifiedLearning.map((item) => <span key={item}>{item}</span>)}
              </div>
            )}
          </aside>
        </div>

        <div className="build-evidence">
          <article>
            <p className="micro-label">BUILDER&apos;S NOTE</p>
            <h3>Learn by making the system work.</h3>
            <p>I&apos;m a B.Tech Information Technology student who learns through implementation: shaping an idea, debugging it, and improving it into a useful application.</p>
          </article>
          <article>
            <p className="micro-label">ML WORKFLOW</p>
            <h3>Data → features → model → explanation.</h3>
            <p>Employee Risk Radar applies EDA and feature work to XGBoost prediction, SHAP explanations, and a Streamlit interface. Startup Success Predictor follows the same practical modeling mindset.</p>
          </article>
          <article>
            <p className="micro-label">BACKGROUND</p>
            <h3>{portfolioIdentity.education}</h3>
            <p>{experiences.map((item) => `${item.role} · ${item.organization}`).join(" / ")}</p>
            <span>{verifiedLearning.length} verified learning programs in the current portfolio data.</span>
          </article>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div>
          <p className="micro-label">03 / CAREER JOURNEY</p>
          <h2>Where I&apos;ve<br />Built Things.</h2>
          <p>Internships and hands-on roles shaping my engineering foundation.</p>
        </div>
        <div className="experience-timeline">
          {experiences.map((item, index) => (
            <article key={`${item.role}-${item.organization}-${index}`} className="experience-card">
              <div className="experience-meta">
                <span className="experience-period">{item.period}</span>
                <span className="experience-org">
                  {item.website ? (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--lime)'} onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                      {item.organization}
                    </a>
                  ) : (
                    item.organization
                  )}
                </span>
              </div>
              <h3 className="experience-role">{item.role}</h3>
              {Array.isArray(item.detail) ? (
                <ul className="experience-bullets">
                  {item.detail.map((bullet, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                  ))}
                </ul>
              ) : (
                <p className="experience-detail">{item.detail}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section-new">
        <div>
          <p className="micro-label">04 / CONTACT</p>
          <h2>Let&apos;s Build<br />Something.</h2>
          <p>If you&apos;re building an AI product, an ML system, or a Python backend and think I could contribute, I&apos;d like to hear about it.</p>
          <a href={`mailto:${portfolioIdentity.email}`}>{portfolioIdentity.email}<ArrowUpRight size={16} /></a>
          <div className="contact-meta">
            <span>OPEN TO AI ENGINEER ROLES</span>
            <span>FASTAPI · RAG · LLM</span>
            <span>REPLIES WITHIN 24H</span>
          </div>
        </div>
        <ContactForm />
      </section>

      <footer className="meet-footer">
        <span>© 2026 MEET CHHUGANI</span>
        <span>AI ENGINEER · APPLIED ML · NEXT.JS / TYPESCRIPT</span>
        <div>
          <a href={portfolioIdentity.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href={portfolioIdentity.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          <a href={`mailto:${portfolioIdentity.email}`}>EMAIL</a>
          <a href="/Meet_Chhugani_Resume.pdf" download>RESUME</a>
        </div>
      </footer>

      <ProjectCaseStudyModal
        project={detail}
        onClose={() => setDetail(null)}
        primaryAccentColor={role === "backendDev" ? "text-[#d4ff24]" : "text-[#7fa9ff]"}
      />
      <CommandPalette isOpen={palette} onClose={() => setPalette(false)} />
    </main>
  );
}