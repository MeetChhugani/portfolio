"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LowPolyCar() {
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelRL = useRef<THREE.Mesh>(null);
  const wheelRR = useRef<THREE.Mesh>(null);

  // Rotate wheels while car drives
  useFrame((_, delta) => {
    const rotationSpeed = delta * 12;
    if (wheelFL.current) wheelFL.current.rotation.z -= rotationSpeed;
    if (wheelFR.current) wheelFR.current.rotation.z -= rotationSpeed;
    if (wheelRL.current) wheelRL.current.rotation.z -= rotationSpeed;
    if (wheelRR.current) wheelRR.current.rotation.z -= rotationSpeed;
  });

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Lower Main Chassis / Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.45, 3.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Hood & Front Slope */}
      <mesh position={[0, 0.5, 1.2]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.7, 0.3, 1.2]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Cabin / Roof */}
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[1.4, 0.5, 1.8]} />
        <meshStandardMaterial color="#0369a1" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.88, 0.6]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[1.35, 0.4, 0.1]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </mesh>

      {/* Rear Glass */}
      <mesh position={[0, 0.88, -1.0]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[1.35, 0.4, 0.1]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </mesh>

      {/* Rear Wing / Spoiler */}
      <mesh position={[0, 0.95, -1.8]}>
        <boxGeometry args={[1.7, 0.08, 0.4]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-0.6, 0.8, -1.8]}>
        <boxGeometry args={[0.1, 0.3, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.6, 0.8, -1.8]}>
        <boxGeometry args={[0.1, 0.3, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Headlights (Glowing Cyan/White) */}
      <mesh position={[-0.6, 0.45, 1.91]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.6, 0.45, 1.91]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={2} />
      </mesh>

      {/* Taillights (Glowing Red) */}
      <mesh position={[-0.6, 0.5, -1.91]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.6, 0.5, -1.91]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#f87171" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>

      {/* WHEELS */}
      {/* Front Left */}
      <group position={[-0.95, 0.25, 1.1]}>
        <mesh ref={wheelFL} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.26, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Front Right */}
      <group position={[0.95, 0.25, 1.1]}>
        <mesh ref={wheelFR} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.26, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear Left */}
      <group position={[-0.95, 0.25, -1.1]}>
        <mesh ref={wheelRL} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.26, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear Right */}
      <group position={[0.95, 0.25, -1.1]}>
        <mesh ref={wheelRR} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.26, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
