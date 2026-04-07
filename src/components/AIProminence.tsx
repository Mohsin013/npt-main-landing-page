import { Brain, Zap, Bot, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const aiServices = [
  {
    icon: Brain,
    title: "Custom LLM & GPT Integrations",
    desc: "Integrate powerful language models into your products for intelligent text generation, analysis, and understanding.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Zap,
    title: "Automated Content Generation Workflows",
    desc: "Streamline your content creation with AI-powered workflows that generate, edit, and publish at scale.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Bot,
    title: "Intelligent Customer Support Bots",
    desc: "Deploy AI chatbots that understand context, handle complex queries, and escalate when needed.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: BarChart3,
    title: "AI-Driven Data Analytics & Insights",
    desc: "Transform raw data into actionable insights with automated analysis and predictive modeling.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

const AIProminence = () => {
  const ref = useScrollReveal(true);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-5 blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Supercharge Your Business with{" "}
            <span className="gradient-text">AI Automations</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We don't just build apps; we build intelligent systems. From custom LLM integrations to automated customer support and data processing, we help you leverage the power of AI to save time and increase efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aiServices.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} gradient-border p-6 rounded-2xl card-hover group relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-300`} />
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:gradient-text transition-all">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIProminence;
