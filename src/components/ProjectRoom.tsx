"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import type { PortfolioProject } from "@/data/portfolioContent";
import "./ProjectRoom.css";

type Scene = "module" | "entering" | "room" | "exiting";

interface ProjectRoomProps {
  projects: PortfolioProject[];
  onOpenCaseStudy: (project: PortfolioProject) => void;
  suspended?: boolean;
}

interface RoomMeta {
  tag: string;
  badge: string;
  headline: string;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

const ROOM_META: Record<string, RoomMeta> = {
  attrition: { tag: "EXPLAINABLE ML", badge: "0.89 AUC", headline: "0.89 ROC-AUC" },
  quizlab: { tag: "RAG / NLP", badge: "RAG", headline: "<50ms retrieval" },
  interview: { tag: "COMPUTER VISION", badge: "VISION", headline: "<150ms / frame" },
  businessos: { tag: "BACKEND SYSTEMS", badge: "API", headline: "100+ REST APIs" },
  sentiment: { tag: "NLP / LLM", badge: "NLP", headline: "3,000+ headlines" },
};

const SPARKS = [
  "M2 22 L18 18 L34 20 L50 12 L66 14 L82 7 L98 9 L118 3",
  "M2 20 L18 21 L34 15 L50 17 L66 10 L82 12 L98 6 L118 8",
  "M2 18 L18 22 L34 16 L50 19 L66 8 L82 14 L98 5 L118 10",
  "M2 24 L18 20 L34 22 L50 15 L66 17 L82 11 L98 13 L118 6",
  "M2 16 L18 20 L34 12 L50 18 L66 9 L82 15 L98 8 L118 4",
];

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const pad = (value: number) => String(value).padStart(2, "0");

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const metaFor = (project: PortfolioProject): RoomMeta =>
  ROOM_META[project.id] ?? {
    tag: project.tag.split("·")[0].trim(),
    badge: project.metric.split("|")[0].trim(),
    headline: project.metrics[0]?.val ?? project.metric,
  };

const setGeometry = (element: HTMLElement, box: Box) => {
  element.style.left = `${box.left}px`;
  element.style.top = `${box.top}px`;
  element.style.width = `${box.width}px`;
  element.style.height = `${box.height}px`;
};

const toStage = (rect: DOMRect, stage: HTMLElement): Box => {
  const stageRect = stage.getBoundingClientRect();
  return {
    left: rect.left - stageRect.left,
    top: rect.top - stageRect.top,
    width: rect.width,
    height: rect.height,
  };
};

const targetFor = (stage: HTMLElement): Box => {
  const inset = stage.clientWidth < 560 ? 6 : 10;
  return {
    left: inset,
    top: inset,
    width: stage.clientWidth - inset * 2,
    height: stage.clientHeight - inset * 2,
  };
};

export function ProjectRoom({ projects, onOpenCaseStudy, suspended = false }: ProjectRoomProps) {
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);

  const [scene, setScene] = useState<Scene>("module");
  const [roomEnter, setRoomEnter] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [flashNonce, setFlashNonce] = useState(0);
  const [status, setStatus] = useState(
    () => `ROOM CLOSED · ONE MODULE · ${projects.length} SYSTEMS`
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sceneRef = useRef<Scene>("module");
  const openIndexRef = useRef<number | null>(null);
  const closingRef = useRef(false);
  const pendingFocusRef = useRef<number | null>(null);
  const pendingSceneFocusRef = useRef<"room" | "module" | null>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);
  const timers = useRef<number[]>([]);

  const count = projects.length;
  const countLabel = pad(count);
  const countWord = COUNT_WORDS[count] ?? String(count);
  const activeProject = openIndex !== null ? projects[openIndex] ?? null : null;
  const activeMeta = activeProject ? metaFor(activeProject) : null;

  const after = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const cutTime = reduced ? 40 : 280;
  const morphTime = reduced ? 30 : 560;

  const triggerFlash = useCallback(() => {
    setFlashNonce((nonce) => nonce + 1);
    setFlashOn(true);
    after(reduced ? 140 : 820, () => setFlashOn(false));
  }, [after, reduced]);

  const enterRoom = useCallback(() => {
    if (sceneRef.current !== "module") return;
    sceneRef.current = "entering";
    setScene("entering");
    setStatus("UNZIPPING · THE PROJECT ROOM");
    if (!reduced) after(380, triggerFlash);
    after(reduced ? 40 : 700, () => {
      if (sceneRef.current !== "entering") return;
      sceneRef.current = "room";
      pendingSceneFocusRef.current = "room";
      setScene("room");
      setRoomEnter(false);
      setStatus(`ROOM OPEN · ${count} SYSTEMS LOADED · ESC TO LEAVE`);
      window.requestAnimationFrame(() => setRoomEnter(true));
      after(1600, () => setRoomEnter(false));
    });
  }, [after, count, reduced, triggerFlash]);

  const exitRoom = useCallback(() => {
    if (sceneRef.current !== "room" || openIndexRef.current !== null || closingRef.current) return;
    sceneRef.current = "exiting";
    setScene("exiting");
    setRoomEnter(false);
    setStatus("CLOSING THE ROOM");
    triggerFlash();
    after(cutTime, () => {
      if (sceneRef.current !== "exiting") return;
      sceneRef.current = "module";
      pendingSceneFocusRef.current = "module";
      setScene("module");
      setStatus(`ROOM CLOSED · ONE MODULE · ${count} SYSTEMS`);
    });
  }, [after, count, cutTime, triggerFlash]);

  const openProject = useCallback(
    (index: number) => {
      if (sceneRef.current !== "room" || openIndexRef.current !== null || closingRef.current) return;
      const card = cardRefs.current[index];
      const project = projects[index];
      if (!card || !project) return;

      sourceRectRef.current = card.getBoundingClientRect();
      openIndexRef.current = index;
      setOpenIndex(index);
      setSourceIndex(index);
      setZoomed(true);
      setStatus(`OPENING CASE · ${project.title.toUpperCase()}`);

      after(morphTime, () => {
        if (openIndexRef.current !== index || closingRef.current) return;
        closeRef.current?.focus({ preventScroll: true });
      });
      after(morphTime + 80, () => {
        if (openIndexRef.current !== index || closingRef.current) return;
        setStatus(`OPEN · ${project.title.toUpperCase()} · ESC TO RETURN`);
      });
    },
    [after, morphTime, projects]
  );

  const closeProject = useCallback(() => {
    const index = openIndexRef.current;
    if (index === null || closingRef.current) return;
    const sourceCard = cardRefs.current[index];
    const panel = panelRef.current;
    const stage = stageRef.current;
    closingRef.current = true;

    panel?.classList.remove("is-open");
    setZoomed(false);
    setSourceIndex(null);
    setStatus("RETURNING TO THE ROOM");

    if (panel && stage && sourceCard) {
      panel.style.borderRadius = "14px";
      const rect = sourceCard.getBoundingClientRect();
      sourceRectRef.current = rect;
      setGeometry(panel, toStage(rect, stage));
    }

    after(morphTime + 40, () => {
      openIndexRef.current = null;
      closingRef.current = false;
      sourceRectRef.current = null;
      pendingFocusRef.current = index;
      setOpenIndex(null);
      setStatus(`ROOM OPEN · ${count} SYSTEMS LOADED · ESC TO LEAVE`);
    });
  }, [after, count, morphTime]);

  useEffect(() => {
    if (openIndex !== null) return;
    const index = pendingFocusRef.current;
    if (index === null) return;
    pendingFocusRef.current = null;
    cardRefs.current[index]?.focus({ preventScroll: true });
  }, [openIndex]);

  useEffect(() => {
    const target = pendingSceneFocusRef.current;
    if (target === null || target !== scene) return;
    pendingSceneFocusRef.current = null;
    if (scene === "room") backRef.current?.focus({ preventScroll: true });
    else enterRef.current?.focus({ preventScroll: true });
  }, [scene]);

  useIsomorphicLayoutEffect(() => {
    if (openIndex === null) return;
    const panel = panelRef.current;
    const stage = stageRef.current;
    if (!panel || !stage) return;

    const target = targetFor(stage);
    const source = sourceRectRef.current;
    panel.style.transition = "none";
    panel.style.borderRadius = "14px";
    setGeometry(panel, source ? toStage(source, stage) : target);
    void panel.getBoundingClientRect();

    const frame = window.requestAnimationFrame(() => {
      panel.style.transition = "";
      setGeometry(panel, target);
      panel.style.borderRadius = "8px";
      panel.classList.add("is-open");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [openIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || suspended) return;
      if (openIndexRef.current !== null) {
        closeProject();
      } else if (sceneRef.current === "room") {
        exitRoom();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeProject, exitRoom, suspended]);

  useEffect(() => {
    const onResize = () => {
      if (openIndexRef.current === null || closingRef.current) return;
      const panel = panelRef.current;
      const stage = stageRef.current;
      if (!panel || !stage) return;
      const card = cardRefs.current[openIndexRef.current];
      if (card) sourceRectRef.current = card.getBoundingClientRect();
      panel.style.transition = "none";
      setGeometry(panel, targetFor(stage));
      void panel.getBoundingClientRect();
      panel.style.transition = "";
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stageClass = [
    "rm-stage",
    scene === "entering" ? "is-entering" : "",
    scene === "exiting" ? "is-exiting" : "",
    zoomed ? "is-zoomed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="project-room">
      <div className="rm-shell">
        <div className="rm-topbar">
          <span>01 / <b>SELECTED WORK</b></span>
          <span className="rm-meta">GATEWAY MODULE · {countLabel} SYSTEMS</span>
        </div>

        <div className={stageClass} ref={stageRef}>
          <div className="rm-grid" aria-hidden="true" />
          {flashOn && <div key={`flash-${flashNonce}`} className="rm-flash is-run" aria-hidden="true" />}
          {flashOn && <div key={`beam-${flashNonce}`} className="rm-beam is-run" aria-hidden="true" />}

          <div className="rm-module" hidden={scene === "room" || scene === "exiting"}>
            <div className="rm-door">
              <div className="rm-door-grid" aria-hidden="true" />
              <div className="rm-copy">
                <span className="rm-kicker">THE PROJECT ROOM</span>
                <h3>
                  I build things.
                  <br />
                  <em>Let&rsquo;s see what I&rsquo;ve done.</em>
                </h3>
                <p>
                  {countWord} production-minded systems across applied AI, explainable ML, computer vision, and
                  backend engineering.
                </p>
                <button className="rm-enter" ref={enterRef} type="button" onClick={enterRoom}>
                  ENTER THE PROJECT ROOM <span aria-hidden="true">↗</span>
                </button>
                <span className="rm-list">{countLabel} SYSTEMS · ML · RAG · VISION · BACKEND · LLM</span>
              </div>

              <div className="rm-portal" aria-hidden="true">
                <div className="rm-portal-rows">
                  {projects.map((project, index) => (
                    <span key={project.id}>
                      <i>{pad(index + 1)}</i>
                      <em>{project.title}</em>
                      <b>{metaFor(project).badge}</b>
                    </span>
                  ))}
                </div>
                <div className="rm-portal-hint">ZIP TO <em>PEEK</em> · ENTER TO OPEN</div>
                <div className="rm-zip-gap" />
                <div className="rm-leaf rm-leaf-a" />
                <div className="rm-leaf rm-leaf-b" />
                <div className="rm-zipper">
                  <div className="rm-zip-teeth" />
                  <div className="rm-zip-slider" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rm-room${roomEnter ? " is-enter" : ""}`}
            hidden={scene === "module" || scene === "entering"}
            aria-hidden={scene !== "room"}
          >
            <div className="rm-floor" aria-hidden="true" />
            <div className="rm-comet" aria-hidden="true" />
            <div className="rm-room-head">
              <div>
                <span className="rm-kicker">PROJECT ROOM / {countLabel} SYSTEMS</span>
                <h3>Inside the room.</h3>
              </div>
              <button
                className="rm-back"
                ref={backRef}
                type="button"
                onClick={exitRoom}
                tabIndex={openIndex !== null ? -1 : 0}
                aria-hidden={openIndex !== null}
              >
                ← BACK TO MODULE
              </button>
            </div>
            <div
              className="rm-cards"
              inert={openIndex !== null}
              aria-hidden={openIndex !== null}
            >
              {projects.map((project, index) => {
                const meta = metaFor(project);
                return (
                  <button
                    key={project.id}
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className={`rm-card${sourceIndex === index ? " is-source" : ""}`}
                    style={{ "--i": index } as CSSProperties}
                    type="button"
                    onClick={() => openProject(index)}
                    onTouchStart={() => {}}
                    onPointerMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                      event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
                    }}
                    aria-label={`Open ${project.title} case study`}
                  >
                    <span className="rm-card-top">
                      <i>{pad(index + 1)}</i>
                      <span>{meta.tag}</span>
                    </span>
                    <strong>{project.title}</strong>
                    <svg className="rm-spark" viewBox="0 0 120 28" aria-hidden="true">
                      <path d={SPARKS[index % SPARKS.length]} />
                    </svg>
                    <span className="rm-card-bottom">
                      <span className="rm-tags">
                        {project.stack.slice(0, 3).map((item) => (
                          <i key={item}>{item}</i>
                        ))}
                      </span>
                      <b>{meta.headline}</b>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <section
            className="rm-panel"
            ref={panelRef}
            role="dialog"
            aria-label={activeProject ? `${activeProject.title} case study preview` : "Case study preview"}
            hidden={openIndex === null}
          >
            {activeProject && activeMeta && openIndex !== null && (
              <div className="rm-panel-inner">
                <div className="rm-panel-head">
                  <span className="rm-kicker">
                    {pad(openIndex + 1)} /<span className="rm-case-tag"> {activeMeta.tag} /</span> CASE STUDY
                  </span>
                  <button className="rm-close" ref={closeRef} type="button" onClick={closeProject}>
                    CLOSE <span>ESC</span>
                  </button>
                </div>

                <div className="rm-panel-body">
                  <div>
                    <h4>{activeProject.title}</h4>
                    <p className="rm-desc">{activeProject.solution}</p>
                    <div className="rm-panel-tags">
                      {activeProject.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <span className="rm-panel-label rm-decisions">ENGINEERING DECISIONS</span>
                    <ul className="rm-outcomes">
                      {activeProject.challenges.map((challenge, index) => (
                        <li key={`${activeProject.id}-challenge-${index}`}>{challenge}</li>
                      ))}
                    </ul>
                    <span className="rm-panel-label rm-flow-label">ARCHITECTURE FLOW</span>
                    <div className="rm-flow">
                      {activeProject.architectureFlow.map((node, index) => (
                        <Fragment key={`${activeProject.id}-${node}-${index}`}>
                          {index > 0 && <i aria-hidden="true">→</i>}
                          <span>{node}</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="rm-panel-side">
                    <div className="rm-panel-stats">
                      {activeProject.metrics.map((metric) => (
                        <div key={`${activeProject.id}-${metric.label}`}>
                          <b>{metric.val}</b>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rm-problem">
                      <span className="rm-panel-label">THE PROBLEM</span>
                      <p>{activeProject.problem}</p>
                    </div>
                  </div>
                </div>

                <div className="rm-panel-foot">
                  <span data-panel-foot>CASE STUDY · {pad(openIndex + 1)}</span>
                  <button
                    className="rm-full"
                    type="button"
                    onClick={() => onOpenCaseStudy(activeProject)}
                  >
                    FULL CASE STUDY ↗
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="rm-foot">
          <p className="rm-status" role="status" aria-live="polite">{status}</p>
        </div>
      </div>
    </div>
  );
}
