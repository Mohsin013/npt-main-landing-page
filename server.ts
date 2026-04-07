const PORT = 8080;
const BASE_URL = "https://northpeaktechnologies.com";

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Map route paths to HTML files
    let filePath: string;
    if (pathname === "/" || pathname === "") {
      filePath = "dist/index.html";
    } else if (pathname === "/about") {
      filePath = "dist/about.html";
    } else if (pathname === "/services") {
      filePath = "dist/services.html";
    } else if (pathname === "/contact") {
      filePath = "dist/contact.html";
    } else if (pathname === "/sitemap.xml") {
      try {
        const file = Bun.file("public/sitemap.xml");
        return new Response(file, {
          headers: { "Content-Type": "application/xml" },
        });
      } catch {
        return new Response("Sitemap not found", { status: 404 });
      }
    } else if (pathname === "/robots.txt") {
      try {
        const file = Bun.file("public/robots.txt");
        return new Response(file, {
          headers: { "Content-Type": "text/plain" },
        });
      } catch {
        return new Response("Robots.txt not found", { status: 404 });
      }
    } else if (pathname.startsWith("/company_logo.png")) {
      try {
        const file = Bun.file("public/company_logo.png");
        return new Response(file, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      } catch {
        return new Response("Image not found", { status: 404 });
      }
    } else {
      // Try to serve from dist directory (assets, JS, CSS)
      filePath = `dist${pathname}`;
    }

    try {
      const file = Bun.file(filePath);
      const ext = pathname.split(".").pop()?.toLowerCase();
      const contentType = getContentType(ext);

      return new Response(file, {
        headers: {
          "Content-Type": contentType || "text/html; charset=utf-8",
        },
      });
    } catch (e) {
      // Return 404 page
      try {
        const notFoundFile = Bun.file("dist/index.html");
        return new Response(notFoundFile, {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch {
        return new Response("Not found", { status: 404 });
      }
    }
  },
});

function getContentType(ext?: string): string | undefined {
  const types: Record<string, string> = {
    html: "text/html; charset=utf-8",
    css: "text/css; charset=utf-8",
    js: "application/javascript; charset=utf-8",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
  };
  return ext ? types[ext] : undefined;
}

console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📁 Serving static files from ./dist directory`);
console.log(`🌐 Production URL: ${BASE_URL}`);
