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
  Code
} from "lucide-react";
import { useRole } from "@/context/RoleContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose
}) => {
  const { setRole } = useRole();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (anchor: string) => {
    onClose();
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-[#08090e] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs"
        >
          <Command className="w-full">
            <div className="flex items-center px-4 border-b border-zinc-800 bg-[#050609]">
              <Search className="w-4 h-4 text-zinc-500 mr-2.5 shrink-0" />
              <Command.Input
                placeholder="Type a command or search sections..."
                className="w-full bg-transparent py-4 text-zinc-200 placeholder-zinc-500 focus:outline-none text-xs font-mono"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer ml-2"
                aria-label="Close Command Palette"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-3 flex flex-col gap-1.5 font-mono">
              <Command.Empty className="py-6 text-center text-zinc-500 font-mono text-xs">
                No matching results found.
              </Command.Empty>

              <Command.Group heading="ROLE PRIORITIZATION" className="text-[0.6rem] font-bold text-zinc-500 uppercase px-2 mb-1">

                <Command.Item
                  onSelect={() => { setRole("backendDev"); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Code className="w-4 h-4 text-sky-400" />
                    <span>🐍 Switch to Python Backend Developer View</span>
                  </div>
                </Command.Item>

                <Command.Item
                  onSelect={() => { setRole("dataScience"); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>🤖 Switch to AI / ML Engineer View</span>
                  </div>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="PAGE NAVIGATION" className="text-[0.6rem] font-bold text-zinc-500 uppercase px-2 mt-3 mb-1">
                <Command.Item
                  onSelect={() => navigateTo("#hero")}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>Go to Hero Workspace</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </Command.Item>

                <Command.Item
                  onSelect={() => navigateTo("#about")}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>Go to Engineering Dossier (About Me)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </Command.Item>

                <Command.Item
                  onSelect={() => navigateTo("#skills")}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Go to Systems Stack Dependency Map</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </Command.Item>

                <Command.Item
                  onSelect={() => navigateTo("#projects")}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Go to Flagship Projects Directory</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </Command.Item>

                <Command.Item
                  onSelect={() => navigateTo("#contact")}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>Go to Contact & Direct Message</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </Command.Item>
              </Command.Group>

              <Command.Group heading="ACTIONS" className="text-[0.6rem] font-bold text-zinc-500 uppercase px-2 mt-3 mb-1">
                <Command.Item
                  onSelect={() => {
                    const link = document.createElement("a");
                    link.href = "/Meet_Chhugani_Resume.pdf";
                    link.download = "Meet_Chhugani_Resume.pdf";
                    link.click();
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-zinc-900 hover:text-emerald-400 text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download PDF Resume</span>
                  </div>
                  <span className="text-[0.55rem] text-zinc-500 uppercase">PDF</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="p-3 border-t border-zinc-800 bg-[#050609] flex justify-between items-center text-[0.6rem] text-zinc-500 font-mono">
              <span>USE ARROW KEYS & ENTER TO NAVIGATE</span>
              <span>ESC TO CLOSE</span>
            </div>
          </Command>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
