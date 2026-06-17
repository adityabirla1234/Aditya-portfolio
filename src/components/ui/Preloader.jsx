import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete, avatarUrl }) {
  const [phase, setPhase] = useState("enter");
  const [progress, setProgress] = useState(0);
  const [activeSegment, setActiveSegment] = useState(-1);
  const [scanLine, setScanLine] = useState(0);
  const rafRef = useRef(null);
  const scanRef = useRef(null);

  const TOTAL_SEGMENTS = 12;
  const DURATION = 1800;

  useEffect(() => {
    let start = null;

    const raf = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / DURATION) * 100, 100);
      setProgress(pct);
      const seg = Math.floor((pct / 100) * TOTAL_SEGMENTS);
      setActiveSegment(seg);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(raf);
      }
    };
    rafRef.current = requestAnimationFrame(raf);

    // Scan line animation
    let scanStart = null;
    const scanDuration = 900;
    const animateScan = (ts) => {
      if (!scanStart) scanStart = ts;
      const elapsed = (ts - scanStart) % scanDuration;
      setScanLine((elapsed / scanDuration) * 100);
      scanRef.current = requestAnimationFrame(animateScan);
    };
    scanRef.current = requestAnimationFrame(animateScan);

    const holdTimer = setTimeout(() => setPhase("exit"), 2100);
    const doneTimer = setTimeout(() => onComplete?.(), 2800);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(scanRef.current);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Build status labels that flick through as progress increases
  const statusLabels = [
    "Initializing runtime…",
    "Loading modules…",
    "Compiling assets…",
    "Warming cache…",
    "Establishing connection…",
    "Mounting interface…",
  ];
  const statusIndex = Math.min(Math.floor((progress / 100) * statusLabels.length), statusLabels.length - 1);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => { if (phase === "exit") setPhase("done"); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0A0A0C",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
            overflow: "hidden",
          }}
        >
          {/* Static grid */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(63,63,70,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(63,63,70,0.14) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />

          {/* Scanning horizontal line over the grid */}
          <motion.div
            style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${scanLine}%`,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(232,197,71,0.06), rgba(232,197,71,0.18), rgba(232,197,71,0.06), transparent)",
              pointerEvents: "none",
            }}
            aria-hidden
          />

          {/* Citrine glow */}
          <div
            style={{
              position: "absolute", top: "15%", left: "50%",
              transform: "translateX(-50%)",
              width: "500px", height: "340px", pointerEvents: "none",
              background: "radial-gradient(ellipse, rgba(232,197,71,0.07) 0%, transparent 68%)",
            }}
            aria-hidden
          />

          {/* Corner brackets — top-left & bottom-right to give terminal/HUD feel */}
          {[
            { top: 32, left: 32, rotate: 0 },
            { bottom: 32, right: 32, rotate: 180 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 28, height: 28,
                pointerEvents: "none",
              }}
              aria-hidden
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M2 14 L2 2 L14 2"
                  stroke="rgba(232,197,71,0.22)"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  transform={i === 1 ? "rotate(180, 14, 14)" : ""}
                />
              </svg>
            </div>
          ))}

          {/* Main content */}
          <div style={{ position: "relative", textAlign: "center", padding: "0 28px", width: "100%", maxWidth: 480 }}>

            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ margin: "0 auto 32px", width: 56, height: 56, position: "relative" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: -7,
                  borderRadius: "18px",
                  border: "1px solid rgba(232,197,71,0.2)",
                  borderTopColor: "rgba(232,197,71,0.65)",
                }}
                aria-hidden
              />
              {/* Second slower ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: -13,
                  borderRadius: "24px",
                  border: "1px dashed rgba(232,197,71,0.08)",
                }}
                aria-hidden
              />
              {avatarUrl ? (
                <div
                  style={{
                    width: 56, height: 56,
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(232,197,71,0.3), 0 8px 32px rgba(232,197,71,0.15)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 56, height: 56,
                    borderRadius: "15px",
                    background: "#E8C547",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 0 1px rgba(232,197,71,0.3), 0 8px 32px rgba(232,197,71,0.15)",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                    fontWeight: 800,
                    fontSize: 19,
                    color: "#0A0A0C",
                    letterSpacing: "-0.5px",
                  }}>
                    AB
                  </span>
                </div>
              )}
            </motion.div>

            {/* Name */}
            <div style={{ overflow: "hidden", marginBottom: 10 }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.72, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-display, 'DM Serif Display', serif)",
                  fontSize: "clamp(30px, 5.5vw, 46px)",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  backgroundImage: "linear-gradient(90deg, #F4F4F5 35%, #FBE89A 50%, #F4F4F5 65%)",
                  backgroundSize: "250% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "shimmer-slide 2.6s linear infinite",
                  animationDelay: "0.9s",
                }}
              >
                Aditya Birla
              </motion.h1>
            </div>

            {/* Subtitle — visible zinc-300 not muted zinc-600 */}
            <div style={{ overflow: "hidden", marginBottom: 44 }}>
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.72, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                  fontSize: "clamp(13px, 2vw, 15px)",
                  fontWeight: 500,
                  color: "#A1A1AA", /* zinc-400 — visible but secondary */
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Enterprise{" "}
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ color: "#E8C547", fontWeight: 700 }}
                >
                  AI
                </motion.span>
                {" & Software Consultant"}
              </motion.p>
            </div>

            {/* ── Tech loading block ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              style={{ width: "100%" }}
            >
              {/* Status label row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}>
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10,
                    color: "#E8C547",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {statusLabels[statusIndex]}
                </motion.span>
                <span style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: 10,
                  color: "#52525B",
                  letterSpacing: "0.1em",
                }}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Segmented blocks */}
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${TOTAL_SEGMENTS}, 1fr)`,
                gap: 3,
                height: 8,
              }}>
                {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
                  const isActive = i < activeSegment;
                  const isCurrent = i === activeSegment;
                  return (
                    <motion.div
                      key={i}
                      animate={isCurrent ? {
                        opacity: [0.4, 1, 0.4],
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background: isActive
                          ? "#E8C547"
                          : isCurrent
                          ? "rgba(232,197,71,0.5)"
                          : "rgba(39,39,42,0.9)",
                        boxShadow: isActive ? "0 0 6px rgba(232,197,71,0.3)" : "none",
                        transition: "background 0.15s ease",
                      }}
                    />
                  );
                })}
              </div>

              {/* Bottom data stream line */}
              <div style={{
                marginTop: 12,
                display: "flex",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.45,
              }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.9, 0.2] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: i === 2 || i === 3 ? 18 : i === 0 || i === 5 ? 8 : 12,
                      height: 2,
                      borderRadius: 1,
                      background: "#E8C547",
                    }}
                    aria-hidden
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
