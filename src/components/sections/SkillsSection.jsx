import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../../lib/config";
import { Server, Monitor, Cloud, Brain } from "lucide-react";

const ICONS = {
  server:  <Server  size={14} />,
  monitor: <Monitor size={14} />,
  cloud:   <Cloud   size={14} />,
  brain:   <Brain   size={14} />,
};

const LEVEL_META = {
  core:       { label: "Core",      dot: "#E8C547" },
  proficient: { label: "Proficient",dot: "#8B7220" },
  familiar:   { label: "Familiar",  dot: "#3F3F46" },
};

function AnimatedNumber({ target, suffix = "" }) {
  const ref     = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num      = parseFloat(target);
        const duration = 900;
        const start    = Date.now();
        const tick = () => {
          const p    = Math.min((Date.now() - start) / duration, 1);
          const e    = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(num * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>0{suffix}</span>;
}

export function SkillsSection() {
  const [active, setActive] = useState(skillCategories[0].id);
  const cat = skillCategories.find((c) => c.id === active);

  return (
    <section id="skills" className="relative py-20" style={{ background: "#0E0E10" }}>
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
          <span className="eyebrow">Technical stack</span>
          <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
            Skills &amp; technology expertise
          </h2>
          <p className="max-w-xl text-base" style={{ color: "#71717A" }}>
            A comprehensive stack spanning enterprise backend, cloud infrastructure,
            modern frontend, and production AI engineering.
          </p>
        </motion.div>

        {/* Tab pills */}
        <div
          className="flex flex-wrap gap-2 mb-8 p-1.5 w-fit rounded-2xl"
          style={{ background: "#18181B", border: "1px solid #27272A" }}
        >
          {skillCategories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer outline-none"
                style={{
                  background:  isActive ? "#E8C547" : "transparent",
                  color:       isActive ? "#0E0E10" : "#52525B",
                  border:      isActive ? "1px solid transparent" : "1px solid transparent",
                  fontFamily:  "var(--font-body)",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#A1A1AA"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#52525B"; }}
              >
                {ICONS[c.icon]}{c.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#18181B", border: "1px solid #27272A" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-display-sm font-bold" style={{ color: "#F4F4F5" }}>{cat.label}</h3>
                <p className="text-sm mt-1" style={{ color: "#71717A" }}>{cat.description}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {Object.entries(LEVEL_META).map(([key, { label, dot }]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: dot }} aria-hidden />
                    <span style={{ fontSize: 11, color: "#52525B" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between p-4 rounded-xl transition-all duration-150 group cursor-default"
                  style={{ background: "#0E0E10", border: "1px solid #1C1C1F" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#8B7220";
                    e.currentTarget.style.background = "#111113";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1C1C1F";
                    e.currentTarget.style.background = "#0E0E10";
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: "#F4F4F5" }}>{skill.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: LEVEL_META[skill.level].dot }} />
                    <span style={{ fontSize: 10, color: "#52525B" }}>{LEVEL_META[skill.level].label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { number: "12", suffix: "+", label: "Backend technologies" },
            { number: "6",  suffix: "+", label: "Cloud & DevOps tools" },
            { number: "8",  suffix: "+", label: "AI/ML frameworks" },
            { number: "6",  suffix: "+", label: "Frontend technologies" },
          ].map(({ number, suffix, label }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center hover-lift transition-all duration-300"
              style={{
                background: "#18181B",
                border: "1px solid #27272A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#8B7220";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#27272A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="text-display-md font-bold stat-shimmer">
                <AnimatedNumber target={number} suffix={suffix} />
              </div>
              <div className="text-xs mt-1" style={{ color: "#52525B" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
