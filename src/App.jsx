import { WhatsAppFAB } from "./components/ui/WhatsAppFAB";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar }             from "./components/layout/Navbar";
import { Footer }             from "./components/layout/Footer";
import { ScrollProgressBar }  from "./components/layout/ScrollProgressBar";
import { Preloader }          from "./components/ui/Preloader";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AIMLPage from "./pages/AIMLPage";
import { LiquidButton } from "./components/ui/LiquidButton";
import { SEO } from "./components/seo/SEO";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0E0E10" }}>
      <SEO title="Page Not Found" path="/404" noindex />
      <div className="text-center space-y-6">
        <h1 className="text-display-xxl font-bold stat-shimmer" style={{ fontFamily: "var(--font-display)" }}>
          404
        </h1>
        <p style={{ color: "#71717A", fontSize: 18 }}>Page not found.</p>
        <LiquidButton size="lg" onClick={() => (window.location.href = "/")}>
          Go Home
        </LiquidButton>
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      {/* Preloader — only shown on first visit per session */}
      {!loaded && (
        <Preloader
          onComplete={() => setLoaded(true)}
          avatarUrl="https://ik.imagekit.io/chedcztb6/1781589219844.png?updatedAt=1781596273283&ik-s=d4d646623ed149ea0fb13923d4550062d49a8424"
        />
      )}

      <div
        style={{
          background: "#0E0E10",
          color: "#F4F4F5",
          minHeight: "100vh",
          // Keep everything underneath hidden until preloader exits
          visibility: loaded ? "visible" : "hidden",
        }}
      >
        <ScrollProgressBar />
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/"      element={<HomePage />} />
            <Route path="/blog"  element={<BlogPage />} />
            <Route path="/ai-ml" element={<AIMLPage />} />
            <Route path="*"      element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </BrowserRouter>
  );
}
