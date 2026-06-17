import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../lib/config";
import { ExternalLink, GitFork, ChevronDown, ChevronUp } from "lucide-react";
import { LiquidButton } from "../ui/LiquidButton";

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        background: "#18181B",
        border: hovered ? "1px solid #8B7220" : "1px solid #27272A",
        boxShadow: hovered ? "0 0 0 1px rgba(139,114,32,0.2), 0 12px 40px rgba(0,0,0,0.5)" : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="chip text-xs py-1 px-3">{project.category}</span>
              <span style={{ fontSize: 12, color: "#3F3F46", fontFamily: "var(--font-mono)" }}>{project.year}</span>
            </div>
            <h3 className="text-display-sm font-bold leading-tight" style={{ color: "#F4F4F5" }}>{project.title}</h3>
            <p className="text-sm" style={{ color: "#71717A" }}>{project.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-105"
                style={{ border: "1px solid #27272A", color: "#3F3F46" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8C547"; e.currentTarget.style.color = "#E8C547"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#27272A"; e.currentTarget.style.color = "#3F3F46"; }}
              >
                <GitFork size={14} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-105"
                style={{ border: "1px solid #27272A", color: "#3F3F46" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8C547"; e.currentTarget.style.color = "#E8C547"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#27272A"; e.currentTarget.style.color = "#3F3F46"; }}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl p-4" style={{ background: "#0E0E10", border: "1px solid #27272A" }}>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}>Problem</h4>
            <p className="text-xs leading-relaxed" style={{ color: "#71717A" }}>{project.problem}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: "#0E0E10", border: "1px solid #27272A" }}>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}>Solution</h4>
            <p className="text-xs leading-relaxed" style={{ color: "#71717A" }}>{project.solution}</p>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}>
            Business impact
          </h4>
          <ul className="grid sm:grid-cols-2 gap-2">
            {project.impact.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-xs pl-3.5 relative"
                style={{ color: "#71717A" }}
              >
                <span
                  className="absolute left-0 top-1.5 w-1 h-1 rounded-full"
                  style={{ background: "#E8C547" }}
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span key={tech} className="chip text-xs py-1 px-3">{tech}</span>
          ))}
        </div>

        <LiquidButton
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "Hide" : "View"} architecture overview
        </LiquidButton>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 rounded-xl p-4"
                style={{ background: "#0E0E10", border: "1px solid #27272A" }}
              >
                <h4
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}
                >
                  Architecture flow
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)", color: "#71717A" }}
                >
                  {project.architecture}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-20" style={{ background: "#0E0E10" }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27272A, transparent)" }}
      />
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4"
        >
          <span className="eyebrow">Case studies</span>
          <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>Featured engineering projects</h2>
          <p className="max-w-xl text-base" style={{ color: "#71717A" }}>
            Production systems architected and delivered — from distributed microservices platforms
            to RAG-powered enterprise AI applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featured.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
