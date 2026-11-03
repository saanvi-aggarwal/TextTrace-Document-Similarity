import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Table, ArrowRight } from 'lucide-react';
import PagePagination from '../components/PagePagination';

export default function DPConceptPage() {
  const [miniStep, setMiniStep] = useState(0);

  // Mini demo: CAT vs CAR (LCS)
  // Rows: ε, C, A, T
  // Cols: ε, C, A, R
  const demoMatrix = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 2, 2],
    [0, 1, 2, 2],
  ];

  const miniStepsTotal = 9; // cells (1,1) to (3,3)

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>04. Dynamic Programming Core</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
            The Dynamic Programming Matrix
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-3xl font-normal">
            Understand how a 2D state matrix decomposes an exponential search space into a grid of overlapping prefix alignments computed in row-major topological order.
          </p>
        </div>

        {/* Conceptual Visual: Cell Dependencies */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-accent font-semibold uppercase">Matrix Dependency Anatomy</span>
            <h2 className="text-lg font-bold text-ink-primary">
              Causal Predecessors of Cell (i, j)
            </h2>
            <p className="text-xs text-ink-secondary font-sans leading-relaxed">
              Every coordinate <code className="bg-paper-muted px-1.5 py-0.5 rounded font-mono">(i, j)</code> represents the optimal alignment of prefix <code className="font-mono">A[0..i-1]</code> with prefix <code className="font-mono">B[0..j-1]</code>. It depends strictly on three adjacent predecessors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <span>↖ Diagonal: (i-1, j-1)</span>
              </div>
              <p className="text-ink-secondary font-sans text-xs">
                In LCS, represents character equality (+1 to previous alignment). In Edit Distance, represents character match (cost 0) or substitution (cost 1).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-2">
              <div className="flex items-center gap-2 text-orange-800 font-semibold">
                <span>↑ Top: (i-1, j)</span>
              </div>
              <p className="text-ink-secondary font-sans text-xs">
                In LCS, skips character A[i-1]. In Edit Distance, represents deleting character A[i-1] from Document A (+1 deletion penalty).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-2">
              <div className="flex items-center gap-2 text-purple-800 font-semibold">
                <span>← Left: (i, j-1)</span>
              </div>
              <p className="text-ink-secondary font-sans text-xs">
                In LCS, skips character B[j-1]. In Edit Distance, represents inserting character B[j-1] into Document A (+1 insertion penalty).
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Mini-Matrix Demo: CAT vs CAR */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper-border pb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-ink-muted uppercase">Interactive Demonstration</span>
              <h2 className="text-sm font-semibold text-ink-primary font-mono">
                Progressive Matrix Fill: "CAT" vs "CAR"
              </h2>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-ink-muted pr-2">
                Step {miniStep} of {miniStepsTotal}
              </span>
              <button
                type="button"
                onClick={() => setMiniStep((prev) => Math.max(0, prev - 1))}
                disabled={miniStep === 0}
                className="px-2.5 py-1.5 rounded bg-paper-muted hover:bg-neutral-200 disabled:opacity-40 border border-paper-border text-ink-primary cursor-pointer disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setMiniStep((prev) => Math.min(miniStepsTotal, prev + 1))}
                disabled={miniStep === miniStepsTotal}
                className="px-2.5 py-1.5 rounded bg-ink-primary text-white hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => setMiniStep(0)}
                title="Reset"
                className="p-1.5 rounded bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-muted cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mini Matrix Grid */}
          <div className="flex justify-center py-2">
            <div className="inline-block p-4 rounded-lg bg-paper-muted border border-paper-border font-mono text-xs">
              {/* Header Col */}
              <div className="flex items-center mb-1">
                <span className="w-8 text-center text-ink-muted">i\j</span>
                <span className="w-8 text-center text-ink-secondary font-semibold">ε</span>
                <span className="w-8 text-center text-ink-secondary font-semibold">C</span>
                <span className="w-8 text-center text-ink-secondary font-semibold">A</span>
                <span className="w-8 text-center text-ink-secondary font-semibold">R</span>
              </div>

              {/* Rows */}
              {['ε', 'C', 'A', 'T'].map((rChar, rIdx) => (
                <div key={rIdx} className="flex items-center mb-1">
                  <span className="w-8 text-center font-semibold text-ink-secondary">{rChar}</span>
                  {[0, 1, 2, 3].map((cIdx) => {
                    const cellOrder = rIdx === 0 || cIdx === 0 ? 0 : (rIdx - 1) * 3 + cIdx;
                    const isVisible = rIdx === 0 || cIdx === 0 || cellOrder <= miniStep;
                    const isCurrent = cellOrder === miniStep && rIdx > 0 && cIdx > 0;

                    let bg = 'bg-white border-paper-border text-ink-primary';
                    if (isCurrent) bg = 'bg-accent text-white font-bold border-accent shadow-xs';
                    else if (!isVisible) bg = 'bg-neutral-100 text-neutral-300 border-paper-border';

                    return (
                      <span
                        key={cIdx}
                        className={`w-8 h-8 flex items-center justify-center border rounded m-0.5 text-xs ${bg}`}
                      >
                        {isVisible ? demoMatrix[rIdx][cIdx] : '·'}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed text-center max-w-lg mx-auto font-sans">
            Because cells are populated from left to right and top to bottom in row-major order, all three predecessor candidates are guaranteed to be in memory before cell (i, j) is evaluated.
          </p>
        </div>

        {/* Complexity Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-1">
            <span className="text-ink-muted text-[11px] uppercase block">Time Complexity:</span>
            <div className="text-base font-bold text-ink-primary">O(m × n)</div>
            <p className="text-ink-secondary font-sans text-xs pt-1">
              Every coordinate evaluates exactly three constant-time O(1) predecessor lookups. Total cells computed = (m+1) × (n+1).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-1">
            <span className="text-ink-muted text-[11px] uppercase block">Space Complexity:</span>
            <div className="text-base font-bold text-ink-primary">O(m × n)</div>
            <p className="text-ink-secondary font-sans text-xs pt-1">
              Required to store the entire 2D matrix in memory for full, deterministic backtracking path reconstruction.
            </p>
          </div>
        </div>

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/algorithms', label: '03. Algorithms' }}
          next={{ path: '/lab', label: '05. Interactive Lab' }}
        />
      </div>
    </div>
  );
}

