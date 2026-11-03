import React, { useState } from 'react';
import { ArrowDownRight, ArrowUp, ArrowLeft, Play, RotateCcw } from 'lucide-react';

export default function SectionDPConcept() {
  // Mini interactive demo for strings A="CAT", B="CAR"
  const demoA = 'CAT';
  const demoB = 'CAR';
  const m = demoA.length;
  const n = demoB.length;

  // Mini step state (0 to m*n)
  const [miniStep, setMiniStep] = useState(3);

  // Pre-calculated matrix for CAT and CAR (LCS)
  //   ε C A R
  // ε 0 0 0 0
  // C 0 1 1 1
  // A 0 1 2 2
  // T 0 1 2 2
  const demoMatrix = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 2, 2],
    [0, 1, 2, 2],
  ];

  return (
    <section id="dp-concept" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
            04. Dynamic Programming
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
            The Matrix Tabulation Paradigm
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl font-normal">
            Dynamic Programming transforms an intractable exponential problem into a structured 2D table where each state encapsulates optimal subproblem solutions.
          </p>
        </div>

        {/* Matrix Causal Dependency Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <ArrowDownRight className="w-4 h-4" />
              <span>Diagonal (i-1, j-1)</span>
            </div>
            <p className="font-sans text-ink-secondary leading-relaxed">
              Represents matching or substituting $A[i-1]$ with $B[j-1]$. In LCS, matching adds $+1$ to this diagonal prefix value.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-orange-700 font-bold">
              <ArrowUp className="w-4 h-4" />
              <span>Top (i-1, j)</span>
            </div>
            <p className="font-sans text-ink-secondary leading-relaxed">
              Represents excluding or deleting character $A[i-1]$ from Document A. Used in mismatch branches and deletion operations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Left (i, j-1)</span>
            </div>
            <p className="font-sans text-ink-secondary leading-relaxed">
              Represents excluding or inserting character $B[j-1]$ into Document B. Used in mismatch branches and insertion operations.
            </p>
          </div>
        </div>

        {/* Small Interactive Matrix Demonstration */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper-border pb-4">
            <div>
              <span className="text-xs font-mono text-accent font-semibold uppercase">Interactive Demonstration</span>
              <h3 className="text-base font-bold text-ink-primary mt-0.5">
                Observing Row-Major Cell Evaluation (A="CAT", B="CAR")
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setMiniStep((prev) => Math.max(0, prev - 1))}
                className="px-2.5 py-1 rounded bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-secondary cursor-pointer"
              >
                Prev
              </button>
              <span className="text-ink-muted">Step {miniStep} / 9</span>
              <button
                type="button"
                onClick={() => setMiniStep((prev) => Math.min(9, prev + 1))}
                className="px-2.5 py-1 rounded bg-paper-muted hover:bg-neutral-200 border border-paper-border text-ink-secondary cursor-pointer"
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
            Because cells are populated from left to right and top to bottom, all three predecessor candidates are guaranteed to be in memory before cell $(i, j)$ is evaluated.
          </p>
        </div>

        {/* Complexity Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-1">
            <span className="text-ink-muted text-[11px] uppercase block">Time Complexity:</span>
            <span className="text-xl font-bold text-accent">O(m × n)</span>
            <p className="text-xs text-ink-secondary font-sans leading-relaxed pt-1">
              There are $(m+1) \times (n+1)$ states. Each state evaluates at most 3 predecessor references in $O(1)$ operations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-paper-card border border-paper-border space-y-1">
            <span className="text-ink-muted text-[11px] uppercase block">Space Complexity:</span>
            <span className="text-xl font-bold text-accent">O(m × n)</span>
            <p className="text-xs text-ink-secondary font-sans leading-relaxed pt-1">
              Retaining the entire table allows deterministic backtracking from $(m, n)$ down to $(0, 0)$ to reconstruct the optimal string alignment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

