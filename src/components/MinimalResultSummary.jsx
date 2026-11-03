import React from 'react';
import { formatPercentage } from '../utils/similarity';

export default function MinimalResultSummary({
  algorithm, // 'lcs' or 'edit'
  docA,
  docB,
  lcsData,
  editData,
}) {
  const m = docA.length;
  const n = docB.length;

  return (
    <div className="pt-8 border-t border-paper-border space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
          Section 4 — Computed Results
        </span>
        <h3 className="text-xl font-semibold text-ink-primary">
          Similarity Summary
        </h3>
      </div>

      {algorithm === 'lcs' && lcsData && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
            <div>
              <span className="text-xs text-ink-muted block mb-1">LCS Length</span>
              <span className="text-2xl font-semibold text-ink-primary">
                {lcsData.finalLcsLength}
              </span>
            </div>

            <div>
              <span className="text-xs text-ink-muted block mb-1">LCS Similarity</span>
              <span className="text-2xl font-semibold text-accent">
                {formatPercentage(lcsData.similarity)}
              </span>
            </div>

            <div>
              <span className="text-xs text-ink-muted block mb-1">Shared Sequence</span>
              <span className="text-base font-semibold text-ink-primary block truncate" title={lcsData.lcsString}>
                {lcsData.lcsString ? `"${lcsData.lcsString}"` : '(None)'}
              </span>
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed">
            <strong>Interpretation:</strong> The longest common subsequence measures the maximal number of characters that appear in both documents in the identical relative order without requiring contiguity. With lengths {m} and {n}, the structural overlap is {formatPercentage(lcsData.similarity)}.
          </p>
        </div>
      )}

      {algorithm === 'edit' && editData && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
            <div>
              <span className="text-xs text-ink-muted block mb-1">Edit Distance</span>
              <span className="text-2xl font-semibold text-ink-primary">
                {editData.editDistance}
              </span>
            </div>

            <div>
              <span className="text-xs text-ink-muted block mb-1">Edit Similarity</span>
              <span className="text-2xl font-semibold text-accent">
                {formatPercentage(editData.similarity)}
              </span>
            </div>

            <div>
              <span className="text-xs text-ink-muted block mb-1">Operations</span>
              <span className="text-xs text-ink-secondary space-x-2 pt-1 block">
                <span>+{editData.operationCounts?.SUBSTITUTE || 0} sub</span>
                <span>+{editData.operationCounts?.DELETE || 0} del</span>
                <span>+{editData.operationCounts?.INSERT || 0} ins</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed">
            <strong>Interpretation:</strong> Levenshtein distance calculates the minimal sequence of atomic edits (substitutions, insertions, deletions) needed to transform Document A into Document B. Transforming length {m} to {n} requires {editData.editDistance} operation{editData.editDistance === 1 ? '' : 's'}.
          </p>
        </div>
      )}

      {/* Required Plagiarism Disclaimer */}
      <div className="p-4 rounded-lg bg-paper-muted border border-paper-border text-xs text-ink-muted leading-relaxed font-mono">
        <strong className="text-ink-secondary font-sans font-medium">Academic Note:</strong> Similarity is an indication for character-level comparison, not proof of plagiarism. This metric evaluates literal textual alignment and does not measure conceptual overlap, paraphrasing, or citation validity.
      </div>
    </div>
  );
}

