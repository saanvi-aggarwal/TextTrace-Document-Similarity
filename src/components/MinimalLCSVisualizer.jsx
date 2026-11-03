import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  SkipBack, 
  SkipForward,
  Check,
  X
} from 'lucide-react';
import MinimalDPMatrix from './MinimalDPMatrix';
import { formatChar } from '../utils/lcs';
import { createPathLookup } from '../utils/backtracking';

export default function MinimalLCSVisualizer({ lcsData }) {
  const { strA, strB, m, n, matrix, steps, totalSteps, finalLcsLength, lcsString, backtrackSteps } = lcsData;

  // Active calculation step index
  const [learningStepIdx, setLearningStepIdx] = useState(totalSteps > 0 ? 0 : -1);
  const [showBacktrack, setShowBacktrack] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800); // ms per step

  const timerRef = useRef(null);

  // Reset states when input strings or algorithm result change
  useEffect(() => {
    setLearningStepIdx(totalSteps > 0 ? 0 : -1);
    setShowBacktrack(false);
    setIsPlaying(false);
  }, [lcsData, totalSteps]);

  // Main playback timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setLearningStepIdx((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, totalSteps]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handlePrev = () => {
    setLearningStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setLearningStepIdx((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handleFirstStep = () => {
    setIsPlaying(false);
    setLearningStepIdx(0);
  };

  const handleLastStep = () => {
    setIsPlaying(false);
    setLearningStepIdx(totalSteps - 1);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setLearningStepIdx(0);
    setShowBacktrack(false);
  };

  // Active step object
  const activeStep = learningStepIdx >= 0 && learningStepIdx < totalSteps ? steps[learningStepIdx] : null;

  const backtrackPathCoords = createPathLookup(showBacktrack ? backtrackSteps : []);

  return (
    <div className="space-y-6">
      {/* ================= TOP CONTROLS & TIMELINE SCRUBBER ================= */}
      <div className="p-4 sm:p-5 rounded-xl bg-paper-card border border-paper-border space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-ink-primary">
              Step {learningStepIdx + 1} of {totalSteps}
            </span>
            <span className="text-ink-muted text-[11px] hidden md:inline">
              ({totalSteps > 0 ? Math.round(((learningStepIdx + 1) / totalSteps) * 100) : 0}% computed)
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleFirstStep}
              title="First Step"
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-muted rounded-md border border-paper-border cursor-pointer transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handlePrev}
              title="Previous Step (Left Arrow)"
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-muted rounded-md border border-paper-border cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs ${
                isPlaying
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-accent text-white hover:bg-blue-700'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              title="Next Step (Right Arrow)"
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-muted rounded-md border border-paper-border cursor-pointer transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleLastStep}
              title="Jump to Finish"
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-muted rounded-md border border-paper-border cursor-pointer transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleReplay}
              title="Reset"
              className="p-2 text-ink-secondary hover:text-ink-primary hover:bg-paper-muted rounded-md border border-paper-border cursor-pointer transition-colors ml-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Toggle & Backtrack Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowBacktrack(!showBacktrack)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all shadow-xs ${
                showBacktrack
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                  : 'bg-paper-muted text-ink-secondary border-paper-border hover:border-neutral-400'
              }`}
            >
              <span>{showBacktrack ? '★ Hide Backtrack' : '★ Show Backtrack'}</span>
            </button>

            <div className="flex items-center gap-1 font-mono text-xs">
              {[
                { label: '0.5x', ms: 1400 },
                { label: '1.0x', ms: 800 },
                { label: '2.0x', ms: 350 },
              ].map((s) => (
                <button
                  key={s.ms}
                  type="button"
                  onClick={() => setSpeed(s.ms)}
                  className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                    speed === s.ms
                      ? 'bg-ink-primary text-white font-bold'
                      : 'bg-paper-muted text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="space-y-1.5 pt-2 border-t border-paper-border">
          <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
            <span>
              Cell Coordinates: <strong className="text-ink-primary">{activeStep ? `(${activeStep.i}, ${activeStep.j})` : '(0, 0)'}</strong>
            </span>
            <span className="text-[11px] text-ink-muted hidden sm:inline">
              Drag slider or click any cell to inspect calculation
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={learningStepIdx >= 0 ? learningStepIdx : 0}
            onChange={(e) => {
              setIsPlaying(false);
              setLearningStepIdx(Number(e.target.value));
            }}
            className="w-full accent-accent cursor-pointer h-1.5 bg-neutral-200 rounded-lg appearance-none"
          />
        </div>
      </div>

      {/* ================= MAIN VISUALIZER WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dynamic Programming Matrix */}
        <div className="lg:col-span-7 space-y-2">
          <MinimalDPMatrix
            strA={strA}
            strB={strB}
            matrix={matrix}
            currentStep={activeStep}
            maxStepIndex={learningStepIdx}
            isBacktracking={showBacktrack}
            backtrackPathCoords={backtrackPathCoords}
            onCellClick={(r, c) => {
              if (r === 0 || c === 0) return;
              const target = (r - 1) * n + (c - 1);
              if (target >= 0 && target < totalSteps) {
                setIsPlaying(false);
                setLearningStepIdx(target);
              }
            }}
            matrixName="L"
          />
        </div>

        {/* Right: Rich Interactive Chalkboard / Calculation Card */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-paper-card border border-paper-border space-y-5 shadow-xs">
          {/* Header: Active Cell Badge */}
          <div className="flex items-center justify-between border-b border-paper-border pb-3">
            <div className="space-y-0.5 font-mono">
              <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                Inspected Cell
              </span>
              <span className="text-base font-bold text-ink-primary">
                {activeStep ? `Cell (${activeStep.i}, ${activeStep.j})` : 'Base Invariant (Row/Col 0)'}
              </span>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
                Computed Value
              </span>
              <span className="text-xl font-extrabold text-accent">
                {activeStep ? `L[${activeStep.i}][${activeStep.j}] = ${activeStep.value}` : '0'}
              </span>
            </div>
          </div>

          {activeStep ? (
            <div className="space-y-5 font-mono text-xs">
              {/* Visual Character Comparator */}
              <div className="p-3.5 rounded-lg bg-paper-muted border border-paper-border space-y-2">
                <span className="text-ink-muted text-[11px] block uppercase">Character Comparison:</span>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-white border border-paper-border flex items-center justify-center font-bold text-sm text-ink-primary">
                      {activeStep.charA === ' ' ? '␣' : activeStep.charA}
                    </div>
                    <span className="text-ink-secondary text-[11px]">A[{activeStep.i - 1}]</span>
                  </div>

                  <span className="text-ink-muted font-bold">vs</span>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-white border border-paper-border flex items-center justify-center font-bold text-sm text-ink-primary">
                      {activeStep.charB === ' ' ? '␣' : activeStep.charB}
                    </div>
                    <span className="text-ink-secondary text-[11px]">B[{activeStep.j - 1}]</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    activeStep.isMatch
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {activeStep.isMatch ? 'MATCH (+1)' : 'MISMATCH'}
                  </span>
                </div>
              </div>

              {/* Predecessor Evaluation Grid */}
              <div className="space-y-2">
                <span className="text-ink-muted text-[11px] block uppercase">Predecessor Candidates:</span>
                
                {activeStep.isMatch ? (
                  /* When characters match: Diagonal branch is chosen */
                  <div className="p-3 rounded-lg border bg-emerald-50 border-emerald-300 text-emerald-950 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">↖</span>
                        <span>Diagonal Match: L[i-1][j-1] + 1</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-extrabold">
                        {activeStep.value} ✓ WINNER
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-emerald-800">
                      Since A[{activeStep.i - 1}] equals B[{activeStep.j - 1}], this character belongs to the common subsequence. We increment the diagonal prefix length by 1.
                    </p>
                  </div>
                ) : (
                  /* When mismatch: Max between Top and Left */
                  <div className="space-y-2">
                    {/* Top Predecessor */}
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      activeStep.value === (activeStep.predecessors?.find(p => p.type === 'top')?.value ?? -1)
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold ring-1 ring-blue-200'
                        : 'bg-paper-muted border-paper-border text-ink-secondary'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-800">↑ Top:</span>
                        <span>L[{activeStep.i - 1}][{activeStep.j}] (Skip '{formatChar(activeStep.charA)}')</span>
                      </div>
                      <span className="font-mono font-bold">
                        {activeStep.predecessors?.find(p => p.type === 'top')?.value ?? 0}
                      </span>
                    </div>

                    {/* Left Predecessor */}
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      activeStep.value === (activeStep.predecessors?.find(p => p.type === 'left')?.value ?? -1) &&
                      activeStep.value !== (activeStep.predecessors?.find(p => p.type === 'top')?.value ?? -1)
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold ring-1 ring-blue-200'
                        : 'bg-paper-muted border-paper-border text-ink-secondary'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-800">← Left:</span>
                        <span>L[{activeStep.i}][{activeStep.j - 1}] (Skip '{formatChar(activeStep.charB)}')</span>
                      </div>
                      <span className="font-mono font-bold">
                        {activeStep.predecessors?.find(p => p.type === 'left')?.value ?? 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mathematical Recurrence Result */}
              <div className="p-3.5 rounded-lg bg-paper-muted border border-paper-border space-y-1">
                <span className="text-[10px] text-ink-muted uppercase block">Exact Recurrence Resolution:</span>
                <div className="text-ink-primary font-mono font-semibold">{activeStep.formula}</div>
                <div className="text-accent font-bold text-sm pt-0.5">{activeStep.calculation}</div>
              </div>

              {/* Plain English Educational Explanation */}
              <div className="text-xs font-sans text-ink-secondary leading-relaxed pt-1 border-t border-paper-border">
                <span className="font-mono text-ink-primary font-semibold block text-[11px] mb-1">
                  Algorithmic Rationale:
                </span>
                {activeStep.explanation}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-ink-muted font-mono space-y-2">
              <p>Prefix base conditions: L[i][0] = 0 and L[0][j] = 0.</p>
              <p className="text-[11px]">Click Next or Play to observe row-major dynamic programming tabulation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
