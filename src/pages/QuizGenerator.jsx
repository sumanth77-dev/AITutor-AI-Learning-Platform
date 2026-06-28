import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, MessageCircle, FileText, BookOpen, HelpCircle,
  Mic, Calendar, BarChart2, User, Settings, LogOut,
  Bell, Search, Moon, Sun, Menu, X, ChevronRight, ChevronLeft,
  Flame, Clock, Upload, Brain, Zap, Target, TrendingUp,
  CheckCircle, Star, ArrowRight, Play, Award, BookMarked,
  Lightbulb, AlertCircle, ChevronDown, Activity,
  Send, MessageSquare, Share2
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home,          label: "Home",               path: "/home" },
  { icon: MessageCircle, label: "AI Tutor",           path: "/chat" },
  { icon: FileText,      label: "PDF Learning",       path: "/upload" },
  { icon: BookOpen,      label: "Notes Generator",    path: "/notes" },
  { icon: HelpCircle,    label: "Quiz Generator",     path: "/quiz" },
  { icon: Mic,           label: "Viva Preparation",   path: "/viva" },
  { icon: Calendar,      label: "Study Planner",      path: "/planner" },
  { icon: BarChart2,     label: "Progress Analytics", path: "/analytics" },
  { icon: User,          label: "Profile",            path: "/profile" },
  { icon: Settings,      label: "Settings",           path: "/settings" },
];

function Sidebar({ collapsed, onToggle, mobileOpen, isMobile, onCloseMobile, onNavigate, currentPath }) {
  const sidebarClass = [
    "sidebar",
    !isMobile && collapsed ? "collapsed" : "",
    isMobile && mobileOpen ? "mobile-open" : "",
    isMobile && !mobileOpen ? "mobile-closed" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      {isMobile && mobileOpen && (
        <div className="sidebar-overlay" onClick={onCloseMobile} />
      )}
      <aside className={sidebarClass}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Brain style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            {(!collapsed || isMobile) && <span className="sidebar-logo-text">AITutor</span>}
          </div>
          {isMobile ? (
            <button className="sidebar-close-mobile" onClick={onCloseMobile} aria-label="Close sidebar">
              <X style={{ width: 18, height: 18 }} />
            </button>
          ) : (
            <button className="sidebar-toggle-desktop" onClick={onToggle} aria-label="Toggle sidebar">
              {collapsed ? (
                <ChevronRight style={{ width: 16, height: 16 }} />
              ) : (
                <ChevronLeft style={{ width: 16, height: 16 }} />
              )}
            </button>
          )}
        </div>
        <nav className="sidebar-nav scrollbar-none">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = currentPath === path;
            let capsuleClass = "capsule-violet";
            if (path === "/upload") capsuleClass = "capsule-blue";
            else if (path === "/notes") capsuleClass = "capsule-emerald";
            else if (path === "/quiz") capsuleClass = "capsule-orange";
            else if (path === "/viva") capsuleClass = "capsule-pink";
            else if (path === "/planner") capsuleClass = "capsule-indigo";
            else if (path === "/analytics") capsuleClass = "capsule-purple";
            return (
              <button
                key={path}
                onClick={() => { onNavigate(path); if (isMobile) onCloseMobile(); }}
                className={`nav-btn${active ? ` active ${capsuleClass}` : ""}`}
              >
                <Icon className="nav-icon" style={{ width: 18, height: 18 }} />
                <span className="nav-label">{label}</span>
                {!isMobile && collapsed && (
                  <span className="nav-tooltip">{label}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-socials-wrapper">
            {!isMobile && collapsed ? (
              <div className="socials-trigger-wrapper">
                <button className="socials-trigger-btn" aria-label="Social links">
                  <Share2 style={{ width: 18, height: 18 }} />
                </button>
                <div className="collapsed-socials-popout">
                  <a href="#" className="social-icon-btn" title="Telegram"><Send style={{ width: 15, height: 15 }} /></a>
                  <a href="#" className="social-icon-btn" title="Twitter">
                    <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="social-icon-btn" title="Discord"><MessageSquare style={{ width: 15, height: 15 }} /></a>
                  <a href="#" className="social-icon-btn" title="Blog"><Flame style={{ width: 15, height: 15 }} /></a>
                </div>
              </div>
            ) : (
              <div className="sidebar-socials">
                <a href="#" className="social-icon-btn" title="Telegram"><Send style={{ width: 15, height: 15 }} /></a>
                <a href="#" className="social-icon-btn" title="Twitter">
                  <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="social-icon-btn" title="Discord"><MessageSquare style={{ width: 15, height: 15 }} /></a>
                <a href="#" className="social-icon-btn" title="Blog"><Flame style={{ width: 15, height: 15 }} /></a>
              </div>
            )}
          </div>
          <div className="sidebar-logout-area">
            <button className="logout-btn" onClick={() => { onNavigate("/"); if (isMobile) onCloseMobile(); }}>
              <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span className="logout-label">Logout</span>
              {!isMobile && collapsed && <span className="nav-tooltip">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
// ============================================================
// AITutor — Quiz Generator Page
// ============================================================
// TODO (Backend Integration):
//   - POST /api/quiz/generate    → Generate Quiz API
//   - POST /api/quiz/save        → Save Quiz API
//   - GET  /api/quiz/history     → Quiz History API
//   - POST /api/quiz/submit      → Submit Quiz API
// ============================================================

// ── Placeholder Data ─────────────────────────────────────────
const PLACEHOLDER_QUIZ = {
  subject: "Operating Systems",
  title: "OS Scheduling & Memory Management",
  difficulty: "medium",
  timeLimit: 20 * 60,
  questions: [
    {
      id: 1,
      text: "Which CPU scheduling algorithm provides the minimum average waiting time for a given set of processes?",
      options: [
        "First Come First Serve (FCFS)",
        "Shortest Job First (SJF)",
        "Round Robin (RR)",
        "Priority Scheduling",
      ],
      correct: 1,
      explanation:
        "SJF minimizes average waiting time by always executing the process with the smallest burst time next. It is provably optimal for minimizing average waiting time.",
    },
    {
      id: 2,
      text: "In a system with 4 frames and the reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, what is the total number of page faults using the Optimal Page Replacement algorithm?",
      options: ["6", "7", "8", "9"],
      correct: 0,
      explanation:
        "Optimal page replacement replaces the page that will not be used for the longest time in the future, resulting in the minimum possible page faults.",
    },
    {
      id: 3,
      text: "A process is in the 'waiting' state when:",
      options: [
        "It is currently being executed by the CPU",
        "It is ready to execute but waiting for the CPU",
        "It is waiting for some event such as I/O completion",
        "It has finished execution and is being terminated",
      ],
      correct: 2,
      explanation:
        "The waiting state occurs when a process is waiting for some event to occur, typically an I/O operation to complete, before it can proceed.",
    },
    {
      id: 4,
      text: "Which of the following conditions is NOT required for a deadlock to occur?",
      options: [
        "Mutual Exclusion",
        "Hold and Wait",
        "Preemption",
        "Circular Wait",
      ],
      correct: 2,
      explanation:
        "Deadlock requires: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption (its absence — 'no preemption') is required; its presence prevents deadlock.",
    },
    {
      id: 5,
      text: "In the context of virtual memory, thrashing occurs when:",
      options: [
        "The CPU utilization becomes very high",
        "Processes spend more time paging than executing",
        "The page table becomes too large to fit in memory",
        "The TLB miss rate drops to zero",
      ],
      correct: 1,
      explanation:
        "Thrashing happens when the degree of multiprogramming is too high, causing processes to constantly page in and out, leaving almost no time for actual CPU execution.",
    },
  ],
};

const RECENT_QUIZZES = [
  {
    id: 1,
    name: "OS Scheduling Algorithms",
    score: "18/20",
    time: "14:32",
    group: "Today",
  },
  {
    id: 2,
    name: "Database Normalization",
    score: "14/20",
    time: "22:10",
    group: "Today",
  },
  {
    id: 3,
    name: "Computer Networks — TCP/IP",
    score: "9/10",
    time: "08:45",
    group: "Yesterday",
  },
  {
    id: 4,
    name: "Data Structures — Trees",
    score: "17/20",
    time: "18:20",
    group: "Yesterday",
  },
  {
    id: 5,
    name: "DBMS — SQL Queries",
    score: "12/15",
    time: "11:30",
    group: "Last Week",
  },
];

// ── Helpers ─────────────────────────────────────────────────
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function ScoreCircle({ pct }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circ - (pct / 100) * circ);
    }, 200);
    return () => clearTimeout(timer);
  }, [pct, circ]);

  const color =
    pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="quiz-score-circle-wrap">
      <svg className="quiz-score-svg" viewBox="0 0 124 124">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <circle className="quiz-score-track" cx="62" cy="62" r={r} />
        <circle
          className="quiz-score-fill"
          cx="62"
          cy="62"
          r={r}
          style={{
            strokeDasharray: circ,
            strokeDashoffset: offset,
            stroke: color,
          }}
        />
      </svg>
      <div className="quiz-score-center">
        <span className="quiz-score-value">{Math.round(pct)}%</span>
        <span className="quiz-score-pct">Score</span>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ padding: "28px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="quiz-skeleton quiz-skeleton-title" />
      <div className="quiz-skeleton quiz-skeleton-line w-80" />
      <div className="quiz-skeleton quiz-skeleton-line w-60" />
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="quiz-skeleton" style={{ height: 52, borderRadius: 12 }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <div className="quiz-skeleton" style={{ height: 38, width: 80, borderRadius: 8 }} />
        <div className="quiz-skeleton" style={{ height: 38, flex: 1, borderRadius: 8, marginLeft: "auto" }} />
        <div className="quiz-skeleton" style={{ height: 38, width: 80, borderRadius: 8 }} />
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function QuizGenerator() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [darkMode, setDarkMode]                 = useState(true);
  const [profileOpen, setProfileOpen]           = useState(false);
  const [notifOpen, setNotifOpen]               = useState(false);
  const [searchFocused, setSearchFocused]       = useState(false);
  const [mounted, setMounted]                   = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((p) => !p);
    } else {
      setSidebarCollapsed((p) => !p);
    }
  };

  const closeDropdowns = () => { setProfileOpen(false); setNotifOpen(false); };

  // Settings State
  const [quizSource, setQuizSource] = useState("topic");
  const [topicInput, setTopicInput] = useState("");
  const [quizType, setQuizType] = useState("mcq");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState("10");
  const [timeLimit, setTimeLimit] = useState("20");
  const [questionStyle, setQuestionStyle] = useState("exam");
  const [options, setOptions] = useState({
    showAnswer: true,
    showExplanation: true,
    randomizeQ: false,
    randomizeOpts: false,
    negativeMark: false,
  });

  // Quiz State
  const [phase, setPhase] = useState("idle"); // idle | loading | quiz | result
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skipped, setSkipped] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [timer, setTimer] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recentList, setRecentList] = useState(RECENT_QUIZZES);

  // Timer
  useEffect(() => {
    if (phase === "quiz") {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  function toggleOption(key) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // TODO: Replace with real Generate Quiz API call
  function handleGenerate() {
    if (!topicInput.trim() && quizSource === "topic") return;
    setPhase("loading");
    setAnswers({});
    setSkipped(new Set());
    setCurrentQ(0);
    setElapsed(0);
    setRevealed(false);

    setTimeout(() => {
      setQuiz(PLACEHOLDER_QUIZ);
      setPhase("quiz");
    }, 2000);
  }

  function handleSelectOption(optIdx) {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [currentQ]: optIdx }));
  }

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    setRevealed(false);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    }
  }

  function handlePrev() {
    setRevealed(false);
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  }

  function handleSkip() {
    setSkipped((prev) => new Set([...prev, currentQ]));
    handleNext();
  }

  // TODO: Replace with real Submit Quiz API call
  function handleSubmit() {
    clearInterval(timerRef.current);
    setPhase("result");
  }

  function handleRetry() {
    setAnswers({});
    setSkipped(new Set());
    setCurrentQ(0);
    setElapsed(0);
    setRevealed(false);
    setPhase("quiz");
  }

  function handleNewQuiz() {
    setPhase("idle");
    setQuiz(null);
    setTopicInput("");
  }

  function deleteRecent(id) {
    setRecentList((prev) => prev.filter((r) => r.id !== id));
  }

  // Result calculation
  const calcResults = () => {
    if (!quiz) return {};
    const total = quiz.questions.length;
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    const wrong = Object.keys(answers).length - correct;
    const skippedCount = skipped.size + (total - Object.keys(answers).length - skipped.size);
    const pct = Math.round((correct / total) * 100);
    const avgTime = total > 0 ? Math.round(elapsed / total) : 0;
    return { total, correct, wrong, skippedCount, pct, elapsed, avgTime };
  };

  const results = calcResults();

  const recentGroups = ["Today", "Yesterday", "Last Week"];

  // ── Render ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "#fff", overflowX: "hidden" }}>
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <div className={"layout-shell " + (sidebarCollapsed ? "collapsed" : "") }>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          mobileOpen={mobileSidebarOpen}
          isMobile={isMobile}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onNavigate={(path) => { navigate(path); closeDropdowns(); }}
          currentPath={location.pathname}
        />

        <div className="main-wrapper">
          <header className="navbar">
            <button className="hamburger-btn" onClick={handleSidebarToggle} aria-label="Toggle sidebar">
              {(isMobile || sidebarCollapsed) ? <Menu style={{ width: 20, height: 20 }} /> : <X style={{ width: 20, height: 20 }} />}
            </button>
            <div className="navbar-greeting">
              <p className="navbar-greeting-sub">AI Engineering Assistant</p>
              <p className="navbar-greeting-name">Quiz Generator 🧠</p>
            </div>
            <div className={`search-wrapper${searchFocused ? " focused" : ""}`}>
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search topics, notes, quizzes..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                aria-label="Search"
              />
            </div>
            <div className="navbar-right">
              <button className="icon-btn" onClick={() => setDarkMode((p) => !p)} aria-label="Toggle dark mode">
                {darkMode ? <Moon style={{ width: 18, height: 18 }} /> : <Sun style={{ width: 18, height: 18, color: "#fbbf24" }} />}
              </button>
              <div style={{ position: "relative" }}>
                <button className="icon-btn" onClick={() => { setNotifOpen((p) => !p); setProfileOpen(false); }} aria-label="Notifications">
                  <Bell style={{ width: 18, height: 18 }} />
                  <span className="notif-dot" />
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <button className="avatar-btn" onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }} aria-label="Profile menu">
                  <div className="avatar-circle">S</div>
                  <ChevronDown className="hide-mobile" style={{ width: 14, height: 14, color: "rgba(255,255,255,0.4)" }} />
                </button>
              </div>
            </div>
          </header>

          <div className="page-body">
            <div className="quiz-page">
              {/* Page Header */}
      <div className="quiz-page-header">
        <div className="quiz-header-icon">❓</div>
        <div className="quiz-header-text">
          <h1>Quiz Generator</h1>
          <p>
            Generate AI-powered quizzes from any engineering subject, uploaded PDF, or topic.
          </p>
        </div>
        <div className="quiz-header-actions">
          {/* TODO: Wire up to sidebar/search bar/theme toggle from existing AITutor layout */}
          {quiz && phase !== "idle" && (
            <button className="quiz-action-btn" onClick={handleNewQuiz}>
              ＋ New Quiz
            </button>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="quiz-layout">
        {/* ── LEFT PANEL ── */}
        <aside>
          <div className="quiz-glass-card quiz-settings-panel">
            <div className="quiz-settings-inner">

              {/* Section 1: Source */}
              <div className="quiz-section">
                <span className="quiz-section-label">Quiz Source</span>
                <div className="quiz-source-tabs">
                  {[
                    { id: "topic", label: "📝 Enter Topic" },
                    { id: "pdf", label: "📄 Upload PDF" },
                    { id: "notes", label: "📋 Paste Notes" },
                    { id: "generated", label: "✨ Generated Notes" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      className={`quiz-source-tab${quizSource === s.id ? " active" : ""}`}
                      onClick={() => setQuizSource(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {quizSource === "topic" && (
                  <input
                    className="quiz-input"
                    placeholder="e.g. Operating Systems Scheduling"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                  />
                )}
                {quizSource === "pdf" && (
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "22px 14px",
                      border: "1.5px dashed rgba(139,92,246,0.35)",
                      borderRadius: 10,
                      cursor: "pointer",
                      gap: 6,
                      background: "rgba(124,58,237,0.04)",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>📄</span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                      Click to upload PDF
                    </span>
                    <input type="file" accept=".pdf" style={{ display: "none" }} />
                  </label>
                )}
                {(quizSource === "notes" || quizSource === "generated") && (
                  <textarea
                    className="quiz-input"
                    placeholder={
                      quizSource === "notes"
                        ? "Paste your notes here…"
                        : "Select from your Generated Notes…"
                    }
                    rows={4}
                  />
                )}
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 2: Quiz Type */}
              <div className="quiz-section">
                <span className="quiz-section-label">Quiz Type</span>
                <select
                  className="quiz-select"
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                >
                  <option value="mcq">Multiple Choice Questions (MCQ)</option>
                  <option value="truefalse">True / False</option>
                  <option value="fillblanks">Fill in the Blanks</option>
                  <option value="mixed">Mixed Quiz</option>
                </select>
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 3: Difficulty */}
              <div className="quiz-section">
                <span className="quiz-section-label">Difficulty</span>
                <div className="quiz-pill-group">
                  {[
                    { id: "easy", label: "Easy", cls: "pill-easy" },
                    { id: "medium", label: "Medium", cls: "pill-medium" },
                    { id: "hard", label: "Hard", cls: "pill-hard" },
                    { id: "mixed", label: "Mixed", cls: "pill-mixed" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      className={`quiz-pill ${d.cls}${difficulty === d.id ? " active" : ""}`}
                      onClick={() => setDifficulty(d.id)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 4: Number of Questions */}
              <div className="quiz-section">
                <span className="quiz-section-label">Number of Questions</span>
                <div className="quiz-pill-group">
                  {["5", "10", "20", "30", "50"].map((n) => (
                    <button
                      key={n}
                      className={`quiz-pill${numQuestions === n ? " active" : ""}`}
                      onClick={() => setNumQuestions(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 5: Time Limit */}
              <div className="quiz-section">
                <span className="quiz-section-label">Time Limit</span>
                <select
                  className="quiz-select"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                >
                  <option value="0">No Limit</option>
                  <option value="5">5 Minutes</option>
                  <option value="10">10 Minutes</option>
                  <option value="20">20 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 6: Question Style */}
              <div className="quiz-section">
                <span className="quiz-section-label">Question Style</span>
                <div className="quiz-pill-group">
                  {[
                    { id: "exam", label: "Exam Style" },
                    { id: "concept", label: "Concept Based" },
                    { id: "placement", label: "Placement Prep" },
                    { id: "interview", label: "Interview" },
                    { id: "university", label: "University Sem" },
                    { id: "revision", label: "Quick Revision" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      className={`quiz-pill${questionStyle === s.id ? " active" : ""}`}
                      onClick={() => setQuestionStyle(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="quiz-section-divider" />

              {/* Section 7: Options */}
              <div className="quiz-section">
                <span className="quiz-section-label">Options</span>
                <div className="quiz-checkbox-group">
                  {[
                    { key: "showAnswer", label: "Show Correct Answer After Submission" },
                    { key: "showExplanation", label: "Show Explanation" },
                    { key: "randomizeQ", label: "Randomize Questions" },
                    { key: "randomizeOpts", label: "Randomize Options" },
                    { key: "negativeMark", label: "Negative Marking", badge: "Beta" },
                  ].map(({ key, label, badge }) => (
                    <label
                      key={key}
                      className={`quiz-checkbox-item${options[key] ? " checked" : ""}`}
                      onClick={() => toggleOption(key)}
                    >
                      <input type="checkbox" readOnly checked={options[key]} />
                      <span className="quiz-checkbox-box" />
                      <span className="quiz-checkbox-label">{label}</span>
                      {badge && <span className="quiz-checkbox-badge">{badge}</span>}
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                className="quiz-generate-btn"
                onClick={handleGenerate}
                disabled={phase === "loading" || (quizSource === "topic" && !topicInput.trim())}
              >
                {phase === "loading" ? (
                  <>
                    <span className="btn-spinner" />
                    Generating…
                  </>
                ) : (
                  <>✨ Generate Quiz</>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="quiz-right-panel">

          {/* IDLE STATE */}
          {phase === "idle" && (
            <div className="quiz-glass-card">
              <div className="quiz-empty-state">
                <div className="quiz-empty-icon">🎯</div>
                <h2 className="quiz-empty-title">Ready to Test Yourself?</h2>
                <p className="quiz-empty-desc">
                  Generate a quiz from any topic or study material and put your knowledge to the test.
                </p>
                <div className="quiz-empty-features">
                  {["MCQ", "True/False", "Fill in Blanks", "Mixed Quiz"].map((t) => (
                    <span key={t} className="quiz-empty-feature-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {phase === "loading" && (
            <div className="quiz-glass-card">
              <LoadingSkeleton />
            </div>
          )}

          {/* QUIZ INTERFACE */}
          {phase === "quiz" && quiz && (() => {
            const q = quiz.questions[currentQ];
            const selected = answers[currentQ];
            const isAnswered = selected !== undefined;
            const isLast = currentQ === quiz.questions.length - 1;
            const progress = ((currentQ + 1) / quiz.questions.length) * 100;

            return (
              <div className="quiz-glass-card quiz-interface">
                {/* Header bar */}
                <div className="quiz-interface-header">
                  <div className="quiz-meta">
                    <span className="quiz-meta-subject">{quiz.subject}</span>
                    <span className="quiz-meta-title">{quiz.title}</span>
                  </div>
                  <div className="quiz-stats-chips">
                    <span
                      className={`quiz-badge badge-${difficulty}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {difficulty}
                    </span>
                    <span className="quiz-stat-chip">
                      <span className="chip-icon">⏱</span>
                      {formatTime(elapsed)}
                    </span>
                    <span className="quiz-stat-chip">
                      <span className="chip-icon">✅</span>
                      {Object.keys(answers).length}/{quiz.questions.length}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="quiz-progress-wrapper">
                  <div className="quiz-progress-top">
                    <span className="quiz-progress-label">
                      Question {currentQ + 1} of {quiz.questions.length}
                    </span>
                    <span className="quiz-progress-count">
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                  <div className="quiz-progress-bar-bg">
                    <div
                      className="quiz-progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="quiz-question-body">
                  <div className="quiz-question-number">
                    Q{currentQ + 1}
                  </div>
                  <p className="quiz-question-text">{q.text}</p>
                </div>

                {/* Options */}
                <div className="quiz-options-grid">
                  {q.options.map((opt, i) => {
                    let cls = "quiz-option-card";
                    let status = null;
                    if (revealed) {
                      if (i === q.correct) {
                        cls += " correct";
                        status = "✓";
                      } else if (i === selected && i !== q.correct) {
                        cls += " wrong";
                        status = "✗";
                      }
                    } else if (selected === i) {
                      cls += " selected";
                    }
                    return (
                      <div
                        key={i}
                        className={cls}
                        onClick={() => handleSelectOption(i)}
                      >
                        <span className="quiz-option-letter">
                          {["A", "B", "C", "D"][i]}
                        </span>
                        <span className="quiz-option-text">{opt}</span>
                        {status && (
                          <span className="quiz-option-status">{status}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {revealed && options.showExplanation && (
                  <div className="quiz-explanation">
                    <span className="quiz-explanation-icon">💡</span>
                    <p className="quiz-explanation-text">{q.explanation}</p>
                  </div>
                )}

                {/* Nav Bar */}
                <div className="quiz-nav-bar">
                  <div className="quiz-nav-left">
                    <button
                      className="quiz-nav-btn"
                      onClick={handlePrev}
                      disabled={currentQ === 0}
                    >
                      ← Prev
                    </button>
                    {isAnswered && !revealed && options.showAnswer && (
                      <button className="quiz-nav-btn" onClick={handleReveal}>
                        Check Answer
                      </button>
                    )}
                  </div>
                  <div className="quiz-nav-right">
                    {!isLast && (
                      <button
                        className="quiz-nav-btn btn-skip"
                        onClick={handleSkip}
                        disabled={isAnswered}
                      >
                        Skip
                      </button>
                    )}
                    {isLast ? (
                      <button
                        className="quiz-nav-btn btn-submit"
                        onClick={handleSubmit}
                      >
                        Submit Quiz ✓
                      </button>
                    ) : (
                      <button className="quiz-nav-btn" onClick={handleNext}>
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* RESULT PAGE */}
          {phase === "result" && quiz && (
            <div className="quiz-glass-card quiz-result">
              {/* Trophy Header */}
              <div className="quiz-result-header">
                <div className="quiz-result-trophy">
                  {results.pct >= 80 ? "🎉" : results.pct >= 60 ? "👍" : "📚"}
                </div>
                <ScoreCircle pct={results.pct} />
                <div>
                  <h2 className="quiz-result-title">
                    {results.pct >= 80
                      ? "Quiz Completed!"
                      : results.pct >= 60
                      ? "Good Effort!"
                      : "Keep Practising!"}
                  </h2>
                  <p className="quiz-result-subtitle">
                    {quiz.subject} — {quiz.title}
                  </p>
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="quiz-section-header">Analysis</div>
              <div className="quiz-analysis-grid">
                {[
                  {
                    val: `${results.correct}/${results.total}`,
                    key: "Score",
                    cls: "val-green",
                  },
                  {
                    val: `${results.correct}`,
                    key: "Correct",
                    cls: "val-green",
                  },
                  {
                    val: `${results.wrong}`,
                    key: "Wrong",
                    cls: "val-red",
                  },
                  {
                    val: `${results.skippedCount}`,
                    key: "Skipped",
                    cls: "val-yellow",
                  },
                  {
                    val: `${results.pct}%`,
                    key: "Accuracy",
                    cls: "val-purple",
                  },
                  {
                    val: formatTime(results.elapsed),
                    key: "Time Taken",
                    cls: "val-blue",
                  },
                  {
                    val: `${results.avgTime}s`,
                    key: "Avg / Question",
                    cls: "val-cyan",
                  },
                ].map(({ val, key, cls }) => (
                  <div key={key} className="quiz-analysis-card">
                    <span className={`quiz-analysis-val ${cls}`}>{val}</span>
                    <span className="quiz-analysis-key">{key}</span>
                  </div>
                ))}
              </div>

              {/* Subject Performance */}
              <div className="quiz-section-header">Subject Performance</div>
              <div className="quiz-performance-section">
                {[
                  { label: "Concept Understanding", pct: 88, bar: "perf-bar-purple" },
                  { label: "Problem Solving", pct: 74, bar: "perf-bar-blue" },
                  { label: "Memory & Recall", pct: 92, bar: "perf-bar-green" },
                  { label: "Application", pct: 61, bar: "perf-bar-orange" },
                ].map(({ label, pct, bar }) => (
                  <div key={label} className="quiz-perf-row">
                    <div className="quiz-perf-top">
                      <span className="quiz-perf-label">{label}</span>
                      <span className="quiz-perf-pct">{pct}%</span>
                    </div>
                    <div className="quiz-perf-bar-bg">
                      <div
                        className={`quiz-perf-bar-fill ${bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Feedback */}
              <div className="quiz-section-header">AI Feedback</div>
              <div className="quiz-ai-feedback">
                <div className="quiz-ai-feedback-header">
                  <span>🤖</span>
                  <span className="quiz-ai-feedback-title">Claude AI</span>
                </div>
                {/* TODO: Replace with real AI Feedback API response */}
                <p>
                  Excellent understanding of Operating Systems fundamentals — your
                  performance on scheduling and virtual memory concepts is strong.
                </p>
                <p>
                  Revise <strong style={{ color: "#8b5cf6" }}>Deadlock Detection</strong> and{" "}
                  <strong style={{ color: "#8b5cf6" }}>Page Replacement Algorithms</strong> for
                  better performance on harder questions.
                </p>
              </div>

              {/* Recommended Actions */}
              <div className="quiz-section-header">Recommended Next Steps</div>
              <div className="quiz-result-actions">
                {[
                  { label: "📝 Generate Notes", primary: false },
                  { label: "🎤 Practice Viva", primary: false },
                  { label: "🔁 Retry Quiz", primary: false, action: handleRetry },
                  { label: "🤖 Ask AI Tutor", primary: true },
                  { label: "📚 Study Weak Topics", primary: false },
                  { label: "＋ New Quiz", primary: false, action: handleNewQuiz },
                ].map(({ label, primary, action }) => (
                  <button
                    key={label}
                    className={`quiz-action-btn${primary ? " btn-primary-action" : ""}`}
                    onClick={action}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Recent Quizzes Drawer */}
              <div className="quiz-recent-drawer">
                <button
                  className="quiz-recent-toggle"
                  onClick={() => setDrawerOpen((v) => !v)}
                >
                  <span>🕐 Recent Quizzes ({recentList.length})</span>
                  <span className={`quiz-recent-chevron${drawerOpen ? " open" : ""}`}>▼</span>
                </button>
                <div className={`quiz-recent-content${drawerOpen ? " open" : ""}`}>
                  {recentGroups.map((group) => {
                    const items = recentList.filter((r) => r.group === group);
                    if (!items.length) return null;
                    return (
                      <div key={group}>
                        <div className="quiz-recent-group-label">{group}</div>
                        {items.map((item) => (
                          <div key={item.id} className="quiz-recent-item">
                            <div className="quiz-recent-info">
                              <div className="quiz-recent-name">{item.name}</div>
                              <div className="quiz-recent-meta">
                                <span>⏱ {item.time}</span>
                              </div>
                            </div>
                            <span className="quiz-recent-score">{item.score}</span>
                            <div className="quiz-recent-actions">
                              <button
                                className="quiz-recent-action-btn"
                                title="Retry"
                                onClick={handleRetry}
                              >
                                🔁
                              </button>
                              <button
                                className="quiz-recent-action-btn del"
                                title="Delete"
                                onClick={() => deleteRecent(item.id)}
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
} 