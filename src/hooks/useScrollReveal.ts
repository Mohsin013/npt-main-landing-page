import { useEffect, useRef } from "react";

export const useScrollReveal = (disableOnMobile: boolean = false) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we should disable animations (mobile or prefers reduced motion)
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldDisable = disableOnMobile && (isMobile || prefersReducedMotion);

    // If animations are disabled, immediately add visible class to all reveal elements
    if (shouldDisable && ref.current) {
      const reveals = ref.current.querySelectorAll(".reveal");
      reveals.forEach((r) => r.classList.add("visible"));
      return;
    }

    // Otherwise, use IntersectionObserver for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll(".reveal");
      reveals.forEach((r) => observer.observe(r));
    }

    return () => observer.disconnect();
  }, [disableOnMobile]);

  return ref;
};
