import { useMemo } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const FloatingParticles = () => {
  const { isMobile, isLowEndDevice, prefersReducedMotion } = useDeviceDetection();

  // Reduce particle count significantly on mobile and low-end devices
  const particleCount = useMemo(() => {
    if (prefersReducedMotion) return 0;
    if (isLowEndDevice) return 5;
    if (isMobile) return 10;
    return 30; // Reduced from 50
  }, [isMobile, isLowEndDevice, prefersReducedMotion]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [particleCount]);

  if (prefersReducedMotion || particleCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `linear-gradient(135deg, hsl(263 70% 58% / ${p.opacity}), hsl(217 91% 53% / ${p.opacity}))`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
