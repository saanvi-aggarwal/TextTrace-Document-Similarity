import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  FastForward, 
  Table, 
  Workflow, 
  ArrowRight
} from 'lucide-react';
import ModeSwitcher from './ModeSwitcher';
import LCSAnimationMode from './LCSAnimationMode';
import DPMatrix from './DPMatrix';
import AlgorithmExplanationPanel from './AlgorithmExplanationPanel';
import BacktrackingVisualizer from './BacktrackingVisualizer';
import { computeLCS } from '../utils/lcs';
import { createPathLookup } from '../utils/backtracking';

export default function LCSVisualizer({ strA, strB, setActiveTab }) {
  // Compute LCS data deterministically (memoized for performance)
  const lcsData = useMemo(() => computeLCS(strA, strB), [strA, strB]);

  // Dual Presentation Modes: 'learning' or 'animation'
  const [presentationMode, setPresentationMode] = useState('learning');

  // Learning Mode Sub-Views: 'tabulation' or 'backtracking'
  const [activeSubView, setActiveSubView] = useState('tabulation');

  // Calculation step index (-1 to totalSteps - 1)
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(800); // ms per step

  const timerRef = useRef(null);

  // Synchronize step index when input strings change
  useEffect(() => {
    setCurrentStepIdx(lcsData.totalSteps > 0 ? 0 : -1);
    setIsPlaying(false);
  }, [lcsData]);

  // Playback timer loop for Learning Mode
  useEffect(() => {
    if (isPlaying && presentationMode === 'learning') {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= lcsData.totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, lcsData.totalSteps, presentationMode]);

  const handleNextStep = () => {
    if (currentStepIdx < lcsData.totalSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    } else if (currentStepIdx === 0) {
      setCurrentStepIdx(-1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(-1);
  };

  const handleJumpToFinal = () => {
    setIsPlaying(false);
    setCurrentStepIdx(lcsData.totalSteps - 1);
  };

  const handleCellClick = (rIdx, cIdx) => {
    if (rIdx === 0 || cIdx === 0) return;
    const targetIdx = (rIdx - 1) * lcsData.n + (cIdx - 1);
    if (targetIdx >= 0 && targetIdx < lcsData.totalSteps) {
      setIsPlaying(false);
      setCurrentStepIdx(targetIdx);
    }
  };

  const currentStep = currentStepIdx >= 0 && currentStepIdx < lcsData.totalSteps
    ? lcsData.steps[currentStepIdx]
    : null;

  const backtrackCoords = createPathLookup(lcsData.backtrackSteps);
  const isCalculationComplete = currentStepIdx === lcsData.totalSteps - 1 || lcsData.totalSteps === 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Workspace Header */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B7CFF] font-semibold">
              Algorithm Workspace
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              DP Matrix: ({lcsData.m + 1} × {lcsData.n + 1})
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Longest Common Subsequence Visualizer
          </h2>
          <p className="text-xs text-slate-400">
            Compare Text A ("{strA}") and Text B ("{strB}") through dynamic programming.
          </p>
        </div>

        {/* Quick info badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-slate-300">
            LCS Length: <strong className="text-[#8B7CFF]">{lcsData.finalLcsLength}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-slate-300">
            Cells: <strong className="text-white">{(lcsData.m + 1) * (lcsData.n + 1)}</strong>
          </span>
        </div>
      </div>

      {/* Dual Mode Switcher Component */}
      <ModeSwitcher
        currentMode={presentationMode}
        onModeChange={(mode) => {
          setIsPlaying(false);
          setPresentationMode(mode);
        }}
        algorithmName="LCS"
      />

      {/* ================= PRESENTATION MODE 1: LEARNING MODE ================= */}
      {presentationMode === 'learning' ? (
        <div className="space-y-6">
          {/* Sub-view switcher: Tabulation Phase vs Backtracking Path */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#141821] border border-[#242C3D]">
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider pl-2">
              Learning Focus:
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B0D12] border border-[#242C3D]">
              <button
                onClick={() => setActiveSubView('tabulation')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSubView === 'tabulation'
                    ? 'bg-[#8B7CFF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Tabulation Phase</span>
              </button>
              <button
                onClick={() => setActiveSubView('backtracking')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSubView === 'backtracking'
                    ? 'bg-[#35C98A] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Backtracking Path</span>
              </button>
            </div>
          </div>

          {activeSubView === 'tabulation' ? (
            <div className="space-y-6">
              {/* Stepper Controls Bar */}
              <div className="p-4 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-300 hover:text-white hover:bg-[#242C3D] transition-colors"
                    title="Reset to Initial Matrix"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIdx <= -1}
                    className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 disabled:opacity-30 hover:bg-[#242C3D] transition-colors"
                    title="Previous Cell (Step Backward)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={isCalculationComplete && !isPlaying}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B7CFF] text-white text-xs font-bold hover:opacity-90 disabled:opacity-40 transition-all shadow-glow-violet active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={isCalculationComplete}
                    className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 disabled:opacity-30 hover:bg-[#242C3D] transition-colors"
                    title="Next Cell (Step Forward)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleJumpToFinal}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-300 text-xs font-semibold hover:text-white hover:bg-[#242C3D] transition-colors"
                    title="Jump directly to final result"
                  >
                    <FastForward className="w-3.5 h-3.5 text-[#35C98A]" />
                    <span className="hidden sm:inline">Jump to Final</span>
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono text-slate-300">
                    Step: <strong className="text-white">{currentStepIdx + 1}</strong> / {lcsData.totalSteps}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400 hidden sm:inline">Speed:</span>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-200 focus:outline-none focus:border-[#8B7CFF]"
                    >
                      <option value={1500}>0.5x (Slow)</option>
                      <option value={800}>1.0x (Normal)</option>
                      <option value={400}>2.0x (Fast)</option>
                      <option value={150}>5.0x (Turbo)</option>
                      <option value={40}>Instant</option>
                    </select>
                  </div>

                  {isCalculationComplete && (
                    <button
                      onClick={() => setActiveSubView('backtracking')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40 text-xs font-bold hover:bg-[#35C98A] hover:text-white transition-all"
                    >
                      <span>View Backtrack</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Side-by-Side: DP Matrix on Left, Explanation Panel on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      DP Table L[0..{lcsData.m}][0..{lcsData.n}]
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Tip: Click any cell to inspect its computation
                    </span>
                  </div>
                  <DPMatrix
                    strA={strA}
                    strB={strB}
                    matrix={lcsData.matrix}
                    currentStep={currentStep}
                    maxStepIndex={currentStepIdx}
                    onCellClick={handleCellClick}
                    algorithmType="lcs"
                  />
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Step Arithmetic & Decision Logic
                  </span>
                  <AlgorithmExplanationPanel
                    step={currentStep}
                    algorithmType="lcs"
                    matrixName="L"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <DPMatrix
                    strA={strA}
                    strB={strB}
                    matrix={lcsData.matrix}
                    isBacktracking={true}
                    backtrackPathCoords={backtrackCoords}
                    algorithmType="lcs"
                  />
                </div>

                <div className="lg:col-span-5">
                  <BacktrackingVisualizer
                    algorithmType="lcs"
                    data={lcsData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= PRESENTATION MODE 2: ANIMATION MODE ================= */
        <LCSAnimationMode lcsData={lcsData} />
      )}
    </div>
  );
}
