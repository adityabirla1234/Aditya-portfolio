import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Briefcase, Bot, Code2, FileText, Mail } from "lucide-react";
import { siteConfig } from "../../lib/config";
import { openWhatsApp } from "../../lib/whatsapp";
import { LiquidButton } from "../ui/LiquidButton";

const navItems = [
  { name: "About",          href: "/#about",     id: "about",     icon: User },
  { name: "Freelance",      href: "/#freelance",  id: "freelance", icon: Briefcase },
  { name: "AI / ML",        href: "/ai-ml",       id: null,        icon: Bot },
  { name: "Skills",         href: "/#skills",     id: "skills",    icon: Code2 },
  { name: "Blog",           href: "/blog",        id: null,        icon: FileText },
  { name: "Contact",        href: "/#contact",    id: "contact",   icon: Mail },
];

function DesktopNav({ activeSection }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const itemRefs  = useRef({});
  const trackRef  = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  const getActiveName = () => {
    if (location.pathname === "/blog")  return "Blog";
    if (location.pathname === "/ai-ml") return "AI / ML";
    const matched = navItems.find((item) => item.id && activeSection === item.id);
    return matched ? matched.name : null;
  };
  const activeName = getActiveName();

  useEffect(() => {
    const el     = activeName ? itemRefs.current[activeName] : null;
    const parent = trackRef.current;
    if (!el || !parent) { setPill((p) => ({ ...p, ready: false })); return; }
    const pRect = parent.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setPill({ left: eRect.left - pRect.left, width: eRect.width, ready: true });
  }, [activeName]);

  const handleClick = (item) => {
    if (item.href.startsWith("/#")) {
      const sectionId = item.href.slice(2);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.href);
    }
  };

  const pillVisible = activeName !== null && pill.ready;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-[60]" style={{ top: 14 }}>
      <div
        ref={trackRef}
        className="relative flex items-center px-1.5 py-1.5 rounded-full"
        style={{
          background: "rgba(24,24,27,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(63,63,70,0.8)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(63,63,70,0.3)",
        }}
      >
        {/* Sliding citrine pill */}
        <motion.span
          className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
          animate={{
            left:    pill.left,
            width:   pill.width,
            opacity: pillVisible ? 1 : 0,
          }}
          transition={{
            left:    { type: "spring", stiffness: 420, damping: 38 },
            width:   { type: "spring", stiffness: 420, damping: 38 },
            opacity: { duration: 0.15 },
          }}
          style={{
            background: "rgba(232,197,71,0.12)",
            border: "1px solid rgba(139,114,32,0.5)",
            zIndex: 0,
          }}
        />

        {navItems.map((item) => {
          const isActive = activeName === item.name;
          return (
            <button
              key={item.name}
              ref={(el) => { itemRefs.current[item.name] = el; }}
              onClick={() => handleClick(item)}
              className="relative z-10 inline-flex items-center px-4 py-1.5 rounded-full text-sm cursor-pointer select-none outline-none group"
              style={{
                color:      isActive ? "#E8C547" : "rgba(161,161,170,0.9)",
                fontWeight: isActive ? 600 : 500,
                fontFamily: "var(--font-body)",
                transition: "color 0.15s ease",
              }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ background: "rgba(255,255,255,0.04)" }}
                aria-hidden
              />
              <span className="relative">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileNavLink({ href, label, id, icon: Icon, onClick, activeSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = id ? activeSection === id : location.pathname === href;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
      style={{
        color:      isActive ? "#E8C547" : "rgba(161,161,170,0.8)",
        fontWeight: isActive ? 600 : 500,
        background: isActive ? "rgba(232,197,71,0.06)" : "transparent",
        border:     isActive ? "1px solid rgba(139,114,32,0.4)" : "1px solid transparent",
      }}
    >
      <Icon size={15} strokeWidth={2} />
      {label}
    </a>
  );
}

export function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const SECTION_MAP = {
      about: "about", freelance: "freelance",
      skills: "skills", testimonials: "testimonials", contact: "contact",
    };
    const SECTIONS = ["about","freelance","skills","testimonials","contact"];
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) visible.add(e.target.id); else visible.delete(e.target.id); });
        const active = SECTIONS.find((id) => visible.has(id)) ?? "";
        setActiveSection(active ? SECTION_MAP[active] : "");
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(14,14,16,0.92)"
            : "rgba(14,14,16,0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(39,39,42,0.8)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative shrink-0" style={{ width: 36, height: 36 }}>
              <div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  padding: 2,
                  background: "linear-gradient(135deg, #E8C547 0%, #8B7220 100%)",
                  borderRadius: "50%",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#18181B]" style={{ borderRadius: "50%" }}>
                  <img
                    src={siteConfig.author.avatarUrl || "/avatar.jpg"}
                    alt={siteConfig.author.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.parentElement;
                      p.style.background = "#27272A";
                      p.style.display = "flex";
                      p.style.alignItems = "center";
                      p.style.justifyContent = "center";
                      p.innerHTML = `<span style="font-size:12px;font-weight:700;color:#E8C547;letter-spacing:-0.5px;font-family:var(--font-body)">${siteConfig.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>`;
                    }}
                  />
                </div>
              </div>
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: "#22C55E", borderColor: "#0E0E10" }}
                title="Available for projects"
              />
            </div>
            <span
              className="font-bold text-base"
              style={{ color: "#F4F4F5", fontFamily: "var(--font-body)" }}
            >
              {siteConfig.author.name}
            </span>
          </Link>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LiquidButton
              variant="default"
              size="md"
              onClick={(e) => { e.preventDefault(); openWhatsApp(); }}
            >
              {/* WhatsApp icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.12 1.528 5.849L.057 23.572a.5.5 0 0 0 .614.614l5.723-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.554 9.554 0 0 1-4.875-1.337l-.35-.207-3.614.928.953-3.5-.228-.361A9.554 9.554 0 0 1 2.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
              </svg>
              Book Consultation
            </LiquidButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ border: "1px solid rgba(63,63,70,0.8)", color: "#A1A1AA" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(39,39,42,0.8)" }}
            >
              <div className="px-4 py-3 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.name}
                    id={item.id}
                    icon={item.icon}
                    activeSection={activeSection}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
                <div className="pt-3 mt-2" style={{ borderTop: "1px solid rgba(39,39,42,0.8)" }}>
                  <LiquidButton
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={(e) => { e.preventDefault(); setMobileOpen(false); openWhatsApp(); }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.12 1.528 5.849L.057 23.572a.5.5 0 0 0 .614.614l5.723-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.554 9.554 0 0 1-4.875-1.337l-.35-.207-3.614.928.953-3.5-.228-.361A9.554 9.554 0 0 1 2.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
                    </svg>
                    Book Consultation
                  </LiquidButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="hidden md:block">
        <DesktopNav activeSection={activeSection} />
      </div>
    </>
  );
}
