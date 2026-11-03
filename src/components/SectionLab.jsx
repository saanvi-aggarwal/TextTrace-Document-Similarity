import React from 'react';
import { ArrowRight, RotateCcw, ArrowLeftRight } from 'lucide-react';

const SAMPLES = [
  { label: 'kitten / sitting', a: 'kitten', b: 'sitting', algo: 'edit' },
  { label: 'ABC / AC', a: 'ABC', b: 'AC', algo: 'lcs' },
  { label: 'the cat sat / the cat sleeps', a: 'the cat sat', b: 'the cat sleeps', algo: 'lcs' },
  { label: 'data structures (identical)', a: 'data structures', b: 'data structures', algo: 'lcs' },
  { label: 'apple / xyz', a: 'apple', b: 'xyz', algo: 'edit' },
];

export default function SectionLab({
  docA,
  setDocA,
  docB,
  setDocB,
  algorithm,
  setAlgorithm,
  onBeginVisualization
}) {
  const handleSwap = () => {
    const temp = docA;
    setDocA(docB);
    setDocB(temp);
  };

  const handleReset = () => {
    setDocA('');
    setDocB('');
  };

  return (
    <section id="lab" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* Section Header & Sample Presets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
              05. Interactive Lab
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
              Document Comparison Lab
            </h2>
            <p className="text-xs text-ink-secondary">
              Input custom text or pick a benchmark sample to compute Dynamic Programming matrices.
            </p>
          </div>

          {/* Sample preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-ink-muted font-mono mr-1">Presets:</span>
            {SAMPLES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDocA(s.a);
                  setDocB(s.b);
                  setAlgorithm(s.algo);
                }}
                className="px-2.5 py-1 rounded bg-paper-card hover:bg-paper-muted border border-paper-border text-ink-secondary font-mono text-xs cursor-pointer transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-side Text Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document A */}
          <div className="space-y-2 p-5 rounded-xl bg-paper-card border border-paper-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="input-doc-a" className="font-semibold text-ink-primary">
                Document A (Source)
              </label>
              <span className="text-ink-muted">{docA.length} characters</span>
            </div>
            <textarea
              id="input-doc-a"
              rows={5}
              value={docA}
              onChange={(e) => setDocA(e.target.value)}
              placeholder="Type or paste Document A..."
              className="w-full p-3 rounded-lg bg-paper-muted border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors leading-relaxed resize-y"
            />
          </div>

          {/* Document B */}
          <div className="space-y-2 p-5 rounded-xl bg-paper-card border border-paper-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="input-doc-b" className="font-semibold text-ink-primary">
                Document B (Target)
              </label>
              <span className="text-ink-muted">{docB.length} characters</span>
            </div>
            <textarea
              id="input-doc-b"
              rows={5}
              value={docB}
              onChange={(e) => setDocB(e.target.value)}
              placeholder="Type or paste Document B..."
              className="w-full p-3 rounded-lg bg-paper-muted border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* Algorithm Option Selection & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 rounded-xl bg-paper-card border border-paper-border">
          {/* Radio selectors */}
          <div className="space-y-1.5 font-mono text-xs">
            <span className="text-ink-muted uppercase block">Select Algorithm Formulation:</span>
            <div className="flex flex-wrap items-center gap-5 text-sm font-sans font-medium">
              <label className="inline-flex items-center gap-2 cursor-pointer text-ink-primary">
                <input
                  type="radio"
                  name="lab-algorithm"
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
                  name="lab-algorithm"
                  value="edit"
                  checked={algorithm === 'edit'}
                  onChange={() => setAlgorithm('edit')}
                  className="w-4 h-4 text-ink-primary accent-ink-primary"
                />
                <span>Levenshtein Edit Distance</span>
              </label>
            </div>
          </div>

          {/* Buttons: Swap, Reset & Begin */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Document A and Document B"
              className="p-2.5 rounded-lg border border-paper-border hover:bg-paper-muted text-ink-secondary cursor-pointer transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Clear inputs"
              className="p-2.5 rounded-lg border border-paper-border hover:bg-paper-muted text-ink-secondary cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBeginVisualization}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-ink-primary text-white text-xs sm:text-sm font-mono font-medium hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <span>Begin Visualization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

