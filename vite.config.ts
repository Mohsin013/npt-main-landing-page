import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Only apply manualChunks for client-side builds, not SSR
        ...(process.env.BUILD_TYPE !== 'ssr' ? {
          manualChunks: (id) => {
            // Core React
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'react-router';
            }
            // Three.js and 3D libraries (lazy loaded)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Query and data fetching
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
          },
        } : {}),
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  publicDir: "public",
  ssr: {
    // Remove manualChunks for SSR builds
    noExternal: [],
  },
}));
