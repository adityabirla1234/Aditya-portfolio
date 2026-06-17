import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { openWhatsApp } from "../../lib/whatsapp";

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.84.5 3.56 1.43 5.06L2 22l5.2-1.52a9.86 9.86 0 0 0 4.84 1.27h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.78 14.05c-.25.71-1.45 1.36-2 1.45-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.98-1.29-4.92-4.31-5.07-4.51-.15-.2-1.21-1.6-1.21-3.06 0-1.45.76-2.17 1.03-2.47.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.84 2.07.91 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.39 1.47.3.15.48.13.65-.05.18-.18.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.13.08.71-.17 1.4Z" />
  </svg>
);

export function WhatsAppFAB() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleSend = (message) => {
    openWhatsApp(message);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-72 sm:w-80 rounded-2xl overflow-hidden shadow-card-hover"
            style={{ background: "#18181B", border: "1px solid #27272A" }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#128C7E" }}
            >
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Let's talk on WhatsApp</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white/80 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-sm" style={{ color: "#A1A1AA" }}>
                Have a website or AI project in mind? Send a quick message and I'll get back to you.
              </p>

              <button
                onClick={() => handleSend("Hi Aditya, I'd like to discuss a website development project.")}
                className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                style={{ background: "#0E0E10", border: "1px solid #27272A", color: "#F4F4F5" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8B7220")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#27272A")}
              >
                💻 Website development
              </button>

              <button
                onClick={() => handleSend("Hi Aditya, I'd like to discuss an AI project / consulting engagement.")}
                className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                style={{ background: "#0E0E10", border: "1px solid #27272A", color: "#F4F4F5" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8B7220")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#27272A")}
              >
                🤖 AI project / consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-card-hover"
        style={{ background: "#25D366" }}
      >
        {pulse && !open && (
          <span
            className="absolute inset-0 rounded-full animate-citrine-ping"
            style={{ background: "#25D366" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <WhatsAppIcon className="w-7 h-7 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
