import { CheckCircle, Clock, Lightbulb, Code, Rocket, Layout, PenTool } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const processSteps = [
  {
    icon: Lightbulb,
    title: "Idea Validation",
    desc: "We refine your concept and define the core features that matter.",
  },
  {
    icon: Layout,
    title: "Wireframing",
    desc: "Mapping out the user journey with low-fidelity blueprints.",
  },
  {
    icon: PenTool,
    title: "Design & Prototype",
    desc: "Creating a high-fidelity, interactive UI that looks premium.",
  },
  {
    icon: Code,
    title: "MVP Development",
    desc: "Building the functional product using modern tech stacks.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Deploying your product to the world and gathering feedback.",
  },
];

const SolutionSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="solution" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A Startup Studio for{" "}
            <span className="gradient-text">Non-Technical Founders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just write code. We act as your technical co-founder, guiding you through every step of the product lifecycle.
          </p>
        </div>

        {/* Timeline banner */}
        <div className="reveal mb-12 max-w-2xl mx-auto">
          <div className="gradient-border p-6 rounded-2xl bg-card/50 backdrop-blur-sm flex items-center justify-center gap-4">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Complete Process</p>
              <p className="text-2xl font-bold gradient-text">All within 4 weeks</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">Speed is our competitive advantage.</p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} relative`}
            >
              {/* Connection line */}
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10">
                <div className="gradient-border p-5 rounded-2xl bg-card/50 backdrop-blur-sm card-hover h-full flex flex-col items-center text-center group">
                  <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">
                    {i === 0 && "Week 1"}
                    {i === 1 && "Week 1"}
                    {i === 2 && "Week 2"}
                    {i === 3 && "Week 3"}
                    {i === 4 && "Week 4"}
                  </div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
