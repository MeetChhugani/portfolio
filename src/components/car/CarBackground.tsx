"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LowPolyCar from "./LowPolyCar";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function DrivingCar({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (reduced || !group.current) return;
    t.current += delta * 0.15;

    // Loop path: drive right, off-screen, reset from the left.
    const span = 14; // how far it travels before looping
    const x = ((t.current * 4) % span) - span / 2;
    group.current.position.x = x;

    // Gentle bob so it doesn't feel like it's gliding on ice.
    group.current.position.y = Math.sin(t.current * 6) * 0.02;
  });

  return (
    <group ref={group} position={[-7, -1, 0]} scale={0.9}>
      <LowPolyCar />
    </group>
  );
}

/**
 * Fixed, full-viewport 3D background. Sits behind page content
 * (z-index: -1) and ignores pointer events so it never blocks
 * scrolling or clicks on your real UI.
 */
export default function CarBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power" }}
        camera={{ position: [0, 1.5, 6], fov: 40 }}
        frameloop={reduced ? "never" : "always"}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={0.8} />
        <Suspense fallback={null}>
          <DrivingCar reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
