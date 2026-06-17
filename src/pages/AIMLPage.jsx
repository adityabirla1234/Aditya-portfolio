import { ProjectsSection } from "../components/sections/ProjectsSection";
import { AISection }       from "../components/sections/AISection";
import { SEO } from "../components/seo/SEO";
import { breadcrumbSchema, projectsItemListSchema } from "../lib/schemas";

export default function AIMLPage() {
  return (
    <div style={{ paddingTop: "80px", background: "#0E0E10" }}>
      <SEO
        title="AI Consulting Projects — Generative AI & LLM Engineering by Aditya Birla"
        description="AI consulting case studies by Aditya Birla: production RAG systems, multi-agent orchestration, and LLM-powered enterprise applications built with Spring Boot and Java."
        path="/ai-ml"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Consulting", path: "/ai-ml" },
          ]),
          projectsItemListSchema(),
        ]}
      />
      <div className="max-w-7xl mx-auto px-8 pt-12">
        <span className="eyebrow">AI / ML Engineering</span>
        <h1 className="text-display-xl mt-4" style={{ color: "#F4F4F5" }}>
          Generative AI &amp; machine learning projects
        </h1>
        <p className="max-w-2xl text-base mt-4" style={{ color: "#71717A" }}>
          Production-grade RAG systems, multi-agent orchestration platforms, and LLM-powered
          enterprise applications — built on Spring Boot, Java, and modern AI infrastructure.
        </p>
      </div>
      <ProjectsSection />
      <AISection />
    </div>
  );
}
