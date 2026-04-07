import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
}

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEndDevice: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // Use documentElement.clientWidth as fallback for Safari
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Check for reduced motion preference - Safari friendly
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Simple heuristic for low-end devices
      const isLowEndDevice = isMobile && (
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      );

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowEndDevice,
        prefersReducedMotion,
      });
    };

    // Run check immediately with small delay for Safari compatibility
    const timeoutId = setTimeout(checkDevice, 10);
    window.addEventListener('resize', checkDevice);

    // Listen for changes in prefers-reduced-motion
    if (window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const motionChangeListener = () => checkDevice();
      motionQuery.addEventListener('change', motionChangeListener);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', checkDevice);
        motionQuery.removeEventListener('change', motionChangeListener);
      };
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return deviceInfo;
};
