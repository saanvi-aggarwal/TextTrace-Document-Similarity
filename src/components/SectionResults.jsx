import React from 'react';
import { formatPercentage } from '../utils/similarity';
import { AlertTriangle } from 'lucide-react';

export default function SectionResults({
  algorithm,
  docA,
  docB,
  lcsData,
  editData,
}) {
  const m = docA.length;
  const n = docB.length;

  return (
    <section id="results" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
            07. Results & Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
            Computed Similarity & Structural Metrics
          </h2>
          <p className="text-xs font-mono text-ink-secondary">
            Deterministic results derived from bottom-up Dynamic Programming table resolution.
          </p>
        </div>

        {/* Algorithm Results Card */}
        {algorithm === 'lcs' && lcsData && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-paper-border pb-4 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">LCS Length</span>
                <span className="text-3xl font-bold text-ink-primary">
                  {lcsData.finalLcsLength}
                </span>
                <span className="text-[11px] text-ink-muted block pt-1">
                  Out of {Math.max(m, n)} max chars
                </span>
              </div>

              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-paper-border pb-4 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">LCS Similarity Score</span>
                <span className="text-3xl font-bold text-accent">
                  {formatPercentage(lcsData.similarity)}
                </span>
                <span className="text-[11px] text-ink-muted block pt-1 font-mono">
                  Formula: (2 × {lcsData.finalLcsLength}) / ({m} + {n})
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">Extracted Subsequence</span>
                <span className="text-base font-semibold text-emerald-800 block truncate pt-1" title={lcsData.lcsString}>
                  {lcsData.lcsString ? `"${lcsData.lcsString}"` : '(None)'}
                </span>
                <span className="text-[11px] text-ink-muted block pt-1">
                  Preserves relative chronological order
                </span>
              </div>
            </div>

            {/* Concise Interpretation */}
            <div className="p-5 rounded-xl bg-paper-muted border border-paper-border text-xs text-ink-secondary leading-relaxed font-sans space-y-1">
              <strong className="text-ink-primary font-mono block">Algorithmic Interpretation:</strong>
              <p>
                Document A and Document B share an aligned common subsequence of {lcsData.finalLcsLength} character{lcsData.finalLcsLength === 1 ? '' : 's'}. 
                The LCS similarity index of {formatPercentage(lcsData.similarity)} demonstrates the degree to which verbatim clauses or structural word sequences were retained without altering relative character positioning.
              </p>
            </div>
          </div>
        )}

        {algorithm === 'edit' && editData && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-paper-border pb-4 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">Levenshtein Edit Distance</span>
                <span className="text-3xl font-bold text-ink-primary">
                  {editData.editDistance}
                </span>
                <span className="text-[11px] text-ink-muted block pt-1">
                  Total atomic operations
                </span>
              </div>

              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-paper-border pb-4 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">Edit Similarity Score</span>
                <span className="text-3xl font-bold text-accent">
                  {formatPercentage(editData.similarity)}
                </span>
                <span className="text-[11px] text-ink-muted block pt-1 font-mono">
                  Formula: 1 - ({editData.editDistance} / {Math.max(m, n) || 1})
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-ink-muted uppercase tracking-wider text-[11px] block">Operation Breakdown</span>
                <div className="text-xs text-ink-secondary pt-1 space-y-0.5">
                  <div>• Substitutions: <strong className="text-ink-primary">{editData.operationCounts?.SUBSTITUTE || 0}</strong></div>
                  <div>• Deletions: <strong className="text-ink-primary">{editData.operationCounts?.DELETE || 0}</strong></div>
                  <div>• Insertions: <strong className="text-ink-primary">{editData.operationCounts?.INSERT || 0}</strong></div>
                </div>
              </div>
            </div>

            {/* Concise Interpretation */}
            <div className="p-5 rounded-xl bg-paper-muted border border-paper-border text-xs text-ink-secondary leading-relaxed font-sans space-y-1">
              <strong className="text-ink-primary font-mono block">Algorithmic Interpretation:</strong>
              <p>
                Converting Document A into Document B requires a global minimum of {editData.editDistance} single-character operation{editData.editDistance === 1 ? '' : 's'}. 
                The edit similarity score of {formatPercentage(editData.similarity)} indicates the proportion of character positions that remain identical relative to the maximum length of either string.
              </p>
            </div>
          </div>
        )}

        {/* Clear Plagiarism vs Similarity Warning */}
        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 font-sans">
            <strong className="font-semibold block font-mono">Academic Caution on Plagiarism Screening:</strong>
            <p>
              These quantitative similarity percentages indicate literal textual resemblance only. They do not prove plagiarism, evaluate intellectual authorship, or account for legitimate quotations, paraphrasing, bibliography entries, or domain-specific terminology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
