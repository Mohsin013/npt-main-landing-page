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
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Listen for changes in prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChangeListener = () => checkDevice();
    motionQuery.addEventListener('change', motionChangeListener);

    return () => {
      window.removeEventListener('resize', checkDevice);
      motionQuery.removeEventListener('change', motionChangeListener);
    };
  }, []);

  return deviceInfo;
};
