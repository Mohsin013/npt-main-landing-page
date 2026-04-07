import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How long does it take to build an MVP?",
    a: "Our standard timeline is 4 weeks for a core functional product. This includes strategy, UI/UX design, development, and deployment.",
  },
  {
    q: "What tech stack do you use?",
    a: "We primarily use React, Next.js, Node.js, and Supabase. This modern stack allows us to build fast, scalable, and secure applications quickly.",
  },
  {
    q: "Do you help with deployments and cloud setup?",
    a: "Yes, we handle the entire deployment process. We'll help you set up your cloud infrastructure on platforms like AWS, Vercel, or Google Cloud.",
  },
  {
    q: "Can you fix or refactor my existing project?",
    a: "Absolutely. We specialize in project rescue, fixing bugs, improving performance, and refactoring legacy codebases to make them scalable.",
  },
  {
    q: "What happens after the MVP is launched?",
    a: "We offer ongoing support and scaling options. Once your MVP is live, we can help you iterate based on user feedback and scale your infrastructure.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`reveal reveal-delay-${index + 1} gradient-border rounded-2xl overflow-hidden card-hover`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-2">
          <p className="text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="pt-24 pb-16 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="reveal reveal-delay-6 mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
