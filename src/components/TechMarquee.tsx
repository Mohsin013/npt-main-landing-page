import {
  Atom,
  Cpu,
  Code2,
  Database,
  DatabaseZap,
  Brain,
  Container,
  Triangle,
  FileCode,
  Layers,
  Network,
  Cloud,
} from "lucide-react";

const TechMarquee = () => {
  const techs = [
    { name: "React", icon: Atom, color: "#22d3ee", hoverBg: "rgba(34, 211, 238, 0.15)" },
    { name: "Node.js", icon: Cpu, color: "#22c55e", hoverBg: "rgba(34, 197, 94, 0.15)" },
    { name: "TypeScript", icon: Code2, color: "#3b82f6", hoverBg: "rgba(59, 130, 246, 0.15)" },
    { name: "AWS", icon: Cloud, color: "#fb923c", hoverBg: "rgba(251, 146, 60, 0.15)" },
    { name: "MongoDB", icon: Database, color: "#16a34a", hoverBg: "rgba(22, 163, 74, 0.15)" },
    { name: "PostgreSQL", icon: DatabaseZap, color: "#60a5fa", hoverBg: "rgba(96, 165, 250, 0.15)" },
    { name: "OpenAI", icon: Brain, color: "#2dd4bf", hoverBg: "rgba(45, 212, 191, 0.15)" },
    { name: "Docker", icon: Container, color: "#2563eb", hoverBg: "rgba(37, 99, 235, 0.15)" },
    { name: "Next.js", icon: Triangle, color: "#ffffff", hoverBg: "rgba(255, 255, 255, 0.15)" },
    { name: "Python", icon: FileCode, color: "#facc15", hoverBg: "rgba(250, 204, 21, 0.15)" },
    { name: "Redis", icon: Layers, color: "#ef4444", hoverBg: "rgba(239, 68, 68, 0.15)" },
    { name: "GraphQL", icon: Network, color: "#ec4899", hoverBg: "rgba(236, 72, 153, 0.15)" },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedTechs = [...techs, ...techs];

  return (
    <section className="py-12 border-y border-border/50 overflow-hidden bg-gradient-to-r from-background via-muted/5 to-background">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {duplicatedTechs.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${i}`}
              className="group mx-8 flex items-center gap-3 px-5 py-3 rounded-full bg-card/50 border border-border/50
                         tech-card hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{
                '--tech-color': tech.color,
                '--tech-hover-bg': tech.hoverBg,
              } as React.CSSProperties}
            >
              <div className="relative">
                <Icon
                  className="w-7 h-7 group-hover:tech-icon-glow transition-all duration-300"
                  style={{
                    color: 'var(--tech-color)',
                    opacity: '0.4',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.4';
                  }}
                />
              </div>
              <span
                className="text-sm font-bold transition-all duration-300"
                style={{
                  color: 'var(--tech-color)',
                  opacity: '0.4',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.4';
                }}
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechMarquee;
