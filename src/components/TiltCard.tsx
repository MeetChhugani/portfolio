"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 4
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Position of cursor relative to card bounds
    const x = clientX - left;
    const y = clientY - top;

    // Normalised values from -0.5 to 0.5
    const normX = x / width - 0.5;
    const normY = y / height - 0.5;

    // Set tilt rotations (rotates around X-axis for Y-movements and Y-axis for X-movements)
    setRotate({
      x: -normY * maxTilt,
      y: normX * maxTilt
    });

    // Sheen position percentages
    setSheen({
      x: (x / width) * 100,
      y: (y / height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSheen(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-dramatic transform-3d transition-transform ${className}`}
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
        className="w-full h-full relative overflow-hidden rounded-2xl transform-3d"
      >
        {/* Dynamic Sheen overlay to create depth */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.12), transparent 80%)`,
            opacity: sheen.opacity
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

export default TiltCard;
