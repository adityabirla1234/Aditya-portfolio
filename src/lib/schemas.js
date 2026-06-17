import { siteConfig, projects, experiences } from "./config";

const author = siteConfig.author;

/**
 * Person schema — establishes E-E-A-T identity for Aditya across the whole site.
 * Used on the homepage.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: siteConfig.url,
    image: author.avatarUrl,
    email: author.email,
    jobTitle: "AI Consultant & Full Stack Java Developer",
    description: "Aditya Birla is an AI Consultant specializing in Generative AI, RAG systems, multi-agent frameworks, and enterprise Java engineering. He helps businesses integrate intelligent AI solutions into production software.",
    sameAs: [author.linkedin, author.github].filter(Boolean),
    knowsAbout: [
      "Artificial Intelligence Consulting",
      "Generative AI",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "AI Agents",
      "Spring Boot",
      "Java",
      "Microservices",
      "AWS",
    ],
    worksFor: experiences?.[0]
      ? { "@type": "Organization", name: experiences[0].company }
      : undefined,
  };
}

/**
 * ProfessionalService schema — for the freelance/consulting offering.
 * Used on the homepage alongside Person schema.
 */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Aditya Birla — AI Consultant & Software Engineer`,
    description: "AI consulting services by Aditya Birla: Generative AI strategy, RAG pipeline development, multi-agent system design, LLM integration, and enterprise Java engineering.",
    url: siteConfig.url,
    image: author.avatarUrl,
    provider: { "@type": "Person", name: author.name },
    areaServed: "Worldwide",
    serviceType: [
      "AI Consulting",
      "Generative AI Development",
      "RAG System Architecture",
      "Multi-Agent Framework Development",
      "LLM Integration & Engineering",
      "Full Stack Java Development",
      "Spring Boot Microservices",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI & Software Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Generative AI Consulting",
            description: "End-to-end Generative AI strategy, architecture, and implementation for enterprise clients.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RAG Pipeline Development",
            description: "Production-grade Retrieval-Augmented Generation systems with hybrid search, re-ranking, and citation-grounded responses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Agent Orchestration",
            description: "Multi-agent frameworks for autonomous business workflow automation using LLMs and Spring Boot.",
          },
        },
      ],
    },
  };
}

/**
 * WebSite schema with SearchAction — lets Google show a sitelinks search box
 * (only triggers if you actually have on-site search; harmless if not).
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: author.name,
    url: siteConfig.url,
  };
}

/**
 * BreadcrumbList schema — pass an array of { name, path }.
 */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * ItemList schema for the /ai-ml projects grid — helps Google understand
 * this is a curated list of distinct creative/software works.
 */
export function projectsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Consulting & Software Engineering Projects by Aditya Birla",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.tagline,
        codeRepository: p.github,
        programmingLanguage: "Java",
        about: p.technologies?.join(", "),
      },
    })),
  };
}

/**
 * FAQPage schema — pass an array of { question, answer }.
 * Use on AISection if/when FAQ-style copy is added.
 */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
