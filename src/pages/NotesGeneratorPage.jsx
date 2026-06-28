import { useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  Copy,
  Download,
  FileDown,
  Printer,
  Save,
  Share2,
  Bookmark,
  RotateCcw,
  Sparkles,
  Paperclip,
  Plus,
  ChevronRight,
  CheckCircle2,
  ListChecks,
  Brain,
} from "lucide-react";
import AppShell from "../components/AppShell";

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
    <AppShell
      title="📝 Notes Generator"
      description="Generate clean, structured AI notes from text, PDFs, lectures and study materials."
      icon={BookOpen}
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Input panel</h2>
              <p className="text-sm text-slate-400">Paste content, upload a file, or describe the topic.</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-slate-300">
              AI Studio
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-300">
                <span>Paste Text</span>
                <span className="text-xs text-slate-500">Optional</span>
              </label>
              <textarea
                value={form.text}
                onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                placeholder="Paste lecture notes, textbook content or any study material..."
                className="min-h-[150px] w-full rounded-[22px] border border-white/10 bg-[#0f1426]/70 p-4 text-sm text-slate-200 outline-none ring-0"
              />
            </div>

            <div className="rounded-[22px] border border-dashed border-white/20 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Upload File</p>
                  <p className="text-sm text-slate-400">PDF, DOCX, TXT, PPT supported</p>
                </div>
                <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/15">
                  <Paperclip className="h-4 w-4" />
                  Choose file
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm text-slate-300">
                <FileText className="h-4 w-4 text-slate-400" />
                <span>No file selected</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Topic</span>
                <input value={form.topic} onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none" placeholder="Operating Systems Deadlocks" />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Optional Prompt</span>
                <input value={form.prompt} onChange={(event) => setForm((current) => ({ ...current, prompt: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none" placeholder="Focus on interview questions" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Notes Type</span>
                <select value={form.notesType} onChange={(event) => setForm((current) => ({ ...current, notesType: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none">
                  {['Quick Revision Notes','Detailed Notes','Class Notes','Exam Notes','Placement Notes','Interview Notes','Cheat Sheet','Flashcards'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Difficulty</span>
                <select value={form.difficulty} onChange={(event) => setForm((current) => ({ ...current, difficulty: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none">
                  {['Beginner','Intermediate','Advanced'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Explanation Style</span>
                <select value={form.style} onChange={(event) => setForm((current) => ({ ...current, style: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none">
                  {['Simple','Technical','Exam Oriented','Real World Examples'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Output Length</span>
                <select value={form.length} onChange={(event) => setForm((current) => ({ ...current, length: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none">
                  {['Short','Medium','Detailed'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Language</span>
                <select value={form.language} onChange={(event) => setForm((current) => ({ ...current, language: event.target.value }))} className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none">
                  {['English','Telugu','Hindi'].map((value) => <option key={value} value={value}>{value}</option>)}
                </select>
              </label>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-300">Include</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {['Key Definitions','Important Formulas','Code Examples','Real World Examples','Interview Questions','Viva Questions','MCQs','Summary'].map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                    <input type="checkbox" checked={form.include.includes(item)} onChange={() => toggleInclude(item)} className="rounded border-white/20 bg-transparent" />
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
              className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.3)] transition hover:scale-[1.01]"
            >
              {isGenerating ? <><Sparkles className="h-4 w-4 animate-pulse" /> Generating AI Notes...</> : <><Sparkles className="h-4 w-4" /> ✨ Generate AI Notes</>}
            </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-[#0c1120]/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Generated notes</h2>
              <p className="text-sm text-slate-400">Professional, structured, and export-ready.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { /* TODO: Connect download API. */ }} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">Copy</button>
              <button onClick={() => { /* TODO: Connect download API. */ }} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">Download PDF</button>
              <button onClick={() => { /* TODO: Connect download API. */ }} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">Download DOCX</button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['Copy','Download PDF','Download DOCX','Print','Save Notes','Share','Bookmark','Regenerate'].map((item) => (
              <button key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10">
                {item === 'Copy' ? <Copy className="h-4 w-4" /> : item === 'Download PDF' ? <Download className="h-4 w-4" /> : item === 'Download DOCX' ? <FileDown className="h-4 w-4" /> : item === 'Print' ? <Printer className="h-4 w-4" /> : item === 'Save Notes' ? <Save className="h-4 w-4" /> : item === 'Share' ? <Share2 className="h-4 w-4" /> : item === 'Bookmark' ? <Bookmark className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 sm:p-5">
            {!generatedNotes ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[20px] border border-dashed border-white/15 bg-[#0f1426]/50 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-slate-200">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Generate Smart AI Notes</h3>
                <p className="mt-2 max-w-lg text-sm text-slate-400">Paste text, upload a file or enter a topic to instantly generate structured notes.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{form.notesType}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">{form.topic}</h3>
                  </div>
                  <button onClick={() => setShowRecentNotes((value) => !value)} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">
                    <ListChecks className="h-4 w-4" /> Recent Notes
                    <ChevronRight className={`h-4 w-4 transition ${showRecentNotes ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {showRecentNotes ? (
                  <div className="rounded-[20px] border border-white/10 bg-[#0f1426]/70 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Recent notes</p>
                      <button className="text-sm text-slate-400">Search notes</button>
                    </div>
                    <div className="space-y-2">
                      {filteredNotes.map((note) => (
                        <div key={note.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                          <div>
                            <p className="font-medium text-white">{note.title}</p>
                            <p className="text-xs text-slate-500">{note.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-xl border border-white/10 p-2 text-slate-400">{note.favorite ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>
                            <button className="rounded-xl border border-white/10 p-2 text-slate-400">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="space-y-4 text-sm leading-7 text-slate-300">
                  {PLACEHOLDER_NOTES.map((section) => (
                    <div key={section.heading} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                      <h4 className="mb-2 text-lg font-semibold text-white">{section.heading}</h4>
                      <p>{section.body}</p>
                    </div>
                  ))}
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-2 text-lg font-semibold text-white">Flow Diagram Placeholder</h4>
                    <div className="flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0f1426]/50 text-slate-500">System flow diagram will appear here</div>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-2 text-lg font-semibold text-white">Code Example Placeholder</h4>
                    <pre className="overflow-x-auto rounded-2xl bg-[#0f1426]/70 p-3 text-xs text-slate-300"><code>{'function solveProblem() {\n  return "AI generated notes";\n}'}</code></pre>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                    <h4 className="mb-2 text-lg font-semibold text-white">Revision Tips</h4>
                    <ul className="ml-5 list-disc space-y-1">
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
    </AppShell>
  );
}
