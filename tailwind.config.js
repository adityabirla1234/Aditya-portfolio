/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Carbonite & Citrine palette
        void:         "#0E0E10",
        obsidian:     "#18181B",
        graphite:     "#27272A",
        "graphite-mid": "#3F3F46",
        silver:       "#A1A1AA",
        porcelain:    "#F4F4F5",
        citrine:      "#E8C547",
        "citrine-dim":"#8B7220",

        // Semantic
        canvas:       "#0E0E10",
        "canvas-soft":"#18181B",
        ink:          "#F4F4F5",
        body:         "#A1A1AA",
        mute:         "#71717A",
        hairline:     "#27272A",
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      maxWidth: {
        container: "1120px",
      },
      boxShadow: {
        citrine: "0 0 20px rgba(232,197,71,0.25)",
        "citrine-border": "0 0 0 1px rgba(139,114,32,0.4)",
        card:    "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "citrine-gradient": "linear-gradient(135deg, #E8C547 0%, #8B7220 100%)",
        "dark-gradient":    "linear-gradient(180deg, #0E0E10 0%, #18181B 100%)",
        "grid-pattern":     "linear-gradient(rgba(63,63,70,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(63,63,70,0.2) 1px, transparent 1px)",
      },
      animation: {
        "citrine-ping": "citrine-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
        shimmer:        "shimmer-slide 3s linear infinite",
        blink:          "blink 1s step-end infinite",
      },
      keyframes: {
        "citrine-ping": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "shimmer-slide": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}
