import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

// Simple Error Boundary to catch 3D rendering errors
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const AnimatedSphere = ({ isMobile, isLowEndDevice }: { isMobile: boolean; isLowEndDevice: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slower rotation on mobile
      const speedMultiplier = isMobile ? 0.5 : 1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speedMultiplier;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speedMultiplier;
    }
  });

  // Use simpler geometry and material on mobile
  if (isLowEndDevice) {
    return null; // Completely skip on very low-end devices
  }

  const detail = isMobile ? 1 : 4; // Lower detail on mobile
  const distort = isMobile ? 0.15 : 0.35; // Less distortion on mobile

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.2 : 0.5} floatIntensity={isMobile ? 0.3 : 1}>
      <mesh ref={meshRef} scale={isMobile ? 1.5 : 2.2}>
        <icosahedronGeometry args={[1, detail]} />
        {isMobile ? (
          <meshBasicMaterial color="#7C3AED" wireframe />
        ) : (
          <MeshDistortMaterial
            color="#7C3AED"
            emissive="#2563EB"
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

const OrbitingParticles = ({ isMobile, isLowEndDevice }: { isMobile: boolean; isLowEndDevice: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Reduce particle count on mobile
  const particleCount = useMemo(() => {
    if (isLowEndDevice) return 0; // No particles on low-end devices
    if (isMobile) return 50; // Significantly reduced on mobile
    return 200; // Desktop
  }, [isMobile, isLowEndDevice]);

  const particles = useMemo(() => {
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slower rotation on mobile
      const speedMultiplier = isMobile ? 0.3 : 1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 * speedMultiplier;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03 * speedMultiplier;
    }
  });

  if (particleCount === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={isMobile ? 0.03 : 0.02} color="#7C3AED" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const FloatingRings = ({ isMobile, isLowEndDevice }: { isMobile: boolean; isLowEndDevice: boolean }) => {
  // Skip rings on mobile to improve performance
  if (isMobile || isLowEndDevice) {
    return null;
  }

  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.2;
      ring2Ref.current.rotation.x = t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

const HeroScene = ({ onError }: { onError?: () => void }) => {
  const { isMobile, isLowEndDevice, prefersReducedMotion } = useDeviceDetection();

  // Completely skip 3D scene if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      <ErrorBoundary fallback={null} onError={onError}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ alpha: true, antialias: !isLowEndDevice, powerPreference: isLowEndDevice ? "low-power" : "high-performance" }}
          style={{ background: "transparent" }}
          dpr={isMobile ? 1 : window.devicePixelRatio} // Lower pixel ratio on mobile
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2563EB" />
          <AnimatedSphere isMobile={isMobile} isLowEndDevice={isLowEndDevice} />
          <OrbitingParticles isMobile={isMobile} isLowEndDevice={isLowEndDevice} />
          <FloatingRings isMobile={isMobile} isLowEndDevice={isLowEndDevice} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default HeroScene;
