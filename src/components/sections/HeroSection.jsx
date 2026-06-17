import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openWhatsApp } from "../../lib/whatsapp";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LiquidButton } from "../ui/LiquidButton";

const TECH_CHIPS = [
  "Java 21", "Spring Boot 3", "Apache Kafka", "AWS", "RAG Systems", "LLM Engineering",
];

function AnimatedStat({ value, label }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  const numMatch = value.match(/^([\d.]+)(.*)$/);
  const numPart  = numMatch ? parseFloat(numMatch[1]) : 0;
  const suffix   = numMatch ? numMatch[2] : value;
  const isFloat  = numPart.toString().includes(".");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const start = Date.now();
        const tick = () => {
          const elapsed  = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          const cur      = numPart * eased;
          setDisplayed((isFloat ? cur.toFixed(1) : Math.round(cur).toString()) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="text-display-sm font-bold stat-shimmer">{displayed}</div>
      <div className="text-sm mt-0.5" style={{ color: "#71717A" }}>{label}</div>
    </div>
  );
}

function ArchitectureCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, t = 0;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const getNodes = (w, h) => [
      { x: w*0.5,  y: h*0.08, label: "API Gateway",     pulse: 0 },
      { x: w*0.2,  y: h*0.28, label: "Auth Service",     pulse: 0.3 },
      { x: w*0.5,  y: h*0.28, label: "Order Service",    pulse: 0.6 },
      { x: w*0.8,  y: h*0.28, label: "AI Orchestrator",  pulse: 0.9 },
      { x: w*0.12, y: h*0.55, label: "PostgreSQL",        pulse: 1.2 },
      { x: w*0.38, y: h*0.55, label: "Kafka Events",      pulse: 1.5 },
      { x: w*0.62, y: h*0.55, label: "Vector DB",         pulse: 1.8 },
      { x: w*0.88, y: h*0.55, label: "LLM API",           pulse: 2.1 },
      { x: w*0.5,  y: h*0.82, label: "Redis Cache",       pulse: 2.4 },
    ];
    const edges = [[0,1],[0,2],[0,3],[1,4],[2,5],[3,6],[3,7],[5,8],[6,8],[7,8]];

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const nodes = getNodes(w, h);
      t += 0.008;

      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const alpha = 0.12 + 0.05 * Math.sin(t + a * 0.5);
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(63,63,70,${alpha * 3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Citrine data packets
        const progress = ((t * 0.4 + a * 0.3) % 1);
        const px = na.x + (nb.x - na.x) * progress;
        const py = na.y + (nb.y - na.y) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,197,71,${0.5 + 0.3 * Math.sin(t * 3)})`;
        ctx.fill();
      });

      nodes.forEach((node) => {
        const pulse  = 0.7 + 0.3 * Math.sin(t * 1.5 + node.pulse);
        const radius = 7;

        // Outer ring — citrine glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,197,71,${0.06 * pulse})`;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,197,71,${0.7 * pulse})`;
        ctx.fill();

        if (w > 160) {
          const fontSize = w < 300 ? 7 : 9;
          ctx.font = `500 ${fontSize}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(161,161,170,${0.4 + 0.3 * pulse})`;
          ctx.textAlign = "center";
          ctx.fillText(node.label, node.x, node.y + radius + 14);
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function HeroSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#0E0E10" }}>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(63,63,70,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(63,63,70,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Citrine radial glow — top left corner */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "-5%",
          width: "50%", height: "60%",
          background: "radial-gradient(ellipse, rgba(232,197,71,0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow">
                <span
                  className="w-1.5 h-1.5 rounded-full citrine-ping"
                  style={{ background: "#E8C547", display: "inline-block", position: "relative" }}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#E8C547", animation: "citrine-ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
                  />
                </span>
                Open for Enterprise Projects &amp; AI Consulting
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-display-xxl" style={{ color: "#F4F4F5" }}>
                Building enterprise<br />
                software &amp; AI<br />
                <em style={{ fontStyle: "italic", color: "#E8C547" }}>systems that scale</em>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: "#A1A1AA", fontWeight: 400 }}
            >
              Full Stack Java Developer &amp; AI Solutions Engineer with{" "}
              <strong style={{ color: "#F4F4F5", fontWeight: 700 }}>2.5+ years</strong> building
              scalable backend architectures, cloud-native microservices on AWS, and production
              Generative AI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <LiquidButton variant="default" size="lg" onClick={() => scrollTo("projects")}>
                View projects <ArrowRight size={16} />
              </LiquidButton>
              <LiquidButton variant="ghost" size="lg" onClick={() => openWhatsApp()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.12 1.528 5.849L.057 23.572a.5.5 0 0 0 .614.614l5.723-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.554 9.554 0 0 1-4.875-1.337l-.35-.207-3.614.928.953-3.5-.228-.361A9.554 9.554 0 0 1 2.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
                </svg>
                Book a consultation
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-2"
            >
              {TECH_CHIPS.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  className="chip hover-lift"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-10 pt-4"
              style={{ borderTop: "1px solid #27272A" }}
            >
              {[
                { value: "2.5+", label: "Years experience" },
                { value: "12+",  label: "Microservices delivered" },
                { value: "3",    label: "AI products shipped" },
              ].map(({ value, label }) => (
                <AnimatedStat key={label} value={value} label={label} />
              ))}
            </motion.div>
          </div>

          {/* Right — architecture canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative block"
            aria-hidden
          >
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm lg:max-w-lg mx-auto">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: "#0E0E10",
                  border: "1px solid #27272A",
                  boxShadow: "0 0 60px rgba(232,197,71,0.05), inset 0 0 40px rgba(0,0,0,0.2)",
                }}
              >
                <ArchitectureCanvas />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <div
                  style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "rgba(63,63,70,0.8)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Microservices Architecture
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden
      >
        <span
          style={{
            fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(63,63,70,0.8)", fontFamily: "var(--font-mono)",
          }}
        >
          Scroll
        </span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={16} style={{ color: "rgba(63,63,70,0.8)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
