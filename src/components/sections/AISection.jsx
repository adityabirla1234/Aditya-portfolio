import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Database, Zap, Network, Search, Cpu } from "lucide-react";
import { LiquidButton } from "../ui/LiquidButton";
import { openWhatsApp } from "../../lib/whatsapp";
import { Helmet } from "react-helmet-async";

const AI_CONSULTANT_FAQ = [
  {
    question: "Who is Aditya Birla?",
    answer: "Aditya Birla is an AI Consultant and Full Stack Java Developer with over 3 years of experience building enterprise software at Accenture and TCS. He specializes in Generative AI, RAG systems, multi-agent frameworks, and Spring Boot microservices.",
  },
  {
    question: "What AI consulting services does Aditya Birla offer?",
    answer: "Aditya Birla offers AI consulting services including Generative AI strategy, RAG pipeline development, LLM integration, multi-agent system design, AI workflow automation, and production AI deployment on AWS.",
  },
  {
    question: "Can Aditya Birla help my business implement Generative AI?",
    answer: "Yes. Aditya Birla consults with businesses on integrating Generative AI into existing systems — from building RAG-powered knowledge bases to deploying autonomous AI agents that automate complex enterprise workflows.",
  },
  {
    question: "What technologies does Aditya Birla use for AI consulting?",
    answer: "Aditya Birla's AI consulting stack includes Java 21, Spring Boot 3, LangChain4j, OpenAI API, Anthropic Claude, pgvector, Pinecone, AWS, and React — delivering end-to-end AI solutions from backend to frontend.",
  },
];

function AIConsultantFAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AI_CONSULTANT_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

const AI_CAPABILITIES = [
  { icon: <Search size={20} />, title: "RAG systems", description: "Production-grade Retrieval-Augmented Generation pipelines with hybrid search, re-ranking, and citation-grounded responses. Built with pgvector, LangChain4j, and Spring Boot.", tags: ["pgvector","Hybrid Search","Re-ranking","LangChain4j"] },
  { icon: <Network size={20} />, title: "Multi-agent systems", description: "Orchestrated multi-agent frameworks with specialized roles — Researcher, Analyst, Executor, Reviewer — coordinated through Spring State Machine with human-in-the-loop checkpoints.", tags: ["Agent Orchestration","Tool Calling","Spring State Machine","Human-in-the-Loop"] },
  { icon: <Bot size={20} />, title: "LLM-powered APIs", description: "Enterprise-grade API layers on top of OpenAI, Anthropic, and open-source models. Structured output parsing, hallucination guardrails, semantic caching, and token cost optimization.", tags: ["OpenAI API","Anthropic Claude","Structured Outputs","Semantic Cache"] },
  { icon: <Database size={20} />, title: "Vector database engineering", description: "Designed and optimized vector storage for enterprise knowledge bases. Deep expertise in pgvector indexing strategies, embedding model selection, and chunking architecture.", tags: ["pgvector","Pinecone","Embedding Models","HNSW Indexing"] },
  { icon: <Zap size={20} />, title: "Intelligent automation", description: "Workflow automation systems combining deterministic rule engines with LLM reasoning for complex decision-making. Replacing manual processes with AI-augmented pipelines.", tags: ["Workflow Automation","Decision Trees","LLM Reasoning","Event-Driven"] },
  { icon: <Cpu size={20} />, title: "Prompt engineering", description: "Systematic prompt design for production use cases — chain-of-thought, few-shot, structured output prompting, and prompt version management integrated into CI/CD pipelines.", tags: ["Chain-of-Thought","Few-Shot","Prompt Versioning","Evaluation"] },
];

function AIHeading() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll(".word-highlight-dark").forEach((item, i) => {
          setTimeout(() => item.classList.add("highlighted-dark"), 200 + i * 180);
        });
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-10 space-y-4 text-center">
      <span className="eyebrow">
        <Bot size={12} />AI Consulting &amp; Engineering
      </span>
      <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
        Generative AI &amp;{" "}
        <span style={{ position: "relative", display: "inline" }}>
          <em style={{ fontStyle: "italic", color: "#E8C547" }}>intelligent systems</em>
          <span
            className="word-highlight-dark"
            style={{
              position: "absolute", bottom: 0, left: -4, right: -4,
              height: "35%", background: "rgba(232,197,71,0.08)", zIndex: 0,
              transform: "scaleX(0)", transformOrigin: "left",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", borderRadius: 2,
            }}
          />
        </span>
      </h2>
      <p className="max-w-2xl mx-auto text-base" style={{ color: "#71717A" }}>
        Building the next generation of enterprise software — where{" "}
        <span style={{ color: "#F4F4F5", fontWeight: 600 }}>Java reliability</span> meets{" "}
        <span style={{ color: "#F4F4F5", fontWeight: 600 }}>LLM-scale intelligence</span>.
        From RAG pipelines to autonomous agent frameworks.
      </p>
    </div>
  );
}

export function AISection() {
  return (
    <section id="ai-innovation" className="relative py-20" style={{ background: "#0E0E10" }}>
      <AIConsultantFAQSchema />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27272A, transparent)" }}
      />

      {/* Subtle citrine radial */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", right: "-5%",
          width: "40%", height: "60%",
          background: "radial-gradient(ellipse, rgba(232,197,71,0.03) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AIHeading />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
              style={{
                background: "#18181B",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #27272A",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8B7220";
                e.currentTarget.style.background = "#1C1C1F";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2), 0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#27272A";
                e.currentTarget.style.background = "#18181B";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-95"
                style={{ background: "#E8C547", color: "#0E0E10" }}
              >
                {cap.icon}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: "#F4F4F5" }}>{cap.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#71717A" }}>{cap.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span key={tag} className="chip text-[11px]">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 hover-lift"
          style={{
            background: "#18181B",
            border: "1px solid #27272A",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#8B7220";
            e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.15), 0 12px 32px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#27272A";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div>
            <h3 className="text-display-sm font-bold" style={{ color: "#F4F4F5" }}>Have an AI project in mind?</h3>
            <p className="text-sm mt-1" style={{ color: "#71717A" }}>
              Let's discuss how RAG, agents, or LLM integrations can solve your enterprise challenge.
            </p>
          </div>
          <LiquidButton
            variant="default"
            size="lg"
            className="shrink-0"
            onClick={(e) => { e.preventDefault(); openWhatsApp("Hi Aditya, I have an AI project I'd like to discuss with you."); }}
          >
            Discuss your project
          </LiquidButton>
        </motion.div>

        {/* FAQ — E-E-A-T signal + rich result eligibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-display-sm font-bold mb-6 text-center" style={{ color: "#F4F4F5" }}>
            AI Consulting — Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {AI_CONSULTANT_FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl"
                style={{ background: "#18181B", border: "1px solid #27272A" }}
              >
                <summary
                  className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm"
                  style={{ color: "#F4F4F5", listStyle: "none" }}
                >
                  {item.question}
                  <span className="ml-4 shrink-0 text-xs" style={{ color: "#E8C547" }}>+</span>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#71717A" }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
