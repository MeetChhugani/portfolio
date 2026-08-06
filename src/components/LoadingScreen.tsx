"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statuses = [
  "INITIALIZING SYNOPSIS MATRIX...",
  "TRAINING DENSE LAYERS...",
  "CORRELATING HEADLINE PRICE PATTERNS...",
  "SHAP CONTRIBS LOADED...",
  "DEPLOYMENT COMPLETED NOMINAL."
];

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYNOPSIS MATRIX...");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const statusInterval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatus(statuses[index]);
    }, 900);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(statusInterval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) setTimeout(onComplete, 500); // Trigger complete callback
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 4) + 1;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-[#030303] z-[99999] flex flex-col justify-between p-12 select-none"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top header telemetry */}
          <div className="flex justify-between items-center font-mono text-[0.65rem] text-zinc-500 tracking-[2px]">
            <span>M_CHHUGANI // REPLICATOR PORTAL v4.0</span>
            <span>SYSTEM READY</span>
          </div>

          {/* Central Counter */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-8xl md:text-[12rem] font-bold text-zinc-100 font-mono tracking-tighter tabular-nums select-none">
              {progress.toString().padStart(3, "0")}
            </h1>
            <div className="text-[0.7rem] md:text-[0.8rem] font-mono text-cyan-400 tracking-[3px] uppercase mt-4 select-none">
              {status}
            </div>
          </div>

          {/* Bottom progress bar strip */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[1px] bg-zinc-800 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-400"
                style={{ width: `${progress}%` }}
                layoutId="loaderProgress"
              />
            </div>
            <div className="flex justify-between text-[0.6rem] font-mono text-zinc-600">
              <span>LOADING NEURAL GRID ASSETS</span>
              <span>EST_MS_ELAPSED: {(progress * 15).toFixed(0)}MS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
