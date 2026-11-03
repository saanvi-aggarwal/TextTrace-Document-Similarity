import React from 'react';
import { GitCompare, AlertTriangle, FileCode, Dna, FileSearch } from 'lucide-react';

export default function SectionProblem() {
  return (
    <section id="problem" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
            02. Problem Statement
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
            The Document Comparison Problem
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl font-normal">
            Given two text documents $A$ of length $m$ and $B$ of length $n$, how do we mathematically measure their textual resemblance, identify verbatim overlap, and determine the minimal set of edits required to convert one into the other?
          </p>
        </div>

        {/* Before-and-After Text Comparison Visual */}
        <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-4">
          <div className="flex items-center justify-between border-b border-paper-border pb-3 text-xs font-mono text-ink-muted">
            <span className="flex items-center gap-1.5 font-semibold text-ink-primary">
              <GitCompare className="w-3.5 h-3.5 text-accent" />
              <span>FIGURE 2.1 — TEXTUAL TRANSFORMATION EXAMPLE</span>
            </span>
            <span>Input: "kitten" → "sitting"</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1">
              <span className="text-ink-muted text-[11px] block">Document A:</span>
              <span className="text-base font-bold text-ink-primary">"kitten"</span>
              <span className="text-[10px] text-ink-muted block mt-1">m = 6 characters</span>
            </div>

            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border flex flex-col justify-center space-y-1">
              <span className="text-ink-muted text-[11px] block">Atomic Edits:</span>
              <div className="text-xs text-ink-secondary space-y-0.5">
                <div>• Sub: <code className="text-red-700">k</code> → <code className="text-emerald-700">s</code></div>
                <div>• Sub: <code className="text-red-700">e</code> → <code className="text-emerald-700">i</code></div>
                <div>• Ins: <code className="text-emerald-700">+g</code> at end</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1">
              <span className="text-ink-muted text-[11px] block">Document B:</span>
              <span className="text-base font-bold text-ink-primary">"sitting"</span>
              <span className="text-[10px] text-ink-muted block mt-1">n = 7 characters</span>
            </div>
          </div>
        </div>

        {/* Practical Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-ink-secondary">
          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="w-7 h-7 rounded-md bg-paper-muted flex items-center justify-center text-accent">
              <FileSearch className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-ink-primary text-sm font-mono">Academic Text Similarity</h4>
            <p className="leading-relaxed font-sans">
              Screening submissions for verbatim sentence overlap, shared clause patterns, and uncredited phrase retention.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="w-7 h-7 rounded-md bg-paper-muted flex items-center justify-center text-accent">
              <FileCode className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-ink-primary text-sm font-mono">Version Control & Diffing</h4>
            <p className="leading-relaxed font-sans">
              Computing minimal lines or tokens added, removed, or modified across software commits (e.g., Git diff engines).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="w-7 h-7 rounded-md bg-paper-muted flex items-center justify-center text-accent">
              <Dna className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-ink-primary text-sm font-mono">Computational Genomics</h4>
            <p className="leading-relaxed font-sans">
              Aligning homologous DNA, RNA, and protein sequences to detect evolutionary mutations, insertions, and deletions.
            </p>
          </div>
        </div>

        {/* Plagiarism Distinction Notice */}
        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold">Important Academic Distinction:</strong> High textual similarity indicates character-level resemblance, not legal or academic proof of plagiarism. Algorithms measure structural string overlap; determining plagiarism requires human judgment regarding authorship context, quotation formatting, and citation validity.
          </p>
        </div>
      </div>
    </section>
  );
}
