"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRole } from "@/context/RoleContext";
import BlueprintGrid from "./BlueprintGrid";

const ParticleField: React.FC = () => {
  const { content } = useRole();
  const colorLayer2 = content.theme.particleColors.layer2;
  const colorLayer3 = content.theme.particleColors.layer3;

  const pointsRef1 = useRef<THREE.Points>(null);
  const pointsRef2 = useRef<THREE.Points>(null);
  const pointsRef3 = useRef<THREE.Points>(null);
  
  const matRef2 = useRef<THREE.PointsMaterial>(null);
  const matRef3 = useRef<THREE.PointsMaterial>(null);

  // Signficantly reduced counts to feel calm, spacious and technical (not a gaming starfield)
  const count1 = 500;
  const count2 = 150;
  const count3 = 30;

  const generatePositions = (count: number) => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12; // Z
    }
    return pos;
  };

  const positions1 = useMemo(() => generatePositions(count1), []);
  const positions2 = useMemo(() => generatePositions(count2), []);
  const positions3 = useMemo(() => generatePositions(count3), []);

  useEffect(() => {
    if (matRef2.current) matRef2.current.color.set(colorLayer2);
    if (matRef3.current) matRef3.current.color.set(colorLayer3);
  }, [colorLayer2, colorLayer3]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    
    // Slowed down particle rotations to feel like slow inertia drift
    if (pointsRef1.current) {
      pointsRef1.current.rotation.y = time * 0.001;
      pointsRef1.current.position.y = scrollY * 0.0001;
    }

    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = -time * 0.002;
      pointsRef2.current.position.y = scrollY * 0.0002;
      pointsRef2.current.rotation.x = scrollY * 0.00002;
    }
    if (matRef2.current) {
      matRef2.current.opacity = Math.sin(time * 0.8 + 1.0) * 0.15 + 0.3;
    }

    if (pointsRef3.current) {
      pointsRef3.current.rotation.y = time * 0.003;
      pointsRef3.current.position.y = scrollY * 0.0003;
      pointsRef3.current.rotation.x = scrollY * 0.00004;
    }
    if (matRef3.current) {
      matRef3.current.opacity = Math.sin(time * 1.5) * 0.2 + 0.35;
    }
  });

  return (
    <>
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions1, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="#ffffff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </points>

      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions2, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef2}
          size={0.02}
          color={colorLayer2}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>

      <points ref={pointsRef3}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions3, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef3}
          size={0.035}
          color={colorLayer3}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>
    </>
  );
};

const BackgroundMesh: React.FC = () => {
  const { role } = useRole();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glowColor = role === "backendDev" ? "rgba(2, 132, 199, 0.05)" : role === "dataScience" ? "rgba(168, 85, 247, 0.05)" : "rgba(16, 185, 129, 0.05)";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-[#030304]/60 overflow-hidden">
      
      {/* Mouse-Following Radial Glow Spotlight */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`
        }}
      />

      {/* Canvas Blueprint Grid */}
      <BlueprintGrid />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-[#030304] opacity-90 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default BackgroundMesh;
