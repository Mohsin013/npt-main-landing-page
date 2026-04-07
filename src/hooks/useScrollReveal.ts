import { useEffect, useRef, useCallback } from "react";

export const useScrollReveal = (disableOnMobile: boolean = false) => {
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const revealElements = useCallback(() => {
    if (!ref.current) return;

    // Immediately make all reveal elements visible on mobile/Safari
    const reveals = ref.current.querySelectorAll<HTMLElement>(".reveal");
    reveals.forEach((r) => {
      r.classList.add("visible");
    });
  }, []);

  useEffect(() => {
    // Check if we should disable animations (mobile or prefers reduced motion)
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safari mobile detection
    const isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && isMobile;

    const shouldDisable = disableOnMobile && (isMobile || prefersReducedMotion);

    // If animations are disabled, immediately add visible class to all reveal elements
    if (shouldDisable || isSafariMobile) {
      revealElements();
      return;
    }

    // Use IntersectionObserver with Safari-friendly settings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      {
        threshold: 0.05, // Lower threshold for Safari
        rootMargin: "0px 0px -25px 0px" // Smaller margin for Safari
      }
    );

    observerRef.current = observer;

    // Small timeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const el = ref.current;
      if (el) {
        const reveals = el.querySelectorAll<HTMLElement>(".reveal");
        reveals.forEach((r) => observer.observe(r));

        // Safari fallback: after 500ms, reveal any elements not yet visible
        const fallbackTimeout = setTimeout(() => {
          reveals.forEach((r) => {
            if (!r.classList.contains("visible")) {
              r.classList.add("visible");
            }
          });
        }, 500);

        // Store timeout on element for cleanup
        return () => clearTimeout(fallbackTimeout);
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [disableOnMobile, revealElements]);

  return ref;
};
