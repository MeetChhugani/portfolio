"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  FolderGit2,
  Cpu,
  X,
  ArrowRight,
  User,
  Mail,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const itemClass =
  "flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer text-[#c6d4ee] transition-colors data-[selected=true]:bg-[#0b1730] data-[selected=true]:text-[#d4ff24]";

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const navigateTo = (anchor: string) => {
    onClose();
    const el = document.querySelector(anchor);
    // Let the palette unmount and release the body scroll lock before scrolling.
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#030407]/85 backdrop-blur-md flex items-start justify-center pt-24 px-4 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="command-surface w-full max-w-xl border border-[rgba(127,164,255,0.22)] bg-[#050a14] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-xs"
          >
            <Command className="w-full">
              <div className="flex items-center px-4 border-b border-[rgba(127,164,255,0.16)] bg-[#04070e]">
                <Search className="w-4 h-4 text-[#d4ff24] mr-2.5 shrink-0" />
                <Command.Input
                  placeholder="Jump to a section, open a project, or grab the resume..."
                  className="w-full bg-transparent py-4 text-[#eef3ff] placeholder-[#5e6d89] focus:outline-none text-xs font-mono"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg bg-[#0a1424] border border-[rgba(127,164,255,0.2)] text-[#94a5c3] hover:text-[#d4ff24] hover:border-[#d4ff24]/50 cursor-pointer ml-2 transition-colors"
                  aria-label="Close Command Palette"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-3 flex flex-col gap-1.5 font-mono">
                <Command.Empty className="py-6 text-center text-[#7284a6] font-mono text-xs">
                  No matching results found.
                </Command.Empty>

                <Command.Group heading="PAGE NAVIGATION" className="text-[0.6rem] font-bold text-[#7284a6] uppercase px-2 mt-3 mb-1">
                  <Command.Item onSelect={() => navigateTo("#home")} className={itemClass}>
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-[#94a5c3]" />
                      <span>Go to Hero Workspace</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#56698a]" />
                  </Command.Item>

                  <Command.Item onSelect={() => navigateTo("#work")} className={itemClass}>
                    <div className="flex items-center gap-2.5">
                      <FolderGit2 className="w-4 h-4 text-[#d4ff24]" />
                      <span>Go to Selected Work</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#56698a]" />
                  </Command.Item>

                  <Command.Item onSelect={() => navigateTo("#lab")} className={itemClass}>
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-[#7fa9ff]" />
                      <span>Go to Tech Stack &amp; Background</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#56698a]" />
                  </Command.Item>

                  <Command.Item onSelect={() => navigateTo("#contact")} className={itemClass}>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#5bd1ff]" />
                      <span>Go to Contact &amp; Direct Message</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#56698a]" />
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="ACTIONS" className="text-[0.6rem] font-bold text-[#7284a6] uppercase px-2 mt-3 mb-1">
                  <Command.Item
                    onSelect={() => {
                      const link = document.createElement("a");
                      link.href = "/Meet_Chhugani_Resume.pdf";
                      link.download = "Meet_Chhugani_Resume.pdf";
                      link.click();
                      onClose();
                    }}
                    className={itemClass}
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-[#d4ff24]" />
                      <span>Download PDF Resume</span>
                    </div>
                    <span className="text-[0.55rem] text-[#7284a6] uppercase">PDF</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="p-3 border-t border-[rgba(127,164,255,0.16)] bg-[#04070e] flex justify-between items-center text-[0.6rem] text-[#7284a6] font-mono">
                <span>↑ ↓ NAVIGATE · ENTER SELECT</span>
                <span>ESC CLOSE</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
