import Layout from "@/components/Layout";
import { Rocket, Globe, Brain, Cloud, CheckCircle2, Database } from "lucide-react";
import CTASection from "@/components/CTASection";

const serviceDetails = [
  {
    icon: Rocket,
    title: "MVP Development",
    desc: "We help startups quickly build and launch their first version with a focus on speed and scalability.",
    includes: ["UI development", "Backend APIs", "Database design", "Deployment"],
  },
  {
    icon: Globe,
    title: "Web App Development",
    desc: "Custom applications built for performance and scalability.",
    includes: [],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Add intelligent features like chatbots, automation, and AI workflows.",
    includes: [],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "We deploy and manage applications on AWS with best practices.",
    includes: [],
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    desc: "Comprehensive functional testing from end-to-end validation to granular component testing.",
    includes: ["End-to-end testing", "Component testing", "Regression testing", "Test automation"],
  },
  {
    icon: Database,
    title: "CMS Integration",
    desc: "Headless CMS implementation with Umbraco and Contentful for seamless content management.",
    includes: ["Umbraco", "Contentful", "API integration", "Content modeling"],
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Our <span className="gradient-text">Services</span>
          </h1>

          <div className="space-y-8">
            {serviceDetails.map((s, i) => (
              <div key={i} className="gradient-border p-8 rounded-2xl">
                <div className="flex items-start gap-5">
                  <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-2">{s.title}</h2>
                    <p className="text-muted-foreground mb-4">{s.desc}</p>
                    {s.includes.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Includes:</p>
                        <ul className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                          {s.includes.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </Layout>
  );
};

export default ServicesPage;
