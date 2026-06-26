import { useState, useEffect } from "react";

// ─── Floating Orb Background (same as landing page) ───────────────────────────
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#0a0a12]" />

      {/* Primary purple glow — top-left */}
      <div
        className="absolute rounded-full opacity-30 blur-[120px]"
        style={{
          width: 700,
          height: 700,
          top: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, #7c3aed 0%, #4c1d95 60%, transparent 100%)",
          animation: "orbFloat1 14s ease-in-out infinite",
        }}
      />

      {/* Blue glow — bottom-right */}
      <div
        className="absolute rounded-full opacity-25 blur-[140px]"
        style={{
          width: 800,
          height: 800,
          bottom: "-25%",
          right: "-20%",
          background: "radial-gradient(circle, #2563eb 0%, #1e3a8a 60%, transparent 100%)",
          animation: "orbFloat2 18s ease-in-out infinite",
        }}
      />

      {/* Cyan accent — center */}
      <div
        className="absolute rounded-full opacity-15 blur-[100px]"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          left: "40%",
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          animation: "orbFloat3 11s ease-in-out infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, 30px) scale(1.05); }
          66%       { transform: translate(-20px, 50px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-50px, -40px) scale(1.08); }
          70%       { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-30px, 40px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes cardFloat2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes cardFloat3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-up          { animation: fadeSlideUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-up-d1       { animation: fadeSlideUp 0.7s 0.1s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-up-d2       { animation: fadeSlideUp 0.7s 0.2s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-up-d3       { animation: fadeSlideUp 0.7s 0.3s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-up-d4       { animation: fadeSlideUp 0.7s 0.4s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-up-d5       { animation: fadeSlideUp 0.7s 0.5s cubic-bezier(.22,1,.36,1) both; }
        .float-card-1 { animation: cardFloat  6s ease-in-out infinite; }
        .float-card-2 { animation: cardFloat2 8s ease-in-out infinite 1s; }
        .float-card-3 { animation: cardFloat3 7s ease-in-out infinite 0.5s; }
        .float-card-4 { animation: cardFloat  9s ease-in-out infinite 1.5s; }
        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%);
          background-size: 200% auto;
          transition: background-position 0.4s, box-shadow 0.3s, transform 0.15s;
        }
        .btn-primary:hover {
          background-position: right center;
          box-shadow: 0 0 32px rgba(124,58,237,0.55), 0 8px 24px rgba(0,0,0,0.4);
          transform: translateY(-1px);
        }
        .btn-primary:active { transform: translateY(0); }
        .glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .glass-card-glow {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(124,58,237,0.25);
          box-shadow: 0 0 40px rgba(124,58,237,0.12), 0 24px 48px rgba(0,0,0,0.5);
        }
        .input-field {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: rgba(124,58,237,0.6);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
          background: rgba(255,255,255,0.08);
        }
        .feature-chip {
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
        }
        .google-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .google-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ size = "md" }) {
  const s = size === "sm" ? "w-7 h-7 text-sm" : "w-9 h-9 text-base";
  const t = size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${s} rounded-xl flex items-center justify-center font-bold text-white`}
        style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span className={`${t} font-bold text-white`}>AITutor</span>
    </div>
  );
}

// ─── Feature Cards (right panel) ──────────────────────────────────────────────
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "AI Tutor Chat",
    desc: "Instant answers to any engineering question",
    color: "#7c3aed",
    badge: "Live",
    float: "float-card-1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "PDF Learning Center",
    desc: "Upload notes, get AI-powered summaries",
    color: "#2563eb",
    badge: "Smart",
    float: "float-card-2",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Quiz Generator",
    desc: "Auto-generate practice tests from your syllabus",
    color: "#0891b2",
    badge: "AI",
    float: "float-card-3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Viva Preparation",
    desc: "Practice oral exams with AI interviewer",
    color: "#7c3aed",
    badge: "Pro",
    float: "float-card-4",
  },
];

function FeatureCard({ feature, delay }) {
  return (
    <div
      className={`glass-card rounded-2xl p-4 ${feature.float} cursor-default`}
      style={{
        animationDelay: `${delay}s`,
        border: `1px solid ${feature.color}22`,
        boxShadow: `0 0 20px ${feature.color}15`,
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 32px ${feature.color}35`;
        e.currentTarget.style.borderColor = `${feature.color}44`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 20px ${feature.color}15`;
        e.currentTarget.style.borderColor = `${feature.color}22`;
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${feature.color}22`, color: feature.color }}
        >
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white font-semibold text-sm">{feature.label}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-medium"
              style={{
                background: `${feature.color}22`,
                color: feature.color,
                border: `1px solid ${feature.color}44`,
              }}
            >
              {feature.badge}
            </span>
          </div>
          <p className="text-white/50 text-xs leading-snug">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Google Icon ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Eye icons ─────────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPass] = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden font-sans">
      <BackgroundOrbs />

      {/* ── Nav bar ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <Logo />
        <a
          href="/"
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Home
        </a>
      </nav>

      {/* ── Main content ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

          {/* ════════ LEFT — Auth Card ════════ */}
          <div className="w-full max-w-md lg:w-[420px] flex-shrink-0 animate-fade-up">
            <div
              className="glass-card-glow rounded-3xl p-8 md:p-10"
            >
              {/* Card header */}
              <div className="flex flex-col items-center mb-8 animate-fade-up-d1">
                <Logo size="md" />
                <h1 className="mt-5 text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="mt-1.5 text-white/50 text-sm text-center">
                  Continue your AI-powered learning journey.
                </p>
              </div>

              {/* Google button */}
              <button
                className="google-btn w-full flex items-center justify-center gap-3 rounded-xl py-3 text-white text-sm font-medium mb-5 animate-fade-up-d2"
                onClick={() => {}}
              >
                <GoogleIcon />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5 animate-fade-up-d2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs">or sign in with email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Email */}
              <div className="mb-4 animate-fade-up-d3">
                <label className="block text-white/70 text-xs font-medium mb-2 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field w-full rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm"
                />
              </div>

              {/* Password */}
              <div className="mb-4 animate-fade-up-d3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/70 text-xs font-medium tracking-wide uppercase">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-field w-full rounded-xl px-4 py-3 pr-11 text-white placeholder-white/25 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 mb-6 cursor-pointer group animate-fade-up-d4">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: remember
                      ? "linear-gradient(135deg,#7c3aed,#2563eb)"
                      : "rgba(255,255,255,0.06)",
                    border: remember
                      ? "1px solid transparent"
                      : "1px solid rgba(255,255,255,0.15)",
                  }}
                  onClick={() => setRemember(v => !v)}
                >
                  {remember && (
                    <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none">
                      <polyline points="1,5 4,8 11,1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                  Remember me for 30 days
                </span>
              </label>

              {/* Login button */}
              <button
                className="btn-primary animate-fade-up-d4 w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 mb-5"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Login
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Footer */}
              <p className="text-center text-sm text-white/40 animate-fade-up-d5">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Create Account
                </a>
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 mt-5 animate-fade-up-d5">
              {["256-bit SSL", "No spam", "Cancel anytime"].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-white/30 text-xs">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* ════════ RIGHT — Feature Cards Panel ════════ */}
          <div className="hidden lg:flex flex-col flex-1 gap-4 animate-fade-up-d2">
            {/* Header text */}
            <div className="mb-2">
              <span
                className="feature-chip inline-flex items-center gap-1.5 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                Everything you need to excel
              </span>
              <h2 className="text-2xl font-bold text-white leading-snug">
                Master engineering <br />
                <span
                  style={{
                    background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  with AI by your side
                </span>
              </h2>
              <p className="mt-2 text-white/40 text-sm leading-relaxed max-w-sm">
                Join thousands of students acing their exams with personalized AI tutoring.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-3">
              {features.map((f, i) => (
                <FeatureCard key={f.label} feature={f} delay={i * 0.15} />
              ))}
            </div>

            {/* Stats row */}
            <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-8 mt-1">
              {[
                { val: "50K+", label: "Students" },
                { val: "4.9★", label: "Rating" },
                { val: "94%", label: "Pass rate" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-xl font-bold"
                    style={{
                      background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.val}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
              <div className="flex-1 flex justify-end">
                <div className="flex -space-x-2">
                  {["#7c3aed","#2563eb","#0891b2","#7c3aed"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#0a0a12] flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg,${c},${c}aa)` }}
                    >
                      {["A","B","C","D"][i]}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-[#0a0a12] bg-white/10 flex items-center justify-center text-[10px] text-white/60 font-medium">
                    +k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}