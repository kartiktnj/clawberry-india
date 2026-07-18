"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#6a4bf0", "#ff6b4a", "#8fe3c0", "#a493ff"];

type BerryData = {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  color: string;
};

function generateBerries(count: number): BerryData[] {
  return Array.from({ length: count }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 3,
    ] as [number, number, number],
    scale: 0.28 + Math.random() * 0.42,
    speed: 0.4 + Math.random() * 0.6,
    offset: Math.random() * Math.PI * 2,
    color: COLORS[i % COLORS.length],
  }));
}

// Generated once at module scope (not during a component render) so the
// layout stays stable across re-renders without violating render purity.
const BERRY_LAYOUT = generateBerries(14);

function Berries() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const berries = BERRY_LAYOUT;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.2,
        0.04
      );
    }
    groupRef.current?.children.forEach((child, i) => {
      const b = berries[i];
      child.position.y += Math.sin(t * b.speed + b.offset) * 0.0025;
      child.rotation.x = t * 0.15 * b.speed;
      child.rotation.y = t * 0.2 * b.speed;
    });
  });

  return (
    <group ref={groupRef} scale={Math.min(viewport.width / 9, 1.2)}>
      {berries.map((b, i) => (
        <mesh key={i} position={b.position} scale={b.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.35}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BerryField() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#a493ff" />
      <Berries />
    </Canvas>
  );
}
