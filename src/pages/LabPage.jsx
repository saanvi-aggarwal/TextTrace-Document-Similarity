import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, ArrowLeftRight, Sparkles, BarChart2 } from 'lucide-react';
import MinimalLCSVisualizer from '../components/MinimalLCSVisualizer';
import MinimalEditVisualizer from '../components/MinimalEditVisualizer';
import PagePagination from '../components/PagePagination';
import { useApp } from '../context/AppContext';

export default function LabPage() {
  const {
    docA,
    setDocA,
    docB,
    setDocB,
    algorithm,
    setAlgorithm,
    lcsData,
    editData,
    loadSample,
    SAMPLE_INPUTS,
  } = useApp();

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
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header & Sample Presets */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>05. Interactive Laboratory</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
                Algorithm Execution & Visualization Studio
              </h1>
              <p className="text-sm text-ink-secondary pt-1 font-normal">
                Input custom documents or select a benchmark sample to animate Dynamic Programming table construction.
              </p>
            </div>

            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-paper-card border border-paper-border hover:border-neutral-300 text-ink-primary text-xs font-mono font-medium transition-colors shrink-0"
            >
              <BarChart2 className="w-3.5 h-3.5 text-accent" />
              <span>Jump to Results</span>
              <ArrowRight className="w-3 h-3 text-ink-muted" />
            </Link>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="p-4 rounded-xl bg-paper-card border border-paper-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-ink-secondary">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-semibold text-ink-primary">Benchmark Samples:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {SAMPLE_INPUTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSample(sample)}
                className="px-2.5 py-1 rounded bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-secondary text-xs cursor-pointer transition-colors"
                title={sample.desc}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document A */}
          <div className="space-y-2 p-5 rounded-xl bg-paper-card border border-paper-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="input-doc-a" className="font-semibold text-ink-primary">
                Document A (Source)
              </label>
              <span className="text-ink-muted">{docA.length} characters</span>
            </div>
            <textarea
              id="input-doc-a"
              rows={4}
              value={docA}
              onChange={(e) => setDocA(e.target.value)}
              placeholder="Type or paste Document A..."
              className="w-full p-3 rounded-lg bg-paper-muted border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors leading-relaxed resize-y"
            />
          </div>

          {/* Document B */}
          <div className="space-y-2 p-5 rounded-xl bg-paper-card border border-paper-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor="input-doc-b" className="font-semibold text-ink-primary">
                Document B (Target)
              </label>
              <span className="text-ink-muted">{docB.length} characters</span>
            </div>
            <textarea
              id="input-doc-b"
              rows={4}
              value={docB}
              onChange={(e) => setDocB(e.target.value)}
              placeholder="Type or paste Document B..."
              className="w-full p-3 rounded-lg bg-paper-muted border border-paper-border text-ink-primary font-mono text-xs sm:text-sm focus:outline-none focus:border-ink-primary transition-colors leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* Toolbar: Algorithm Selector & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-paper-card border border-paper-border font-mono text-xs">
          {/* Algorithm Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-ink-muted">Algorithm:</span>
            <div className="inline-flex p-1 rounded-lg bg-paper-muted border border-paper-border">
              <button
                type="button"
                onClick={() => setAlgorithm('lcs')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  algorithm === 'lcs'
                    ? 'bg-paper-card text-ink-primary shadow-xs'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                1. LCS
              </button>
              <button
                type="button"
                onClick={() => setAlgorithm('edit')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  algorithm === 'edit'
                    ? 'bg-paper-card text-ink-primary shadow-xs'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                2. Edit Distance
              </button>
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSwap}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-secondary cursor-pointer transition-colors"
              title="Swap Document A and Document B"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-secondary cursor-pointer transition-colors"
              title="Clear text inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Visualization Studio Body */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-paper-border pb-4">
            <div>
              <h2 className="text-xl font-bold text-ink-primary">
                {algorithm === 'lcs' ? 'Longest Common Subsequence Visualizer' : 'Levenshtein Edit Distance Visualizer'}
              </h2>
              <p className="text-xs font-mono text-ink-secondary pt-0.5">
                Active Comparison: A ("{docA}") vs B ("{docB}")
              </p>
            </div>

            <div className="text-right text-xs font-mono text-ink-muted">
              <span>DP Grid Dimensions: </span>
              <strong className="text-ink-primary font-bold">
                ({docA.length + 1} × {docB.length + 1}) cells
              </strong>
            </div>
          </div>

          {/* Visualizer Component */}
          {algorithm === 'lcs' ? (
            <MinimalLCSVisualizer lcsData={lcsData} />
          ) : (
            <MinimalEditVisualizer editData={editData} />
          )}
        </div>

        {/* Direct Link to Full Results Banner */}
        <div className="p-6 rounded-xl bg-paper-muted border border-paper-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-semibold text-ink-primary text-sm block">
              Want a comprehensive mathematical breakdown?
            </span>
            <p className="text-ink-secondary font-sans text-xs">
              Review full similarity scores, extracted subsequences, atomic edit script breakdown, and academic interpretation.
            </p>
          </div>

          <Link
            to="/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-primary text-white font-medium hover:bg-neutral-800 transition-colors shrink-0"
          >
            <span>View Detailed Results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/dp', label: '04. DP Concept' }}
          next={{ path: '/results', label: '06. Results & Analysis' }}
        />
      </div>
    </div>
  );
}

