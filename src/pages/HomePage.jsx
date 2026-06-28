import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, MessageCircle, FileText, BookOpen, HelpCircle,
  Mic, Calendar, BarChart2, User, Settings, LogOut,
  Bell, Search, Moon, Sun, Menu, X, ChevronRight,
  Flame, Clock, Upload, Brain, Zap, Target, TrendingUp,
  CheckCircle, Star, ArrowRight, Play, Award, BookMarked,
  Lightbulb, AlertCircle, ChevronDown, Activity,
  Send, MessageSquare, Share2, ChevronLeft,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

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

const QUICK_ACTIONS = [
  {
    icon: MessageCircle,
    label: "AI Tutor",
    desc: "Ask engineering doubts instantly.",
    btn: "Start Chat",
    path: "/chat",
    gradClass: "grad-violet",
    iconBgClass: "bg-violet-icon",
    iconColorClass: "text-violet-icon",
  },
  {
    icon: FileText,
    label: "PDF Learning Center",
    desc: "Upload and chat with your PDFs.",
    btn: "Upload PDF",
    path: "/upload",
    gradClass: "grad-blue",
    iconBgClass: "bg-blue-icon",
    iconColorClass: "text-blue-icon",
  },
  {
    icon: BookOpen,
    label: "Notes Generator",
    desc: "Generate structured AI notes.",
    btn: "Generate Notes",
    path: "/notes",
    gradClass: "grad-emerald",
    iconBgClass: "bg-emerald-icon",
    iconColorClass: "text-emerald-icon",
  },
  {
    icon: HelpCircle,
    label: "Quiz Generator",
    desc: "Test yourself with AI quizzes.",
    btn: "Create Quiz",
    path: "/quiz",
    gradClass: "grad-orange",
    iconBgClass: "bg-orange-icon",
    iconColorClass: "text-orange-icon",
  },
  {
    icon: Mic,
    label: "Viva Preparation",
    desc: "Practice viva questions with AI.",
    btn: "Start Practice",
    path: "/viva",
    gradClass: "grad-pink",
    iconBgClass: "bg-pink-icon",
    iconColorClass: "text-pink-icon",
  },
  {
    icon: Calendar,
    label: "Study Planner",
    desc: "Create AI-powered study plans.",
    btn: "Open Planner",
    path: "/planner",
    gradClass: "grad-indigo",
    iconBgClass: "bg-indigo-icon",
    iconColorClass: "text-violet-icon",
  },
];

const SUBJECTS = [
  { name: "Data Structures",       progress: 72, gradClass: "grad-violet" },
  { name: "Operating Systems",     progress: 58, gradClass: "grad-blue" },
  { name: "DBMS",                  progress: 85, gradClass: "grad-emerald" },
  { name: "Computer Networks",     progress: 45, gradClass: "grad-orange" },
  { name: "Java",                  progress: 90, gradClass: "grad-pink" },
  { name: "Python",                progress: 67, gradClass: "grad-indigo" },
  { name: "Artificial Intelligence", progress: 38, gradClass: "grad-purple" },
];

const ACTIVITY_ITEMS = [
  { icon: Upload,        label: "Uploaded DSA.pdf",            time: "2h ago", colorClass: "text-blue-icon" },
  { icon: CheckCircle,   label: "Completed DBMS Quiz",         time: "5h ago", colorClass: "text-emerald-icon" },
  { icon: BookOpen,      label: "Generated AI Notes for OS",   time: "1d ago", colorClass: "text-violet-icon" },
  { icon: MessageCircle, label: "Asked AI about AVL Trees",    time: "1d ago", colorClass: "text-pink-icon" },
  { icon: Mic,           label: "Completed Viva on CN",        time: "2d ago", colorClass: "text-orange-icon" },
];

const WEEKLY_DATA = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 2 },
];

const STATS = [
  { icon: MessageCircle, label: "Questions Asked",   value: 248, suffix: "",  gradTextClass: "grad-text-violet",  iconBgClass: "bg-violet-icon",  iconColorClass: "text-violet-icon" },
  { icon: Upload,        label: "PDFs Uploaded",     value: 14,  suffix: "",  gradTextClass: "grad-text-blue",    iconBgClass: "bg-blue-icon",    iconColorClass: "text-blue-icon" },
  { icon: CheckCircle,   label: "Quizzes Completed", value: 36,  suffix: "",  gradTextClass: "grad-text-emerald", iconBgClass: "bg-emerald-icon", iconColorClass: "text-emerald-icon" },
  { icon: Clock,         label: "Study Hours",       value: 128, suffix: "h", gradTextClass: "grad-text-orange",  iconBgClass: "bg-orange-icon",  iconColorClass: "text-orange-icon" },
  { icon: Flame,         label: "Study Streak",      value: 12,  suffix: "d", gradTextClass: "grad-text-pink",    iconBgClass: "bg-pink-icon",    iconColorClass: "text-pink-icon" },
];

const AI_RECS = [
  {
    icon: Star,
    title: "Today's Recommendation",
    desc: "Study Graph Algorithms — high chance in upcoming exams.",
    iconBg: "bg-amber-icon",
    iconColor: "text-amber-icon",
  },
  {
    icon: AlertCircle,
    title: "Weak Topics",
    desc: "Deadlocks in OS and Normalization in DBMS need revision.",
    iconBg: "bg-pink-icon",
    iconColor: "text-pink-icon",
  },
  {
    icon: HelpCircle,
    title: "Suggested Quiz",
    desc: "Computer Networks — TCP/IP Layer Quiz (15 questions)",
    iconBg: "bg-blue-icon",
    iconColor: "text-blue-icon",
  },
  {
    icon: Calendar,
    title: "Upcoming Revision",
    desc: "DBMS unit 3 revision scheduled for tomorrow 9:00 AM.",
    iconBg: "bg-emerald-icon",
    iconColor: "text-emerald-icon",
  },
];

const EXAMS = [
  { sub: "DBMS",             date: "Jul 3",  days: 7,  classes: "text-emerald-icon bg-emerald-icon" },
  { sub: "Operating Systems", date: "Jul 8", days: 12, classes: "text-blue-icon bg-blue-icon" },
  { sub: "Computer Networks", date: "Jul 14", days: 18, classes: "text-orange-icon bg-orange-icon" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated count-up stat card */
function StatCard({ icon: Icon, label, value, suffix, gradTextClass, iconBgClass, iconColorClass, index }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 40;
    const duration = 1200;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        current = Math.min(current + increment, value);
        setCount(Math.floor(current));
        if (current >= value) clearInterval(id);
      }, duration / steps);
      // cleanup inner interval if component unmounts mid-count
      return () => clearInterval(id);
    }, index * 120);
    return () => clearTimeout(timer);
  }, [value, index]);

  return (
    <div className="stat-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={`stat-icon-wrap ${iconBgClass}`}>
        <Icon className={iconColorClass} style={{ width: 20, height: 20 }} />
      </div>
      <div className="stat-value-row">
        <span className={`stat-value ${gradTextClass}`}>{count}</span>
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

/** Bar chart for weekly study hours */
function WeeklyChart() {
  const max = Math.max(...WEEKLY_DATA.map((d) => d.hours));
  return (
    <div className="weekly-chart">
      {WEEKLY_DATA.map((d, i) => (
        <div key={d.day} className="bar-col">
          <span className="bar-label-top">{d.hours}h</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ height: `${(d.hours / max) * 100}%`, animationDelay: `${i * 0.08}s` }}
            />
          </div>
          <span className="bar-day">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

/** Single subject progress row */
function SubjectProgressRow({ name, progress, gradClass }) {
  return (
    <div className="subject-progress-item">
      <div className="subject-progress-meta">
        <span className="subject-name">{name}</span>
        <span className="subject-pct">{progress}%</span>
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${gradClass}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

/** Left sidebar */
function Sidebar({ collapsed, onToggle, mobileOpen, isMobile, onCloseMobile, onNavigate, currentPath }) {
  const sidebarClass = [
    "sidebar",
    !isMobile && collapsed ? "collapsed" : "",
    isMobile && mobileOpen ? "mobile-open" : "",
    isMobile && !mobileOpen ? "mobile-closed" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="sidebar-overlay" onClick={onCloseMobile} />
      )}

      <aside className={sidebarClass}>
        {/* Logo + close / collapse toggle */}
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

        {/* Nav items */}
        <nav className="sidebar-nav scrollbar-none">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = currentPath === path;
            
            // Premium custom active color capsule classes
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

        {/* Footer controls & socials */}
        <div className="sidebar-footer">

          {/* Social icons */}
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

          {/* Logout */}
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
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

  // Track screen size for responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger page-in animation
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

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "#fff", overflowX: "hidden" }}>

      {/* Ambient background orbs */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* Layout shell: sidebar + main content (flex container) */}
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

        {/* Main wrapper */}
        <div className="main-wrapper">
        {/* ── Navbar ── */}
        <header className="navbar">
          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
          >
            {(isMobile || sidebarCollapsed)
              ? <Menu style={{ width: 20, height: 20 }} />
              : <X   style={{ width: 20, height: 20 }} />
            }
          </button>

          {/* Greeting */}
          <div className="navbar-greeting">
            <p className="navbar-greeting-sub">Welcome back,</p>
            <p className="navbar-greeting-name">Sumanth 👋</p>
          </div>

          {/* Search */}
          <div className={`search-wrapper${searchFocused ? " focused" : ""}`}>
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search topics, notes, quizzes..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search"
            />
          </div>

          {/* Right icons */}
          <div className="navbar-right">
            {/* Dark mode */}
            <button
              className="icon-btn"
              onClick={() => setDarkMode((p) => !p)}
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <Moon  style={{ width: 18, height: 18 }} />
                : <Sun   style={{ width: 18, height: 18, color: "#fbbf24" }} />
              }
            </button>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                className="icon-btn"
                onClick={() => { setNotifOpen((p) => !p); setProfileOpen(false); }}
                aria-label="Notifications"
              >
                <Bell style={{ width: 18, height: 18 }} />
                <span className="notif-dot" />
              </button>

              {notifOpen && (
                <div className="dropdown-menu notif-dropdown">
                  <p className="notif-title">Notifications</p>
                  {[
                    { text: "Your DBMS Quiz result is ready",   time: "2m ago" },
                    { text: "New AI feature: Voice Mode",        time: "1h ago" },
                    { text: "Study reminder: CN revision due",   time: "3h ago" },
                  ].map((n) => (
                    <div key={n.text} className="notif-item">
                      <div className="notif-dot-small" />
                      <div>
                        <p className="notif-text">{n.text}</p>
                        <p className="notif-time">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar + profile dropdown */}
            <div style={{ position: "relative" }}>
              <button
                className="avatar-btn"
                onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }}
                aria-label="Profile menu"
              >
                <div className="avatar-circle">S</div>
                <ChevronDown className="hide-mobile" style={{ width: 14, height: 14, color: "rgba(255,255,255,0.4)" }} />
              </button>

              {profileOpen && (
                <div className="dropdown-menu profile-dropdown">
                  {[
                    { label: "View Profile", path: "/profile" },
                    { label: "Settings",     path: "/settings" },
                    { label: "Logout",       path: "/" },
                  ].map((item) => (
                    <button
                      key={item.path}
                      className="profile-dropdown-item"
                      onClick={() => { navigate(item.path); closeDropdowns(); }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page body ── */}
        <div className="page-body">

          {/* Main content */}
          <main className={`main-content scrollbar-none${mounted ? " mounted" : ""}`}>

            {/* Stats */}
            <section>
              <div className="stats-grid">
                {STATS.map((s, i) => (
                  <StatCard key={s.label} {...s} index={i} />
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Quick Actions</h2>
                <button className="section-link" onClick={() => navigate("/chat")}>
                  All features <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div className="quick-actions-grid">
                {QUICK_ACTIONS.map(({ icon: Icon, label, desc, btn, path, gradClass, iconBgClass, iconColorClass }) => (
                  <div
                    key={path}
                    className="action-card"
                    onClick={() => navigate(path)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(path)}
                  >
                    <div className="action-card-top">
                      <div className={`action-icon-wrap ${iconBgClass}`}>
                        <Icon className={iconColorClass} style={{ width: 22, height: 22 }} />
                      </div>
                      <ArrowRight className="action-arrow" />
                    </div>
                    <div>
                      <h3 className="action-title">{label}</h3>
                      <p className="action-desc">{desc}</p>
                    </div>
                    <button
                      className={`action-btn ${gradClass}`}
                      onClick={(e) => { e.stopPropagation(); navigate(path); }}
                    >
                      {btn}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Analytics */}
            <section className="analytics-grid">
              {/* Weekly chart */}
              <div className="glass-card">
                <div className="section-header" style={{ marginBottom: 0 }}>
                  <div>
                    <p className="chart-card-title">Weekly Study Hours</p>
                    <p className="chart-card-sub">This week • 26 hours total</p>
                  </div>
                  <div className="chart-badge">
                    <TrendingUp style={{ width: 14, height: 14 }} />
                    +18%
                  </div>
                </div>
                <WeeklyChart />
              </div>

              {/* Subject progress */}
              <div className="glass-card">
                <div className="section-header" style={{ marginBottom: 0 }}>
                  <div>
                    <p className="chart-card-title">Subject Progress</p>
                    <p className="chart-card-sub">Overall completion</p>
                  </div>
                  <Activity className="text-violet-icon" style={{ width: 16, height: 16 }} />
                </div>
                <div className="subject-progress-row">
                  {SUBJECTS.slice(0, 5).map((s) => (
                    <SubjectProgressRow key={s.name} {...s} />
                  ))}
                </div>
              </div>
            </section>

            {/* Continue Learning */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Continue Learning</h2>
                <button className="section-link">
                  View all <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div className="subjects-grid">
                {SUBJECTS.map(({ name, progress, gradClass }) => (
                  <div
                    key={name}
                    className="subject-card"
                    onClick={() => navigate("/chat")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate("/chat")}
                  >
                    <div className={`subject-icon ${gradClass}`}>
                      <BookMarked style={{ width: 16, height: 16, color: "#fff" }} />
                    </div>
                    <div>
                      <p className="subject-card-name">{name}</p>
                      <p className="subject-card-pct">{progress}%</p>
                    </div>
                    <div className="subject-mini-track">
                      <div className={`subject-mini-fill ${gradClass}`} style={{ width: `${progress}%` }} />
                    </div>
                    <button className="subject-continue-btn">
                      <Play style={{ width: 12, height: 12 }} /> Continue
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity + Recommendations */}
            <section className="bottom-grid">
              {/* Recent Activity */}
              <div className="glass-card">
                <div className="section-header">
                  <h3 className="chart-card-title">Recent Activity</h3>
                  <span className="section-link">View all</span>
                </div>
                <div className="activity-list">
                  {ACTIVITY_ITEMS.map(({ icon: Icon, label, time, colorClass }, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon-wrap">
                        <div className="activity-icon-box">
                          <Icon className={colorClass} style={{ width: 16, height: 16 }} />
                        </div>
                        {i < ACTIVITY_ITEMS.length - 1 && (
                          <div className="activity-connector" />
                        )}
                      </div>
                      <div>
                        <p className="activity-text">{label}</p>
                        <p className="activity-time">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="glass-card">
                <div className="section-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="rec-icon-box bg-violet-icon" style={{ width: 24, height: 24 }}>
                      <Zap className="text-violet-icon" style={{ width: 14, height: 14 }} />
                    </div>
                    <h3 className="chart-card-title">AI Recommendations</h3>
                  </div>
                </div>
                <div className="rec-list">
                  {AI_RECS.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
                    <div key={title} className="rec-item">
                      <div className={`rec-icon-box ${iconBg}`}>
                        <Icon className={iconColor} style={{ width: 16, height: 16 }} />
                      </div>
                      <div>
                        <p className="rec-title">{title}</p>
                        <p className="rec-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </main>

          {/* ── Right Panel ── */}
          <aside className="right-panel scrollbar-none">

            {/* Today's Goal */}
            <div className="panel-card">
              <div className="panel-card-header">
                <Target className="text-violet-icon" style={{ width: 16, height: 16 }} />
                <h4 className="panel-card-title">Today's Goal</h4>
              </div>
              <div className="goal-list">
                {[
                  { label: "Study 3 hours",        done: true },
                  { label: "Complete CN Quiz",      done: true },
                  { label: "Read OS Chapter 5",     done: false },
                  { label: "Generate AI Notes",     done: false },
                ].map(({ label, done }) => (
                  <div key={label} className="goal-item">
                    <div className={`goal-checkbox${done ? " done" : ""}`}>
                      {done && <CheckCircle style={{ width: 10, height: 10, color: "#fff" }} />}
                    </div>
                    <span className={`goal-label${done ? " done" : ""}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="goal-progress-wrap">
                <div className="goal-progress-meta">
                  <span>Progress</span><span>50%</span>
                </div>
                <div className="goal-track">
                  <div className="goal-fill" />
                </div>
              </div>
            </div>

            {/* Upcoming Exams */}
            <div className="panel-card">
              <div className="panel-card-header">
                <Calendar className="text-blue-icon" style={{ width: 16, height: 16 }} />
                <h4 className="panel-card-title">Upcoming Exams</h4>
              </div>
              <div className="exam-list">
                {EXAMS.map(({ sub, date, days, classes }) => (
                  <div key={sub} className="exam-item">
                    <div>
                      <p className="exam-name">{sub}</p>
                      <p className="exam-date">{date}</p>
                    </div>
                    <span className={`exam-badge ${classes}`}>{days}d</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Tips */}
            <div className="panel-card">
              <div className="panel-card-header">
                <Lightbulb className="text-amber-icon" style={{ width: 16, height: 16 }} />
                <h4 className="panel-card-title">Learning Tips</h4>
              </div>
              <div className="tips-list">
                {[
                  "Use spaced repetition for long-term retention.",
                  "Teach concepts out loud to reinforce memory.",
                  "Take 5-min breaks every 25 mins (Pomodoro).",
                ].map((tip, i) => (
                  <div key={i} className="tip-item">
                    <span className="tip-dot">•</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* New AI Features */}
            <div className="features-card">
              <div className="panel-card-header">
                <Zap className="text-violet-icon" style={{ width: 16, height: 16 }} />
                <h4 className="panel-card-title">New Features</h4>
                <span className="feature-new-badge">New</span>
              </div>
              <div className="features-list">
                {[
                  "🎤 Voice-based Viva AI",
                  "📊 Detailed Analytics Dashboard",
                  "📅 Smart Study Planner v2",
                ].map((f) => (
                  <p key={f} className="feature-item">{f}</p>
                ))}
              </div>
            </div>

            {/* Daily Motivation */}
            <div className="panel-card">
              <div className="panel-card-header">
                <Award className="text-pink-icon" style={{ width: 16, height: 16 }} />
                <h4 className="panel-card-title">Daily Motivation</h4>
              </div>
              <p className="motivation-quote">
                "Success is the sum of small efforts repeated day in and day out."
              </p>
              <p className="motivation-author">— Robert Collier</p>
            </div>

          </aside>
        </div>
      </div>
      </div>

      {/* Floating AI button */}
      <button
        className="floating-ai-btn"
        onClick={() => navigate("/chat")}
        aria-label="Open AI Assistant"
      >
        <Brain style={{ width: 18, height: 18 }} />
        <span className="floating-ai-text">AI Assistant</span>
      </button>

      {/* Click-outside overlay to close dropdowns */}
      {(profileOpen || notifOpen) && (
        <div className="dropdown-overlay" onClick={closeDropdowns} />
      )}
    </div>
  );
}