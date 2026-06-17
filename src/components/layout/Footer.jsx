import { Link, useNavigate } from "react-router-dom";
import { GitFork, Link2, Mail } from "lucide-react";
import { siteConfig } from "../../lib/config";

const footerLinks = {
  Navigation: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Blog", href: "/blog" },
  ],
  Services: [
    { label: "Enterprise Java", href: "/#contact" },
    { label: "Spring Boot Microservices", href: "/#contact" },
    { label: "AI Solutions Engineering", href: "/#contact" },
    { label: "RAG System Design", href: "/#contact" },
    { label: "Cloud Architecture (AWS)", href: "/#contact" },
  ],
};

const socialLinks = [
  { label: "GitHub",   href: siteConfig.author.github,                Icon: GitFork },
  { label: "LinkedIn", href: siteConfig.author.linkedin,              Icon: Link2 },
  { label: "Email",    href: `mailto:${siteConfig.author.email}`,     Icon: Mail },
];

export function Footer() {
  const navigate = useNavigate();
  const year     = new Date().getFullYear();
  const initials = siteConfig.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  const handleNav = (e, href) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer style={{ background: "#0A0A0C", borderTop: "1px solid #27272A" }}>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#E8C547" }}
              >
                <span style={{ color: "#0E0E10", fontWeight: 800, fontSize: 13, fontFamily: "var(--font-body)" }}>
                  {initials}
                </span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#F4F4F5", fontFamily: "var(--font-body)" }}>
                {siteConfig.author.name}
              </span>
            </div>
            <p style={{ color: "#71717A", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Full Stack Java Developer & AI Solutions Engineer. Building enterprise software systems and generative AI products that scale.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-200"
                  style={{
                    border: "1px solid #27272A",
                    color: "#71717A",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#8B7220";
                    e.currentTarget.style.color = "#E8C547";
                    e.currentTarget.style.background = "rgba(232,197,71,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#27272A";
                    e.currentTarget.style.color = "#71717A";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={14} />{label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h3
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#3F3F46",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "#52525B", fontWeight: 400 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#E8C547")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#52525B")}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #1C1C1F" }}
        >
          <p style={{ fontSize: 12, color: "#3F3F46" }}>
            © {year} {siteConfig.author.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
