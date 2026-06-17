import { HeroSection }        from "../components/sections/HeroSection";
import { AboutSection }       from "../components/sections/AboutSection";
import { FreelanceSection }   from "../components/sections/FreelanceSection";
import { SkillsSection }      from "../components/sections/SkillsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { ContactSection }     from "../components/sections/ContactSection";
import { SEO } from "../components/seo/SEO";
import { personSchema, professionalServiceSchema, websiteSchema } from "../lib/schemas";
import { siteConfig } from "../lib/config";

export default function HomePage() {
  return (
    <>
      <SEO
        title="AI Consultant & Full Stack Java Developer"
        description="Aditya Birla is an AI Consultant and Full Stack Java Developer specializing in Generative AI, RAG systems, multi-agent frameworks, and enterprise Spring Boot engineering. Hire Aditya for AI consulting, LLM integration, or Java backend development."
        path="/"
        type="profile"
        jsonLd={[personSchema(), professionalServiceSchema(), websiteSchema()]}
      />
      <HeroSection />
      <AboutSection />
      <FreelanceSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
