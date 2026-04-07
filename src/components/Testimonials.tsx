import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote, Star, Rocket, Award, Calendar } from "lucide-react";
import anika from "@/assets/testimonials/anika.png";
import asralan from "@/assets/testimonials/asralan.png";
import sruti from "@/assets/testimonials/sruti.png";
import suhaib from "@/assets/testimonials/suhaib.jpeg";

const testimonials = [
  {
    text: "NorthPeak Technologies built an incredible AI-powered platform for us that truly makes a difference. The system intelligently generates personalized modules and analyzes reports to help autistic and ADHD children improve their emotional skills. Their understanding of both technology and our vision was exceptional.",
    author: "Anika Mistry",
    role: "Dev Minds Learning",
    image: anika,
  },
  {
    text: "NorthPeak Technologies delivered a complete, scalable solution for our platform. From matching clients with therapists and wellness experts to building both mobile app and PWA with a powerful admin dashboard — everything was executed seamlessly. Highly professional and reliable team.",
    author: "Sruti Pujari",
    role: "Feel Your Best Pvt. Ltd.",
    image: sruti,
  },
  {
    text: "NorthPeak Technologies created a high-quality landing page that not only represents our business professionally but also helps us generate consistent leads. The impact was visible almost immediately.",
    author: "Azad Arsalan",
    role: "Retrofire and Safety",
    image: asralan,
  },
  {
    text: "NorthPeak Technologies delivered a complete solution — website, lead funnel, backend systems, and payment integration — all executed flawlessly. Highly recommended.",
    author: "Dr. Suhaib Amin",
    role: "TruIntel Reform Organization",
    image: suhaib,
  },
];

const Testimonials = () => {
  const ref = useScrollReveal(true);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full gradient-bg opacity-5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="reveal text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">⭐⭐⭐⭐⭐</span>
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Founders</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} gradient-border p-8 rounded-2xl card-hover relative overflow-hidden bg-card/50 backdrop-blur-sm flex flex-col h-full`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 gradient-bg opacity-5 blur-2xl" />
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic leading-relaxed flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="reveal reveal-delay-4 mt-12 flex justify-center flex-wrap gap-4">
          {[
            { label: "50+ Projects", icon: Rocket },
            { label: "98% Satisfaction", icon: Award },
            { label: "2+ Years", icon: Calendar },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-foreground"
            >
              <badge.icon className="h-5 w-5 text-primary" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
