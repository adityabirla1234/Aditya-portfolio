import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { blogTopics } from "../../lib/config";

export function BlogListing() {
  return (
    <section className="relative min-h-screen py-20" style={{ background: "#0E0E10" }}>
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4"
        >
          <span className="eyebrow">Engineering blog</span>
          <h1 className="text-display-xl" style={{ color: "#F4F4F5" }}>
            Technical writing &amp;{" "}
            <em style={{ fontStyle: "italic", color: "#A1A1AA" }}>engineering insights</em>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "#71717A" }}>
            Deep dives into Java, Spring Boot, microservices architecture, cloud engineering,
            and the practical realities of building production Generative AI systems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {blogTopics.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: si * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Tag size={12} style={{ color: "#3F3F46" }} />
                <h2
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#3F3F46", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}
                >
                  {section.category}
                </h2>
                <div className="flex-1 h-px" style={{ background: "#1C1C1F" }} />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.topics.map((topic) => (
                  <article
                    key={topic}
                    className="group cursor-pointer transition-all duration-200 hover-lift"
                    style={{
                      background: "#18181B",
                      border: "1px solid #27272A",
                      borderRadius: "1rem",
                      padding: "1.25rem 1.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#8B7220";
                      e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.15), 0 8px 24px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#27272A";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="chip text-[10px] py-0.5 px-2.5">Coming soon</span>
                        </div>
                        <h3
                          className="text-sm font-bold leading-snug transition-colors"
                          style={{ color: "#A1A1AA" }}
                        >
                          {topic}
                        </h3>
                      </div>
                      <ArrowRight
                        size={13}
                        className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                        style={{ color: "#27272A" }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "#18181B", border: "1px solid #27272A" }}
        >
          <div>
            <h3 className="font-bold text-base" style={{ color: "#F4F4F5" }}>
              Get notified when articles are published
            </h3>
            <p className="text-sm mt-1" style={{ color: "#71717A" }}>
              No spam. In-depth technical content published 2–4 times per month.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-field flex-1 sm:w-64 rounded-full"
              style={{ borderRadius: 9999, padding: "10px 20px" }}
            />
            <button className="btn-primary shrink-0">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
