import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero",         label: "Top" },
  { id: "about",        label: "About" },
  { id: "freelance",    label: "Freelance" },
  { id: "skills",       label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact",      label: "Contact" },
];

export function ScrollProgressBar() {
  const barRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setScrollPct(pct);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
        barRef.current.style.width = "100%";
      }
      let current = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={barRef}
        id="scroll-progress-bar"
        style={{ transform: "scaleX(0)", width: "100%" }}
        aria-hidden
      />

      <div id="section-dots" aria-hidden>
        {SECTIONS.map((s) => (
          <div
            key={s.id}
            className={`section-dot ${activeSection === s.id ? "active" : ""}`}
            onClick={() => scrollTo(s.id)}
            title={s.label}
          >
            <span className="section-dot-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div
        id="reading-time-indicator"
        className={scrollPct < 0.02 || scrollPct > 0.98 ? "hidden" : ""}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <circle cx="5" cy="5" r="4" stroke="#3F3F46" strokeWidth="1.5" />
          <path
            d={`M 5 5 L 5 1 A 4 4 0 ${scrollPct > 0.5 ? 1 : 0} 1 ${
              5 + 4 * Math.sin(scrollPct * 2 * Math.PI)
            } ${5 - 4 * Math.cos(scrollPct * 2 * Math.PI)} Z`}
            fill="#E8C547"
          />
        </svg>
        {Math.round(scrollPct * 100)}%
      </div>
    </>
  );
}
