import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import AIProminence from "@/components/AIProminence";
import ProblemSolution from "@/components/ProblemSolution";
import SolutionSection from "@/components/SolutionSection";
import TimelineSection from "@/components/TimelineSection";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FloatingParticles from "@/components/FloatingParticles";

const Index = () => {
  return (
    <Layout>
      <FloatingParticles />
      <Hero />
      <TechMarquee />
      <AIProminence />
      <ProblemSolution />
      <SolutionSection />
      <TimelineSection />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
