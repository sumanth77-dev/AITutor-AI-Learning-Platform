import fs from 'fs';

let content = fs.readFileSync('src/pages/NotesGeneratorPage.jsx', 'utf8');

const replacements = [
  ['className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"', 'className="notes-layout"'],
  ['className="rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6"', 'className="notes-panel"'],
  ['className="flex items-center justify-between"', 'className="notes-header-row"'],
  ['className="text-xl font-semibold text-white"', 'className="notes-panel-title"'],
  ['className="text-sm text-slate-400"', 'className="notes-panel-subtitle"'],
  ['className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-slate-300"', 'className="notes-badge"'],
  ['className="mt-5 space-y-4"', 'className="" style={{ marginTop: "1.25rem" }}'],
  ['className="mb-2 flex items-center justify-between text-sm font-medium text-slate-300"', 'className="notes-label"'],
  ['className="text-xs text-slate-500"', 'className="notes-label-optional"'],
  ['className="min-h-[150px] w-full rounded-[22px] border border-white/10 bg-[#0f1426]/70 p-4 text-sm text-slate-200 outline-none ring-0"', 'className="notes-textarea"'],
  ['className="rounded-[22px] border border-dashed border-white/20 bg-white/5 p-4"', 'className="notes-upload-box"'],
  ['className="flex items-center justify-between gap-3"', 'className="notes-upload-header"'],
  ['className="text-sm font-semibold text-white"', 'className="notes-panel-title" style={{ fontSize: "0.875rem" }}'],
  ['className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/15"', 'className="notes-upload-btn"'],
  ['className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm text-slate-300"', 'className="notes-file-status"'],
  ['className="grid gap-4 md:grid-cols-2"', 'className="notes-grid-2"'],
  ['className="space-y-2 text-sm text-slate-300"', 'className="notes-input-wrapper"'],
  ['className="w-full rounded-[18px] border border-white/10 bg-[#0f1426]/70 px-3 py-3 text-sm outline-none"', 'className="notes-input"'],
  ['className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"', 'className="notes-grid-3"'],
  ['className="mb-3 text-sm font-medium text-slate-300"', 'className="notes-label" style={{ marginBottom: "0.75rem" }}'],
  ['className="grid gap-2 sm:grid-cols-2"', 'className="notes-checkbox-grid"'],
  ['className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"', 'className="notes-checkbox-label"'],
  ['className="rounded border-white/20 bg-transparent"', 'className="notes-checkbox"'],
  ['className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.3)] transition hover:scale-[1.01]"', 'className="notes-generate-btn"'],
  ['className="rounded-[28px] border border-white/10 bg-[#0c1120]/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-6"', 'className="notes-panel notes-panel-dark"'],
  ['className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"', 'className="notes-header-row"'],
  ['className="flex flex-wrap gap-2"', 'className="notes-actions-row"'],
  ['className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200"', 'className="notes-action-btn"'],
  ['className="mt-4 flex flex-wrap gap-2"', 'className="notes-actions-row" style={{ marginTop: "1rem" }}'],
  ['className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1426]/70 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"', 'className="notes-action-btn notes-action-btn-dark"'],
  ['className="mt-5 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 sm:p-5"', 'className="notes-content-area"'],
  ['className="flex min-h-[420px] flex-col items-center justify-center rounded-[20px] border border-dashed border-white/15 bg-[#0f1426]/50 p-6 text-center"', 'className="notes-empty-state"'],
  ['className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-slate-200"', 'className="notes-empty-icon"'],
  ['className="mt-4 text-xl font-semibold text-white"', 'className="notes-empty-title"'],
  ['className="mt-2 max-w-lg text-sm text-slate-400"', 'className="notes-empty-desc"'],
  ['className="space-y-5"', 'className="" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}'],
  ['className="flex flex-wrap items-center justify-between gap-3"', 'className="notes-result-header"'],
  ['className="text-sm uppercase tracking-[0.3em] text-slate-400"', 'className="notes-result-type"'],
  ['className="mt-1 text-2xl font-semibold text-white"', 'className="notes-result-title"'],
  ['className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200"', 'className="notes-recent-btn"'],
  ['className="rounded-[20px] border border-white/10 bg-[#0f1426]/70 p-3"', 'className="notes-recent-dropdown"'],
  ['className="mb-3 flex items-center justify-between"', 'className="notes-recent-header"'],
  ['className="text-sm font-semibold text-white"', 'className="notes-recent-title"'],
  ['className="text-sm text-slate-400"', 'className="notes-recent-search-btn"'],
  ['className="space-y-2"', 'className="notes-recent-list"'],
  ['className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"', 'className="notes-recent-item"'],
  ['className="font-medium text-white"', 'className="notes-recent-item-title"'],
  ['className="text-xs text-slate-500"', 'className="notes-recent-item-cat"'],
  ['className="flex items-center gap-2"', 'className="notes-recent-item-actions"'],
  ['className="rounded-xl border border-white/10 p-2 text-slate-400"', 'className="notes-recent-item-btn"'],
  ['className="space-y-4 text-sm leading-7 text-slate-300"', 'className="" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}'],
  ['className="rounded-[20px] border border-white/10 bg-white/5 p-4"', 'className="notes-section"'],
  ['className="mb-2 text-lg font-semibold text-white"', ''],
  ['className="flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0f1426]/50 text-slate-500"', 'className="notes-section-placeholder"'],
  ['className="overflow-x-auto rounded-2xl bg-[#0f1426]/70 p-3 text-xs text-slate-300"', 'className="notes-code-block"'],
  ['className="ml-5 list-disc space-y-1"', 'className="notes-list"'],
];

for (const [find, replace] of replacements) {
  content = content.split(find).join(replace);
}

fs.writeFileSync('src/pages/NotesGeneratorPage.jsx', content);
console.log('Successfully updated NotesGeneratorPage.jsx');
