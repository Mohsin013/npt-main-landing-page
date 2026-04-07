import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Suspense, lazy } from "react";

// Lazy load CTAScene to improve initial load time
const CTAScene = lazy(() => import("./CTAScene"));

const CTASection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* 3D Scene Background - Lazy loaded */}
      <Suspense fallback={null}>
        <CTAScene />
      </Suspense>

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] gradient-bg opacity-10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 reveal">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left div - Contact Info */}
          <div className="flex-1 gradient-border p-12 md:p-16 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Build Something{" "}
                <span className="gradient-text">Amazing Together</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-md">
                Book a free consultation and get expert guidance on your project.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917006009596">
                  <Button
                    size="lg"
                    className="gradient-bg text-primary-foreground rounded-full px-8 hover:opacity-90 h-14 text-base shadow-lg shadow-primary/20"
                  >
                    <Phone className="mr-2 h-5 w-5" /> +91-7006009596
                  </Button>
                </a>
                <a
                  href="https://wa.me/91889999096"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-border text-foreground hover:bg-muted h-14 text-base"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </Button>
                </a>
                <a href="mailto:info@northpeaktechnologies.com">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-border text-foreground hover:bg-muted h-14 text-base"
                  >
                    <Mail className="mr-2 h-5 w-5" /> Email
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right div - Quick Contact */}
          <div className="flex-1 gradient-border p-12 md:p-16 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative h-full flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Get Started <span className="gradient-text">Today</span>
              </h3>
              <p className="text-muted-foreground mb-8">
                Ready to transform your business? Let's discuss how we can help.
              </p>
              <div className="space-y-4">
                <a
                  href="/contact"
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all duration-300 group"
                >
                  <span className="font-medium">Schedule a Call</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all duration-300 group"
                >
                  <span className="font-medium">Request a Quote</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
                <a
                  href="/#portfolio"
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all duration-300 group"
                >
                  <span className="font-medium">View Our Work</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
