import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const FloatingTorus = ({ position, scale, speed, color, isMobile, isLowEndDevice }: { position: [number, number, number]; scale: number; speed: number; color: string; isMobile: boolean; isLowEndDevice: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const speedMultiplier = isMobile ? 0.3 : 1;
      meshRef.current.rotation.x = t * speed * 0.5 * speedMultiplier;
      meshRef.current.rotation.y = t * speed * speedMultiplier;
      meshRef.current.position.y = position[1] + Math.sin(t * speed * 2) * 0.3;
    }
  });

  const distort = isMobile ? 0.1 : 0.2;

  return (
    <Float speed={isMobile ? 0.5 : 1} rotationIntensity={isMobile ? 0.1 : 0.2} floatIntensity={isMobile ? 0.2 : 0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        {isMobile ? (
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        ) : (
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
            distort={distort}
            speed={1.5}
          />
        )}
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = ({ position, scale, speed, color, isMobile, isLowEndDevice }: { position: [number, number, number]; scale: number; speed: number; color: string; isMobile: boolean; isLowEndDevice: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const speedMultiplier = isMobile ? 0.4 : 1;
      meshRef.current.rotation.x = t * speed * 0.7 * speedMultiplier;
      meshRef.current.rotation.z = t * speed * 0.4 * speedMultiplier;
      const pulseScale = scale * (1 + Math.sin(t * speed * 3) * 0.2);
      meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  const distort = isMobile ? 0.1 : 0.25;

  return (
    <Float speed={isMobile ? 0.7 : 1.5} rotationIntensity={isMobile ? 0.15 : 0.3} floatIntensity={isMobile ? 0.25 : 0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        {isMobile ? (
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        ) : (
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            distort={distort}
            speed={2}
            wireframe
          />
        )}
      </mesh>
    </Float>
  );
};

const FloatingDodecahedron = ({ position, scale, speed, color, isMobile, isLowEndDevice }: { position: [number, number, number]; scale: number; speed: number; color: string; isMobile: boolean; isLowEndDevice: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const speedMultiplier = isMobile ? 0.3 : 1;
      meshRef.current.rotation.y = t * speed * 0.8 * speedMultiplier;
      meshRef.current.rotation.x = t * speed * 0.3 * speedMultiplier;
      meshRef.current.position.z = position[2] + Math.sin(t * speed + 1) * 0.5;
    }
  });

  const distort = isMobile ? 0.1 : 0.2;

  return (
    <Float speed={isMobile ? 0.4 : 0.8} rotationIntensity={isMobile ? 0.2 : 0.4} floatIntensity={isMobile ? 0.15 : 0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        {isMobile ? (
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        ) : (
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
            distort={distort}
            speed={1.2}
          />
        )}
      </mesh>
    </Float>
  );
};

const ParticleSwarm = ({ isMobile, isLowEndDevice }: { isMobile: boolean; isLowEndDevice: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Reduce particle count significantly on mobile
  const particleCount = useMemo(() => {
    if (isLowEndDevice) return 0; // No particles on low-end devices
    if (isMobile) return 50; // Significantly reduced on mobile
    return 300; // Desktop
  }, [isMobile, isLowEndDevice]);

  const particles = useMemo(() => {
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Purple to blue gradient
      const color = new THREE.Color().lerpColors(
        new THREE.Color("#7C3AED"),
        new THREE.Color("#2563EB"),
        Math.random()
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors, originalPositions, count };
  }, [particleCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pointsRef.current && pointsRef.current.geometry) {
      const pos = particles.positions;
      const orig = particles.originalPositions;

      // Skip complex wave calculations on mobile
      if (isMobile) {
        pointsRef.current.rotation.y = t * 0.01;
        pointsRef.current.rotation.x = t * 0.005;
        return;
      }

      for (let i = 0; i < particles.count; i++) {
        const idx = i * 3;
        const wave = Math.sin(t * 0.5 + orig[idx] * 0.3) * 0.5;
        const wave2 = Math.cos(t * 0.7 + orig[idx + 1] * 0.2) * 0.3;
        const wave3 = Math.sin(t * 0.3 + orig[idx + 2] * 0.4) * 0.2;

        pos[idx] = orig[idx] + wave;
        pos[idx + 1] = orig[idx + 1] + wave2;
        pos[idx + 2] = orig[idx + 2] + wave3;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = t * 0.02;
      pointsRef.current.rotation.x = t * 0.01;
    }
  });

  if (particleCount === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={isMobile ? 0.04 : 0.03} transparent opacity={0.6} sizeAttenuation vertexColors />
    </points>
  );
};

const CTAScene = () => {
  const { isMobile, isLowEndDevice, prefersReducedMotion } = useDeviceDetection();

  // Completely skip 3D scene if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  // Reduce number of shapes on mobile
  const shapes = isMobile ? [
    { Component: FloatingTorus, props: { position: [-3, 1, -2] as [number, number, number], scale: 0.6, speed: 0.5, color: "#7C3AED" } },
    { Component: FloatingOctahedron, props: { position: [3, -1, -1] as [number, number, number], scale: 0.5, speed: 0.5, color: "#2563EB" } },
  ] : [
    { Component: FloatingTorus, props: { position: [-4, 1, -2] as [number, number, number], scale: 0.8, speed: 0.5, color: "#7C3AED" } },
    { Component: FloatingOctahedron, props: { position: [-5, -1, -1] as [number, number, number], scale: 0.6, speed: 0.7, color: "#2563EB" } },
    { Component: FloatingDodecahedron, props: { position: [-3, 2, 1] as [number, number, number], scale: 0.5, speed: 0.4, color: "#A855F7" } },
    { Component: FloatingTorus, props: { position: [4, -1, -2] as [number, number, number], scale: 0.9, speed: 0.6, color: "#2563EB" } },
    { Component: FloatingOctahedron, props: { position: [5, 1, -1] as [number, number, number], scale: 0.7, speed: 0.5, color: "#7C3AED" } },
    { Component: FloatingDodecahedron, props: { position: [3, -2, 0] as [number, number, number], scale: 0.6, speed: 0.8, color: "#3B82F6" } },
    { Component: FloatingTorus, props: { position: [0, 3, -3] as [number, number, number], scale: 0.5, speed: 0.4, color: "#A855F7" } },
    { Component: FloatingOctahedron, props: { position: [2, 3, -2] as [number, number, number], scale: 0.4, speed: 0.6, color: "#7C3AED" } },
    { Component: FloatingDodecahedron, props: { position: [-2, -3, -2] as [number, number, number], scale: 0.5, speed: 0.5, color: "#2563EB" } },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: !isLowEndDevice, powerPreference: isLowEndDevice ? "low-power" : "high-performance" }}
        style={{ background: "transparent" }}
        dpr={isMobile ? 1 : window.devicePixelRatio}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 8, 8]} intensity={0.8} color="#7C3AED" />
        <pointLight position={[-8, -8, 8]} intensity={0.6} color="#2563EB" />
        <pointLight position={[0, -5, 5]} intensity={0.4} color="#A855F7" />

        {!isMobile && <Stars radius={50} depth={50} count={100} factor={2} saturation={0} fade speed={0.5} />}
        {!isMobile && <Sparkles count={80} scale={15} size={2} speed={0.3} color="#7C3AED" opacity={0.6} />}
        <ParticleSwarm isMobile={isMobile} isLowEndDevice={isLowEndDevice} />

        {/* Floating shapes */}
        {shapes.map((shape, index) => (
          <shape.Component
            key={index}
            {...shape.props}
            isMobile={isMobile}
            isLowEndDevice={isLowEndDevice}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default CTAScene;
