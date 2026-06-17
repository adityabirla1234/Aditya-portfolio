import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "../../lib/config";
import { Quote, Star } from "lucide-react";
import * as React from "react";

function cn(...classes) { return classes.filter(Boolean).join(" "); }

const ContainerScroll = React.forwardRef(({ children, className, style, ...props }, ref) => (
  <div ref={ref} className={cn("relative w-full", className)} style={style} {...props}>{children}</div>
));
ContainerScroll.displayName = "ContainerScroll";

// Each card sits inside its own wrapper that's only slightly taller than
// the card itself — this small extra height is the "runway" that lets
// position:sticky hold the card in place for a brief, visible moment
// before the next card's sticky child scrolls up and covers it. Too much
// extra height shows up as a visible empty gap between cards, since the
// sticky child stays pinned at the TOP of its own wrapper while the rest
// of the wrapper's height sits empty beneath it.
function CardSticky({ index, total = 1, incrementY = 10, wrapperHeight, children, className, style, ...props }) {
  const wrapperRef = React.useRef(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const scale   = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast ? 1 : 0.55]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", height: isLast ? "auto" : (wrapperHeight ? `${wrapperHeight}px` : "auto") }}>
      <motion.div
        layout="position"
        style={{ top: index * incrementY, zIndex: index, scale, opacity, ...style }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ t, i, measuredRef }) {
  return (
    <motion.figure
      ref={measuredRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="flex flex-col hover-lift transition-all duration-300"
      style={{
        background: "#18181B",
        border: "1px solid #27272A",
        borderRadius: "1rem",
        padding: "1.5rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#8B7220";
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2), 0 8px 24px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#27272A";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Citrine stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: t.rating }).map((_, j) => (
          <motion.span
            key={j}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + j * 0.07, type: "spring", stiffness: 400 }}
          >
            <Star size={12} fill="#E8C547" style={{ color: "#E8C547" }} />
          </motion.span>
        ))}
      </div>

      <Quote size={20} className="mb-3" style={{ color: "rgba(63,63,70,0.6)" }} />

      <blockquote className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#71717A" }}>
        &ldquo;{t.content}&rdquo;
      </blockquote>

      {/* Citrine outcome strip */}
      <div
        className="rounded-xl px-3 py-2.5 mb-4"
        style={{ background: "rgba(232,197,71,0.06)", border: "1px solid rgba(139,114,32,0.3)" }}
      >
        <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "#8B7220", fontFamily: "var(--font-mono)" }}>Outcome</p>
        <p className="text-xs font-medium" style={{ color: "#E8C547" }}>{t.outcome}</p>
      </div>

      <figcaption
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: "1px solid #27272A" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "#E8C547", color: "#0E0E10" }}
        >
          {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: "#F4F4F5" }}>{t.name}</div>
          <div className="text-xs" style={{ color: "#52525B" }}>{t.role} · {t.company}</div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialsSection() {
  const INCREMENT_Y      = 16;
  const SCROLL_MULTIPLIER = 0.15; // small runway: just enough scroll room to feel the pin, not a visible gap
  const firstCardRef     = React.useRef(null);
  const [wrapperHeight, setWrapperHeight] = React.useState(null);

  React.useLayoutEffect(() => {
    function compute() {
      if (!firstCardRef.current) return;
      const cardH = firstCardRef.current.getBoundingClientRect().height;
      setWrapperHeight(cardH + cardH * SCROLL_MULTIPLIER);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section id="testimonials" className="relative py-20" style={{ background: "#0E0E10" }}>
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
          <span className="eyebrow">Client outcomes</span>
          <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
            What clients &amp; stakeholders say
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} i={i} />
          ))}
        </div>

        {/* Mobile sticky stack — each card wrapped in its own scroll-runway
            div, so each card gets real pinned scroll time before the next
            one covers it. */}
        <ContainerScroll className="md:hidden">
          {testimonials.map((t, i) => (
            <CardSticky key={t.id} index={i} total={testimonials.length} incrementY={INCREMENT_Y} wrapperHeight={wrapperHeight}>
              <TestimonialCard t={t} i={i} measuredRef={i === 0 ? firstCardRef : undefined} />
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
