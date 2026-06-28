import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, MessageCircle, FileText, BookOpen, HelpCircle,
  Mic, Calendar, BarChart2, User, Settings, LogOut,
  Bell, Search, Moon, Sun, Menu, X, ChevronRight, ChevronLeft,
  Flame, Clock, Upload, Brain, Zap, Target, TrendingUp,
  CheckCircle, Star, ArrowRight, Play, Award, BookMarked,
  Lightbulb, AlertCircle, ChevronDown, Activity,
  Send, MessageSquare, Share2, Plus, Trash2, Edit3, Pin,
  Paperclip, Smile, Copy, Bookmark, ThumbsUp, ThumbsDown,
  RefreshCw, File, MoreVertical, Sparkles, History, Image,
  Monitor, FolderOpen, ZoomIn, ZoomOut, RotateCw, Download,
  Maximize2, Minimize2, BookmarkCheck, Database
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

const INITIAL_RECENT_PDFS = [
  { id: "pdf-1", name: "DataStructures_HeapSort.pdf", pages: 12, size: "1.8 MB", date: "2 hours ago", topic: "Algorithms" },
  { id: "pdf-2", name: "DBMS_Normalization_3NF.pdf", pages: 8, size: "950 KB", date: "Yesterday", topic: "Databases" },
  { id: "pdf-3", name: "OS_VirtualMemory_Paging.pdf", pages: 15, size: "3.2 MB", date: "3 days ago", topic: "Operating Systems" }
];

const MOCK_PDF_PAGES = {
  "pdf-1": [
    { page: 1, title: "1. Introduction to Heap Sort", content: "Heap Sort is a comparison-based sorting algorithm based on a Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.\n\nKey Characteristics:\n- Worst-case time complexity: O(N log N)\n- Best-case time complexity: O(N log N)\n- Space complexity: O(1) auxiliary space (in-place)\n- Unstable sorting algorithm." },
    { page: 2, title: "2. Binary Heap Structure", content: "A Binary Heap is a Complete Binary Tree where items are stored in a special order such that the value in a parent node is greater (or smaller) than the values in its two children nodes. The former is called a Max-Heap and the latter a Min-Heap.\n\nArray representation of Heap:\n- Parent node index: (i - 1) / 2\n- Left child index: 2*i + 1\n- Right child index: 2*i + 2" },
    { page: 3, title: "3. Heapify Procedure", content: "Heapify is the process of creating a heap data structure from a binary tree. It is used to create a Max-Heap or Min-Heap. The procedure compares parent with children, swaps if necessary, and recursively heapifies the affected sub-tree.\n\nAlgorithm Code:\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int l = 2*i + 1;\n    int r = 2*i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}" }
  ],
  "pdf-2": [
    { page: 1, title: "1. Database Normalization Overview", content: "Normalization is a database design technique that organizes tables in a manner that reduces redundancy and dependency of data. It divides larger tables into smaller tables and links them using relationships.\n\nMain Objectives:\n- Eliminate redundant data\n- Ensure data dependencies make sense (only store related data in a table)" },
    { page: 2, title: "2. Third Normal Form (3NF)", content: "A relation is in Third Normal Form (3NF) if it is in 2NF and no non-prime attribute is transitively dependent on the primary key.\n\nFormally:\nIf X -> Y is a functional dependency, then either:\n- X is a super key, or\n- Y is a prime attribute (part of candidate key).\nTransitive dependency is resolved by splitting tables." }
  ],
  "pdf-3": [
    { page: 1, title: "1. Virtual Memory Concepts", content: "Virtual Memory is a storage allocation scheme in which secondary memory can be addressed as though it were part of main memory. The addresses a program may use to reference memory are distinguished from the addresses the memory system uses to identify physical storage locations." },
    { page: 2, title: "2. Paging and Page Tables", content: "Paging is a memory management scheme by which a computer stores and retrieves data from secondary storage for use in main memory. In this scheme, the operating system retrieves data from secondary storage in same-size blocks called pages.\n\nPage Table translates logical addresses to physical frame addresses." }
  ]
};

const SUGGESTED_QUESTIONS = [
  "Explain the current page",
  "Summarize this document",
  "Generate key revision notes",
  "Give me mock viva questions"
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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
              {collapsed ? <ChevronRight style={{ width: 16, height: 16 }} /> : <ChevronLeft style={{ width: 16, height: 16 }} />}
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
                {!isMobile && collapsed && <span className="nav-tooltip">{label}</span>}
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

// ─── Main Redesigned PDF Workspace Component ─────────────────────────────────

export default function UploadPage() {
  const navigate = useNavigate();

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [darkMode, setDarkMode] = useState(true);

  // PDF specific states
  const [recentPdfs, setRecentPdfs] = useState(INITIAL_RECENT_PDFS);
  const [activePdf, setActivePdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfSearchText, setPdfSearchText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Resizer / split ratio state (0.3 to 0.8, default 0.55 = 55% left pane)
  const [splitRatio, setSplitRatio] = useState(0.55);
  const [isResizing, setIsResizing] = useState(false);
  const workspaceRef = useRef(null);

  // Chat states
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // History and Citation states (collapsible slide-outs)
  const [historyOpen, setHistoryOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    { id: "b1", pdfName: "DataStructures_HeapSort.pdf", page: 1, text: "O(N log N) Heap Sort worst-case bounds." },
    { id: "b2", pdfName: "DBMS_Normalization_3NF.pdf", page: 2, text: "3NF transitive functional dependency rules." }
  ]);

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

  // Scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Resizer drag handlers ──
  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleResizeMove = (e) => {
      const container = workspaceRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const isMobileLayout = window.innerWidth <= 1023;

      let ratio;
      if (isMobileLayout) {
        // Vertical split: top/bottom
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        ratio = (clientY - rect.top) / rect.height;
      } else {
        // Horizontal split: left/right
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        ratio = (clientX - rect.left) / rect.width;
      }
      setSplitRatio(Math.min(0.8, Math.max(0.2, ratio)));
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
    window.addEventListener("touchmove", handleResizeMove, { passive: false });
    window.addEventListener("touchend", handleResizeEnd);

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
      window.removeEventListener("touchmove", handleResizeMove);
      window.removeEventListener("touchend", handleResizeEnd);
    };
  }, [isResizing]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((p) => !p);
    } else {
      setSidebarCollapsed((p) => !p);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx") || file.name.endsWith(".pptx") || file.name.endsWith(".txt"))) {
      processUploadedPdf(file);
    } else {
      alert("Please upload valid PDF, DOCX, PPTX or TXT documents.");
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedPdf(file);
    }
  };

  // Process Mock PDF Upload
  const processUploadedPdf = (file) => {
    setIsUploading(true);
    
    /* TODO: Connect Spring Boot API endpoints for uploading and parsing physical PDF/DOCX/PPTX/TXT binaries.
       Endpoint: POST /api/pdf/upload (multipart/form-data) returning parsed document payload and text tokens. */

    setTimeout(() => {
      setIsUploading(false);
      const newPdf = {
        id: `pdf-${Date.now()}`,
        name: file.name,
        pages: 3,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: "Just now",
        topic: file.name.includes("_") ? file.name.split("_")[0] : "General Study"
      };
      
      MOCK_PDF_PAGES[newPdf.id] = [
        { page: 1, title: `1. Overview of ${file.name.replace(".pdf", "")}`, content: `This is mock parsed content for page 1 of ${file.name}.\n\nThe document contains structural notes, definitions, and technical parameters to help you learn.\n\nSelect a suggested prompt or type a custom question to discuss this content with AI Tutor.` },
        { page: 2, title: "2. Key Architectural Definitions", content: "This section contains mathematical formulas, implementation protocols, and key algorithms.\n\n- Parameter A: High efficiency\n- Parameter B: Zero downtime bounds\n- Parameter C: Multi-threaded processors." },
        { page: 3, title: "3. Exam Revision Summary", content: "Review notes:\n- Focus on complexity bounds.\n- Practice coding templates.\n- Review structural design tradeoffs." }
      ];

      setRecentPdfs((prev) => [newPdf, ...prev]);
      handleSelectPdf(newPdf);
    }, 1500);
  };

  // Select PDF to view and chat
  const handleSelectPdf = (pdf) => {
    setActivePdf(pdf);
    setCurrentPage(1);
    
    setMessages([
      {
        id: `m-ai-welcome`,
        sender: "ai",
        text: `Hi! I have successfully loaded **${pdf.name}**. I can help you read, search, and analyze this document. What would you like to learn first?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const deletePdf = (id, e) => {
    e.stopPropagation();
    
    /* TODO: Connect Spring Boot endpoint to delete document vectors.
       Endpoint: DELETE /api/pdf/{id} */

    if (activePdf?.id === id) {
      setActivePdf(null);
    }
    setRecentPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
  };

  const handleSuggestedPromptClick = (text) => {
    setInputValue(text);
  };

  // Submit chat query
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue;
    setInputValue("");
    setIsTyping(true);

    /* TODO: Connect Spring Boot LLM controller for retrieval-augmented generation (RAG) queries.
       Endpoint: POST /api/pdf/chat (payload contains pdfId, pageNum, and userQuery) */

    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponseText = `Based on page ${currentPage} of **${activePdf.name}**, here is the detailed breakdown: \n\n1. **Core explanation:** The concept describes how data structures optimize system calls.\n2. **Revision tip:** You should write short routines to practice this before exams.\n\nLet me know if you would like me to generate mock viva questions or notes!`;
      
      if (query.toLowerCase().includes("viva")) {
        aiResponseText = `Here are 3 mock viva preparation questions based on this section:\n\n1. **Question 1:** What is the primary complexity bounds of this algorithm?\n2. **Question 2:** Explain the storage tradeoffs of virtual structures.\n3. **Question 3:** How does normalization prevent insertion anomalies?`;
      } else if (query.toLowerCase().includes("summarize")) {
        aiResponseText = `**Document Summary (Pages 1-${activePdf.pages}):**\n\nThis paper covers detailed design specifications, algorithmic complexities, and practical implementations. It is ideal for exam preparation and engineering walkthroughs.`;
      }

      const aiMsg = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  const saveBookmark = (text) => {
    const newBookmark = {
      id: `b-${Date.now()}`,
      pdfName: activePdf.name,
      page: currentPage,
      text: text.substring(0, 70) + "..."
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
    alert("Saved note added to bookmarks!");
  };

  const getPdfPageData = () => {
    if (!activePdf) return { title: "", content: "" };
    const pages = MOCK_PDF_PAGES[activePdf.id] || MOCK_PDF_PAGES["pdf-1"];
    return pages[currentPage - 1] || pages[0] || { title: "Untitled Page", content: "No content available." };
  };

  const pdfData = getPdfPageData();

  // Statistics summaries values
  const stats = [
    { label: "Uploaded PDFs", value: recentPdfs.length, icon: FileText, color: "text-blue-400" },
    { label: "Study Notes", value: bookmarks.length, icon: BookOpen, color: "text-emerald-400" },
    { label: "Recent Chats", value: activePdf ? 1 : 0, icon: MessageSquare, color: "text-violet-400" },
    { label: "Storage Used", value: "5.9 MB", icon: Database, color: "text-pink-400" }
  ];

  return (
    <div style={{ height: "100vh", maxHeight: "100vh", background: "var(--bg-base)", color: "#fff", overflow: "hidden" }}>
      {/* Background Orbs */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <div className={"layout-shell layout-shell-chat " + (sidebarCollapsed ? "collapsed" : "")}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          mobileOpen={mobileSidebarOpen}
          isMobile={isMobile}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onNavigate={(path) => navigate(path)}
          currentPath="/upload"
        />

        <div className="main-wrapper main-wrapper-chat">
          {/* Header */}
          <header className="navbar flex-shrink-0">
            <button className="hamburger-btn" onClick={handleSidebarToggle}>
              {(isMobile || sidebarCollapsed) ? <Menu style={{ width: 20, height: 20 }} /> : <X style={{ width: 20, height: 20 }} />}
            </button>
            <div className="navbar-greeting">
              <p className="navbar-greeting-sub">AI Engineering Assistant</p>
              <p className="navbar-greeting-name">PDF Workspace 📚</p>
            </div>
            <div className="navbar-right">
              <div style={{ position: "relative" }}>
                <button className="avatar-btn" onClick={() => {}}>
                  <div className="avatar-circle">S</div>
                </button>
              </div>
            </div>
          </header>

          <div className="page-body chat-page-body">
            
            {/* ── CASE 1: NO ACTIVE PDF (SHOW REDESIGNED PREMIUM SAAS DASHBOARD) ── */}
            {!activePdf ? (
              <div className="pdf-dashboard scrollbar-none fade-in">
                
                {/* Page Header */}
                <div className="pdf-dash-header">
                  <div className="pdf-dash-header-text">
                    <h1 className="pdf-dash-title">
                      <span>📄</span> PDF Learning
                    </h1>
                    <p className="pdf-dash-subtitle">
                      Upload, organize and learn from your study materials.
                    </p>
                  </div>
                </div>

                {/* Compact Upload Area with Drag & Drop */}
                <div 
                  className={`pdf-upload-compact ${isDragging ? "dragging" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div className="pdf-upload-loading">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p className="pdf-upload-loading-text">Parsing and indexing document...</p>
                    </div>
                  ) : (
                    <div className="pdf-upload-compact-inner">
                      <div className="pdf-upload-compact-icon">
                        <Upload style={{ width: 20, height: 20, color: "#a78bfa" }} />
                      </div>
                      <div className="pdf-upload-compact-info">
                        <p className="pdf-upload-compact-title">
                          Drop files here or <label className="pdf-upload-browse-label">browse<input type="file" accept="application/pdf,.docx,.pptx,.txt" style={{ display: "none" }} onChange={handleFileInput} /></label>
                        </p>
                        <p className="pdf-upload-compact-hint">PDF, DOCX, PPT, TXT — Max 32 MB</p>
                      </div>
                      <label className="pdf-upload-btn">
                        <Plus style={{ width: 14, height: 14 }} /> Upload
                        <input type="file" accept="application/pdf,.docx,.pptx,.txt" style={{ display: "none" }} onChange={handleFileInput} />
                      </label>
                    </div>
                  )}
                </div>

                {/* Stats Row */}
                <div className="pdf-stats-row">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="pdf-stat-card glass-card">
                        <div className="pdf-stat-info">
                          <span className="pdf-stat-label">{stat.label}</span>
                          <span className="pdf-stat-value">{stat.value}</span>
                        </div>
                        <div className="pdf-stat-icon-wrap">
                          <Icon style={{ width: 18, height: 18 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Main Content Grid */}
                <div className="pdf-dash-grid">
                  
                  {/* Quick Actions */}
                  <div className="pdf-quick-actions">
                    <span className="pdf-section-label">Quick Tools</span>
                    <div className="pdf-tools-grid">
                      <button className="pdf-tool-btn pdf-tool-blue">
                        <span className="pdf-tool-emoji">💬</span> Chat with PDF
                      </button>
                      <button className="pdf-tool-btn pdf-tool-green">
                        <span className="pdf-tool-emoji">🧠</span> Generate Notes
                      </button>
                      <button className="pdf-tool-btn pdf-tool-orange">
                        <span className="pdf-tool-emoji">📝</span> Generate Quiz
                      </button>
                      <button className="pdf-tool-btn pdf-tool-violet">
                        <span className="pdf-tool-emoji">📚</span> Summarize PDF
                      </button>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="pdf-documents-section">
                    <div className="pdf-section-header">
                      <span className="pdf-section-label">Documents</span>
                      <span className="pdf-section-count">{recentPdfs.length} total</span>
                    </div>

                    {recentPdfs.length === 0 ? (
                      <div className="pdf-empty-state glass-card">
                        <span className="pdf-empty-icon">📄</span>
                        <h4 className="pdf-empty-title">No PDFs Uploaded Yet</h4>
                        <p className="pdf-empty-desc">Upload your first PDF to start learning with AI.</p>
                        <label className="pdf-upload-btn">
                          Upload Document
                          <input type="file" style={{ display: "none" }} onChange={handleFileInput} />
                        </label>
                      </div>
                    ) : (
                      <div className="pdf-doc-grid">
                        {recentPdfs.map((pdf) => (
                          <div key={pdf.id} className="pdf-doc-card glass-card">
                            <div className="pdf-doc-card-top">
                              <div className="pdf-doc-icon">
                                <FileText style={{ width: 16, height: 16 }} />
                              </div>
                              <div className="pdf-doc-meta">
                                <h4 className="pdf-doc-name" title={pdf.name}>{pdf.name}</h4>
                                <p className="pdf-doc-detail">{pdf.topic} • {pdf.pages} pgs</p>
                              </div>
                            </div>
                            
                            <div className="pdf-doc-card-bottom">
                              <span className="pdf-doc-size">{pdf.size}</span>
                              <div className="pdf-doc-actions">
                                <button onClick={() => handleSelectPdf(pdf)} className="pdf-doc-open-btn">Open</button>
                                <button onClick={(e) => deletePdf(pdf.id, e)} className="pdf-doc-delete-btn" title="Delete Document">
                                  <Trash2 style={{ width: 12, height: 12 }} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ) : (
              
              /* ── CASE 2: PDF LOADED (SHOW WORKSPACE SPLIT LAYOUT) ── */
              <div className={`pdf-workspace ${isResizing ? "resizing" : ""}`} ref={workspaceRef}>
                
                {/* ── LEFT PANE: PDF Viewer ── */}
                <section className="pdf-viewer-pane" style={{ flexBasis: `${splitRatio * 100}%`, flexGrow: 0, flexShrink: 0 }}>
                  
                  {/* Toolbar */}
                  <div className="pdf-toolbar">
                    <div className="pdf-toolbar-left">
                      <button 
                        className="icon-btn-micro" 
                        onClick={() => setActivePdf(null)}
                        title="Close PDF Workspace"
                      >
                        <ChevronLeft style={{ width: 16, height: 16 }} />
                      </button>
                      <span className="pdf-toolbar-filename" title={activePdf.name}>
                        {activePdf.name}
                      </span>
                    </div>

                    <div className="pdf-toolbar-controls">
                      <button className="icon-btn-micro" onClick={() => setZoomLevel(z => Math.max(50, z - 10))} title="Zoom Out"><ZoomOut style={{ width: 14, height: 14 }} /></button>
                      <span className="pdf-toolbar-zoom">{zoomLevel}%</span>
                      <button className="icon-btn-micro" onClick={() => setZoomLevel(z => Math.min(200, z + 10))} title="Zoom In"><ZoomIn style={{ width: 14, height: 14 }} /></button>
                      
                      <div className="divider-v"></div>

                      <button className="icon-btn-micro" disabled={currentPage <= 1} onClick={() => setCurrentPage(c => c - 1)}>
                        <ChevronLeft style={{ width: 14, height: 14 }} />
                      </button>
                      <span className="pdf-toolbar-page">Page {currentPage}/{activePdf.pages}</span>
                      <button className="icon-btn-micro" disabled={currentPage >= activePdf.pages} onClick={() => setCurrentPage(c => c + 1)}>
                        <ChevronRight style={{ width: 14, height: 14 }} />
                      </button>

                      <div className="divider-v"></div>

                      <button className="icon-btn-micro" onClick={() => setRotation(r => (r + 90) % 360)} title="Rotate"><RotateCw style={{ width: 14, height: 14 }} /></button>
                      <a href="#" className="icon-btn-micro" onClick={() => alert("Downloading PDF binary (mock).")} title="Download PDF"><Download style={{ width: 14, height: 14 }} /></a>
                      <button className="icon-btn-micro" onClick={() => setIsFullscreen(!isFullscreen)} title="Fullscreen">
                        {isFullscreen ? <Minimize2 style={{ width: 14, height: 14 }} /> : <Maximize2 style={{ width: 14, height: 14 }} />}
                      </button>
                    </div>
                  </div>

                  {/* PDF Page Content */}
                  <div className="pdf-page-display scrollbar-none">
                    <div 
                      className="pdf-page-canvas"
                      style={{ 
                        transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                        transition: "transform 0.15s ease",
                      }}
                    >
                      <div className="pdf-canvas-header">
                        <span className="pdf-canvas-topic">{activePdf.topic} Lecture notes</span>
                        <span className="pdf-canvas-pagenum">Page {currentPage}</span>
                      </div>
                      
                      <h2 className="pdf-canvas-title">{pdfData.title}</h2>
                      
                      <div className="pdf-canvas-body">{pdfData.content}</div>

                      <div className="pdf-canvas-footer">
                        © AITutor AI Learning Platform • Reference citation page {currentPage}
                      </div>
                    </div>
                  </div>

                </section>

                {/* ── RESIZER HANDLE ── */}
                <div
                  className="pdf-resizer"
                  onMouseDown={handleResizeStart}
                  onTouchStart={handleResizeStart}
                >
                  <div className="pdf-resizer-handle" />
                </div>

                {/* ── RIGHT PANE: AI Chat ── */}
                <section className="pdf-chat-pane" style={{ flexBasis: `${(1 - splitRatio) * 100}%`, flexGrow: 0, flexShrink: 0, maxWidth: 'none' }}>
                  
                  {/* Chat Header */}
                  <div className="pdf-chat-header">
                    <div className="pdf-chat-header-left">
                      <div className="pdf-chat-header-info">
                        <h4 className="pdf-chat-header-title">AI Tutor Chat</h4>
                        <p className="pdf-chat-header-sub">Document workspace</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="messages-feed scrollbar-none">
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
                          <div className="message-text">
                            {msg.text.split("\n").map((line, idx) => (
                              <p key={idx} style={{ marginBottom: "4px" }}>{line}</p>
                            ))}
                          </div>

                          {msg.sender === "ai" && (
                            <div className="pdf-ai-actions">
                              <button onClick={() => alert("Copied to clipboard!")} className="pdf-ai-action-btn"><Copy style={{ width: 10, height: 10 }} /> Copy</button>
                              <button onClick={() => saveBookmark(msg.text)} className="pdf-ai-action-btn"><BookmarkCheck style={{ width: 10, height: 10 }} /> Save Note</button>
                              <button onClick={() => { navigate("/quiz"); }} className="pdf-ai-action-btn"><HelpCircle style={{ width: 10, height: 10 }} /> Quiz</button>
                              <button onClick={() => { navigate("/viva"); }} className="pdf-ai-action-btn"><Mic style={{ width: 10, height: 10 }} /> Viva</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="message-bubble-wrapper ai typing">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content-container">
                          <div className="message-bubble-info"><span className="msg-sender-name">AI Tutor</span></div>
                          <div className="typing-dots"><span></span><span></span><span></span></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggested Questions */}
                  {messages.length <= 1 && (
                    <div className="pdf-suggestions">
                      <p className="pdf-suggestions-label">Suggested questions</p>
                      <div className="pdf-suggestions-grid">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button 
                            key={q} 
                            onClick={() => handleSuggestedPromptClick(q)}
                            className="suggested-card-compact"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} className="chat-input-form pdf-chat-input">
                    <div className="chat-input-wrapper">
                      <div className="chat-input-row">
                        <input
                          type="text"
                          className="chat-text-input"
                          placeholder="Ask anything about this document..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="chat-send-btn" disabled={!inputValue.trim()}>
                          <Send style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  </form>

                </section>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
