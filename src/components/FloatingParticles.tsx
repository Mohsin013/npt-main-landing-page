import { useMemo } from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const FloatingParticles = () => {
  const { isMobile, isLowEndDevice, prefersReducedMotion } = useDeviceDetection();

  // Disable particles completely on mobile
  if (isMobile || isLowEndDevice || prefersReducedMotion) {
    return null;
  }

  // Reduce particle count on desktop
  const particleCount = 30;

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
