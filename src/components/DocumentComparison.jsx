import React from 'react';
import { ArrowRight } from 'lucide-react';

const COMPACT_SAMPLES = [
  { label: 'kitten / sitting', a: 'kitten', b: 'sitting' },
  { label: 'ABC / AC', a: 'ABC', b: 'AC' },
  { label: 'the cat sat / the cat sleeps', a: 'the cat sat', b: 'the cat sleeps' },
  { label: 'data structures (identical)', a: 'data structures', b: 'data structures' },
  { label: 'apple / xyz', a: 'apple', b: 'xyz' },
];

export default function DocumentComparison({
  docA,
  setDocA,
  docB,
  setDocB,
  algorithm,
  setAlgorithm,
  onVisualize
}) {
  return (
    <section id="compare-section" className="py-16 border-b border-paper-border">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Section title & Samples */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
              Section 2 — Compare Documents
            </span>
            <h2 className="text-xl font-semibold text-ink-primary mt-1">
              Input Document Pair
            </h2>
          </div>

          {/* Compact Sample Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-ink-muted font-mono mr-1">Samples:</span>
            {COMPACT_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDocA(sample.a);
                  setDocB(sample.b);
                }}
                className="px-2.5 py-1 rounded-md bg-paper-muted hover:bg-neutral-200 text-ink-secondary text-xs transition-colors border border-paper-border font-mono"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-side Clean Text Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Document A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
              <label htmlFor="doc-a" className="font-semibold text-ink-primary">
                Document A
              </label>
              <span>{docA.length} chars</span>
            </div>
            <textarea
              id="doc-a"
              value={docA}
              onChange={(e) => setDocA(e.target.value)}
              rows={5}
              placeholder="Enter text for Document A..."
              className="w-full p-3.5 rounded-lg bg-paper-card border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors resize-y leading-relaxed shadow-xs"
            />
          </div>

          {/* Document B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
              <label htmlFor="doc-b" className="font-semibold text-ink-primary">
                Document B
              </label>
              <span>{docB.length} chars</span>
            </div>
            <textarea
              id="doc-b"
              value={docB}
              onChange={(e) => setDocB(e.target.value)}
              rows={5}
              placeholder="Enter text for Document B..."
              className="w-full p-3.5 rounded-lg bg-paper-card border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors resize-y leading-relaxed shadow-xs"
            />
          </div>
        </div>

        {/* Algorithm Selector & Visualize Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          {/* Radio Algorithm Options */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
              Select Formulation:
            </span>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <label className="inline-flex items-center gap-2 cursor-pointer text-ink-primary">
                <input
                  type="radio"
                  name="algorithm"
                  value="lcs"
                  checked={algorithm === 'lcs'}
                  onChange={() => setAlgorithm('lcs')}
                  className="w-4 h-4 text-ink-primary accent-ink-primary"
                />
                <span>Longest Common Subsequence (LCS)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-ink-primary">
                <input
                  type="radio"
                  name="algorithm"
                  value="edit"
                  checked={algorithm === 'edit'}
                  onChange={() => setAlgorithm('edit')}
                  className="w-4 h-4 text-ink-primary accent-ink-primary"
                />
                <span>Levenshtein Edit Distance</span>
              </label>
            </div>
          </div>

          {/* Prominent Action Button */}
          <div>
            <button
              type="button"
              onClick={onVisualize}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-ink-primary text-white text-sm font-medium hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <span>Visualize Algorithm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
