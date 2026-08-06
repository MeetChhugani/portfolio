"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowUpRight, 
  Download, 
  Menu, 
  X, 
  Maximize2
} from "lucide-react";

import BackgroundMesh from "@/components/BackgroundMesh";
import SkillsEcosystem from "@/components/SkillsEcosystem";
import DecryptedText from "@/components/DecryptedText";
import ResumeViewer from "@/components/ResumeViewer";
import ContactForm from "@/components/ContactForm";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";
import { RoleTogglePill } from "@/components/RoleTogglePill";
import { HowIBuildSoftware } from "@/components/HowIBuildSoftware";
import { CurrentFocus } from "@/components/CurrentFocus";
import CarJourneyWrapper from "@/components/journey/CarJourneyWrapper";
import { ProjectCaseStudyModal, ProjectDetail } from "@/components/ProjectCaseStudyModal";
import { CommandPalette } from "@/components/CommandPalette";
import { useRole } from "@/context/RoleContext";

// Scroll-triggered animated counter with Framer Motion useInView
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// Fade-in animation variants (snappier transition speeds)
const fadeInVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const { role, content, hoveredTech, setHoveredTech } = useRole();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectDetail | null>(null);

  const [isCmdkOpen, setIsCmdkOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdkOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Typewriter effect state for roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter loop for active role list
  useEffect(() => {
    const roles = content.hero.rolesList;
    const targetRole = roles[roleIndex % roles.length] || roles[0];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentRoleText(targetRole.slice(0, currentRoleText.length + 1));
        if (currentRoleText === targetRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentRoleText(targetRole.slice(0, currentRoleText.length - 1));
        if (currentRoleText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentRoleText, isDeleting, roleIndex, content.hero.rolesList]);

  // Section Observer for Active Navigation Highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryAccentText = role === "backendDev" ? "text-sky-400" : role === "dataScience" ? "text-purple-400" : "text-emerald-400";
  const primaryAccentBg = role === "backendDev" ? "bg-sky-600 hover:bg-sky-700 shadow-sky-500/10" : role === "dataScience" ? "bg-purple-600 hover:bg-purple-700 shadow-purple-500/10" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10";

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      <main className="min-h-screen bg-[#050505]/70 text-zinc-300 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
        
        {/* Background Mesh Layer */}
        <BackgroundMesh />

        {/* Project Case Study Lightbox Modal */}
        <ProjectCaseStudyModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
          primaryAccentColor={primaryAccentText}
        />

        {/* Global Nav Bar Container */}
        <div className="relative z-50">
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900/80">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              
              {/* Brand Logo */}
              <Magnetic>
                <a href="#hero" className="flex items-center gap-2 group cursor-pointer" aria-label="Meet Chhugani Home" data-cursor-label="nav: home">
                  <span className={`w-2 h-2 rounded-full ${role === "backendDev" ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]" : role === "dataScience" ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-emerald-400 shadow-[0_0_8px_#34d399]"} group-hover:scale-125 transition-transform`} />
                  <span className="font-mono font-bold text-sm tracking-wider text-zinc-100 group-hover:text-cyan-400 transition-colors">
                    MEET.DEV
                  </span>
                  <span className="font-mono text-[0.65rem] text-zinc-500 hidden sm:inline-block">
                    [v2.6.0]
                  </span>
                </a>
              </Magnetic>

              {/* Navigation Anchors */}
              <nav className="hidden md:flex items-center gap-8 font-mono text-[0.7rem] tracking-widest uppercase">
                <Magnetic>
                  <a href="#about" className="relative group py-1 block" data-cursor-label="jump to about">
                    <DecryptedText 
                      text="ABOUT" 
                      speed={30} 
                      maxIterations={6} 
                      className={activeSection === "about" ? `${primaryAccentText} font-bold` : "text-zinc-400"}
                      encryptedClassName="text-zinc-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#skills" className="relative group py-1 block" data-cursor-label="jump to skills">
                    <DecryptedText 
                      text="SKILLS" 
                      speed={30} 
                      maxIterations={6} 
                      className={activeSection === "skills" ? `${primaryAccentText} font-bold` : "text-zinc-400"}
                      encryptedClassName="text-zinc-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#projects" className="relative group py-1 block" data-cursor-label="jump to projects">
                    <DecryptedText 
                      text="PROJECTS" 
                      speed={30} 
                      maxIterations={6} 
                      className={activeSection === "projects" ? `${primaryAccentText} font-bold` : "text-zinc-400"}
                      encryptedClassName="text-zinc-500"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#contact" className="relative group py-1 block" data-cursor-label="jump to contact">
                    <DecryptedText 
                      text="CONTACT" 
                      speed={30} 
                      maxIterations={6} 
                      className={activeSection === "contact" ? `${primaryAccentText} font-bold` : "text-zinc-400"}
                      encryptedClassName="text-zinc-500"
                    />
                  </a>
                </Magnetic>
              </nav>

              <div className="flex items-center gap-3">
                {/* Single Role Switcher Pill in Navbar */}
                <RoleTogglePill className="hidden md:flex" />

                {/* Command Palette ⌘K Trigger */}
                <button
                  onClick={() => setIsCmdkOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#08090e] border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 font-mono text-[0.62rem] cursor-pointer transition-all shadow-sm"
                  title="Open Command Palette (Cmd + K)"
                >
                  <span className="text-emerald-400 font-bold">⌘K</span>
                  <span>COMMANDS</span>
                </button>

                {/* Compact profile action */}
                <Magnetic>
                  <a
                    href="#contact"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3 py-1.5 text-[0.6rem] font-mono uppercase tracking-[0.2em] text-zinc-300 transition-all hover:border-emerald-500/40 hover:text-emerald-300"
                    data-cursor-label="contact me"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open for work</span>
                  </a>
                </Magnetic>

                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex md:hidden p-1.5 rounded-full border border-zinc-800 hover:border-cyan-400 text-zinc-400 hover:text-cyan-400 cursor-pointer transition-all"
                  aria-label="Toggle Mobile Menu"
                >
                  {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown Panel */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[110%] left-0 right-0 p-4 bg-[#070708]/95 border border-zinc-800/80 rounded-2xl shadow-2xl flex flex-col gap-2.5 backdrop-blur-md md:hidden z-[99]"
                >
                  <div className="flex justify-center my-1">
                    <RoleTogglePill />
                  </div>

                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono text-[0.68rem] tracking-widest py-2 rounded-lg text-center ${
                      activeSection === "about" ? `${primaryAccentText} font-bold` : "text-zinc-400"
                    }`}
                  >
                    ABOUT
                  </a>
                  <a 
                    href="#skills" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono text-[0.68rem] tracking-widest py-2 rounded-lg text-center ${
                      activeSection === "skills" ? `${primaryAccentText} font-bold` : "text-zinc-400"
                    }`}
                  >
                    SKILLS
                  </a>
                  <a 
                    href="#projects" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono text-[0.68rem] tracking-widest py-2 rounded-lg text-center ${
                      activeSection === "projects" ? `${primaryAccentText} font-bold` : "text-zinc-400"
                    }`}
                  >
                    PROJECTS
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono text-[0.68rem] tracking-widest py-2 rounded-lg text-center ${
                      activeSection === "contact" ? `${primaryAccentText} font-bold` : "text-zinc-400"
                    }`}
                  >
                    CONTACT
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>


        {/* Content Shell Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* HERO SECTION */}
          {/* ========================================== */}
          <section id="hero" className="min-h-[80vh] flex flex-col justify-between py-12 relative select-none">
            
            <div className="flex flex-col gap-5 mt-10">
              
              {/* Non-Clickable Dynamic Career Focus Status Indicator */}
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 bg-zinc-950/80 border border-zinc-850 px-3.5 py-1.5 rounded-full w-fit pointer-events-none select-none">
                <span className={`w-2 h-2 rounded-full ${role === "backendDev" ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]" : role === "dataScience" ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-emerald-400 shadow-[0_0_8px_#34d399]"} animate-pulse`} />
                <span className="text-zinc-500 uppercase">CURRENT CAREER FOCUS:</span>
                <span className={`font-bold ${primaryAccentText}`}>{content.emoji} {content.roleName}</span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`font-mono text-[0.7rem] ${primaryAccentText} tracking-[3px] uppercase mt-2`}
              >
                {role === "hybrid" ? "SYSTEMS + DATA" : `${content.hero.taglinePrefix}${/^[aeiou]/i.test(content.hero.rolesList[roleIndex % content.hero.rolesList.length] || "") ? "an " : "a "}`}<span className={role === "backendDev" ? "text-sky-300 font-bold border-r border-sky-400 pr-1 animate-pulse" : role === "dataScience" ? "text-purple-400 font-bold border-r border-purple-400 pr-1 animate-pulse" : "text-emerald-300 font-bold border-r border-emerald-400 pr-1 animate-pulse"}>{currentRoleText.toUpperCase()}</span>
              </motion.div>

              {/* Name Display */}
              <div className="relative leading-none">
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-7xl md:text-[8rem] font-bold tracking-tighter text-zinc-200"
                >
                  MEET
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className={`text-7xl md:text-[8rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${content.theme.gradientText} -mt-2 md:-mt-6`}
                >
                  CHHUGANI
                </motion.h1>
              </div>

              {/* Mode-Adaptive Subtitle & Description */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={role}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-1.5 max-w-[620px] mt-1"
                >
                  <h2 className="text-sm md:text-base font-bold font-mono text-zinc-200">
                    {content.hero.subtitle}
                  </h2>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
                    {content.hero.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Anchors (Primary: Download Resume) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Magnetic>
                <a 
                  href="/Meet_Chhugani_Resume.pdf" 
                  download
                  className={`${primaryAccentBg} text-white font-mono text-xs px-6 py-3 rounded-lg flex items-center gap-2 select-none cursor-pointer transition-all font-bold`}
                  aria-label="Download PDF Resume"
                  data-cursor-label="download resume pdf"
                >
                  <Download className="w-4 h-4" />
                  <span>{role === "backendDev" ? "DOWNLOAD BACKEND RESUME" : role === "dataScience" ? "DOWNLOAD ML RESUME" : "DOWNLOAD SYSTEMS RESUME"}</span>
                </a>
              </Magnetic>
              
              <Magnetic>
                <a 
                  href="#projects" 
                  className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-300 font-mono text-xs px-5 py-3 rounded-lg flex items-center gap-2 select-none cursor-pointer hover:text-white transition-all"
                  data-cursor-label="view system case studies"
                >
                  <span>{role === "backendDev" ? "API PROJECTS" : role === "dataScience" ? "DATA PROJECTS" : "SYSTEMS PROJECTS"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href="https://github.com/MeetChhugani" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 font-mono text-xs px-4 py-3 rounded-lg flex items-center gap-2 select-none cursor-pointer transition-all"
                  aria-label="GitHub Profile"
                  data-cursor-label="visit github profile"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GITHUB</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href="https://linkedin.com/in/meet-chhugani" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 font-mono text-xs px-4 py-3 rounded-lg flex items-center gap-2 select-none cursor-pointer transition-all"
                  aria-label="LinkedIn Profile"
                  data-cursor-label="visit linkedin profile"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LINKEDIN</span>
                </a>
              </Magnetic>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-0 flex items-center gap-3 text-zinc-500 font-mono text-[0.6rem] tracking-[3px] uppercase animate-pulse">
              <span className={`w-1.5 h-1.5 rounded-full ${role === "backendDev" ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]" : role === "dataScience" ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-emerald-400 shadow-[0_0_8px_#34d399]"} inline-block`} />
              <span>SCROLL TO TRAVERSE SYSTEM</span>
            </div>

          </section>

          {/* Blueprint Connection Line: Hero -> About */}
          <div className="flex justify-center h-16 relative pointer-events-none select-none my-4">
            <svg className="w-12 h-full" viewBox="0 0 48 64" fill="none">
              <motion.path
                d="M 24 0 L 24 64"
                stroke={role === "backendDev" ? "rgba(56, 189, 248, 0.25)" : "rgba(192, 132, 252, 0.25)"}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.circle
                cx="24"
                cy="32"
                r="3"
                fill={role === "backendDev" ? "#38bdf8" : role === "dataScience" ? "#c084fc" : "#34d399"}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
              />
            </svg>
          </div>

          {/* ABOUT & STATS SECTION */}
          {/* ========================================== */}
          <motion.section 
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-5 flex flex-col gap-4 select-none">
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
                  {content.eyebrows.aboutOverview}
                </span>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-4xl font-bold font-title text-zinc-100 leading-tight">
                      {content.about.headline}
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2 font-medium">
                      {content.about.bio}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Statistics Stack */}
                <div className="grid grid-cols-2 gap-4 mt-4 select-none">
                  {[
                    { val: 6, suffix: "+", label: "PYTHON REPOS BUILT" },
                    { val: 100, suffix: "+", label: "REST APIS ENGINEERED" },
                    { val: 4, suffix: "+", label: "PROD ML PIPELINES" },
                    { val: 4, suffix: "+", label: "VERIFIED CERTS" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0b0b0c]/60 border border-zinc-900 rounded-xl p-4 flex flex-col gap-1.5">
                      <span className={`text-2xl font-bold font-mono ${primaryAccentText}`}>
                        <AnimatedNumber value={stat.val} suffix={stat.suffix} />
                      </span>
                      <span className="text-[0.52rem] font-mono text-zinc-500 tracking-wider uppercase leading-none">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Breakdown */}
              <div className="lg:col-span-7 flex flex-col gap-4 select-none">
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
                  {content.eyebrows.aboutStack}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(() => {
                    const allStackItems: Record<string, { cat: string; stack: string; desc: string; color: string }> = {
                      "LANGUAGES": {
                        cat: "LANGUAGES",
                        stack: "Python, SQL, TypeScript",
                        desc: "Primary scripting & query languages for asynchronous web applications and analytical models.",
                        color: "border-sky-950/40 hover:border-sky-500/20 bg-sky-950/5 text-sky-400"
                      },
                      "TOOLS & FRAMEWORKS": {
                        cat: "FRAMEWORKS & DEVOPS",
                        stack: "FastAPI, Django, PostgreSQL, Redis, Docker, Git",
                        desc: "Building clean microservices, relational schemas, Redis caching, and Docker containers.",
                        color: "border-teal-950/40 hover:border-teal-500/20 bg-teal-950/5 text-teal-400"
                      },
                      "MACHINE LEARNING": {
                        cat: "MACHINE LEARNING",
                        stack: "Scikit-learn, XGBoost, Random Forest, SHAP, NLP",
                        desc: "Supervised classification, model evaluation, SHAP explainability, and feature engineering.",
                        color: "border-purple-950/40 hover:border-purple-500/20 bg-purple-950/5 text-purple-400"
                      },
                      "DATA ANALYTICS": {
                        cat: "DATA & ANALYTICS",
                        stack: "Pandas, NumPy, SQL Queries, EDA, Plotly",
                        desc: "Data cleaning workflows, structuring analytical datasets, and reporting dashboards.",
                        color: "border-cyan-950/40 hover:border-cyan-500/20 bg-cyan-950/5 text-cyan-400"
                      },
                      "ARTIFICIAL INTELLIGENCE": {
                        cat: "AI INTEGRATIONS",
                        stack: "Groq LLaMA API, RAG, Prompt Engineering, MediaPipe",
                        desc: "Implementing Retrieval-Augmented Generation, LLM API commentary, and real-time vision telemetry.",
                        color: "border-blue-950/40 hover:border-blue-500/20 bg-blue-950/5 text-blue-400 sm:col-span-2"
                      }
                    };

                    return content.about.stackCategoryOrder.map((catKey) => {
                      const item = allStackItems[catKey];
                      if (!item) return null;
                      return (
                        <div 
                          key={catKey} 
                          className={`p-4 rounded-xl border bg-[#0b0b0c]/40 transition-all duration-300 ${item.color} flex flex-col justify-between`}
                        >
                          <div>
                            <span className="font-mono text-[0.55rem] opacity-60 block tracking-wider">{item.cat}</span>
                            <h4 className="font-title font-bold text-xs text-zinc-100 mt-1 leading-snug">{item.stack}</h4>
                          </div>
                          <p className="text-[0.65rem] text-zinc-400 leading-relaxed mt-2">{item.desc}</p>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

            </div>
          </motion.section>

          {/* Blueprint Connection Line: About -> Skills */}
          <div className="flex justify-center h-16 relative pointer-events-none select-none my-4">
            <svg className="w-24 h-full" viewBox="0 0 96 64" fill="none">
              <motion.path
                d="M 48 0 L 48 16 L 16 32 L 16 48 L 48 64 M 48 16 L 80 32 L 80 48 L 48 64"
                stroke={role === "backendDev" ? "rgba(56, 189, 248, 0.25)" : "rgba(192, 132, 252, 0.25)"}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* SKILLS ECOSYSTEM */}
          {/* ========================================== */}
          <motion.section 
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-12"
          >
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
                  {content.eyebrows.skillsVisualizer}
                </span>
                <h2 className="text-3xl font-bold font-title text-zinc-100 mt-2">
                  {role === "backendDev" ? "Interactive Backend Competency Visualizer" : role === "dataScience" ? "Interactive ML Competency Visualizer" : "Interactive Systems Competency Visualizer"}
                </h2>
              </div>

              <SkillsEcosystem />
            </div>
          </motion.section>

          {/* SCROLL-DRIVEN 3D CAR JOURNEY SECTION */}
          {/* ========================================== */}
          <CarJourneyWrapper />

          {/* Blueprint Connection Line: Skills -> Projects */}
          <div className="flex justify-center h-16 relative pointer-events-none select-none my-4">
            <svg className="w-24 h-full" viewBox="0 0 96 64" fill="none">
              <motion.path
                d="M 48 0 L 48 24 L 8 24 L 8 48 L 48 48 L 48 64"
                stroke={role === "backendDev" ? "rgba(56, 189, 248, 0.25)" : "rgba(192, 132, 252, 0.25)"}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* PROJECT CASE STUDIES (PREMIUM DISCOVERABILITY & HOVER INTERACTIONS) */}
          {/* ========================================== */}
          <section id="projects" className="py-16 relative">
            <div className="mb-12">
              <span className="text-[0.6rem] font-mono text-zinc-500 tracking-[3px] uppercase">
                {content.eyebrows.caseStudiesHeader}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-title text-zinc-100 mt-2">
                Engineering Case Studies
              </h2>
              <p className="text-xs text-zinc-400 max-w-[600px] leading-relaxed mt-1 font-medium">
                Production-grade applications built with FastAPI, PostgreSQL, Redis, Groq LLaMA, Scikit-learn, and SHAP explainability.
              </p>
            </div>

            {(() => {
              const caseStudiesMap: Record<string, ProjectDetail & { rightPanel: React.ReactNode }> = {
                businessos: {
                  id: "businessos",
                  tag: "ENTERPRISE_ERP_PLATFORM",
                  metric: "100+ REST APIs | 8 Modules",
                  title: "AI BusinessOS – Enterprise AI ERP Platform",
                  subtitle: "Python, FastAPI, PostgreSQL, Redis, Docker, JWT, Groq LLaMA RAG",
                  problem: "Small & medium enterprises struggle with fragmented operations across HR, CRM, Inventory, and Finance, requiring unified role-based authorization and automated AI insight processing.",
                  solution: "Architected a production-grade, modular ERP platform using Clean Architecture. Engineered 100+ async FastAPI REST endpoints with PostgreSQL 16 schema migrations (Alembic), Redis token rotation, and an AI Copilot using Groq LLaMA & RAG.",
                  architectureFlow: ["Client SPA", "FastAPI Gateway", "PostgreSQL 16", "Redis Auth Cache", "Groq LLM RAG"],
                  challenges: [
                    "Designed normalized PostgreSQL schemas across 8 modules covering employees, transactions, and inventory.",
                    "Implemented JWT token rotation and 7-role RBAC security matrix with audit logging.",
                    "Containerized microservices via Docker for zero-downtime service execution."
                  ],
                  metrics: [
                    { label: "REST ENDPOINTS", val: "100+ APIs" },
                    { label: "RBAC ROLES", val: "7 Enterprise Levels" },
                    { label: "DATABASE", val: "PostgreSQL 16 Async" },
                    { label: "CONTAINERIZATION", val: "Docker Compose" }
                  ],
                  stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "SQLAlchemy 2", "Alembic", "Groq API"],
                  githubUrl: "https://github.com/MeetChhugani/AI-BusinessOS",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] select-none hover:border-sky-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">MINI ARCHITECTURE FLOW DIAGRAM</span>
                          <span className="text-[0.6rem] font-mono text-sky-400 font-bold bg-sky-950/40 border border-sky-900/60 px-2 py-0.5 rounded">CLEAN ARCHITECTURE</span>
                        </div>

                        {/* Visual Flow Diagram */}
                        <div className="flex flex-wrap items-center gap-2 mt-5 font-mono text-xs">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                            Client (React)
                          </div>
                          <span className="text-sky-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-800 text-sky-300 font-bold">
                            FastAPI Gateway
                          </div>
                          <span className="text-sky-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800 text-purple-300">
                            PostgreSQL 16
                          </div>
                          <span className="text-sky-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800 text-blue-300">
                            Redis Cache
                          </div>
                          <span className="text-sky-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-800 text-teal-300">
                            Groq LLaMA RAG
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">AUTHENTICATION ENGINE</span>
                            <span className="font-mono text-sm font-bold text-sky-400 block mt-0.5">JWT Token Rotation</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">SYSTEM BACKEND</span>
                            <span className="font-mono text-sm font-bold text-teal-400 block mt-0.5">100+ Async REST APIs</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-sky-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND ENGINEERING DETAILS
                        </span>
                        <span>Dockerized Build</span>
                      </div>
                    </div>
                  )
                },
                interview: {
                  id: "interview",
                  tag: "REALTIME_AI_BACKEND",
                  metric: "FastAPI + MediaPipe + Groq",
                  title: "AI-Powered Mock Interview Analyzer",
                  subtitle: "Flutter, Python, FastAPI, MediaPipe, NLP, Groq LLaMA",
                  problem: "Candidates lack quantitative feedback on speech pacing, eye contact stability, facial sentiment signals, and response alignment during remote interview practice.",
                  solution: "Designed a FastAPI backend serving real-time posture telemetry endpoints, MediaPipe facial signal processing, and an NLP pipeline powered by Groq LLaMA for interview performance scoring.",
                  architectureFlow: ["Flutter App", "FastAPI Service", "MediaPipe Vision", "NLP Pipeline", "Groq LLaMA Report"],
                  challenges: [
                    "Processed real-time frame posture and facial expression telemetry under fast response constraints.",
                    "Structured NLP pipelines to match candidate response transcripts against job description criteria.",
                    "Generated real-time feedback reports for candidate review."
                  ],
                  metrics: [
                    { label: "EYE CONTACT INDEX", val: "92% Stable" },
                    { label: "SPEECH PACING", val: "135 WPM" },
                    { label: "CONFIDENCE SCORE", val: "95th Percentile" },
                    { label: "JD MATCH ACCURACY", val: "87% Alignment" }
                  ],
                  stack: ["FastAPI", "Python", "MediaPipe", "OpenCV", "Groq API", "Flutter"],
                  githubUrl: "https://github.com/MeetChhugani/AI-Powered-Mock-Interview-Analyzer",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] select-none hover:border-cyan-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">REAL-TIME TELEMETRY ARCHITECTURE</span>
                          <span className="text-[0.6rem] font-mono text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-900/60 px-2 py-0.5 rounded">FASTAPI TELEMETRY</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-5 font-mono text-xs">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                            Flutter Client
                          </div>
                          <span className="text-cyan-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800 text-cyan-300 font-bold">
                            FastAPI Server
                          </div>
                          <span className="text-cyan-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800 text-purple-300">
                            MediaPipe Vision
                          </div>
                          <span className="text-cyan-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-800 text-teal-300">
                            NLP Scoring Engine
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">SPEECH TELEMETRY</span>
                            <span className="font-mono text-sm font-bold text-cyan-400 block mt-0.5">135 WPM Optimal</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">CONFIDENCE METRIC</span>
                            <span className="font-mono text-sm font-bold text-purple-400 block mt-0.5">95th Percentile</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-cyan-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND ENGINEERING DETAILS
                        </span>
                        <span>Vision + NLP Service</span>
                      </div>
                    </div>
                  )
                },
                sentiment: {
                  id: "sentiment",
                  tag: "DATA_PIPELINE_NLP",
                  metric: "3,000+ Headlines | NSE/BSE",
                  title: "Fintech Sentiment Analyzer",
                  subtitle: "Python, NLP, Streamlit, Groq LLaMA API",
                  problem: "Financial news headline volume overwhelms market analysts, making manual sentiment tracking across daily stock indices slow and error-prone.",
                  solution: "Built an automated data ingestion pipeline processing 3,000+ financial news headlines against NSE/BSE stock markers, integrating Groq LLaMA to generate market commentary.",
                  architectureFlow: ["News Feeds", "Python Ingestion", "NLP Transformer", "Groq LLaMA API", "Streamlit UI"],
                  challenges: [
                    "Engineered cleaning & normalization routines for high-frequency news headline text streams.",
                    "Mapped sentiment scores against NSE/BSE historical equity movement data.",
                    "Deployed end-to-end Streamlit application for market reporting."
                  ],
                  metrics: [
                    { label: "DATASET INGESTION", val: "3,000+ Headlines" },
                    { label: "TARGET MARKETS", val: "NSE & BSE Indices" },
                    { label: "COMMENTARY MODEL", val: "Groq LLaMA API" },
                    { label: "PIPELINE FREQUENCY", val: "Daily Automated" }
                  ],
                  stack: ["Python", "Streamlit", "NLP", "Pandas", "Groq API"],
                  githubUrl: "https://github.com/MeetChhugani/Fintech-Sentiment-Analyzer",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] select-none hover:border-teal-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">PIPELINE ARCHITECTURE OVERVIEW</span>
                          <span className="text-[0.6rem] font-mono text-teal-400 font-bold bg-teal-950/40 border border-teal-900/60 px-2 py-0.5 rounded">STREAMLIT DEPLOYED</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-5 font-mono text-xs">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                            News Feed
                          </div>
                          <span className="text-teal-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-800 text-teal-300 font-bold">
                            Python Pipeline
                          </div>
                          <span className="text-teal-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800 text-purple-300">
                            Groq LLaMA
                          </div>
                          <span className="text-teal-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300">
                            Streamlit UI
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">HEADLINES INGESTED</span>
                            <span className="font-mono text-sm font-bold text-teal-400 block mt-0.5">3,000+ Records</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">COMMENTARY ENGINE</span>
                            <span className="font-mono text-sm font-bold text-emerald-400 block mt-0.5">Groq LLaMA LLM</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-teal-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND ENGINEERING DETAILS
                        </span>
                        <span>NLP Data Pipeline</span>
                      </div>
                    </div>
                  )
                },
                attrition: {
                  id: "attrition",
                  tag: "EXPLAINABLE_ML_BACKEND",
                  metric: "0.77 ROC-AUC | SHAP Explainer",
                  title: "Employee Risk Radar",
                  subtitle: "Python, XGBoost, SHAP, Streamlit, Groq LLaMA API",
                  problem: "Enterprise HR departments struggle to detect early employee attrition warning signals and understand the specific factor drivers behind employee turnover.",
                  solution: "Engineered an XGBoost binary classification model (0.77 ROC-AUC) integrated with local SHAP explainability outputs and a Groq LLaMA chatbot layer for HR decision-makers.",
                  architectureFlow: ["HR Dataset", "SMOTE Preprocess", "XGBoost Model", "SHAP Engine", "Groq HR Bot"],
                  challenges: [
                    "Handled class imbalance using SMOTE resampling algorithms.",
                    "Integrated local SHAP waterfall explainability to calculate feature importance per employee record.",
                    "Designed interactive risk factor sliders for HR strategy modeling."
                  ],
                  metrics: [
                    { label: "MODEL ACCURACY", val: "0.77 ROC-AUC" },
                    { label: "EXPLAINER ENGINE", val: "SHAP Local Values" },
                    { label: "RESAMPLING", val: "SMOTE Imbalance" },
                    { label: "CHATBOT LAYER", val: "Groq LLaMA Integration" }
                  ],
                  stack: ["Python", "Scikit-learn", "XGBoost", "SHAP", "SMOTE", "Groq API"],
                  githubUrl: "https://github.com/MeetChhugani/Employee_Attrition_Predictor",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] select-none hover:border-purple-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">XGBOOST + SHAP ARCHITECTURE</span>
                          <span className="text-[0.6rem] font-mono text-purple-400 font-bold bg-purple-950/40 border border-purple-900/60 px-2 py-0.5 rounded">0.77 ROC-AUC</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-5 font-mono text-xs">
                          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                            HR Records
                          </div>
                          <span className="text-purple-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800 text-purple-300 font-bold">
                            SMOTE Resample
                          </div>
                          <span className="text-purple-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800 text-purple-300 font-bold">
                            XGBoost
                          </div>
                          <span className="text-purple-500 font-bold">→</span>
                          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-bold">
                            SHAP Explainer
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">CLASSIFICATION</span>
                            <span className="font-mono text-sm font-bold text-purple-400 block mt-0.5">XGBoost Classifier</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">INTERPRETABILITY</span>
                            <span className="font-mono text-sm font-bold text-emerald-400 block mt-0.5">SHAP Waterfall</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-purple-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND CASE DOSSIER
                        </span>
                        <span>Supervised ML Model</span>
                      </div>
                    </div>
                  )
                },
                quizlab: {
                  id: "quizlab",
                  tag: "NLP_OCR_EDTECH",
                  metric: "OCR + LLM Flashcards",
                  title: "QuizLab – AI Study & Flashcard Generator",
                  subtitle: "Python, Streamlit, LLMs, OCR, NLP",
                  problem: "Students spend hours manually creating flashcard decks and quiz questions from lengthy textbook PDFs and lecture slides.",
                  solution: "Built an intelligent document processing application combining PyPDF/Tesseract OCR extraction with Groq LLM pipelines to automatically generate JSON flashcards and practice quizzes.",
                  architectureFlow: ["Document Upload", "OCR / PDF Parser", "NLP Chunking", "Groq LLM Generator", "QuizLab Deck"],
                  challenges: [
                    "Extracted clean text content from scanned PDF documents and complex layout structures.",
                    "Structured prompt templates enforcing strict JSON output schemas for flashcard generation.",
                    "Built interactive flashcard flipping UI with score tracking in Streamlit."
                  ],
                  metrics: [
                    { label: "DOCUMENT PARSING", val: "PDF & Image OCR" },
                    { label: "GENERATION SPEED", val: "< 3 Seconds" },
                    { label: "OUTPUT FORMAT", val: "JSON Flashcards" },
                    { label: "INTERACTIVE DECK", val: "Streamlit App" }
                  ],
                  stack: ["Python", "Streamlit", "OCR", "Groq API", "NLP"],
                  githubUrl: "https://github.com/MeetChhugani/QuizLab",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[260px] select-none hover:border-sky-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">DOCUMENT NLP GENERATOR</span>
                          <span className="text-[0.6rem] font-mono text-sky-400 font-bold bg-sky-950/40 border border-sky-900/60 px-2 py-0.5 rounded">OCR + LLM DECK</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">PARSER ENGINE</span>
                            <span className="font-mono text-sm font-bold text-sky-400 block mt-0.5">PyPDF & OCR</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">FLASHCARD FORMAT</span>
                            <span className="font-mono text-sm font-bold text-purple-400 block mt-0.5">Structured JSON</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-sky-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND ENGINEERING DETAILS
                        </span>
                        <span>EdTech NLP Engine</span>
                      </div>
                    </div>
                  )
                },
                startup: {
                  id: "startup",
                  tag: "REGRESSION_CLASSIFICATION",
                  metric: "0.81 ROC-AUC | Crunchbase",
                  title: "Startup Success Predictor",
                  subtitle: "Python, Pandas, Scikit-learn, Random Forest",
                  problem: "Venture capitalists need explainable statistical evaluation of early-stage startup funding milestones and operational longevity metrics.",
                  solution: "Trained a Random Forest classification model on Crunchbase venture datasets (0.81 ROC-AUC) with feature importance mapping for funding viability.",
                  architectureFlow: ["Crunchbase Data", "Pandas Preprocess", "Random Forest", "Evaluation", "Predictor UI"],
                  challenges: [
                    "Cleaned multi-source financial and funding round datasets.",
                    "Evaluated feature coefficient weights for early-stage survival rates.",
                    "Benchmarked Random Forest decision bounds against cross-validation targets."
                  ],
                  metrics: [
                    { label: "EVALUATION ACCURACY", val: "0.81 ROC-AUC" },
                    { label: "ALGORITHM", val: "Random Forest" },
                    { label: "DATASET SOURCE", val: "Crunchbase Venture" },
                    { label: "VALIDATION", val: "5-Fold Cross-Val" }
                  ],
                  stack: ["Python", "Pandas", "Scikit-learn", "Random Forest"],
                  githubUrl: "https://github.com/MeetChhugani/Startup_Success_Predictor",
                  rightPanel: (
                    <div className="w-full h-full bg-[#08080b] border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between min-h-[260px] select-none hover:border-purple-500/40 transition-colors group/panel">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">RANDOM FOREST MODEL METRICS</span>
                          <span className="text-[0.6rem] font-mono text-purple-400 font-bold bg-purple-950/40 border border-purple-900/60 px-2 py-0.5 rounded">0.81 ROC-AUC</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">ROC-AUC SCORE</span>
                            <span className="font-mono text-lg font-bold text-purple-400 block mt-1">0.81 Viability</span>
                          </div>
                          <div>
                            <span className="text-[0.55rem] font-mono text-zinc-500 uppercase">MODEL ENGINE</span>
                            <span className="font-mono text-lg font-bold text-cyan-400 block mt-1">Random Forest</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs font-mono text-zinc-400 mt-6">
                        <span className="text-purple-400 font-semibold flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND ENGINEERING DETAILS
                        </span>
                        <span>Crunchbase Data</span>
                      </div>
                    </div>
                  )
                }
              };

              return content.projectOrder.map((projId, index) => {
                const item = caseStudiesMap[projId];
                if (!item) return null;
                const caseNum = (index + 1).toString().padStart(2, "0");

                const isProjectMatch = hoveredTech
                  ? item.stack.some(t => t.toLowerCase() === hoveredTech.toLowerCase()) ||
                    item.id.toLowerCase() === hoveredTech.toLowerCase()
                  : true;

                return (
                  <motion.div 
                    key={projId}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4 }}
                    variants={fadeInVariants}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none sticky top-24 bg-[#050505] pt-10 pb-14 border-t border-zinc-900 shadow-2xl group transition-all duration-300 ${
                      hoveredTech
                        ? isProjectMatch
                          ? role === "backendDev"
                            ? "opacity-100 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.08)] scale-[1.005]"
                            : "opacity-100 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.08)] scale-[1.005]"
                          : "opacity-25 blur-[0.5px] scale-[0.98]"
                        : "opacity-100"
                    }`}
                  >
                    <div className="lg:col-span-5 flex flex-col gap-4 select-none">
                      <div className="flex justify-between items-center font-mono text-[0.6rem] text-zinc-500">
                        <span>CASE_{caseNum} {"//"} {item.tag}</span>
                        
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${primaryAccentText}`}>{item.metric}</span>

                          {/* Premium Top-Right Interactive Discovery Indicator */}
                          <div className={`flex items-center gap-1 text-[0.62rem] font-mono tracking-wider opacity-70 group-hover:opacity-100 transition-all duration-200 px-2.5 py-1 rounded-md border bg-zinc-950/80 ${
                            role === "backendDev" 
                              ? "border-sky-500/30 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.15)]" 
                              : "border-purple-500/30 text-purple-300 shadow-[0_0_10px_rgba(192,132,252,0.15)]"
                          }`}>
                            <span>CASE STUDY</span>
                            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold font-title text-zinc-100 mt-1">{item.title}</h3>
                      
                      <div className="bg-[#09090d] border border-zinc-850 rounded-xl p-3.5 flex flex-col gap-1">
                        <span className="text-[0.55rem] font-mono text-zinc-500 uppercase tracking-wider">ENGINEERING SOLUTION</span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-normal">{item.solution}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.stack.map((tech) => {
                          const isTechHovered = hoveredTech === tech.toLowerCase();
                          return (
                            <span 
                              key={tech}
                              onMouseEnter={() => setHoveredTech(tech.toLowerCase())}
                              onMouseLeave={() => setHoveredTech(null)}
                              className={`border font-mono text-[0.6rem] px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
                                isTechHovered
                                  ? role === "backendDev"
                                    ? "bg-sky-950/40 border-sky-500 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                                    : "bg-purple-950/40 border-purple-500 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                                  : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                              }`}
                              data-cursor-label={`tech: ${tech}`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => setSelectedModalProject(item)}
                          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 font-mono text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <Maximize2 className="w-3.5 h-3.5" /> READ CASE STUDY
                        </button>
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 font-mono text-xs px-3.5 py-2 rounded-lg cursor-pointer transition-colors"
                            aria-label={`GitHub repository for ${item.title}`}
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            <span>GITHUB</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Panel Direct 7-Col Grid Container with Scale & Translucent Backdrop Hover Overlay */}
                    <div 
                      onClick={() => setSelectedModalProject(item)} 
                      className="lg:col-span-7 cursor-pointer w-full flex flex-col h-full group/panel relative overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
                    >
                      {item.rightPanel}

                      {/* Translucent Backdrop Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/panel:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-20">
                        <div className={`flex items-center gap-2 font-mono text-xs font-bold px-4 py-2.5 rounded-lg border bg-zinc-950/90 shadow-2xl ${
                          role === "backendDev"
                            ? "border-sky-500/50 text-sky-300 shadow-sky-500/20"
                            : "border-purple-500/50 text-purple-300 shadow-purple-500/20"
                        }`}>
                          <span>VIEW CASE STUDY</span>
                          <span className="transition-transform duration-200 group-hover/panel:translate-x-1 group-hover/panel:-translate-y-1 font-bold">↗</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </section>

          {/* HOW I BUILD SOFTWARE (ENGINEERING PRINCIPLES / ML LIFECYCLE) */}
          {/* ========================================== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-12"
          >
            <HowIBuildSoftware />
          </motion.section>

          {/* CHRONOLOGY & CURRENT FOCUS */}
          {/* ========================================== */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-12 flex flex-col gap-12"
          >
            <CurrentFocus />
          </motion.section>

          {/* INTERACTIVE RESUME BOARD */}
          {/* ========================================== */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-12"
          >
            <ResumeViewer />
          </motion.section>

          {/* CONTACT & SECURE LOG */}
          {/* ========================================== */}
          <motion.section 
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            variants={fadeInVariants}
            className="py-16"
          >
            <ContactForm />
          </motion.section>

          {/* FOOTER */}
          {/* ========================================== */}
          <footer className="border-t border-zinc-900 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 select-none">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${role === "backendDev" ? "bg-sky-400 shadow-[0_0_6px_#38bdf8]" : role === "dataScience" ? "bg-purple-400 shadow-[0_0_6px_#c084fc]" : "bg-emerald-400 shadow-[0_0_6px_#34d399]"}`} />
              <span>© {new Date().getFullYear()} MEET CHHUGANI. ALL RIGHTS RESERVED.</span>
            </div>

            {/* Subtle Built With Tech Stack */}
            <div className="flex flex-wrap items-center gap-2 text-[0.65rem] text-zinc-400">
              <span className="text-zinc-600">BUILT WITH:</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">Next.js 15</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">Framer Motion</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">Three.js</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-850 text-zinc-300">Vercel</span>
            </div>
          </footer>

        </div>
      </main>

      <CommandPalette isOpen={isCmdkOpen} onClose={() => setIsCmdkOpen(false)} />
    </>
  );
}
