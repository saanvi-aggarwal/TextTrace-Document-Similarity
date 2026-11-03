import React from 'react';
import MinimalLCSVisualizer from './MinimalLCSVisualizer';
import MinimalEditVisualizer from './MinimalEditVisualizer';

export default function SectionVisualizationStudio({
  algorithm, // 'lcs' or 'edit'
  docA,
  docB,
  lcsData,
  editData,
}) {
  return (
    <section id="studio" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
              06. Visualization Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
              {algorithm === 'lcs' ? 'Longest Common Subsequence Workspace' : 'Levenshtein Edit Distance Workspace'}
            </h2>
            <p className="text-xs font-mono text-ink-secondary">
              Evaluating Document A ("{docA}") and Document B ("{docB}")
            </p>
          </div>

          <div className="text-right text-xs font-mono text-ink-muted">
            <span>Dimensions: </span>
            <strong className="text-ink-primary font-bold">
              ({docA.length + 1} × {docB.length + 1})
            </strong>
          </div>
        </div>

        {/* Dynamic Studio Body (LCS or Edit Distance) */}
        {algorithm === 'lcs' ? (
          <MinimalLCSVisualizer lcsData={lcsData} />
        ) : (
          <MinimalEditVisualizer editData={editData} />
        )}
      </div>
    </section>
  );
}
