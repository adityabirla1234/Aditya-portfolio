import { motion } from "framer-motion";
import { testimonials } from "../../lib/config";
import { Quote, Star } from "lucide-react";
import * as React from "react";

function cn(...classes) { return classes.filter(Boolean).join(" "); }

const ContainerScroll = React.forwardRef(({ children, className, style, ...props }, ref) => (
  <div ref={ref} className={cn("relative w-full", className)} style={{ perspective: "1000px", ...style }} {...props}>{children}</div>
));
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef(({ index, incrementY = 10, incrementZ = 10, children, className, style, ...props }, ref) => (
  <motion.div
    ref={ref}
    layout="position"
    style={{ top: index * incrementY, z: index * incrementZ, backfaceVisibility: "hidden", ...style }}
    className={cn("sticky", className)}
    {...props}
  >
    {children}
  </motion.div>
));
CardSticky.displayName = "CardSticky";

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
  const SCROLL_MULTIPLIER = 1.2;
  const firstCardRef     = React.useRef(null);
  const containerRef     = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(null);

  React.useLayoutEffect(() => {
    function compute() {
      if (!firstCardRef.current) return;
      const cardH       = firstCardRef.current.getBoundingClientRect().height;
      const scrollPerCard = cardH * SCROLL_MULTIPLIER;
      const total = (testimonials.length - 1) * scrollPerCard + cardH + (testimonials.length - 1) * INCREMENT_Y;
      setContainerHeight(total);
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

        {/* Mobile sticky stack */}
        <ContainerScroll
          ref={containerRef}
          className="md:hidden"
          style={{ height: containerHeight ? `${containerHeight}px` : `${testimonials.length * 600}px` }}
        >
          {testimonials.map((t, i) => (
            <CardSticky key={t.id} index={i} incrementY={INCREMENT_Y} incrementZ={8}>
              <TestimonialCard t={t} i={i} measuredRef={i === 0 ? firstCardRef : undefined} />
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
