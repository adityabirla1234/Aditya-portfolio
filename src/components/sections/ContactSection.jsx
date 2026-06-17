import { motion } from "framer-motion";
import { siteConfig } from "../../lib/config";
import { Mail, GitFork, Link2, ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20" style={{ background: "#0E0E10" }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27272A, transparent)" }}
      />

      {/* Subtle citrine radial bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0", left: "0",
          width: "40%", height: "50%",
          background: "radial-gradient(ellipse, rgba(232,197,71,0.03) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading + links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="eyebrow">Get in touch</span>
              <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
                Let's build something{" "}
                <em style={{ fontStyle: "italic", color: "#E8C547" }}>remarkable</em>{" "}
                together
              </h2>
              <p className="text-base leading-relaxed max-w-md" style={{ color: "#71717A" }}>
                Whether you're architecting a new microservices platform, building an AI product,
                or need a senior engineer to accelerate your team — I'd love to hear about it.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: <Mail size={16} />,    label: "Email",    value: siteConfig.author.email,             href: `mailto:${siteConfig.author.email}` },
                { icon: <Link2 size={16} />,   label: "LinkedIn", value: "Connect on LinkedIn",               href: siteConfig.author.linkedin },
                { icon: <GitFork size={16} />, label: "GitHub",   value: "View open-source work",             href: siteConfig.author.github },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group"
                  style={{ background: "#18181B", border: "1px solid #27272A" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#8B7220";
                    e.currentTarget.style.background = "#1C1C1F";
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#27272A";
                    e.currentTarget.style.background = "#18181B";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-95"
                    style={{ background: "#E8C547", color: "#0E0E10" }}
                  >
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[10px] uppercase tracking-widest font-bold mb-0.5"
                      style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}
                    >
                      {label}
                    </div>
                    <div className="text-sm font-medium truncate" style={{ color: "#F4F4F5" }}>{value}</div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                    style={{ color: "#3F3F46" }}
                  />
                </a>
              ))}
            </div>

            {/* Available badge */}
            <div
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{ background: "#18181B", border: "1px solid #27272A" }}
            >
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "#22C55E" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: "#22C55E" }}
                />
              </div>
              <p className="text-sm" style={{ color: "#71717A" }}>
                <strong style={{ color: "#F4F4F5" }}>Available for new projects.</strong>{" "}
                Typical response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right — quick-start panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div
              className="rounded-2xl p-6 sm:p-8 space-y-5"
              style={{ background: "#18181B", border: "1px solid #27272A" }}
            >
              <h3 className="font-bold text-base" style={{ color: "#F4F4F5" }}>
                Typical engagement types
              </h3>

              {[
                { title: "Enterprise Java / Spring Boot", desc: "Microservices architecture, API design, performance optimization, Kafka integration." },
                { title: "AI Solutions Engineering",      desc: "RAG systems, LLM-powered APIs, multi-agent frameworks, vector database design." },
                { title: "AWS Cloud Architecture",        desc: "Serverless patterns, container orchestration, cost optimization, security hardening." },
                { title: "Freelance Web Projects",        desc: "Full-stack React + Spring Boot products, SEO-ready, production-deployed." },
              ].map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#E8C547" }}
                  />
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#F4F4F5" }}>{title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Minimal testimonial pull-quote */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(232,197,71,0.04)",
                border: "1px solid rgba(139,114,32,0.25)",
              }}
            >
              <p className="text-sm italic leading-relaxed" style={{ color: "#A1A1AA" }}>
                "Aditya delivered a production-quality system well ahead of schedule.
                His understanding of both engineering constraints and business requirements
                made him invaluable to the project."
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "#E8C547", color: "#0E0E10" }}
                >
                  RC
                </div>
                <div className="text-xs" style={{ color: "#52525B" }}>Client · Enterprise Platform</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
