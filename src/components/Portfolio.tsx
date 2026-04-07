import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Briefcase,
  ExternalLink,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    title: "AI SaaS Platform",
    category: "AI / SaaS",
    desc: "A complete AI-powered analytics platform with real-time data processing and predictive modeling.",
    tech: ["React", "Next.js", "OpenAI", "Supabase"],
    outcome: "Reduced analysis time by 90%",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Marketplace App",
    category: "E-commerce",
    desc: "A global marketplace connecting buyers and sellers with real-time inventory management.",
    tech: ["React Native", "Node.js", "MongoDB", "Stripe"],
    outcome: "1M+ transactions processed",
    icon: ShoppingBag,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Productivity Tool",
    category: "B2B",
    desc: "A team collaboration platform with AI-powered task management and automated workflows.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    outcome: "50% increase in team efficiency",
    icon: Briefcase,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Mobile Startup App",
    category: "Mobile",
    desc: "A fitness tracking app with AI coaching and social features for community engagement.",
    tech: ["Flutter", "Firebase", "TensorFlow", "Google Cloud"],
    outcome: "100K+ downloads in 3 months",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const Portfolio = () => {
  const ref = useScrollReveal(true);

  return (
    <section
      id="portfolio"
      className="py-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recent <span className="gradient-text">Launches</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built everything from AI-driven analytics to global
            marketplaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} gradient-border rounded-2xl bg-card/50 backdrop-blur-sm card-hover group flex flex-col`}
            >
              {/* Icon header */}
              <div className="p-6 pb-4">
                <div
                  className={`h-14 w-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <p.icon className="h-7 w-7 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20 mb-3"
                >
                  {p.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:gradient-text transition-all">
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p className="px-6 text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                {p.desc}
              </p>

              {/* Tech stack */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs py-0.5 px-2 border-border/50 text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="px-6 pb-6 pt-4 border-t border-border/50 mt-auto">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm font-medium text-primary">
                    {p.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
