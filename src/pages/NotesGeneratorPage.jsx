import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen, FileText, Copy, Download, FileDown, Printer, Save, Share2,
  Bookmark, RotateCcw, Sparkles, Paperclip, Plus, ChevronRight,
  CheckCircle2, ListChecks, Brain, Home, MessageCircle, HelpCircle,
  Mic, Calendar, BarChart2, User, Settings, LogOut, Bell, Search,
  Moon, Sun, Menu, X, ChevronLeft, ChevronDown, Send, MessageSquare, Flame
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

const RECENT_NOTES = [
  { id: 1, title: "Operating Systems - Deadlocks", category: "Today", favorite: true },
  { id: 2, title: "DBMS Normalization Review", category: "Yesterday", favorite: false },
  { id: 3, title: "Computer Networks Summary", category: "Last Week", favorite: false },
];

const PLACEHOLDER_NOTES = [
  { heading: "Overview", body: "A concise overview of the topic with a strong exam-oriented structure." },
  { heading: "Important Concepts", body: "Core definitions, formulas, and the most important idea clusters." },
  { heading: "Examples", body: "Short real-world examples to make the topic easier to remember." },
  { heading: "Interview Questions", body: "Common questions you can practice for placements and interviews." },
  { heading: "Summary", body: "A polished final recap to help with quick revision before exams." },
];

export default function NotesGeneratorPage() {
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

  const [search, setSearch] = useState("");
  const [showRecentNotes, setShowRecentNotes] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(false);
  const [form, setForm] = useState({
    text: "",
    topic: "Operating Systems Deadlocks",
    prompt: "Focus on interview questions and explain in simple language",
    notesType: "Detailed Notes",
    difficulty: "Intermediate",
    style: "Simple",
    length: "Medium",
    language: "English",
    include: ["Key Definitions", "Important Formulas", "Code Examples", "Real World Examples", "Interview Questions", "Summary"],
  });

  const filteredNotes = useMemo(() => RECENT_NOTES.filter((note) => note.title.toLowerCase().includes(search.toLowerCase())), [search]);

  const toggleInclude = (item) => {
    setForm((current) => ({
      ...current,
      include: current.include.includes(item) ? current.include.filter((value) => value !== item) : [...current.include, item],
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setGeneratedNotes(true);
      setIsGenerating(false);
    }, 1400);
  };

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
              <p className="navbar-greeting-name">Notes Generator 📝</p>
            </div>
            <div className={`search-wrapper${searchFocused ? " focused" : ""}`}>
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search topics, notes, quizzes..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
      <div className="notes-layout">
        <section className="notes-panel">
          <div className="notes-header-row">
            <div>
              <h2 className="notes-panel-title">Input panel</h2>
              <p className="notes-panel-subtitle">Paste content, upload a file, or describe the topic.</p>
            </div>
            <div className="notes-badge">
              AI Studio
            </div>
          </div>

          <div className="" style={{ marginTop: "1.25rem" }}>
            <div>
              <label className="notes-label">
                <span>Paste Text</span>
                <span className="notes-label-optional">Optional</span>
              </label>
              <textarea
                value={form.text}
                onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                placeholder="Paste lecture notes, textbook content or any study material..."
                className="notes-textarea"
              />
            </div>

            <div className="notes-upload-box">
              <div className="notes-upload-header">
                <div>
                  <p className="notes-panel-title" style={{ fontSize: "0.875rem" }}>Upload File</p>
                  <p className="notes-panel-subtitle">PDF, DOCX, TXT, PPT supported</p>
                </div>
                <label className="notes-upload-btn">
                  <Paperclip className="h-4 w-4" />
                  Choose file
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div className="notes-file-status">
                <FileText className="h-4 w-4 text-slate-400" />
                <span>No file selected</span>
              </div>
            </div>

            <div className="notes-grid-2">
              <label className="notes-input-wrapper">
                <span>Topic</span>
                <input value={form.topic} onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))} className="notes-input" placeholder="Operating Systems Deadlocks" />
              </label>
              <label className="notes-input-wrapper">
                <span>Optional Prompt</span>
                <input value={form.prompt} onChange={(event) => setForm((current) => ({ ...current, prompt: event.target.value }))} className="notes-input" placeholder="Focus on interview questions" />
              </label>
            </div>

            <div className="notes-grid-3">
              <label className="notes-input-wrapper">
                <span>Notes Type</span>
                <select value={form.notesType} onChange={(event) => setForm((current) => ({ ...current, notesType: event.target.value }))} className="notes-input">
                  {['Quick Revision Notes','Detailed Notes','Class Notes','Exam Notes','Placement Notes','Interview Notes','Cheat Sheet','Flashcards'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="notes-input-wrapper">
                <span>Difficulty</span>
                <select value={form.difficulty} onChange={(event) => setForm((current) => ({ ...current, difficulty: event.target.value }))} className="notes-input">
                  {['Beginner','Intermediate','Advanced'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="notes-input-wrapper">
                <span>Explanation Style</span>
                <select value={form.style} onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))} className="notes-input">
                  {['Simple','Technical','Exam Oriented','Real World Examples'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="notes-input-wrapper">
                <span>Output Length</span>
                <select value={form.length} onChange={(event) => setForm((current) => ({ ...current, length: event.target.value }))} className="notes-input">
                  {['Short','Medium','Detailed'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="notes-input-wrapper">
                <span>Language</span>
                <select value={form.language} onChange={(event) => setForm((current) => ({ ...current, language: event.target.value }))} className="notes-input">
                  {['English','Telugu','Hindi'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
            </div>

            <div>
              <p className="notes-label" style={{ marginBottom: "0.75rem" }}>Include</p>
              <div className="notes-checkbox-grid">
                {['Key Definitions','Important Formulas','Code Examples','Real World Examples','Interview Questions','Viva Questions','MCQs','Summary'].map((item) => (
                  <label key={item} className="notes-checkbox-label">
                    <input type="checkbox" checked={form.include.includes(item)} onChange={() => toggleInclude(item)} className="notes-checkbox" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                // TODO: Connect generate notes API.
                handleGenerate();
              }}
              className="notes-generate-btn"
            >
              {isGenerating ? <><Sparkles className="h-4 w-4 animate-pulse" /> Generating AI Notes...</> : <><Sparkles className="h-4 w-4" /> ✨ Generate AI Notes</>}
            </button>
          </div>
        </section>

        <section className="notes-panel notes-panel-dark">
          <div className="notes-header-row">
            <div>
              <h2 className="notes-panel-title">Generated notes</h2>
              <p className="notes-panel-subtitle">Professional, structured, and export-ready.</p>
            </div>
            <div className="notes-actions-row">
              <button onClick={() => { /* TODO: Connect download API. */ }} className="notes-action-btn">Copy</button>
              <button onClick={() => { /* TODO: Connect download API. */ }} className="notes-action-btn">Download PDF</button>
              <button onClick={() => { /* TODO: Connect download API. */ }} className="notes-action-btn">Download DOCX</button>
            </div>
          </div>

          <div className="notes-actions-row" style={{ marginTop: "1rem" }}>
            {['Copy','Download PDF','Download DOCX','Print','Save Notes','Share','Bookmark','Regenerate'].map((item) => (
              <button key={item} className="notes-action-btn notes-action-btn-dark">
                {item === 'Copy' ? <Copy className="h-4 w-4" /> : item === 'Download PDF' ? <Download className="h-4 w-4" /> : item === 'Download DOCX' ? <FileDown className="h-4 w-4" /> : item === 'Print' ? <Printer className="h-4 w-4" /> : item === 'Save Notes' ? <Save className="h-4 w-4" /> : item === 'Share' ? <Share2 className="h-4 w-4" /> : item === 'Bookmark' ? <Bookmark className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                {item}
              </button>
            ))}
          </div>

          <div className="notes-content-area">
            {!generatedNotes ? (
              <div className="notes-empty-state">
                <div className="notes-empty-icon">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="notes-empty-title">Generate Smart AI Notes</h3>
                <p className="notes-empty-desc">Paste text, upload a file or enter a topic to instantly generate structured notes.</p>
              </div>
            ) : (
              <div className="" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="notes-result-header">
                  <div>
                    <p className="notes-result-type">{form.notesType}</p>
                    <h3 className="notes-result-title">{form.topic}</h3>
                  </div>
                  <button onClick={() => setShowRecentNotes((value) => !value)} className="notes-recent-btn">
                    <ListChecks className="h-4 w-4" /> Recent Notes
                    <ChevronRight className={`h-4 w-4 transition ${showRecentNotes ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {showRecentNotes ? (
                  <div className="notes-recent-dropdown">
                    <div className="notes-recent-header">
                      <p className="notes-panel-title" style={{ fontSize: "0.875rem" }}>Recent notes</p>
                      <button className="notes-panel-subtitle">Search notes</button>
                    </div>
                    <div className="notes-recent-list">
                      {filteredNotes.map((note) => (
                        <div key={note.id} className="notes-recent-item">
                          <div>
                            <p className="notes-recent-item-title">{note.title}</p>
                            <p className="notes-label-optional">{note.category}</p>
                          </div>
                          <div className="notes-recent-item-actions">
                            <button className="notes-recent-item-btn">{note.favorite ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>
                            <button className="notes-recent-item-btn">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {PLACEHOLDER_NOTES.map((section) => (
                    <div key={section.heading} className="notes-section">
                      <h4 >{section.heading}</h4>
                      <p>{section.body}</p>
                    </div>
                  ))}
                  <div className="notes-section">
                    <h4 >Flow Diagram Placeholder</h4>
                    <div className="notes-section-placeholder">System flow diagram will appear here</div>
                  </div>
                  <div className="notes-section">
                    <h4 >Code Example Placeholder</h4>
                    <pre className="notes-code-block"><code>{'function solveProblem() {\n  return "AI generated notes";\n}'}</code></pre>
                  </div>
                  <div className="notes-section">
                    <h4 >Revision Tips</h4>
                    <ul className="notes-list">
                      <li>Focus on core definitions first.</li>
                      <li>Practice with interview-style questions.</li>
                      <li>Revise the examples before each exam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}
