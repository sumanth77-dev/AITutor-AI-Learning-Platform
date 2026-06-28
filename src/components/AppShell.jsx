import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  MessageCircle,
  FileText,
  BookOpen,
  HelpCircle,
  Mic,
  Calendar,
  BarChart2,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Brain,
  Share2,
  Send,
  MessageSquare,
  Flame,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: MessageCircle, label: "AI Tutor", path: "/chat" },
  { icon: FileText, label: "PDF Learning", path: "/upload" },
  { icon: BookOpen, label: "Notes Generator", path: "/notes" },
  { icon: HelpCircle, label: "Quiz Generator", path: "/quiz" },
  { icon: Mic, label: "Viva Preparation", path: "/viva" },
  { icon: Calendar, label: "Study Planner", path: "/planner" },
  { icon: BarChart2, label: "Progress Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

function Sidebar({ collapsed, onToggle, mobileOpen, isMobile, onCloseMobile, onNavigate, currentPath }) {
  const sidebarClass = [
    "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#080b16]/90 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 lg:bg-transparent lg:backdrop-blur-none",
    !isMobile && collapsed ? "lg:w-20" : "lg:w-72",
    isMobile && mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {isMobile && mobileOpen ? <div className="fixed inset-0 z-30 bg-black/60" onClick={onCloseMobile} /> : null}
      <aside className={sidebarClass}>
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 shadow-[0_18px_50px_rgba(99,102,241,0.35)]">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {(!collapsed || isMobile) ? <span className="text-lg font-semibold tracking-tight">AITutor</span> : null}
          </div>
          {isMobile ? (
            <button className="rounded-xl border border-white/10 p-2 text-slate-300" onClick={onCloseMobile} aria-label="Close sidebar">
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button className="rounded-xl border border-white/10 p-2 text-slate-300" onClick={onToggle} aria-label="Toggle sidebar">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-2 px-3 py-2">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = currentPath === path;
            let accentClass = "from-violet-500/20 to-fuchsia-500/10 text-slate-200";
            if (path === "/upload") accentClass = "from-sky-500/20 to-cyan-500/10 text-slate-200";
            else if (path === "/notes") accentClass = "from-emerald-500/20 to-teal-500/10 text-slate-200";
            else if (path === "/quiz") accentClass = "from-amber-500/20 to-orange-500/10 text-slate-200";
            else if (path === "/viva") accentClass = "from-pink-500/20 to-rose-500/10 text-slate-200";
            else if (path === "/planner") accentClass = "from-indigo-500/20 to-violet-500/10 text-slate-200";
            else if (path === "/analytics") accentClass = "from-purple-500/20 to-violet-500/10 text-slate-200";

            return (
              <button
                key={path}
                onClick={() => {
                  onNavigate(path);
                  if (isMobile) onCloseMobile();
                }}
                className={`group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition-all duration-300 ${
                  active ? `bg-gradient-to-r ${accentClass} shadow-[0_12px_35px_rgba(99,102,241,0.16)]` : "text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {(!collapsed || isMobile) ? <span className="text-sm font-medium">{label}</span> : null}
              </button>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 p-4">
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
            <a href="#" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
              <Send className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
              <MessageSquare className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
              <Share2 className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
              <Flame className="h-4 w-4" />
            </a>
          </div>
          <button
            onClick={() => {
              onNavigate("/");
              if (isMobile) onCloseMobile();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            {(!collapsed || isMobile) ? <span>Logout</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}

function PageHeader({ title, description, icon: Icon, darkMode, setDarkMode, searchValue, onSearchChange }) {
  return (
    <header className="rounded-[28px] border border-white/10 bg-white/10 px-4 py-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 shadow-[0_14px_40px_rgba(99,102,241,0.35)]">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2.5 text-sm text-slate-300 shadow-inner shadow-black/10">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search"
              className="w-32 bg-transparent outline-none sm:w-44"
            />
          </label>
          <button
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-2xl border border-white/10 bg-white/10 p-2.5 text-slate-200 transition hover:bg-white/15"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button className="relative rounded-2xl border border-white/10 bg-white/10 p-2.5 text-slate-200 transition hover:bg-white/15">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-fuchsia-400" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-2.5 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 font-semibold text-white">
              AS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">Asha</p>
              <p className="text-xs text-slate-400">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AppShell({ children, title, description, icon: Icon, searchValue, onSearchChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 40);
    return () => window.clearTimeout(timer);
  }, []);

  const pageShellClass = useMemo(() => (darkMode ? "bg-[#06070f] text-slate-100" : "bg-slate-50 text-slate-900"), [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${pageShellClass}`}>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),_transparent_28%)]" />
        <div className="relative flex min-h-screen">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((value) => !value)}
            mobileOpen={mobileSidebarOpen}
            isMobile={isMobile}
            onCloseMobile={() => setMobileSidebarOpen(false)}
            onNavigate={navigate}
            currentPath={location.pathname}
          />

          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            <div className={`mx-auto flex max-w-7xl flex-col gap-4 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <div className="flex items-center justify-between lg:hidden">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="rounded-2xl border border-white/10 bg-white/10 p-2.5 text-slate-200"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-300">AITutor</div>
              </div>
              <PageHeader
                title={title}
                description={description}
                icon={Icon}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                searchValue={searchValue ?? ""}
                onSearchChange={onSearchChange ?? (() => {})}
              />
              <div className="rounded-[30px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-4 lg:p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
