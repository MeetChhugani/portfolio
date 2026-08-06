"use client";

import React, { createContext, useContext, useState } from "react";
import { RoleType, contentByRole, RoleContent } from "@/data/contentByRole";

export type DomainType = "backend" | "ai" | "ml" | "deploy" | "data" | "arch" | null;

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  content: RoleContent;
  hoveredTech: string | null;
  setHoveredTech: (tech: string | null) => void;
  hoveredDomain: DomainType;
  setHoveredDomain: (domain: DomainType) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>("hybrid");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<DomainType>(null);

  const content = contentByRole[role];

  return (
    <RoleContext.Provider value={{ role, setRole, content, hoveredTech, setHoveredTech, hoveredDomain, setHoveredDomain }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
