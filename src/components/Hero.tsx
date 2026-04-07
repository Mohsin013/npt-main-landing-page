import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

// Lazy load HeroScene to improve initial load time
const HeroScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  const [sceneError, setSceneError] = useState(false);

  const roles = useMemo(
    () => [
      "4-Week MVPs",
      "AI Automations",
      "Cloud Infrastructure",
      "Web & Mobile Apps",
    ],
    [],
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        80,
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* 3D Scene Background - Lazy loaded with error handling */}
      {!sceneError && (
        <Suspense fallback={null}>
          <HeroScene onError={() => setSceneError(true)} />
        </Suspense>
      )}

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 z-[1]" />

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[2]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/50 to-transparent z-[2]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <span className="h-2 w-2 rounded-full gradient-bg animate-pulse" />
            <span className="text-sm text-muted-foreground">
              From Concept To Cloud
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4">
            Your Startup Studio for{" "}
            <span className="gradient-text">Non-Technical Founders</span>
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              We Build{" "}
              <span className="gradient-text inline-flex items-center">
                {text}
                <span className="cursor-blink text-primary ml-1">|</span>
              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Whether you're launching a 4-week MVP, building high-conversion
            landing pages, or fixing existing projects — we provide the
            technical expertise to get you online.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/contact">
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground rounded-full px-8 hover:opacity-90 text-base h-14 shadow-lg shadow-primary/20"
              >
                Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#solution">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border text-foreground hover:bg-muted text-base h-14"
              >
                See How It Works <ArrowRight className="ml-2 h-5 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
