import { Rocket, Target, Users, MessageCircle, Cpu } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const reasons = [
  {
    icon: Rocket,
    title: "Fast MVP delivery",
    desc: "Launch in 4 weeks, not 4 months.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Target,
    title: "Built for startups",
    desc: "We understand the need for agility and scalability.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "No hiring needed",
    desc: "Skip the overhead of a full-time tech team.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: MessageCircle,
    title: "Transparent process",
    desc: "Daily updates and clear communication throughout.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Cpu,
    title: "Modern tech stack",
    desc: "We use the same tools as the world's top startups.",
    color: "from-amber-500 to-orange-500",
  },
];

const WhyChooseUs = () => {
  const ref = useScrollReveal(true);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] gradient-bg opacity-5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-4">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="gradient-text">Founders Choose Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've helped dozens of founders go from 'back of the napkin' to 'ready for seed round.'
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} gradient-border p-6 rounded-2xl bg-card/50 backdrop-blur-sm card-hover group relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${r.color} opacity-0 blur-2xl group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20`}>
                <r.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:gradient-text transition-all">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="reveal reveal-delay-6 mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary/5 border border-primary/10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">50+ Founders Trust Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
