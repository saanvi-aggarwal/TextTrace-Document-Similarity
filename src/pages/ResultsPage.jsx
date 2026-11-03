import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';
import { formatPercentage } from '../utils/similarity';
import PagePagination from '../components/PagePagination';
import { useApp } from '../context/AppContext';

export default function ResultsPage() {
  const { docA, docB, algorithm, lcsData, editData } = useApp();

  const m = docA.length;
  const n = docB.length;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>06. Quantitative Evaluation</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
                Similarity Metrics & Analysis
              </h1>
              <p className="text-sm text-ink-secondary pt-1 font-normal">
                Deterministic results computed via 2D Dynamic Programming matrix memoization.
              </p>
            </div>

            <Link
              to="/lab"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-paper-card border border-paper-border hover:border-neutral-300 text-ink-primary text-xs font-mono font-medium transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-ink-muted" />
              <span>Modify in Lab</span>
            </Link>
          </div>
        </div>

        {/* Input Overview Bar */}
        <div className="p-4 rounded-xl bg-paper-card border border-paper-border grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-ink-muted text-[11px] uppercase block">Document A (Source):</span>
            <span className="font-semibold text-ink-primary block truncate font-sans text-sm" title={docA}>
              "{docA || '(empty)'}"
            </span>
            <span className="text-ink-muted text-[11px] block">m = {m} characters</span>
          </div>

          <div className="space-y-1 sm:border-l sm:border-paper-border sm:pl-4">
            <span className="text-ink-muted text-[11px] uppercase block">Document B (Target):</span>
            <span className="font-semibold text-ink-primary block truncate font-sans text-sm" title={docB}>
              "{docB || '(empty)'}"
            </span>
            <span className="text-ink-muted text-[11px] block n = {n}">n = {n} characters</span>
          </div>
        </div>

        {/* Both Metrics Side-by-Side Comparison */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-ink-primary font-mono">
            Side-by-Side Algorithmic Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* LCS Summary Card */}
            <div className={`p-6 rounded-xl bg-paper-card border transition-all space-y-4 ${
              algorithm === 'lcs' ? 'border-accent ring-1 ring-accent/30' : 'border-paper-border'
            }`}>
              <div className="flex items-center justify-between border-b border-paper-border pb-3">
                <span className="font-bold text-sm text-ink-primary">Longest Common Subsequence</span>
                {algorithm === 'lcs' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-accent border border-blue-200">
                    Active in Lab
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-ink-muted uppercase text-[10px] block">Similarity Score</span>
                  <span className="text-3xl font-bold text-accent">
                    {formatPercentage(lcsData.similarity)}
                  </span>
                </div>

                <div className="space-y-1 pt-1 border-t border-paper-border text-ink-secondary">
                  <div className="flex justify-between">
                    <span>LCS Length:</span>
                    <strong className="text-ink-primary">{lcsData.finalLcsLength} chars</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Extracted Sequence:</span>
                    <strong className="text-emerald-800 font-semibold truncate max-w-[160px]" title={lcsData.lcsString}>
                      {lcsData.lcsString ? `"${lcsData.lcsString}"` : '(None)'}
                    </strong>
                  </div>
                  <div className="text-[11px] text-ink-muted pt-1">
                    Formula: (2 × {lcsData.finalLcsLength}) / ({m} + {n} || 1)
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Distance Summary Card */}
            <div className={`p-6 rounded-xl bg-paper-card border transition-all space-y-4 ${
              algorithm === 'edit' ? 'border-accent ring-1 ring-accent/30' : 'border-paper-border'
            }`}>
              <div className="flex items-center justify-between border-b border-paper-border pb-3">
                <span className="font-bold text-sm text-ink-primary">Levenshtein Edit Distance</span>
                {algorithm === 'edit' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-accent border border-blue-200">
                    Active in Lab
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-ink-muted uppercase text-[10px] block">Similarity Score</span>
                  <span className="text-3xl font-bold text-accent">
                    {formatPercentage(editData.similarity)}
                  </span>
                </div>

                <div className="space-y-1 pt-1 border-t border-paper-border text-ink-secondary">
                  <div className="flex justify-between">
                    <span>Edit Distance:</span>
                    <strong className="text-ink-primary">{editData.editDistance} operations</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Substitutions:</span>
                    <strong className="text-ink-primary">{editData.operationCounts?.SUBSTITUTE || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Deletions:</span>
                    <strong className="text-ink-primary">{editData.operationCounts?.DELETE || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Insertions:</span>
                    <strong className="text-ink-primary">{editData.operationCounts?.INSERT || 0}</strong>
                  </div>
                  <div className="text-[11px] text-ink-muted pt-1">
                    Formula: 1 - ({editData.editDistance} / {Math.max(m, n) || 1})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Depth Academic Interpretation */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-4">
          <h2 className="text-base font-bold text-ink-primary font-mono">
            Academic Interpretation of Results
          </h2>
          <div className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans space-y-3">
            <p>
              <strong>1. Subsequence Retention vs Atomic Edit Count:</strong> Document A ({m} chars) and Document B ({n} chars) exhibit an LCS similarity of {formatPercentage(lcsData.similarity)} and an Edit Distance similarity of {formatPercentage(editData.similarity)}. 
              LCS emphasizes characters that were preserved in chronological order even if intermediate text was added or removed. Levenshtein distance directly penalizes positional displacement, requiring {editData.editDistance} edit operations to bridge the two documents.
            </p>
            <p>
              <strong>2. Complexity and Performance:</strong> The Dynamic Programming table evaluated exactly {(m + 1) * (n + 1)} states. Each subproblem was visited once in row-major order, bypassing the combinatorial 2^(m+n) search space.
            </p>
          </div>
        </div>

        {/* Academic Plagiarism Disclaimer Callout */}
        <div className="p-6 rounded-xl bg-paper-card border border-paper-border flex gap-4 items-start">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs">
            <h3 className="font-semibold text-ink-primary font-mono uppercase tracking-wider text-[11px]">
              Interpretation Note on Academic Integrity
            </h3>
            <p className="text-ink-secondary leading-relaxed font-sans">
              Algorithmic string similarity reflects verbatim lexical overlap, not semantic plagiarism or intent. 
              High scores can occur due to legitimate technical definitions, citations, or common phrasing, while heavy paraphrasing may lower string similarity despite identical conceptual meaning.
            </p>
          </div>
        </div>

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/lab', label: '05. Interactive Lab' }}
          next={{ path: '/about', label: '07. About The Project' }}
        />
      </div>
    </div>
  );
}

