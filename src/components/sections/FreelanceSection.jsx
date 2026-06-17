import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ExternalLink, Calendar } from "lucide-react";
import * as React from "react";

function cn(...classes) { return classes.filter(Boolean).join(" "); }

const ContainerScroll = ({ children, className, style, forwardedRef, ...props }) => (
  <div
    ref={forwardedRef}
    className={cn("relative w-full", className)}
    style={style}
    {...props}
  >
    {children}
  </div>
);

// Each card sits inside its own "runway" wrapper. The wrapper's height is
// the card's own height PLUS extra scroll distance — this is what actually
// gives position:sticky room to stay pinned while the user keeps scrolling.
// Without this extra per-card space, sticky siblings sit back-to-back in
// flow and each one only "sticks" for the height of the next card, which
// is what caused the previous partial/instant-snap behavior.
const CardSticky = ({ index, total = 1, incrementY = 10, wrapperHeight, children, className, style, forwardedRef, ...props }) => {
  const wrapperRef = useRef(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const scale   = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast ? 1 : 0.55]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", height: isLast ? "auto" : `${wrapperHeight || 900}px` }}>
      <motion.div
        ref={forwardedRef}
        layout="position"
        style={{ top: index * incrementY, zIndex: index, scale, opacity, ...style }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

const freelanceProjects = [
  {
    id: "fl-1",
    title: "Vastu Shastra Consultant Website",
    client: "Pandit Aman Bhatore",
    clientUrl: "https://vastubyaman.com",
    duration: "Ongoing",
    year: "2025",
    description: "Designed and developed a full-stack web presence for a Vastu Shastra consultant. Built a modern React frontend with custom animations, a multi-step consultation booking modal using Framer Motion, and a production-grade Spring Boot backend with Telegram API integration.",
    technologies: ["React", "Framer Motion", "Spring Boot 3", "Java 21", "Telegram API"],
    outcome: "Live consultation booking with automated Telegram notifications",
  },
  {
    id: "fl-2",
    title: "Food Brand Order Management Backend",
    client: "Ramira Foods",
    duration: "Ongoing",
    year: "2025",
    description: "Built a production-grade Spring Boot order service for a food brand's checkout flow. Implemented server-side validation, order ID generation, and a dedicated async thread pool with bounded queue and back-pressure handling. Integrated Telegram Bot API for instant order notifications with automatic retry logic.",
    technologies: ["Spring Boot 3", "Java 21", "WebClient", "Telegram API", "Bean Validation"],
    outcome: "Orders processed and notified via Telegram instantly, with zero blocking on the HTTP thread",
  },
  {
    id: "fl-3",
    title: "Tattoo Studio Web Presence",
    client: "SecondLayer Tattoo",
    clientUrl: "https://tattooshopindore.com",
    duration: "Ongoing",
    year: "2025",
    description: "Designed and developed a premium single-page website for a master tattoo artist. Built with performance-first principles — ImageKit CDN, preloaded hero and gallery images, and a custom preloader. Includes a full SEO stack: geo meta tags, Open Graph, Twitter Cards, and structured JSON-LD.",
    technologies: ["HTML", "CSS", "JavaScript", "ImageKit CDN", "Schema.org JSON-LD"],
    outcome: "Production site live with local SEO targeting Indore and Madhya Pradesh searches",
  },
];

function ProjectCard({ project }) {
  return (
    <article
      className="flex flex-col hover-lift transition-all duration-300"
      style={{
        background: "#18181B",
        border: "1px solid #27272A",
        borderRadius: "1rem",
        padding: "1.5rem",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#8B7220";
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(139,114,32,0.2), 0 12px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#27272A";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#E8C547", color: "#0E0E10" }}
        >
          <Briefcase size={16} />
        </div>
        <div className="flex items-center gap-1.5 text-xs shrink-0" style={{ color: "#3F3F46", fontFamily: "var(--font-mono)" }}>
          <Calendar size={11} />{project.year}
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-base font-bold leading-snug mb-1" style={{ color: "#F4F4F5" }}>{project.title}</h3>
        <div className="flex items-center gap-1">
          {project.clientUrl ? (
            <a
              href={project.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 font-medium transition-colors"
              style={{ color: "#71717A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8C547")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#71717A")}
            >
              {project.client}<ExternalLink size={10} />
            </a>
          ) : (
            <span className="text-xs" style={{ color: "#52525B" }}>{project.client}</span>
          )}
          <span className="text-xs" style={{ color: "#27272A" }}>·</span>
          <span className="text-xs" style={{ color: "#52525B" }}>{project.duration}</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#71717A" }}>{project.description}</p>

      {/* Citrine outcome strip */}
      <div
        className="rounded-xl px-4 py-3 mb-4"
        style={{ background: "rgba(232,197,71,0.06)", border: "1px solid rgba(139,114,32,0.3)" }}
      >
        <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "#8B7220", fontFamily: "var(--font-mono)" }}>Outcome</p>
        <p className="text-xs font-medium" style={{ color: "#E8C547" }}>{project.outcome}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="chip text-xs py-1 px-3">{tech}</span>
        ))}
      </div>
    </article>
  );
}

export function FreelanceSection() {
  const INCREMENT_Y      = 16;
  const SCROLL_MULTIPLIER = 1.2;
  const firstCardRef     = useRef(null);
  const [wrapperHeight, setWrapperHeight] = useState(null);

  useLayoutEffect(() => {
    function compute() {
      if (!firstCardRef.current) return;
      const cardH = firstCardRef.current.getBoundingClientRect().height;
      // Each non-last card's wrapper = its own height + extra scroll
      // distance reserved purely so position:sticky has room to stay
      // pinned before the next card covers it.
      setWrapperHeight(cardH + cardH * SCROLL_MULTIPLIER);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section id="freelance" className="relative py-20" style={{ background: "#0E0E10" }}>
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
          className="mb-10 space-y-4"
        >
          <span className="eyebrow">Freelance & AI Consulting</span>
          <h2 className="text-display-xl" style={{ color: "#F4F4F5" }}>
            Client projects &amp;{" "}
            <em style={{ fontStyle: "italic", color: "#A1A1AA" }}>independent work</em>
          </h2>
          <p className="max-w-xl text-base" style={{ color: "#71717A" }}>
            Alongside full-time engineering, I take on select freelance and AI consulting engagements —
            shipping production software and AI solutions for real clients with real constraints.
          </p>
        </motion.div>

        {/* Desktop 3-col grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {freelanceProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Mobile / tablet sticky stack — each card wrapped in its own
            scroll-runway div, so each card gets real pinned scroll time
            before the next one covers it. */}
        <ContainerScroll className="lg:hidden">
          {freelanceProjects.map((project, i) => (
            <CardSticky
              key={project.id}
              index={i}
              total={freelanceProjects.length}
              incrementY={INCREMENT_Y}
              wrapperHeight={wrapperHeight}
              forwardedRef={i === 0 ? firstCardRef : undefined}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
