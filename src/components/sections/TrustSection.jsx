import { motion } from "framer-motion";

const technologies = [
  "Java","Spring Boot","Apache Kafka","AWS","PostgreSQL",
  "Docker","Kubernetes","React","Oracle DB","Redis",
];

export function TrustSection() {
  return (
    <section id="trust" className="relative py-16 overflow-hidden" style={{ background: "#0E0E10", borderTop: "1px solid #18181B", borderBottom: "1px solid #18181B" }}>
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p
            style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#3F3F46",
              fontFamily: "var(--font-mono)",
            }}
          >
            Work experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-16 mb-12"
        >
          {["Accenture", "TCS"].map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="cursor-default transition-all duration-300"
              style={{ color: "#27272A" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#A1A1AA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#27272A"; }}
            >
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.08em", fontFamily: "var(--font-body)" }}>
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Citrine divider line */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #27272A)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#E8C547" }} />
          <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, #27272A, transparent)" }} />
        </div>

        {/* Scrolling tech marquee */}
        <div
          className="relative overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-x-8 w-max"
          >
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={i}
                className="text-sm font-medium whitespace-nowrap cursor-default transition-colors duration-200"
                style={{ color: "#3F3F46", fontFamily: "var(--font-mono)", fontSize: 12 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8C547")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3F3F46")}
              >
                {tech}
                <span style={{ marginLeft: "2rem", color: "#27272A" }}>·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
