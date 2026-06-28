import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, MessageCircle, FileText, BookOpen, HelpCircle,
  Mic, Calendar, BarChart2, User, Settings, LogOut,
  Bell, Search, Moon, Sun, Menu, X, ChevronRight, ChevronLeft,
  Flame, Clock, Brain, Zap, Target, TrendingUp,
  CheckCircle, Star, ArrowRight, Play, Award, BookMarked,
  Lightbulb, AlertCircle, ChevronDown, Activity,
  Send, MessageSquare, Share2, Plus, Trash2, Edit3, Pin,
  Paperclip, Smile, Copy, Bookmark, ThumbsUp, ThumbsDown,
  RefreshCw, File, MoreVertical, Sparkles, History, Image,
  Monitor, FolderOpen, Camera
} from "lucide-react";

// ─── Constants & Mock Data ──────────────────────────────────────────────────

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

const SUGGESTED_PROMPTS = [
  { text: "Explain a Concept" },
  { text: "Generate Notes" },
  { text: "Generate Quiz" },
  { text: "Solve Coding Problem" }
];

const INITIAL_MESSAGES = [];

const INITIAL_HISTORY = [
  { id: "h1", title: "AVL Trees & Balance Factors", time: "Today", pinned: true },
  { id: "h2", title: "DBMS 3NF vs BCNF Norms", time: "Today", pinned: false },
  { id: "h3", title: "OS Semaphores & Mutexes", time: "Yesterday", pinned: false },
  { id: "h4", title: "Java OOP Polymorphism Example", time: "Yesterday", pinned: false },
  { id: "h5", title: "TCP IP Socket Programming", time: "Last 7 Days", pinned: false },
  { id: "h6", title: "Machine Learning Gradient Descent", time: "Last 7 Days", pinned: false }
];

const AI_RESPONSES = [
  "Excellent question! Let's break this down step-by-step. In engineering terms, this involves defining the core architecture, analyzing the data flows, and implementing modular components. Here is an overview of the topic:\n\n1. **Core Concept:** The foundational logic behind this system.\n2. **Implementation Details:** Writing clean, scalable algorithms.\n3. **Practical Examples:** Real-world use cases in industrial software.\n\nLet me know if you would like me to generate custom **revision notes** or a **quiz** based on this!",
  "Great choice! Let's explore this subject in detail. Here are the core specifications you need to remember for exams:\n\n* **Formula/Theorem:** Represents the absolute mathematical bounds.\n* **Design Trade-offs:** Speed vs. memory efficiency.\n* **Standard Protocols:** RFC guidelines and industry standards.\n\nWould you like me to create a mock **viva preparation quiz** for this topic?",
  "Let's write a quick code example to illustrate this concept:\n\n```python\n# AI Demonstration Code\ndef solve_problem(data):\n    # TODO: Connect backend processor\n    result = [x * 2 for x in data]\n    return result\n\nprint(solve_problem([1, 2, 3]))\n```\n\nWhat other features of this framework would you like to discuss? I can also summarize this into a cheatsheet."
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Left sidebar component */
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
            
            // Premium active capsule indicators
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

// ─── Main Chat Component ─────────────────────────────────────────────────────

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  
  const [darkMode, setDarkMode] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Chat-specific state
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState(INITIAL_HISTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  // History Drawer state (hidden by default)
  const [historyOpen, setHistoryOpen] = useState(false);

  // Plus menu popover state
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Resize Listener
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page Entry Animation Trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((p) => !p);
    } else {
      setSidebarCollapsed((p) => !p);
    }
  };

  const closeDropdowns = () => {
    setProfileOpen(false);
    setNotifOpen(false);
  };

  // Click handler for Suggested Prompts
  const handleSuggestedPromptClick = (text) => {
    setInputValue(text);
  };

  // Submit User Message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() && !selectedFile) return;

    const userMessageText = selectedFile 
      ? `[Attached: ${selectedFile.name}] ${inputValue}`
      : inputValue;

    const userMsg = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setSelectedFile(null);
    setIsTyping(true);

    // Mock AI response response logic
    setTimeout(() => {
      setIsTyping(false);
      const randomIndex = Math.floor(Math.random() * AI_RESPONSES.length);
      const aiMsg = {
        id: `m-ai-${Date.now()}`,
        sender: "ai",
        text: AI_RESPONSES[randomIndex],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  // Create clean new chat room (No confirmation popup)
  const handleNewChat = () => {
    const newChatId = `h-${Date.now()}`;
    const newHistoryItem = {
      id: newChatId,
      title: "New Engineering Query",
      time: "Today",
      pinned: false
    };
    setChatHistory((prev) => [newHistoryItem, ...prev]);
    setMessages([]);
  };

  // History operations
  const togglePinHistory = (id) => {
    setChatHistory((prev) => 
      prev.map((item) => item.id === id ? { ...item, pinned: !item.pinned } : item)
    );
  };

  const deleteHistory = (id) => {
    setChatHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const renameHistory = (id) => {
    const newTitle = prompt("Enter new title for this chat:");
    if (newTitle && newTitle.trim()) {
      setChatHistory((prev) => 
        prev.map((item) => item.id === id ? { ...item, title: newTitle.trim() } : item)
      );
    }
  };

  // Search filter
  const filteredHistory = chatHistory.filter((item) => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // File Selector Mock
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Plus Dropdown Options
  const PLUS_MENU_OPTIONS = [
    { label: "Upload PDF", icon: FileText, action: () => { alert("Upload PDF mock selected."); setPlusMenuOpen(false); } },
    { label: "Upload Image", icon: Image, action: () => { alert("Upload Image mock selected."); setPlusMenuOpen(false); } },
    { label: "Upload Screenshot", icon: Monitor, action: () => { alert("Upload Screenshot mock selected."); setPlusMenuOpen(false); } },
    { label: "Upload Document", icon: FolderOpen, action: () => { alert("Upload Document mock selected."); setPlusMenuOpen(false); } },
    { label: "Open Camera", icon: Camera, action: () => { alert("Open Camera mock selected."); setPlusMenuOpen(false); } },
    { label: "Voice Recording", icon: Mic, action: () => { alert("Voice Recording mock selected."); setPlusMenuOpen(false); } },
    { label: "Paste Clipboard", icon: Copy, action: () => { alert("Paste Clipboard mock selected."); setPlusMenuOpen(false); } },
    { label: "Generate Notes from File", icon: Brain, action: () => { alert("Generate Notes mock selected."); setPlusMenuOpen(false); } },
    { label: "Chat with PDF", icon: Sparkles, action: () => { alert("Chat with PDF mock selected."); setPlusMenuOpen(false); } }
  ];

  return (
    <div style={{ height: "100vh", maxHeight: "100vh", background: "var(--bg-base)", color: "#fff", overflow: "hidden" }}>
      {/* Ambient background orbs */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* Main Layout Grid */}
      <div className={"layout-shell layout-shell-chat " + (sidebarCollapsed ? "collapsed" : "")}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          mobileOpen={mobileSidebarOpen}
          isMobile={isMobile}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onNavigate={(path) => { navigate(path); closeDropdowns(); }}
          currentPath="/chat"
        />

        {/* Main Content Area */}
        <div className="main-wrapper main-wrapper-chat">
          {/* Header/Navbar */}
          <header className="navbar flex-shrink-0">
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

            <div className="navbar-greeting">
              <p className="navbar-greeting-sub">AI Engineering Assistant</p>
              <p className="navbar-greeting-name">AI Tutor Room 🤖</p>
            </div>

            <div className="navbar-right">
              {/* Dark mode toggle */}
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
                  <Brain style={{ width: 18, height: 18 }} />
                  <span className="notif-dot" />
                </button>
              </div>

              {/* User profile dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  className="avatar-btn"
                  onClick={() => { setProfileOpen((p) => !p); setNotifOpen(false); }}
                  aria-label="Profile menu"
                >
                  <div className="avatar-circle">S</div>
                  <ChevronDown className="hide-mobile" style={{ width: 14, height: 14, color: "rgba(255,255,255,0.4)" }} />
                </button>
              </div>
            </div>
          </header>

          {/* Page Inner Container (strictly constrained to leftover height) */}
          <div className="page-body chat-page-body">
            
            {/* Tablet/Mobile History Drawer overlay background click-outside */}
            {(isMobile || window.innerWidth < 1024) && historyOpen && (
              <div className="history-drawer-overlay" onClick={() => setHistoryOpen(false)} />
            )}

            {/* COLLAPSIBLE CHAT HISTORY DRAWER */}
            <div className={`chat-history-drawer ${historyOpen ? "open" : "closed"}`}>
              <div className="drawer-inner">
                {/* New Chat Button */}
                <button className="chat-h-btn btn-new w-full flex items-center justify-center gap-2 mb-4" onClick={() => { handleNewChat(); if (isMobile) setHistoryOpen(false); }}>
                  <Plus style={{ width: 14, height: 14 }} /> New Chat
                </button>

                {/* History Search */}
                <div className="history-search-box mb-4">
                  <Search style={{ width: 14, height: 14, color: "rgba(255,255,255,0.3)" }} />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* History list */}
                <div className="history-list scrollbar-none">
                  {/* Pinned Section */}
                  {filteredHistory.some(item => item.pinned) && (
                    <div className="history-group">
                      <p className="history-group-title">Pinned Chats</p>
                      {filteredHistory.filter(item => item.pinned).map((item) => (
                        <div key={item.id} className="history-item">
                          <MessageSquare className="history-icon" />
                          <span className="history-title" onClick={() => { handleSuggestedPromptClick(`Review: ${item.title}`); if (isMobile) setHistoryOpen(false); }}>{item.title}</span>
                          <div className="history-actions">
                            <button onClick={() => togglePinHistory(item.id)} title="Unpin"><Pin style={{ width: 12, height: 12, fill: '#a78bfa', color: '#a78bfa' }} /></button>
                            <button onClick={() => renameHistory(item.id)} title="Rename"><Edit3 style={{ width: 12, height: 12 }} /></button>
                            <button onClick={() => deleteHistory(item.id)} title="Delete"><Trash2 style={{ width: 12, height: 12 }} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Today Section */}
                  <div className="history-group">
                    <p className="history-group-title">Today</p>
                    {filteredHistory.filter(item => !item.pinned && item.time === "Today").map((item) => (
                      <div key={item.id} className="history-item">
                        <MessageSquare className="history-icon" />
                        <span className="history-title" onClick={() => { handleSuggestedPromptClick(`Tell me about: ${item.title}`); if (isMobile) setHistoryOpen(false); }}>{item.title}</span>
                        <div className="history-actions">
                          <button onClick={() => togglePinHistory(item.id)} title="Pin"><Pin style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => renameHistory(item.id)} title="Rename"><Edit3 style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => deleteHistory(item.id)} title="Delete"><Trash2 style={{ width: 12, height: 12 }} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Yesterday Section */}
                  <div className="history-group">
                    <p className="history-group-title">Yesterday</p>
                    {filteredHistory.filter(item => !item.pinned && item.time === "Yesterday").map((item) => (
                      <div key={item.id} className="history-item">
                        <MessageSquare className="history-icon" />
                        <span className="history-title" onClick={() => { handleSuggestedPromptClick(`Resume: ${item.title}`); if (isMobile) setHistoryOpen(false); }}>{item.title}</span>
                        <div className="history-actions">
                          <button onClick={() => togglePinHistory(item.id)} title="Pin"><Pin style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => renameHistory(item.id)} title="Rename"><Edit3 style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => deleteHistory(item.id)} title="Delete"><Trash2 style={{ width: 12, height: 12 }} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Last 7 Days Section */}
                  <div className="history-group">
                    <p className="history-group-title">Last 7 Days</p>
                    {filteredHistory.filter(item => !item.pinned && item.time === "Last 7 Days").map((item) => (
                      <div key={item.id} className="history-item">
                        <MessageSquare className="history-icon" />
                        <span className="history-title" onClick={() => { handleSuggestedPromptClick(`Resume: ${item.title}`); if (isMobile) setHistoryOpen(false); }}>{item.title}</span>
                        <div className="history-actions">
                          <button onClick={() => togglePinHistory(item.id)} title="Pin"><Pin style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => renameHistory(item.id)} title="Rename"><Edit3 style={{ width: 12, height: 12 }} /></button>
                          <button onClick={() => deleteHistory(item.id)} title="Delete"><Trash2 style={{ width: 12, height: 12 }} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CHAT AREA (Scrolls independently) */}
            <main className={`chat-main-feed ${historyOpen ? "history-shifted" : ""}`}>
              
              {/* Chat Header Bar */}
              <div className="chat-top-bar">
                
                {/* Left: History Toggle */}
                <button 
                  className={`chat-top-history-btn ${historyOpen ? "active" : ""}`}
                  onClick={() => setHistoryOpen(!historyOpen)}
                  title="Toggle Chat History"
                >
                  <History style={{ width: 18, height: 18 }} />
                </button>

                {/* Center: Title & Subtitle */}
                <div className="chat-top-center">
                  <h2 className="chat-top-title">🤖 AI Tutor Chat</h2>
                  <p className="chat-top-subtitle">Personal AI Engineering Mentor</p>
                </div>

                {/* Right: New Chat Button */}
                <button 
                  className="chat-top-newchat-btn"
                  onClick={handleNewChat}
                  title="Start new conversation"
                >
                  <Plus style={{ width: 14, height: 14 }} /> New Chat
                </button>

              </div>

              {/* Message Feed Area (only scrolling part) */}
              <div className="messages-feed scrollbar-none">
                {messages.length === 0 ? (
                  <div className="welcome-screen-refined">
                    <h1 className="chat-welcome-title">
                      Welcome back, Sumanth.
                    </h1>
                    <p className="chat-welcome-subtitle">
                      Ready to learn something new today?
                    </p>

                    {/* Compact grid suggestion buttons (2x2 Grid) */}
                    <div className="chat-suggestions-wrap">
                      <div className="suggested-grid-2x2">
                        {SUGGESTED_PROMPTS.map((prompt) => (
                          <div 
                            key={prompt.text} 
                            className="suggested-card-compact cursor-pointer"
                            onClick={() => handleSuggestedPromptClick(prompt.text)}
                          >
                            <span className="suggested-text">{prompt.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="messages-list">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`message-bubble-wrapper ${msg.sender}`}>
                        <div className="message-avatar">
                          {msg.sender === "ai" ? "🤖" : "S"}
                        </div>
                        <div className="message-content-container">
                          <div className="message-bubble-info">
                            <span className="msg-sender-name">{msg.sender === "ai" ? "AI Tutor" : "Sumanth"}</span>
                            <span className="msg-time">{msg.timestamp}</span>
                          </div>
                          
                          <div className="message-text scrollbar-none">
                            {msg.text.split("\n").map((line, idx) => {
                              if (line.startsWith("### ")) {
                                return <h3 key={idx} className="msg-h3">{line.replace("### ", "")}</h3>;
                              }
                              if (line.startsWith("#### ")) {
                                return <h4 key={idx} className="msg-h4">{line.replace("#### ", "")}</h4>;
                              }
                              if (line.startsWith("* ")) {
                                return <li key={idx} className="msg-li">{line.replace("* ", "")}</li>;
                              }
                              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                                return <li key={idx} className="msg-li-num">{line}</li>;
                              }
                              if (line.startsWith("|")) {
                                return (
                                  <div key={idx} className="msg-table-row">
                                    <span className="msg-table-cell">{line}</span>
                                  </div>
                                );
                              }
                              if (line.startsWith("```")) {
                                return null;
                              }
                              return <p key={idx} className="msg-p">{line}</p>;
                            })}

                            {/* Render code snippets mocks */}
                            {msg.text.includes("class Node {") && (
                              <pre className="msg-code-block">
                                <code>{`class Node {
    int key, height;
    Node left, right;

    Node(int d) {
        key = d;
        height = 1;
    }
}`}</code>
                              </pre>
                            )}

                            {msg.text.includes("def solve_problem") && (
                              <pre className="msg-code-block">
                                <code>{`# AI Demonstration Code
def solve_problem(data):
    # TODO: Connect backend processor
    result = [x * 2 for x in data]
    return result

print(solve_problem([1, 2, 3]))`}</code>
                              </pre>
                            )}
                          </div>

                          {/* AI Action toolbar */}
                          {msg.sender === "ai" && (
                            <div className="ai-msg-actions">
                              <button onClick={() => alert("Copied to clipboard!")} title="Copy Content"><Copy style={{ width: 12, height: 12 }} /> Copy</button>
                              <div className="spacer-msg-action"></div>
                              <button onClick={() => alert("Thank you for feedback!")} title="Thumbs Up"><ThumbsUp style={{ width: 12, height: 12 }} /></button>
                              <button onClick={() => alert("Thank you for feedback!")} title="Thumbs Down"><ThumbsDown style={{ width: 12, height: 12 }} /></button>
                              <button onClick={handleSendMessage} title="Regenerate Response"><RefreshCw style={{ width: 12, height: 12 }} /> Regenerate</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Typing Animation loader */}
                {isTyping && (
                  <div className="message-bubble-wrapper ai typing">
                    <div className="message-avatar">🤖</div>
                    <div className="message-content-container">
                      <div className="message-bubble-info">
                        <span className="msg-sender-name">AI Tutor</span>
                        <span className="msg-time">typing...</span>
                      </div>
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sticky Chat Input Form at Bottom */}
              <form onSubmit={handleSendMessage} className="chat-input-form flex-shrink-0">
                <div className="chat-input-wrapper">
                  
                  {/* File preview alert pill */}
                  {selectedFile && (
                    <div className="file-attach-status">
                      <File style={{ width: 12, height: 12, color: "#60a5fa" }} />
                      <span className="file-name">{selectedFile.name}</span>
                      <button onClick={() => setSelectedFile(null)} className="file-remove-btn"><X style={{ width: 12, height: 12 }} /></button>
                    </div>
                  )}

                  <div className="chat-input-row relative">
                    
                    {/* Plus Menu Backdrop click-outside */}
                    {plusMenuOpen && (
                      <div className="plus-menu-backdrop" onClick={() => setPlusMenuOpen(false)} />
                    )}

                    {/* Plus Button Container */}
                    <div className="plus-menu-container">
                      <button 
                        type="button" 
                        className={`chat-input-icon-btn plus-btn ${plusMenuOpen ? "active" : ""}`} 
                        onClick={() => setPlusMenuOpen(!plusMenuOpen)}
                        title="Upload & Tools"
                      >
                        <Plus style={{ width: 18, height: 18 }} />
                      </button>

                      {/* Premium Plus Options Dropdown Popup */}
                      {plusMenuOpen && (
                        <div className="plus-menu-popup">
                          {PLUS_MENU_OPTIONS.map((opt) => {
                            const IconEl = opt.icon;
                            return (
                              <button 
                                key={opt.label} 
                                type="button" 
                                className="plus-menu-item" 
                                onClick={opt.action}
                              >
                                <IconEl className="plus-menu-icon" />
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Main Input Text Field */}
                    <input
                      type="text"
                      className="chat-text-input"
                      placeholder="Ask anything about engineering..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    {/* Micro buttons */}
                    <button type="button" className="chat-input-icon-btn hide-mobile" title="Voice Input" onClick={() => alert("Voice transcription activated (frontend only).")}>
                      <Mic style={{ width: 18, height: 18 }} />
                    </button>
                    <button type="button" className="chat-input-icon-btn hide-mobile" title="Emojis" onClick={() => alert("Emoji drawer opened (frontend only).")}>
                      <Smile style={{ width: 18, height: 18 }} />
                    </button>

                    {/* Purple Gradient Send Button */}
                    <button type="submit" className="chat-send-btn" disabled={!inputValue.trim() && !selectedFile}>
                      <Send style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </form>

            </main>

          </div>
        </div>
      </div>
    </div>
  );
}
