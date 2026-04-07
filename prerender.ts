import react from "@vitejs/plugin-react-swc";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { build } from "vite";

const BASE_URL = "https://northpeaktechnologies.com";

const template = (
  content: string,
  title: string,
  description: string,
  path: string,
) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${BASE_URL}${path}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${BASE_URL}${path}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${BASE_URL}/company_logo.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${BASE_URL}/company_logo.png" />
  <link rel="icon" type="image/png" href="/company_logo.png" />
  <link rel="apple-touch-icon" href="/company_logo.png" />
  <meta name="theme-color" content="#000000" />
</head>
<body>
  <div id="root">${content}</div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
`;

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "NorthPeak Technologies - Build Scalable Products",
    description:
      "Turn your ideas into production-ready products with NorthPeak Technologies. Expertise in web development, AI solutions, and cloud technologies.",
  },
  "/about": {
    title: "About NorthPeak Technologies - Meet the Team",
    description:
      "Learn about NorthPeak Technologies and our founders. Building scalable products with strong expertise in modern web development, AI, and cloud technologies.",
  },
  "/services": {
    title: "Our Services - MVP Development, Web Apps, AI, Cloud",
    description:
      "NorthPeak Technologies offers MVP development, web app development, AI solutions, and cloud & DevOps services. Let us build your next product.",
  },
  "/contact": {
    title: "Contact NorthPeak Technologies - Start Your Project",
    description:
      "Ready to build your product? Contact NorthPeak Technologies. We help businesses turn ideas into real, scalable products.",
  },
};

const routes = ["/", "/about", "/services", "/contact"];

async function prerender() {
  console.log("🚀 Starting pre-rendering...");

  // Build the client-side app first
  console.log("📦 Building client-side app...");
  await build({
    plugins: [react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  });

  console.log("✅ Client build complete");

  // Build SSR version
  console.log("📦 Building SSR version...");
  process.env.BUILD_TYPE = "ssr";
  await build({
    plugins: [react()],
    build: {
      ssr: true,
      outDir: "dist-ssr",
      emptyOutDir: true,
      rollupOptions: {
        input: "./src/entry-server.tsx",
      },
    },
  });
  process.env.BUILD_TYPE = undefined;

  console.log("✅ SSR build complete");

  // Import the server bundle
  const { render } = await import("./dist-ssr/entry-server.js");

  // Pre-render each route
  const distDir = join(process.cwd(), "dist");
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  for (const route of routes) {
    const { title, description } = pageMetadata[route];
    const appHtml = render(route);
    const html = template(appHtml, title, description, route);

    // Determine output file path
    const outputPath = join(
      distDir,
      route === "/" ? "index.html" : `${route.slice(1)}.html`,
    );

    // Ensure directory exists
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Write the HTML file
    writeFileSync(outputPath, html, "utf-8");
    console.log(`✅ Rendered ${route} → ${outputPath}`);
  }

  console.log("\n🎉 Pre-rendering complete! Static HTML files are in ./dist");
}

prerender().catch(console.error);
