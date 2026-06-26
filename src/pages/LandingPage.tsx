import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Brain, BookOpen, Zap, MessageSquare, FileText, Calendar,
  BarChart3, ChevronDown, ChevronRight, Star, Check, Menu, X,
  ArrowRight, Play, Upload, HelpCircle, Users, Building2,
  Sparkles, Shield, Clock, TrendingUp, Award, Cpu,
  Code, Share2, Mail as MailIcon, Play as PlayIcon, GraduationCap,
  PenTool, Target, Layers, Database, Bell, Settings,
  ChevronUp, Globe, Mail, Phone, BookMarked, Layout
} from "lucide-react";

// ─── HOOK: Intersection Observer for scroll animations ───────────────────────
function useInView(options: any = {}): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── FLOATING ORBS ───────────────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div style={{
        position: "absolute", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        borderRadius: "50%", top: "-10%", left: "-10%",
        animation: "floatOrb1 18s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        borderRadius: "50%", top: "40%", right: "-8%",
        animation: "floatOrb2 22s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        borderRadius: "50%", bottom: "10%", left: "30%",
        animation: "floatOrb3 26s ease-in-out infinite"
      }} />
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Features", "Pricing", "FAQ", "Contact"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(5,8,22,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.12)" : "none",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,0.5)"
            }}>
              <Brain size={20} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AITutor
            </span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, listStyle: "none" }} className="hidden-mobile">
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(241,245,249,0.85)", fontSize: 14, fontWeight: 500,
                padding: "8px 14px", borderRadius: 8, transition: "all 0.2s",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "#818cf8"; (e.target as HTMLElement).style.background = "rgba(99,102,241,0.1)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(241,245,249,0.85)"; (e.target as HTMLElement).style.background = "none"; }}
              >{l}</button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{
                background: "none", border: "1.5px solid rgba(129,143,248,0.5)", color: "#c7d2fe",
                padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 700,
                transition: "all 0.3s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(129,143,248,0.9)"; e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(129,143,248,0.5)"; e.currentTarget.style.background = "none"; }}
              >Login</button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", color: "#fff", padding: "10px 24px", borderRadius: 8,
                cursor: "pointer", fontSize: 15, fontWeight: 700,
                boxShadow: "0 0 24px rgba(99,102,241,0.4)",
                transition: "all 0.3s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(99,102,241,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.4)"; e.currentTarget.style.transform = "none"; }}
              >Get Started</button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "none" }}
            className="show-mobile" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "rgba(5,8,22,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(129,143,248,0.15)",
          padding: "1.5rem",
          animation: "slideDown 0.2s ease"
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(203,213,225,0.85)", fontSize: 16, fontWeight: 500,
              padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}>{l}</button>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: "1.2rem" }}>
            <Link to="/login" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{
                flex: 1, border: "1px solid rgba(99,102,241,0.4)", background: "none",
                color: "#a5b4fc", padding: "10px", borderRadius: 8, cursor: "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', sans-serif", width: "100%"
              }}>Login</button>
            </Link>
            <Link to="/login" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{
                flex: 1, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", color: "#fff", padding: "10px", borderRadius: 8,
                cursor: "pointer", fontSize: 14, fontWeight: 700,
                fontFamily: "'Inter', 'Segoe UI', sans-serif", width: "100%"
              }}>Get Started</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function Hero() {
  const [ref, inView] = useInView();
  return (
    <section id="home" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 1.5rem 80px" }}>
      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(129,143,248,0.25)",
              borderRadius: 100, padding: "6px 16px", marginBottom: "1.5rem",
            }}>
              <Sparkles size={14} color="#818cf8" />
              <span style={{ fontSize: 13, color: "#c7d2fe", fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
                AI-Powered Learning Platform
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1,
              marginBottom: "1.5rem", letterSpacing: "-0.03em", color: "#f8fafc"
            }}>
              Your Personal{" "}
              <span style={{ background: "linear-gradient(135deg, #818cf8, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI Engineering
              </span>
              {" "}Tutor
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.18rem)", color: "rgba(226,232,240,0.85)",
              lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 520,
              fontFamily: "'Inter', 'Segoe UI', sans-serif"
            }}>
              Upload PDFs, solve doubts instantly, generate quizzes, prepare for vivas, and master engineering subjects with the power of AI.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", color: "#fff", padding: "12px 28px", borderRadius: 8,
                  cursor: "pointer", fontSize: 15, fontWeight: 700,
                  boxShadow: "0 0 24px rgba(99,102,241,0.4)",
                  transition: "all 0.3s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
                }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.6)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.4)"; }}
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
              </Link>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#cbd5e1", padding: "14px 28px", borderRadius: 10,
                cursor: "pointer", fontSize: 15, fontWeight: 600,
                transition: "all 0.25s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
                backdropFilter: "blur(8px)"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#f8fafc"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#cbd5e1"; }}
              >
                <Play size={16} fill="currentColor" /> Watch Demo
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "2.5rem" }}>
              <div style={{ display: "flex" }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `linear-gradient(135deg, hsl(${i * 40 + 200},70%,60%), hsl(${i * 40 + 240},70%,50%))`,
                    border: "2px solid rgba(5,8,22,0.9)", marginLeft: i > 1 ? -8 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: "#fff", fontWeight: 700
                  }}>{i}</div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
                  Trusted by <strong style={{ color: "#e2e8f0" }}>10,000+</strong> students
                </span>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px) scale(0.95)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}>
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div style={{
      background: "rgba(15,20,40,0.8)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20,
      padding: "1.25rem", position: "relative",
      boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
    }}>
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1rem" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div style={{
          flex: 1, height: 28, background: "rgba(255,255,255,0.04)", borderRadius: 6,
          marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 10
        }}>
          <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>app.aitutor.ai/dashboard</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "0.8rem" }}>
        {/* Sidebar */}
        <div style={{
          background: "rgba(255,255,255,0.02)", borderRadius: 12,
          padding: "0.8rem 0.6rem", border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1rem", paddingLeft: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Brain size={11} color="#fff" />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>AITutor</span>
          </div>
          {[
            { icon: <Layout size={11} />, label: "Dashboard", active: true },
            { icon: <MessageSquare size={11} />, label: "AI Chat" },
            { icon: <FileText size={11} />, label: "My PDFs" },
            { icon: <Zap size={11} />, label: "Quizzes" },
            { icon: <Target size={11} />, label: "Viva Prep" },
            { icon: <BarChart3 size={11} />, label: "Analytics" },
          ].map(({ icon, label, active }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 8px",
              borderRadius: 6, marginBottom: 2, cursor: "pointer",
              background: active ? "rgba(99,102,241,0.2)" : "transparent",
              color: active ? "#818cf8" : "#64748b",
            }}>
              {icon}
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem" }}>
            {[
              { label: "Sessions", value: "48", color: "#6366f1" },
              { label: "Quizzes", value: "12", color: "#8b5cf6" },
              { label: "Score", value: "94%", color: "#06b6d4" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${color}22`,
                borderRadius: 8, padding: "8px 10px"
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, color, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{value}</div>
                <div style={{ fontSize: 9, color: "#475569", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Chat preview */}
          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 10, padding: "0.75rem", flex: 1
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#818cf8", marginBottom: 8, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>AI Chat</div>
            {[
              { role: "user", msg: "Explain Fourier Transform" },
              { role: "ai", msg: "A Fourier Transform decomposes a signal into its frequency components..." },
              { role: "user", msg: "Give me an example" },
            ].map(({ role, msg }, i) => (
              <div key={i} style={{
                display: "flex", gap: 6, marginBottom: 6,
                justifyContent: role === "user" ? "flex-end" : "flex-start"
              }}>
                {role === "ai" && (
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Brain size={8} color="#fff" />
                  </div>
                )}
                <div style={{
                  background: role === "user" ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${role === "user" ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 6, padding: "4px 8px",
                  fontSize: 9, color: role === "user" ? "#c7d2fe" : "#94a3b8",
                  maxWidth: "80%", fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: 1.4
                }}>
                  {msg}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <div style={{
                flex: 1, height: 24, background: "rgba(255,255,255,0.04)", borderRadius: 5,
                border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", paddingLeft: 8
              }}>
                <span style={{ fontSize: 9, color: "#334155", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>Ask anything...</span>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: 5, background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <ArrowRight size={10} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing border overlay */}
      <div style={{
        position: "absolute", inset: -1, borderRadius: 20, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(99,102,241,0.15), transparent 40%, rgba(139,92,246,0.1) 100%)",
        zIndex: 1
      }} />
    </div>
  );
}

// ─── SOCIAL PROOF ─────────────────────────────────────────────────────────────
function SocialProof() {
  const [ref, inView] = useInView();
  const stats = [
    { icon: <Users size={28} />, value: 10000, suffix: "+", label: "Students Learning" },
    { icon: <Building2 size={28} />, value: 500, suffix: "+", label: "Colleges Partnered" },
    { icon: <MessageSquare size={28} />, value: 1000000, suffix: "+", label: "Questions Solved" },
  ];
  return (
    <section ref={ref} style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{
        maxWidth: 1000, margin: "0 auto",
        background: "rgba(15,20,40,0.6)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(99,102,241,0.15)", borderRadius: 20,
        padding: "3rem 2rem",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }} className="stats-grid">
          {stats.map(({ icon, value, suffix, label }, i) => (
            <div key={label} style={{
              textAlign: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(99,102,241,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem", color: "#818cf8"
              }}>{icon}</div>
              <div style={{
                fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                background: "linear-gradient(135deg, #818cf8, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>
                <AnimatedCounter end={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: 14, color: "#64748b", fontFamily: "'Inter', 'Segoe UI', sans-serif", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ────────────────────────────────────────────────────────────────
function Features() {
  const [ref, inView] = useInView();
  const features = [
    { icon: <MessageSquare size={24} />, title: "AI Tutor Chat", desc: "Ask any engineering question and get instant, detailed explanations powered by advanced AI models.", color: "#6366f1" },
    { icon: <BookOpen size={24} />, title: "PDF Learning Center", desc: "Upload your lecture notes and textbooks — AI extracts key concepts, definitions, and summaries.", color: "#8b5cf6" },
    { icon: <Zap size={24} />, title: "Quiz Generator", desc: "Auto-generate topic-wise MCQs, short answers, and practice tests from your study material.", color: "#06b6d4" },
    { icon: <Target size={24} />, title: "Viva Preparation", desc: "Simulate real viva sessions with AI-generated Q&As based on your syllabus and past questions.", color: "#f59e0b" },
    { icon: <PenTool size={24} />, title: "Notes Generator", desc: "Transform lengthy lectures into concise, well-structured notes with highlighted key points.", color: "#10b981" },
    { icon: <Calendar size={24} />, title: "Study Planner", desc: "AI-powered personalized study schedules that adapt to your exam dates and learning pace.", color: "#ec4899" },
  ];
  return (
    <section id="features" style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionBadge label="Features" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc",
            marginBottom: "1rem", letterSpacing: "-0.03em"
          }}>
            Everything you need to{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              excel
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 560, margin: "0 auto", fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: 1.7 }}>
            Six powerful tools working together to make you the smartest person in your class.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }} className="features-grid">
          {features.map(({ icon, title, desc, color }, i) => (
            <FeatureCard key={title} icon={icon} title={title} desc={desc} color={color}
              delay={i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, color, delay, inView }: { icon: any; title: string; desc: string; color: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(15,20,45,0.9)" : "rgba(15,20,40,0.6)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? color + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, padding: "1.75rem",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: inView ? (hovered ? "translateY(-6px)" : "none") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}s`,
        boxShadow: hovered ? `0 20px 60px ${color}20` : "none",
        cursor: "default",
        position: "relative", overflow: "hidden"
      }}>
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at 50% 0%, ${color}12, transparent 70%)`,
        }} />
      )}
      <div style={{
        width: 48, height: 48, borderRadius: 12, marginBottom: "1.25rem",
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center", color
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 17, color: "#e2e8f0", marginBottom: "0.6rem" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{desc}</p>
    </div>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    { num: "01", icon: <Upload size={24} />, title: "Upload Notes or PDFs", desc: "Drag and drop your study material — lecture slides, textbooks, or handwritten notes — into the platform.", color: "#6366f1" },
    { num: "02", icon: <MessageSquare size={24} />, title: "Ask Questions", desc: "Chat with your AI tutor. Ask anything about the uploaded content or any engineering topic you're struggling with.", color: "#8b5cf6" },
    { num: "03", icon: <Brain size={24} />, title: "Learn Faster with AI", desc: "Receive personalized explanations, practice quizzes, and structured notes designed for your learning style.", color: "#06b6d4" },
  ];
  return (
    <section style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionBadge label="How It Works" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc",
            letterSpacing: "-0.03em"
          }}>
            Start in{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              3 simple steps
            </span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", position: "relative" }} className="steps-grid">
          {/* Connector line */}
          <div style={{
            position: "absolute", top: 48, left: "20%", right: "20%", height: 1,
            background: "linear-gradient(90deg, #6366f130, #8b5cf630, #06b6d430)",
            zIndex: 0
          }} className="connector-line" />

          {steps.map(({ num, icon, title, desc, color }, i) => (
            <div key={title} style={{
              textAlign: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px)",
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              position: "relative", zIndex: 1
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", margin: "0 auto 1.5rem",
                background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                border: `2px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center", color,
                position: "relative",
                boxShadow: `0 0 32px ${color}20`
              }}>
                {icon}
                <div style={{
                  position: "absolute", top: -8, right: -8, width: 24, height: 24,
                  borderRadius: "50%", background: color, color: "#fff",
                  fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif"
                }}>{num.slice(1)}</div>
              </div>
              <h3 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 19, color: "#e2e8f0", marginBottom: "0.75rem" }}>{title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 280, margin: "0 auto", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DASHBOARD PREVIEW ────────────────────────────────────────────────────────
function DashboardPreview() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.04) 50%, transparent)"
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionBadge label="Dashboard Preview" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            A workspace built for{" "}
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              deep learning
            </span>
          </h2>
        </div>

        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(60px) scale(0.97)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s"
        }}>
          <FullDashboard />
        </div>
      </div>
    </section>
  );
}

function FullDashboard() {
  return (
    <div style={{
      background: "rgba(8,12,28,0.95)", borderRadius: 20,
      border: "1px solid rgba(59,130,246,0.2)",
      overflow: "hidden",
      boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)",
    }}>
      {/* Chrome */}
      <div style={{ background: "rgba(15,20,40,0.9)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, height: 24, background: "rgba(255,255,255,0.03)", borderRadius: 5, maxWidth: 300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, color: "#334155", fontFamily: "monospace" }}>app.aitutor.ai</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[Bell, Settings].map((Icon, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={12} color="#475569" />
            </div>
          ))}
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 260px", minHeight: 420 }}>
        {/* Sidebar */}
        <div style={{ background: "rgba(10,14,30,0.8)", borderRight: "1px solid rgba(255,255,255,0.04)", padding: "1.25rem 0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", paddingLeft: "0.5rem" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Brain size={13} color="#fff" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>AITutor</span>
          </div>
          {[
            { icon: <Layout size={13} />, label: "Dashboard", active: true },
            { icon: <MessageSquare size={13} />, label: "AI Tutor" },
            { icon: <FileText size={13} />, label: "PDF Library" },
            { icon: <Zap size={13} />, label: "Quizzes" },
            { icon: <Target size={13} />, label: "Viva Prep" },
            { icon: <PenTool size={13} />, label: "My Notes" },
            { icon: <Calendar size={13} />, label: "Study Plan" },
            { icon: <BarChart3 size={13} />, label: "Analytics" },
          ].map(({ icon, label, active }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
              borderRadius: 7, marginBottom: 2,
              background: active ? "rgba(59,130,246,0.18)" : "transparent",
              color: active ? "#818cf8" : "#475569",
              borderLeft: active ? "2px solid #6366f1" : "2px solid transparent",
            }}>
              {icon}
              <span style={{ fontSize: 11.5, fontWeight: active ? 600 : 400, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem" }}>
            {[
              { label: "Topics Covered", val: "48", change: "+8 this week", color: "#6366f1" },
              { label: "Quiz Score", val: "94%", change: "+12% avg", color: "#8b5cf6" },
              { label: "Study Hours", val: "127h", change: "This semester", color: "#06b6d4" },
              { label: "Rank", val: "#12", change: "In your college", color: "#10b981" },
            ].map(({ label, val, change, color }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22`,
                borderRadius: 10, padding: "0.875rem"
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: "'Inter', 'Segoe UI', sans-serif", marginBottom: 2 }}>{val}</div>
                <div style={{ fontSize: 10.5, color: "#94a3b8", fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 9.5, color: "#334155", marginTop: 4, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{change}</div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "1rem" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#818cf8", marginBottom: 12, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>Subject Progress</div>
            {[
              { sub: "Data Structures", pct: 78, color: "#6366f1" },
              { sub: "Operating Systems", pct: 64, color: "#8b5cf6" },
              { sub: "DBMS", pct: 91, color: "#06b6d4" },
              { sub: "Computer Networks", pct: 55, color: "#f59e0b" },
            ].map(({ sub, pct, color }) => (
              <div key={sub} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: "#94a3b8", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{sub}</span>
                  <span style={{ fontSize: 10, color, fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div style={{ background: "rgba(8,12,28,0.6)", borderLeft: "1px solid rgba(255,255,255,0.04)", padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", marginBottom: 12, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>AI Tutor Chat</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { role: "ai", msg: "Hey! Ready to study today? 🚀" },
              { role: "user", msg: "Yes! Help me with Dijkstra's algo" },
              { role: "ai", msg: "Sure! Dijkstra's finds the shortest path between nodes in a graph. It uses a priority queue to always process the minimum-distance node first..." },
              { role: "user", msg: "Can you generate a quiz on it?" },
            ].map(({ role, msg }, i) => (
              <div key={i} style={{ display: "flex", gap: 6, justifyContent: role === "user" ? "flex-end" : "flex-start" }}>
                {role === "ai" && (
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Brain size={9} color="#fff" />
                  </div>
                )}
                <div style={{
                  background: role === "user" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${role === "user" ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 8, padding: "6px 10px",
                  fontSize: 10.5, color: role === "user" ? "#c7d2fe" : "#94a3b8",
                  maxWidth: "85%", fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: 1.5
                }}>{msg}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            <div style={{
              flex: 1, height: 30, background: "rgba(255,255,255,0.03)", borderRadius: 8,
              border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", paddingLeft: 10
            }}>
              <span style={{ fontSize: 10, color: "#1e293b", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>Type your question...</span>
            </div>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={12} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
function Benefits() {
  const [ref, inView] = useInView();
  const benefits = [
    { icon: <Clock size={20} />, title: "Save Study Time", desc: "Cut your study time by 60% with AI-generated summaries and instant doubt resolution.", color: "#6366f1" },
    { icon: <TrendingUp size={20} />, title: "Improve Exam Scores", desc: "Students using AITutor report an average 28% improvement in their semester grades.", color: "#8b5cf6" },
    { icon: <Cpu size={20} />, title: "Personalized Learning", desc: "AI adapts to your pace, knowledge gaps, and learning style for maximum retention.", color: "#06b6d4" },
    { icon: <Brain size={20} />, title: "AI-Powered Explanations", desc: "Complex concepts broken down with real-world examples, diagrams, and analogies.", color: "#10b981" },
    { icon: <Shield size={20} />, title: "24/7 Availability", desc: "Your AI tutor never sleeps. Study at 3am before an exam — no judgment, all help.", color: "#f59e0b" },
    { icon: <Award size={20} />, title: "Better Placement Prep", desc: "Practice DSA problems, system design, and technical interviews with AI coaching.", color: "#ec4899" },
  ];
  return (
    <section style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionBadge label="Benefits" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            Why students{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              love AITutor
            </span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="benefits-grid">
          {benefits.map(({ icon, title, desc, color }, i) => (
            <div key={title} style={{
              display: "flex", gap: "1rem", padding: "1.25rem",
              background: "rgba(15,20,40,0.5)", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.05)",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `all 0.6s ease ${i * 0.07}s`,
              backdropFilter: "blur(10px)"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: `${color}18`, border: `1px solid ${color}33`,
                display: "flex", alignItems: "center", justifyContent: "center", color
              }}>{icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 15, color: "#e2e8f0", marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInView();
  const testimonials = [
    {
      name: "Priya Sharma",
      branch: "Computer Science, 3rd Year",
      college: "VIT Vellore",
      rating: 5,
      text: "AITutor completely transformed how I prepare for exams. The viva prep feature is insanely good — it asked me exactly the questions my professor did! My CGPA jumped from 7.4 to 8.9 in one semester.",
      avatar: "PS",
      gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)"
    },
    {
      name: "Arjun Mehta",
      branch: "Electronics & Communication, 4th Year",
      college: "NIT Trichy",
      rating: 5,
      text: "I used to spend hours trying to understand signal processing from textbooks. With AITutor, I just upload my PDF and ask questions. The AI explains things better than most professors honestly.",
      avatar: "AM",
      gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)"
    },
    {
      name: "Sneha Patel",
      branch: "Mechanical Engineering, 2nd Year",
      college: "BITS Pilani",
      rating: 5,
      text: "The quiz generator is my secret weapon before every test. It creates questions right from my notes and even tells me which topics I'm weak in. Got 91% in Thermodynamics this semester!",
      avatar: "SP",
      gradient: "linear-gradient(135deg,#06b6d4,#6366f1)"
    }
  ];
  return (
    <section style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionBadge label="Testimonials" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            Real students,{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              real results
            </span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }} className="testimonials-grid">
          {testimonials.map(({ name, branch, college, rating, text, avatar, gradient }, i) => (
            <div key={name} style={{
              background: "rgba(15,20,40,0.7)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.75rem",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(30px)",
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
            }}>
              <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem" }}>
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: 14.5, color: "#94a3b8", lineHeight: 1.75, marginBottom: "1.5rem", fontFamily: "'Inter', 'Segoe UI', sans-serif", fontStyle: "italic" }}>
                "{text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", background: gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0,
                  fontFamily: "'Inter', 'Segoe UI', sans-serif"
                }}>{avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#475569", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{branch}</div>
                  <div style={{ fontSize: 11, color: "#334155", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing() {
  const [ref, inView] = useInView();
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      desc: "Perfect to get started",
      color: "#64748b",
      features: ["10 AI chat messages/day", "2 PDF uploads/month", "5 quizzes/month", "Basic viva prep", "Community support"],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      desc: "For serious students",
      color: "#6366f1",
      features: ["Unlimited AI chat", "Unlimited PDF uploads", "Unlimited quizzes", "Advanced viva prep", "Notes generator", "Study planner", "Priority support", "Exam analytics"],
      cta: "Get Pro",
      highlight: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "for institutions",
      desc: "For colleges & coaching",
      color: "#8b5cf6",
      features: ["Everything in Pro", "Bulk student licenses", "Custom branding", "LMS integration", "Admin dashboard", "Dedicated support", "Custom AI training", "Analytics & reports"],
      cta: "Contact Sales",
      highlight: false
    }
  ];
  return (
    <section id="pricing" style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionBadge label="Pricing" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            Simple,{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              transparent
            </span>
            {" "}pricing
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", marginTop: "0.75rem", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem", alignItems: "start" }} className="pricing-grid">
          {plans.map(({ name, price, period, desc, color, features, cta, highlight, badge }, i) => (
            <div key={name} style={{
              background: highlight ? "rgba(15,25,55,0.9)" : "rgba(15,20,40,0.6)",
              backdropFilter: "blur(16px)",
              border: highlight ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18, padding: "2rem",
              position: "relative", overflow: "hidden",
              transform: highlight ? "scale(1.04)" : "scale(1)",
              boxShadow: highlight ? "0 24px 60px rgba(59,130,246,0.2)" : "none",
              opacity: inView ? 1 : 0,
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}>
              {highlight && (
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.1), transparent 60%)"
                }} />
              )}
              {badge && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px",
                  borderRadius: 100, fontFamily: "'Inter', 'Segoe UI', sans-serif"
                }}>{badge}</div>
              )}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 36, color: "#f8fafc" }}>{price}</span>
                  <span style={{ fontSize: 13, color: "#475569", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>/ {period}</span>
                </div>
                <div style={{ fontSize: 13, color: "#64748b", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{desc}</div>
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: highlight ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <Check size={10} color={highlight ? "#818cf8" : "#475569"} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13.5, color: "#94a3b8", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{f}</span>
                  </div>
                ))}
              </div>

              <button style={{
                width: "100%", padding: "12px",
                background: highlight ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.05)",
                border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, color: highlight ? "#fff" : "#94a3b8",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                boxShadow: highlight ? "0 4px 20px rgba(59,130,246,0.3)" : "none",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (highlight) e.currentTarget.style.boxShadow = "0 8px 28px rgba(59,130,246,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; if (highlight) e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.3)"; }}
              >{cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How does AITutor's AI chat work?", a: "AITutor uses advanced large language models fine-tuned on engineering curricula. You can ask any topic-related question and it responds with detailed, structured explanations tailored to your engineering domain." },
    { q: "What file formats can I upload for PDF learning?", a: "You can upload PDF files up to 50MB. The AI parses the content, extracts key concepts, and makes it queryable through chat. Support for PPT and Word doc uploads is coming soon." },
    { q: "How accurate are the AI-generated quizzes?", a: "Quizzes are generated directly from your uploaded content and cross-referenced with standard engineering syllabi. Accuracy is typically 95%+, and you can flag any incorrect questions for review." },
    { q: "Is my study data private and secure?", a: "Absolutely. All uploaded files and conversations are encrypted end-to-end and stored on secure AWS infrastructure. We never share your data with third parties. You can delete your data anytime." },
    { q: "Can I use AITutor for competitive exam preparation?", a: "Yes! AITutor is excellent for GATE, ESE, placements, and other competitive exams. The study planner and quiz generator can be configured for specific exam patterns and syllabi." },
    { q: "What's the difference between Pro and Enterprise plans?", a: "Pro is for individual students — unlimited AI access and all personal features. Enterprise is for colleges and coaching institutes, offering bulk licenses, admin dashboards, custom branding, and LMS integration." },
  ];
  return (
    <section id="faq" style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div ref={ref as any} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionBadge label="FAQ" />
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            Questions?{" "}
            <span style={{ background: "linear-gradient(135deg, #818cf8, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              We've got answers
            </span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map(({ q, a }, i) => (
            <div key={q} style={{
              background: "rgba(15,20,40,0.6)", backdropFilter: "blur(12px)",
              border: `1px solid ${open === i ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 14, overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `all 0.5s ease ${i * 0.07}s, border-color 0.2s`,
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", padding: "1.25rem 1.5rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', sans-serif", paddingRight: "1rem" }}>{q}</span>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: open === i ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: open === i ? "#818cf8" : "#475569",
                  transition: "all 0.2s"
                }}>
                  {open === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.25rem" }}>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={ref as any} style={{
          background: "rgba(15,20,45,0.8)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(59,130,246,0.25)", borderRadius: 24, padding: "4rem 2rem",
          textAlign: "center", position: "relative", overflow: "hidden",
          boxShadow: "0 32px 80px rgba(59,130,246,0.12)",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12), transparent 60%)"
          }} />
          <div style={{
            position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
            pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: 100, padding: "6px 16px", marginBottom: "1.5rem"
            }}>
              <Sparkles size={14} color="#818cf8" />
              <span style={{ fontSize: 12, color: "#c7d2fe", fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>Join 10,000+ students already learning smarter</span>
            </div>

            <h2 style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#f8fafc",
              marginBottom: "1rem", letterSpacing: "-0.03em", lineHeight: 1.1
            }}>
              Start Learning{" "}
              <span style={{ background: "linear-gradient(135deg, #818cf8, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Smarter
              </span>
              {" "}Today
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", marginBottom: "2.5rem", fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 2.5rem" }}>
              No credit card required. Start with our free plan and upgrade when you're ready to unlock your full potential.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  border: "none", color: "#fff", padding: "14px 32px", borderRadius: 10,
                  fontSize: 15, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(59,130,246,0.45)",
                  transition: "all 0.25s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,130,246,0.65)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,130,246,0.45)"; }}
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
              </Link>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#cbd5e1", padding: "14px 32px", borderRadius: 10,
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                transition: "all 0.25s", fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >
                Explore Features <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "4rem 1.5rem 2rem",
      position: "relative", zIndex: 1,
      background: "rgba(4,6,16,0.8)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(59,130,246,0.4)"
              }}>
                <Brain size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(90deg,#818cf8,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AITutor
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, maxWidth: 260, marginBottom: "1.5rem", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
              The AI-powered learning platform designed specifically for engineering students across India.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <Share2 size={15} />, label: "Twitter" },
                { icon: <Share2 size={15} />, label: "LinkedIn" },
                { icon: <Code size={15} />, label: "GitHub" },
                { icon: <Play size={15} />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <div key={label} title={label} style={{
                  width: 34, height: 34, borderRadius: 8, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#475569", transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >{icon}</div>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Product</h4>
            {["AI Tutor Chat", "PDF Learning", "Quiz Generator", "Viva Prep", "Notes Generator", "Study Planner"].map(l => (
              <div key={l} style={{ fontSize: 13.5, color: "#475569", marginBottom: 8, cursor: "pointer", fontFamily: "'Inter', 'Segoe UI', sans-serif", transition: "color 0.15s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#818cf8"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#475569"}
              >{l}</div>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Company</h4>
            {["About Us", "Blog", "Careers", "Press Kit", "Privacy Policy", "Terms of Service"].map(l => (
              <div key={l} style={{ fontSize: 13.5, color: "#475569", marginBottom: 8, cursor: "pointer", fontFamily: "'Inter', 'Segoe UI', sans-serif", transition: "color 0.15s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#818cf8"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#475569"}
              >{l}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Contact</h4>
            {[
              { icon: <Mail size={13} />, text: "hello@aitutor.ai" },
              { icon: <Phone size={13} />, text: "+91 98765 43210" },
              { icon: <Globe size={13} />, text: "www.aitutor.ai" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#475569", marginBottom: 10, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
                <span style={{ color: "#334155" }}>{icon}</span>{text}
              </div>
            ))}
            <div style={{
              marginTop: "1rem", padding: "1rem",
              background: "rgba(59,130,246,0.06)", borderRadius: 10,
              border: "1px solid rgba(59,130,246,0.12)"
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#818cf8", marginBottom: 8, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>Newsletter</div>
              <div style={{ display: "flex", gap: 6 }}>
                <input placeholder="Your email" style={{
                  flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6, padding: "6px 10px", color: "#94a3b8", fontSize: 12, outline: "none",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif"
                }} />
                <button style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
                  borderRadius: 6, padding: "0 12px", cursor: "pointer", color: "#fff", fontSize: 12
                }}>→</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontSize: 12.5, color: "#334155", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            © 2024 AITutor Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {["Made with ❤️ in India", "🔒 SOC 2 Compliant", "🇮🇳 DPDP Compliant"].map(t => (
              <span key={t} style={{ fontSize: 11.5, color: "#334155", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 100, padding: "3px 10px", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SECTION BADGE ───────────────────────────────────────────────────────────
function SectionBadge({ label }: { label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)",
      borderRadius: 100, padding: "5px 14px", marginBottom: "1rem"
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#8b5cf6" }} />
      <span style={{ fontSize: 12, color: "#c4b5fd", fontWeight: 600, fontFamily: "'Inter', 'Segoe UI', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: #050816;
    color: #f8fafc;
    overflow-x: hidden;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #050816; }
  ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.5); }

  @keyframes floatOrb1 {
    0%, 100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(60px,40px) scale(1.1); }
    66% { transform: translate(-40px,80px) scale(0.95); }
  }
  @keyframes floatOrb2 {
    0%, 100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(-80px,-60px) scale(1.05); }
    66% { transform: translate(40px,40px) scale(1.1); }
  }
  @keyframes floatOrb3 {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(60px,-60px) scale(1.08); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* RESPONSIVE */
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .features-grid { grid-template-columns: repeat(3,1fr) !important; }
  .stats-grid { grid-template-columns: repeat(3,1fr) !important; }
  .benefits-grid { grid-template-columns: repeat(3,1fr) !important; }
  .testimonials-grid { grid-template-columns: repeat(3,1fr) !important; }
  .pricing-grid { grid-template-columns: repeat(3,1fr) !important; }
  .steps-grid { grid-template-columns: repeat(3,1fr) !important; }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
  .hidden-mobile { display: flex !important; }
  .show-mobile { display: none !important; }
  .connector-line { display: block !important; }

  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2,1fr) !important; }
    .benefits-grid { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
  }

  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr !important; }
    .benefits-grid { grid-template-columns: 1fr !important; }
    .testimonials-grid { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    .steps-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .connector-line { display: none !important; }
    .hidden-mobile { display: none !important; }
    .show-mobile { display: block !important; }
  }
`;

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div style={{ minHeight: "100vh", background: "#050816", position: "relative" }}>
        <FloatingOrbs />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <SocialProof />
          <Features />
          <HowItWorks />
          <DashboardPreview />
          <Benefits />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
