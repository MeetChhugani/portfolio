"use client";

import React from "react";
import { useRole, DomainType } from "@/context/RoleContext";

// Domain classification for known technologies
const TECH_DOMAIN_MAP: Record<string, DomainType> = {
  // Backend / API
  "fastapi": "backend",
  "django": "backend",
  "rest api": "backend",
  "rest apis": "backend",
  "jwt": "backend",
  "rbac": "backend",
  "sqlalchemy": "backend",
  "alembic": "backend",
  "pydantic": "backend",
  "celery": "backend",
  "python": "backend",
  "typescript": "backend",

  // AI / LLM
  "groq": "ai",
  "groq api": "ai",
  "groq llama": "ai",
  "llm": "ai",
  "llms": "ai",
  "rag": "ai",
  "langchain": "ai",
  "prompt engineering": "ai",
  "generative ai": "ai",
  "ai agents": "ai",
  "huggingface": "ai",
  "transformers": "ai",
  "openai": "ai",
  "nlp": "ai",
  "mediapipe": "ai",
  "ocr": "ai",
  "tesseract ocr": "ai",

  // Machine Learning
  "scikit-learn": "ml",
  "scikit": "ml",
  "xgboost": "ml",
  "shap": "ml",
  "random forest": "ml",
  "tensorflow": "ml",
  "pytorch": "ml",
  "pandas": "ml",
  "numpy": "ml",
  "machine learning": "ml",
  "deep learning": "ml",
  "feature engineering": "ml",
  "statistical modeling": "ml",
  "mlops": "ml",
  "mlflow": "ml",

  // Deployment / Infra
  "docker": "deploy",
  "azure": "deploy",
  "azure ai": "deploy",
  "ci/cd": "deploy",
  "github actions": "deploy",
  "kubernetes": "deploy",
  "linux": "deploy",
  "vercel": "deploy",
  "streamlit": "deploy",
  "flutter": "deploy",

  // Data / Database
  "postgresql": "data",
  "redis": "data",
  "sql": "data",
  "mongodb": "data",
  "sqlite": "data",
  "database": "data",
  "alembic migrations": "data",

  // Architecture
  "system design": "arch",
  "microservices": "arch",
  "grpc": "arch",
  "api design": "arch",
  "rest api design": "arch",
  "architecture": "arch",
  "jwt authentication": "arch",
};

export function getTechDomain(tech: string): DomainType {
  const normalized = tech.toLowerCase().trim();
  return TECH_DOMAIN_MAP[normalized] ?? "backend"; // default to backend for unknown
}

export function getDomainColors(domain: DomainType): {
  cssClass: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  bgColor: string;
} {
  const map = {
    backend: {
      cssClass: "tech-tag-backend",
      textColor: "#34d399",
      borderColor: "rgba(52, 211, 153, 0.4)",
      glowColor: "rgba(52, 211, 153, 0.25)",
      bgColor: "rgba(52, 211, 153, 0.1)",
    },
    ai: {
      cssClass: "tech-tag-ai",
      textColor: "#22d3ee",
      borderColor: "rgba(34, 211, 238, 0.4)",
      glowColor: "rgba(34, 211, 238, 0.25)",
      bgColor: "rgba(34, 211, 238, 0.1)",
    },
    ml: {
      cssClass: "tech-tag-ml",
      textColor: "#a78bfa",
      borderColor: "rgba(167, 139, 250, 0.4)",
      glowColor: "rgba(167, 139, 250, 0.25)",
      bgColor: "rgba(167, 139, 250, 0.1)",
    },
    deploy: {
      cssClass: "tech-tag-deploy",
      textColor: "#fbbf24",
      borderColor: "rgba(251, 191, 36, 0.4)",
      glowColor: "rgba(251, 191, 36, 0.25)",
      bgColor: "rgba(251, 191, 36, 0.1)",
    },
    data: {
      cssClass: "tech-tag-data",
      textColor: "#2dd4bf",
      borderColor: "rgba(45, 212, 191, 0.4)",
      glowColor: "rgba(45, 212, 191, 0.25)",
      bgColor: "rgba(45, 212, 191, 0.1)",
    },
    arch: {
      cssClass: "tech-tag-arch",
      textColor: "#818cf8",
      borderColor: "rgba(129, 140, 248, 0.4)",
      glowColor: "rgba(129, 140, 248, 0.25)",
      bgColor: "rgba(129, 140, 248, 0.1)",
    },
  };
  return map[domain ?? "backend"] ?? map.backend;
}

interface TechTagProps {
  tech: string;
  /** Override domain detection */
  domain?: DomainType;
  /** Whether the tag is the active globally-hovered tech */
  isActive?: boolean;
  /** Called when this tag is hovered in or out */
  onHover?: (tech: string, domain: DomainType, active: boolean) => void;
  className?: string;
}

const TechTag: React.FC<TechTagProps> = ({
  tech,
  domain: domainOverride,
  isActive = false,
  onHover,
  className = "",
}) => {
  const { setHoveredTech, setHoveredDomain } = useRole();
  const domain = domainOverride ?? getTechDomain(tech);
  const colors = getDomainColors(domain);

  const handleMouseEnter = () => {
    setHoveredTech(tech.toLowerCase());
    setHoveredDomain(domain);
    onHover?.(tech, domain, true);
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
    setHoveredDomain(null);
    onHover?.(tech, domain, false);
  };

  return (
    <span
      className={`tech-tag ${colors.cssClass} ${isActive ? "active" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-label={`tech: ${tech}`}
      data-domain={domain}
    >
      {tech}
    </span>
  );
};

export default TechTag;
