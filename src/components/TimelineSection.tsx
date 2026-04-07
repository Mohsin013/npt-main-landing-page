import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  Database,
  GitBranch,
  Globe,
  Layers,
  Layout as LayoutIcon,
  Play,
  Rocket,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

const weeks = [
  {
    week: "Week 1",
    title: "Strategy + Wireframes",
    icon: Layers,
    desc: "Defining product roadmap, user flows, and core architecture.",
    color: "from-violet-500 to-purple-500",
    deliverables: [
      { text: "Product requirements document", icon: CheckCircle },
      { text: "User journey mapping", icon: Globe },
      { text: "Wireframe designs", icon: LayoutIcon },
    ],
  },
  {
    week: "Week 2",
    title: "Design + Prototype",
    icon: Calendar,
    desc: "High-fidelity UI design and interactive clickable prototypes.",
    color: "from-blue-500 to-cyan-500",
    deliverables: [
      { text: "UI/UX design system", icon: Smartphone },
      { text: "Interactive prototypes", icon: Play },
      { text: "Design handoff files", icon: ArrowRight },
    ],
  },
  {
    week: "Week 3",
    title: "Development",
    icon: Code,
    desc: "Coding the frontend, backend, and integrating essential APIs.",
    color: "from-pink-500 to-rose-500",
    deliverables: [
      { text: "Frontend development", icon: Globe },
      { text: "Backend API development", icon: Database },
      { text: "Third-party integrations", icon: Zap },
    ],
  },
  {
    week: "Week 4",
    title: "Testing + Launch",
    icon: Rocket,
    desc: "Rigorous QA, bug fixing, and deployment to production.",
    color: "from-emerald-500 to-teal-500",
    deliverables: [
      { text: "Quality assurance testing", icon: Shield },
      { text: "Bug fixing & optimization", icon: GitBranch },
      { text: "Production deployment", icon: Rocket },
    ],
  },
];

const TimelineSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              4 Weeks to Launch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">4 Week MVP</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A battle-tested process designed for speed and quality.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Timeline items */}
          <div className="space-y-0">
            {weeks.map((week, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                {/* Content card */}
                <div className="gradient-border p-5 md:p-6 rounded-2xl bg-card/80 backdrop-blur-sm card-hover group relative overflow-hidden">
                  {/* Background glow */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${week.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                      >
                        <week.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1 text-foreground group-hover:gradient-text transition-all">
                          {week.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {week.desc}
                    </p>
                  </div>
                </div>

                {/* Connector line to next week (except last) */}
                {i < weeks.length - 1 && (
                  <div className="relative flex justify-center py-4">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-primary/10 -translate-x-1/2" />
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${week.color} flex items-center justify-center shadow-lg`}
                    >
                      <ChevronDown className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom checkmark with animation */}
          <div className="reveal reveal-delay-5 flex justify-center mt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 hover:border-primary/50 transition-colors cursor-default">
                <CheckCircle2 className="h-6 w-6 text-primary animate-bounce" />
                <span className="text-base font-bold text-foreground">
                  Your MVP is ready to launch!
                </span>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
