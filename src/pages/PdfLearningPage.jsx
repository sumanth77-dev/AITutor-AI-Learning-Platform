import { useMemo, useState } from "react";
import { FileText, File, MessageCircle, Sparkles, Trash2, Play, Download, MessageSquareText, BookOpen, Layers3, Search } from "lucide-react";
import AppShell from "../components/AppShell";

const RECENT_DOCUMENTS = [
  { id: 1, name: "DataStructures_HeapSort.pdf", subject: "Data Structures", pages: 12, size: "1.8 MB", date: "2 hours ago", icon: FileText },
  { id: 2, name: "DBMS_Normalization_3NF.pdf", subject: "DBMS", pages: 8, size: "950 KB", date: "Yesterday", icon: FileText },
  { id: 3, name: "OS_VirtualMemory_Paging.pdf", subject: "Operating Systems", pages: 15, size: "3.2 MB", date: "3 days ago", icon: FileText },
];

const QUICK_ACTIONS = [
  { title: "Chat with PDF", description: "Ask questions and get instant explanations from uploaded materials.", icon: MessageCircle, accent: "from-violet-500/20 to-fuchsia-500/10" },
  { title: "Generate Notes", description: "Turn PDFs into structured revision notes in seconds.", icon: BookOpen, accent: "from-sky-500/20 to-cyan-500/10" },
  { title: "Generate Quiz", description: "Create practice quizzes aligned with the uploaded content.", icon: Sparkles, accent: "from-emerald-500/20 to-teal-500/10" },
  { title: "Summarize PDF", description: "Get concise summaries with important definitions and examples.", icon: Layers3, accent: "from-amber-500/20 to-orange-500/10" },
  { title: "Generate Viva Questions", description: "Prepare for oral exams with AI-generated viva prompts.", icon: MessageSquareText, accent: "from-pink-500/20 to-rose-500/10" },
];

const STATS = [
  { label: "Documents", value: "24", detail: "Uploaded" },
  { label: "Chats", value: "86", detail: "This month" },
  { label: "Avg. Insights", value: "93%", detail: "Accuracy" },
];

export default function PdfLearningPage() {
  const [search, setSearch] = useState("");
  const filteredDocs = useMemo(() => RECENT_DOCUMENTS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.subject.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <AppShell
      title="📄 PDF Learning"
      description="Upload, organize and learn from your study materials using AI."
      icon={FileText}
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#11172a]/90 to-sky-500/10 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Upload center</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Drop your study materials here</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Upload PDFs, notes, and slides to start interactive learning with the same intelligent experience you use in the chat workspace.
                </p>
              </div>
              <button
                onClick={() => {
                  // TODO: Connect upload API for PDF file ingestion.
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(99,102,241,0.28)] transition hover:scale-[1.01]"
              >
                <Download className="h-4 w-4" />
                Upload PDF
              </button>
            </div>
            <div className="mt-6 rounded-[24px] border border-dashed border-white/20 bg-white/5 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-slate-200">
                <File className="h-8 w-8" />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">Drag and drop files or browse your device</p>
              <p className="mt-2 text-sm text-slate-400">PDF, DOCX, PPT, TXT supported</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">Fast upload</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">AI summarization</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">Smart search</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            {STATS.map((item, index) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <p className="text-sm text-slate-400">{item.label}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <span className="text-3xl font-semibold text-white">{item.value}</span>
                  <span className="text-sm text-slate-400">{item.detail}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${index === 0 ? "from-violet-500 to-fuchsia-500" : index === 1 ? "from-sky-500 to-cyan-500" : "from-emerald-500 to-teal-500"}`} style={{ width: `${index === 0 ? 78 : index === 1 ? 64 : 88}%` }} />
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Recent documents</h3>
              <p className="text-sm text-slate-400">Continue learning from your most recent materials.</p>
            </div>
            <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm text-slate-300">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search docs" className="w-32 bg-transparent outline-none sm:w-40" />
            </label>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {filteredDocs.map((doc) => (
              <article key={doc.id} className="rounded-[24px] border border-white/10 bg-[#0d1324]/70 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#11192f]/80">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-slate-200">
                      <doc.icon className="h-5 w-5 text-violet-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{doc.name}</p>
                      <p className="text-sm text-slate-400">{doc.subject}</p>
                    </div>
                  </div>
                  <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:text-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                  <span className="rounded-full bg-white/5 px-2.5 py-1">Pages {doc.pages}</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1">{doc.size}</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1">{doc.date}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/15">
                    <Play className="h-4 w-4" /> Open
                  </button>
                  <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
                    <MessageCircle className="h-4 w-4" /> Chat
                  </button>
                  <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white">
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Quick actions</h3>
                <p className="text-sm text-slate-400">Jump straight into the most useful AI workflows for your PDFs.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.title}
                  onClick={() => {
                    // TODO: Connect AI action API for the selected workflow.
                  }}
                  className="rounded-[24px] border border-white/10 bg-[#0d1324]/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#11192f]/80"
                >
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${action.accent} p-3`}>
                    <action.icon className="h-5 w-5 text-slate-100" />
                  </div>
                  <p className="mt-3 font-semibold text-white">{action.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#11172a] via-[#0f172a] to-[#111827] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Learning flow</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Turn every document into a study companion</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-400" /> Upload once and explore concepts interactively.</li>
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" /> Generate notes, quizzes and viva prompts instantly.</li>
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" /> Keep your revision organized and export-ready.</li>
            </ul>
            <button className="mt-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/15">
              Explore AI Learning
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
