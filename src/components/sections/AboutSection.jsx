import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Rocket } from "lucide-react";
import { siteConfig } from "../../lib/config";

const principles = [
  {
    icon: <Target size={16} />,
    title: "Scalability first",
    desc: "Every architectural decision evaluated through the lens of scale. What works at 1,000 requests may fail at 1,000,000. I build for the system's ceiling, not its floor.",
  },
  {
    icon: <Lightbulb size={16} />,
    title: "AI-native thinking",
    desc: "The next generation of enterprise software is AI-augmented. I approach every system design with the question: where can intelligence reduce friction and amplify human capability?",
  },
  {
    icon: <Rocket size={16} />,
    title: "Engineering clarity",
    desc: "Complexity is easy. Simplicity is hard. I obsess over clean abstractions, meaningful names, and systems that new engineers can understand on their first week.",
  },
];

function HighlightedParagraphs() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll(".word-highlight, .word-highlight-strong");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("highlighted"), 200 + i * 150);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4 text-base leading-relaxed" style={{ color: "#71717A" }}>
      <p>
        I didn't start wanting to write Java. I started wanting to understand how large systems —{" "}
        <span className="word-highlight font-medium" style={{ color: "#A1A1AA" }}>banking platforms</span>,{" "}
        <span className="word-highlight font-medium" style={{ color: "#A1A1AA" }}>logistics engines</span>,{" "}
        <span className="word-highlight font-medium" style={{ color: "#A1A1AA" }}>recommendation pipelines</span>{" "}
        — actually work at their core.
      </p>
      <p>
        What changed my trajectory was building my first RAG system in 2023. Watching a language model reason
        over a corpus of 50,000 enterprise documents — accurately, in under 10 seconds — fundamentally shifted
        my view of what software could be. Since then, I've been obsessively bridging the gap between{" "}
        <strong className="word-highlight-strong" style={{ color: "#F4F4F5" }}>enterprise Java reliability</strong> and{" "}
        <strong className="word-highlight-strong" style={{ color: "#F4F4F5" }}>LLM-scale intelligence</strong>.
      </p>
      <p>
        I'm interested in the hard problems:{" "}
        <span className="word-highlight font-medium" style={{ color: "#A1A1AA" }}>distributed transaction integrity</span>,{" "}
        <span className="word-highlight font-medium" style={{ color: "#A1A1AA" }}>LLM hallucination prevention</span> at scale,
        multi-agent system coordination, and designing systems that remain observable and debuggable at 2 AM.
      </p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-20" style={{ background: "#0E0E10" }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #27272A, transparent)" }}
      />
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Portrait + name */}
            <div className="flex items-start gap-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="shrink-0 relative"
                style={{ width: 120, height: 144 }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid #27272A",
                    background: "#18181B",
                    boxShadow: "0 2px 0 0 #E8C547, 4px 4px 0 0 #8B7220",
                  }}
                >
                  <img
                    src={siteConfig.author.avatarUrl || "https://ik.imagekit.io/chedcztb6/VASTUBYAMAN/file_00000000229871faa1180fc1a6f7e7e2.png?updatedAt=1779861410672&ik-s=a7778170c1f76c860961da01fbb5a364c635bbac"}
                    alt={`${siteConfig.author.name} — portrait`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      parent.style.background = "#18181B";
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.innerHTML = `<span style="font-size:36px;font-weight:800;color:#E8C547;letter-spacing:-2px;font-family:var(--font-body)">${siteConfig.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>`;
                    }}
                  />
                </div>
                {/* Availability badge */}
                <div
                  className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full px-2 py-1"
                  style={{
                    border: "1px solid #27272A", background: "#18181B",
                    fontSize: 9, fontWeight: 700, whiteSpace: "nowrap",
                    letterSpacing: "0.04em", color: "#A1A1AA",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
                  Available
                </div>
              </motion.div>

              <div className="pt-1 space-y-2">
                <span className="eyebrow">About</span>
                <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
                  An engineer who builds systems,{" "}
                  <em style={{ fontStyle: "italic", color: "#A1A1AA" }}>not just features</em>
                </h2>
              </div>
            </div>

            <HighlightedParagraphs />

            <div className="grid grid-cols-2 gap-5 pt-4" style={{ borderTop: "1px solid #27272A" }}>
              {[
                { label: "Location",       value: "Indore, India" },
                { label: "Experience",     value: "2.5+ years" },
                { label: "Specialization", value: "Java + AI Systems" },
                { label: "Available for",  value: "Consulting & FTE" },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <div
                    style={{
                      fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
                      color: "#3F3F46", fontWeight: 600, fontFamily: "var(--font-mono)",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#F4F4F5" }}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — philosophy cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#3F3F46",
                fontFamily: "var(--font-mono)", marginBottom: "1.5rem",
              }}
            >
              Engineering philosophy
            </h3>

            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="hover-lift transition-all duration-200 group"
                style={{
                  background: "#18181B",
                  border: "1px solid #27272A",
                  borderRadius: "1rem",
                  padding: "1.25rem 1.5rem",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#8B7220";
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2), 0 8px 32px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#27272A";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-95"
                    style={{ background: "#E8C547", color: "#0E0E10" }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "#F4F4F5", fontSize: 15, marginBottom: 6 }}>{p.title}</h4>
                    <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="grid grid-cols-3 gap-3 mt-6">
              {["Reliability by design","Performance driven","Security conscious","User-centric","Observable systems","Test-first mindset"].map((principle, i) => (
                <motion.div
                  key={principle}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="rounded-xl p-3 text-center cursor-default transition-colors"
                  style={{ background: "#18181B", border: "1px solid #27272A" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#8B7220";
                    e.currentTarget.style.background = "rgba(232,197,71,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#27272A";
                    e.currentTarget.style.background = "#18181B";
                  }}
                >
                  <span
                    style={{
                      fontSize: 10, color: "#71717A", fontWeight: 500,
                      lineHeight: 1.4, display: "block", fontFamily: "var(--font-mono)",
                    }}
                  >
                    {principle}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
