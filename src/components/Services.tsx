import { Brain, Rocket, Globe, Cloud, MessageSquare, Smartphone, Palette, Zap, CheckCircle2, Database } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Brain,
    title: "AI Automations",
    desc: "Integrate LLMs and custom AI workflows to supercharge your product.",
    gradient: "from-violet-500/20 to-purple-500/20",
    featured: true,
  },
  {
    icon: Rocket,
    title: "4-Week MVP",
    desc: "Our flagship service. Go from idea to launch in just 30 days.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    featured: false,
  },
  {
    icon: Globe,
    title: "Landing Pages",
    desc: "High-conversion, lightning-fast marketing sites that drive sales.",
    gradient: "from-pink-500/20 to-rose-500/20",
    featured: false,
  },
  {
    icon: Zap,
    title: "Project Rescue",
    desc: "Fixing bugs, improving performance, and refactoring legacy code.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    featured: false,
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Deployment support, server management, and CI/CD automation.",
    gradient: "from-amber-500/20 to-orange-500/20",
    featured: false,
  },
  {
    icon: MessageSquare,
    title: "Web Development",
    desc: "High-performance web apps built with Next.js and React.",
    gradient: "from-indigo-500/20 to-violet-500/20",
    featured: false,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native iOS and Android apps using Flutter or React Native.",
    gradient: "from-rose-500/20 to-pink-500/20",
    featured: false,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Stunning, user-centric designs that convert visitors into customers.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    featured: false,
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    desc: "Comprehensive functional testing from end-to-end validation to granular component testing.",
    gradient: "from-lime-500/20 to-green-500/20",
    featured: false,
  },
  {
    icon: Database,
    title: "CMS Integration",
    desc: "Headless CMS implementation with Umbraco and Contentful for seamless content management.",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    featured: false,
  },
];

const Services = () => {
  const ref = useScrollReveal(true);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Tech Solutions for <span className="gradient-text">Every Stage</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Whether you're starting from scratch or optimizing an existing platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} gradient-border p-5 rounded-2xl card-hover group cursor-default relative overflow-hidden ${
                s.featured ? "ring-2 ring-primary/50 bg-primary/5" : ""
              }`}
            >
              {s.featured && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-white text-xs font-bold">
                    ⭐ Featured
                  </span>
                </div>
              )}
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-foreground group-hover:gradient-text transition-all">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
