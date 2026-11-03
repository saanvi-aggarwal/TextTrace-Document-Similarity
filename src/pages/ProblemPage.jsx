import React from 'react';
import { GitCompare, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import PagePagination from '../components/PagePagination';

export default function ProblemPage() {
  const sampleDiffOriginal = [
    { text: 'Dynamic programming solves ', match: true },
    { text: 'complex optimization problems', match: false, type: 'orig' },
    { text: ' by caching subproblems.', match: true },
  ];

  const sampleDiffParaphrased = [
    { text: 'Dynamic programming solves ', match: true },
    { text: 'difficult algorithmic tasks', match: false, type: 'para' },
    { text: ' by caching subproblems.', match: true },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>02. Theoretical Foundations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
            The Document Similarity Problem
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-3xl font-normal">
            Given two text documents A of length m and B of length n, how do we mathematically measure their textual resemblance, identify verbatim overlap, and determine the minimal set of edits required to convert one into the other?
          </p>
        </div>

        {/* Real-World Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <span className="text-accent uppercase tracking-wider text-[11px] block">Application 01</span>
            <h3 className="text-sm font-semibold text-ink-primary">Academic Integrity</h3>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Detecting uncredited content reuse, paraphrasing, and mosaic plagiarism across student submissions or research manuscripts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <span className="text-accent uppercase tracking-wider text-[11px] block">Application 02</span>
            <h3 className="text-sm font-semibold text-ink-primary">Version Control (Diff)</h3>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Tools like <code className="bg-paper-muted px-1 py-0.5 rounded">git diff</code> compute the shortest edit script via Myers/Levenshtein principles to display precise line insertions and deletions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <span className="text-accent uppercase tracking-wider text-[11px] block">Application 03</span>
            <h3 className="text-sm font-semibold text-ink-primary">Computational Genomics</h3>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Aligning DNA, RNA, and protein sequences to detect genetic mutations, evolutionary divergence, and conserved functional motifs.
            </p>
          </div>
        </div>

        {/* Before-and-After Comparison Visual */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <div className="flex items-center gap-2 border-b border-paper-border pb-4">
            <GitCompare className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-ink-primary font-mono">
              Concrete Example: Verbatim vs Paraphrased Passage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Original Document */}
            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-2">
              <span className="text-ink-muted text-[11px] uppercase block">Document A (Original Source)</span>
              <div className="text-sm leading-relaxed font-serif">
                {sampleDiffOriginal.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={
                      chunk.match
                        ? 'bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded'
                        : 'bg-rose-100 text-rose-900 px-1 py-0.5 rounded line-through'
                    }
                  >
                    {chunk.text}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-ink-muted block mt-1">m = 58 characters</span>
            </div>

            {/* Paraphrased Document */}
            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-2">
              <span className="text-ink-muted text-[11px] uppercase block">Document B (Modified Candidate)</span>
              <div className="text-sm leading-relaxed font-serif">
                {sampleDiffParaphrased.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={
                      chunk.match
                        ? 'bg-emerald-100 text-emerald-950 px-1 py-0.5 rounded'
                        : 'bg-blue-100 text-blue-950 px-1 py-0.5 rounded font-medium'
                    }
                  >
                    {chunk.text}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-ink-muted block mt-1">n = 56 characters</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-paper-muted border border-paper-border flex items-center justify-between font-mono text-xs text-ink-secondary">
            <span>Identified Common Sequence: <strong>49 verbatim characters</strong></span>
            <span className="text-accent font-semibold">LCS Similarity: ~86.0%</span>
          </div>
        </div>

        {/* Academic Plagiarism Disclaimer Callout */}
        <div className="p-6 rounded-xl bg-paper-card border border-paper-border flex gap-4 items-start">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs">
            <h3 className="font-semibold text-ink-primary font-mono uppercase tracking-wider text-[11px]">
              Crucial Academic Disclaimer: Resemblance vs Plagiarism
            </h3>
            <p className="text-ink-secondary leading-relaxed font-sans">
              Algorithmic similarity indices measure purely syntactical and positional resemblance between character sequences. 
              <strong> A high similarity score is not legal or academic proof of intentional plagiarism</strong>; legitimate citations, standardized terminology, boilerplate licenses, and generic phrases regularly generate high overlap. 
              Deterministic algorithms provide quantitative metrics, but academic integrity decisions require human qualitative review.
            </p>
          </div>
        </div>

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/', label: '01. Home' }}
          next={{ path: '/algorithms', label: '03. Algorithms' }}
        />
      </div>
    </div>
  );
}

