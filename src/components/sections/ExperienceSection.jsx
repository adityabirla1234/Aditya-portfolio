import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experiences } from "../../lib/config";
import { Calendar, MapPin, TrendingUp } from "lucide-react";

function MetricCard({ metric, description, index }) {
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numMatch = metric.match(/^([\d.]+)(.*)$/);
    if (!numMatch) return;
    const num     = parseFloat(numMatch[1]);
    const suffix  = numMatch[2];
    const isFloat = numMatch[1].includes(".");
    const span    = el.querySelector(".metric-num");
    if (!span) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration  = 1000 + index * 100;
        const startTime = Date.now();
        const tick = () => {
          const elapsed  = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          const cur      = num * eased;
          span.textContent = (isFloat ? cur.toFixed(1) : Math.round(cur).toString()) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-xl p-3 text-center"
      style={{ background: "#18181B", border: "1px solid #27272A" }}
    >
      <div className="text-xl font-bold stat-shimmer">
        <span className="metric-num">{metric}</span>
      </div>
      <div className="text-[10px] mt-1 leading-tight" style={{ color: "#71717A" }}>{description}</div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20" style={{ background: "#0E0E10" }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27272A, transparent)" }}
      />
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4"
        >
          <span className="eyebrow">Career journey</span>
          <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>Professional engineering experience</h2>
          <p className="max-w-xl text-base" style={{ color: "#71717A" }}>
            2.5+ years building enterprise-grade systems at top-tier technology and consulting firms,
            working on platforms that serve millions of users.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line — citrine gradient */}
          <div
            className="absolute left-[11px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(232,197,71,0.4), rgba(232,197,71,0.1), transparent)" }}
            aria-hidden
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative md:pl-10"
              >
                {/* Timeline dot — citrine */}
                <div
                  className="absolute left-0 top-6 w-[23px] h-[23px] rounded-full hidden md:flex items-center justify-center"
                  style={{ background: "#0E0E10", border: "2px solid #E8C547" }}
                  aria-hidden
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "#E8C547" }} />
                </div>

                <div
                  className="hover-lift transition-all duration-300"
                  style={{
                    background: "#18181B",
                    border: "1px solid #27272A",
                    borderRadius: "1rem",
                    padding: "1.5rem 2rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#8B7220";
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2), 0 12px 32px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#27272A";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-display-sm font-bold" style={{ color: "#F4F4F5" }}>{exp.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base" style={{ color: "#F4F4F5" }}>{exp.company}</span>
                        <span style={{ color: "#27272A", fontSize: 12 }}>·</span>
                        <span className="text-sm capitalize" style={{ color: "#71717A" }}>{exp.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: "#71717A" }}>
                        <Calendar size={12} /><time>{exp.startDate}</time><span>–</span><time>{exp.endDate}</time>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm" style={{ color: "#71717A" }}>
                        <MapPin size={12} />{exp.location}
                      </div>
                      <span className="chip text-xs py-1 px-3">{exp.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#71717A" }}>{exp.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {exp.achievements.map((ach, i) => (
                      <MetricCard key={ach.metric} metric={ach.metric} description={ach.description} index={i} />
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4
                      className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
                      style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}
                    >
                      <TrendingUp size={11} style={{ color: "#E8C547" }} />Key contributions
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, i) => (
                        <motion.li
                          key={r}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          className="text-sm pl-4 relative"
                          style={{ color: "#71717A" }}
                        >
                          <span
                            className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                            style={{ background: "#E8C547" }}
                          />
                          {r}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}
                    >
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="chip hover-lift">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Current focus node */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative md:pl-10"
            >
              <div
                className="absolute left-0 top-6 w-[23px] h-[23px] rounded-full hidden md:flex items-center justify-center"
                style={{ background: "#0E0E10", border: "2px dashed #3F3F46" }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E8C547", opacity: 0.5 }} />
              </div>
              <div
                className="rounded-2xl p-6 sm:p-8 transition-colors duration-300"
                style={{ border: "1px dashed #27272A" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3F3F46")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#27272A")}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}
                >
                  Current focus
                </p>
                <h3 className="text-display-sm font-bold" style={{ color: "#3F3F46" }}>
                  AI Solutions Engineering & Enterprise Consulting
                </h3>
                <p className="text-sm mt-2" style={{ color: "#52525B" }}>
                  Building RAG systems, LLM-powered APIs, and microservices for enterprise clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
