import { useEffect, useRef, useState } from "react";

/**
 * useInView — triggers when element enters viewport
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); if (options.once !== false) obs.disconnect(); } },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/**
 * useCountUp — animates a number when in view
 */
export function useCountUp(target, suffix = "", duration = 1200) {
  const [val, setVal] = useState("0");
  const [ref, inView] = useInView({ once: true });
  useEffect(() => {
    if (!inView) return;
    const isFloat = target.toString().includes(".");
    const num = parseFloat(target);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setVal((isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);
  return [ref, val];
}

/**
 * useWordHighlight — highlights words as they come into view
 */
export function useWordHighlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const highlights = el.querySelectorAll(".word-highlight, .word-highlight-strong");
    if (!highlights.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".word-highlight, .word-highlight-strong");
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("highlighted"), i * 120);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/**
 * useSlideIn — applies CSS class when element enters viewport
 */
export function useSlideIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/**
 * useStaggerChildren — adds in-view class to trigger stagger animation
 */
export function useStaggerChildren() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
