import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AnimationControlPanel from './AnimationControlPanel';
import DPMatrix from './DPMatrix';
import { calculateLcsSimilarity, formatPercentage } from '../utils/similarity';
import { createPathLookup } from '../utils/backtracking';

export default function LCSAnimationMode({ lcsData }) {
  const { strA, strB, m, n, matrix, steps, totalSteps, finalLcsLength, lcsString, backtrackSteps, matchedIndicesA, matchedIndicesB } = lcsData;

  const STAGES = [
    { id: 1, name: 'Stage 1: Input Strings' },
    { id: 2, name: 'Stage 2: Character Scan' },
    { id: 3, name: 'Stage 3: DP Matrix Fill' },
    { id: 4, name: 'Stage 4: Backtrack Path' },
    { id: 5, name: 'Stage 5: Final Result' },
  ];

  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1200); // ms

  // Stage 2: Character comparison scan index
  const [charScanIdx, setCharScanIdx] = useState(0);

  // Stage 3: Progressive matrix calculation step
  const [matrixStepIdx, setMatrixStepIdx] = useState(0);

  // Stage 4: Backtracking step index
  const [backtrackIdx, setBacktrackIdx] = useState(0);

  // Stage 5: Revealed characters in final LCS
  const [revealedCharsCount, setRevealedCharsCount] = useState(lcsString.length);

  const stageTimerRef = useRef(null);

  // Auto-play across stages and inner steps
  useEffect(() => {
    if (!isPlaying) {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      return;
    }

    stageTimerRef.current = setInterval(() => {
      if (currentStage === 1) {
        // After showing strings, advance to stage 2
        setCurrentStage(2);
        setCharScanIdx(0);
      } else if (currentStage === 2) {
        // Scan pairs
        setCharScanIdx((prev) => {
          if (prev >= totalSteps - 1 || prev >= 8) { // scan sample or wrap
            setCurrentStage(3);
            setMatrixStepIdx(0);
            return 0;
          }
          return prev + 1;
        });
      } else if (currentStage === 3) {
        // Progressive matrix fill
        setMatrixStepIdx((prev) => {
          if (prev >= totalSteps - 1) {
            setCurrentStage(4);
            setBacktrackIdx(0);
            return totalSteps - 1;
          }
          // Jump in increments if large
          const stepJump = totalSteps > 50 ? 3 : 1;
          return Math.min(totalSteps - 1, prev + stepJump);
        });
      } else if (currentStage === 4) {
        // Backtracking
        setBacktrackIdx((prev) => {
          if (prev >= backtrackSteps.length - 1) {
            setCurrentStage(5);
            setRevealedCharsCount(0);
            return backtrackSteps.length - 1;
          }
          return prev + 1;
        });
      } else if (currentStage === 5) {
        // Reveal result
        setRevealedCharsCount((prev) => {
          if (prev >= lcsString.length) {
            setIsPlaying(false);
            return lcsString.length;
          }
          return prev + 1;
        });
      }
    }, playbackSpeed);

    return () => {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    };
  }, [isPlaying, currentStage, playbackSpeed, totalSteps, backtrackSteps.length, lcsString.length]);

  const handleNextStage = () => {
    if (currentStage < 5) {
      setCurrentStage((prev) => prev + 1);
      if (currentStage === 2) setMatrixStepIdx(totalSteps - 1);
      if (currentStage === 3) setBacktrackIdx(0);
      if (currentStage === 4) setRevealedCharsCount(lcsString.length);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
    }
  };

  const handleSelectStage = (stageNum) => {
    setCurrentStage(stageNum);
    if (stageNum === 3 && matrixStepIdx === 0) setMatrixStepIdx(totalSteps - 1);
    if (stageNum === 4) setBacktrackIdx(0);
    if (stageNum === 5) setRevealedCharsCount(lcsString.length);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStage(1);
    setCharScanIdx(0);
    setMatrixStepIdx(0);
    setBacktrackIdx(0);
    setRevealedCharsCount(0);
  };

  // Helper values for current steps
  const activeScanStep = steps && steps.length > 0 ? steps[charScanIdx % steps.length] : null;
  const activeMatrixStep = steps && steps.length > 0 ? steps[matrixStepIdx % steps.length] : null;
  const activeBacktrackStep = backtrackSteps && backtrackSteps.length > 0 ? backtrackSteps[backtrackIdx % backtrackSteps.length] : null;

  // Build backtrack path coordinate subset up to current backtrack index
  const visibleBacktrackSteps = backtrackSteps.slice(0, backtrackIdx + 1);
  const backtrackPathLookup = createPathLookup(visibleBacktrackSteps);

  const lcsSimilarity = calculateLcsSimilarity(finalLcsLength, m, n);

  return (
    <div className="space-y-6">
      {/* Animation Persistent Control Panel */}
      <AnimationControlPanel
        currentStage={currentStage}
        totalStages={5}
        stages={STAGES}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNextStage={handleNextStage}
        onPrevStage={handlePrevStage}
        onSelectStage={handleSelectStage}
        onReset={handleReset}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
      />

      {/* ================= STAGE 1: INPUT STRINGS ================= */}
      {currentStage === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-8 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                Stage 1 / 5
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#36C5E8]/10 text-[#36C5E8] border border-[#36C5E8]/20">
                Input Array Dissection
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Deconstructing Source & Target Character Sequences
            </h3>
            <p className="text-xs text-slate-400">
              Each character corresponds to a row or column index in the Dynamic Programming matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text A Character Ribbon */}
            <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#8B7CFF]/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#8B7CFF]/20 text-[#8B7CFF] font-mono text-xs font-bold flex items-center justify-center">
                    A
                  </span>
                  <span className="text-sm font-bold text-white">Text A (Rows)</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Length m = <strong className="text-white">{m}</strong>
                </span>
              </div>

              {/* Character Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {m === 0 ? (
                  <span className="text-xs text-slate-500 italic">ε (Empty String)</span>
                ) : (
                  strA.split('').map((char, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center min-w-[42px] h-[52px] px-2 rounded-xl bg-[#141821] border border-[#8B7CFF]/40 text-white font-mono shadow-sm transition-transform hover:scale-105"
                    >
                      <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5">i={idx + 1}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Text B Character Ribbon */}
            <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#36C5E8]/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#36C5E8]/20 text-[#36C5E8] font-mono text-xs font-bold flex items-center justify-center">
                    B
                  </span>
                  <span className="text-sm font-bold text-white">Text B (Columns)</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Length n = <strong className="text-white">{n}</strong>
                </span>
              </div>

              {/* Character Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {n === 0 ? (
                  <span className="text-xs text-slate-500 italic">ε (Empty String)</span>
                ) : (
                  strB.split('').map((char, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center min-w-[42px] h-[52px] px-2 rounded-xl bg-[#141821] border border-[#36C5E8]/40 text-white font-mono shadow-sm transition-transform hover:scale-105"
                    >
                      <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5">j={idx + 1}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] flex items-center justify-between text-xs text-slate-400">
            <span>
              Next, the algorithm iterates through each pair of prefixes $(A[0..i-1], B[0..j-1])$ to compare characters.
            </span>
            <button
              onClick={() => setCurrentStage(2)}
              className="flex items-center gap-1 text-[#36C5E8] font-bold hover:underline shrink-0"
            >
              <span>Proceed to Character Scan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STAGE 2: CHARACTER COMPARISON ================= */}
      {currentStage === 2 && activeScanStep && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                  Stage 2 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
                  Step {charScanIdx + 1} of {totalSteps}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Character-by-Character Alignment & Comparison
              </h3>
            </div>

            {/* Pair stepper controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCharScanIdx((prev) => Math.max(0, prev - 1))}
                disabled={charScanIdx <= 0}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                Pair ({activeScanStep.i}, {activeScanStep.j})
              </span>
              <button
                onClick={() => setCharScanIdx((prev) => Math.min(totalSteps - 1, prev + 1))}
                disabled={charScanIdx >= totalSteps - 1}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Character Focus Spotlight */}
          <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#242C3D] flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              {/* Text A Character Tile */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-mono text-slate-400">A[{activeScanStep.i - 1}]</span>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-mono text-2xl font-extrabold border-2 transition-all duration-300 ${
                  activeScanStep.isMatch
                    ? 'bg-[#35C98A]/20 text-[#35C98A] border-[#35C98A] shadow-glow-green scale-110'
                    : 'bg-[#141821] text-white border-[#8B7CFF]'
                }`}>
                  {activeScanStep.charA === ' ' ? '␣' : activeScanStep.charA}
                </div>
                <span className="text-[11px] font-mono text-[#8B7CFF]">Text A</span>
              </div>

              {/* Connecting Visual Comparison Badge */}
              <div className="flex flex-col items-center space-y-1">
                {activeScanStep.isMatch ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <span className="px-3 py-1 rounded-full bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A] font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>MATCH</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#35C98A] mt-1">+1 Diagonal</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="px-3 py-1 rounded-full bg-[#FF6B70]/20 text-[#FF6B70] border border-[#FF6B70] font-bold text-xs flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>MISMATCH</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">max(Top, Left)</span>
                  </div>
                )}
              </div>

              {/* Text B Character Tile */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs font-mono text-slate-400">B[{activeScanStep.j - 1}]</span>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-mono text-2xl font-extrabold border-2 transition-all duration-300 ${
                  activeScanStep.isMatch
                    ? 'bg-[#35C98A]/20 text-[#35C98A] border-[#35C98A] shadow-glow-green scale-110'
                    : 'bg-[#141821] text-white border-[#36C5E8]'
                }`}>
                  {activeScanStep.charB === ' ' ? '␣' : activeScanStep.charB}
                </div>
                <span className="text-[11px] font-mono text-[#36C5E8]">Text B</span>
              </div>
            </div>

            {/* Explanation text */}
            <div className="max-w-lg text-center p-3 rounded-xl bg-[#141821] border border-[#242C3D] text-xs text-slate-300">
              {activeScanStep.explanation}
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 3: DYNAMIC PROGRAMMING MATRIX ================= */}
      {currentStage === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                  Stage 3 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/15 text-[#35C98A] border border-[#35C98A]/30">
                  Dependency Table Animation
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Progressive Matrix Fill & Recurrence Calculation
              </h3>
            </div>

            {/* Matrix step controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMatrixStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={matrixStepIdx <= 0}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                Cell {matrixStepIdx + 1} / {totalSteps}
              </span>
              <button
                onClick={() => setMatrixStepIdx((prev) => Math.min(totalSteps - 1, prev + 1))}
                disabled={matrixStepIdx >= totalSteps - 1}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active cell formula card */}
          {activeMatrixStep && (
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#36C5E8]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#36C5E8] px-2.5 py-1 rounded bg-[#36C5E8]/10 border border-[#36C5E8]/30">
                  L[{activeMatrixStep.i}][{activeMatrixStep.j}]
                </span>
                <span className="text-xs font-mono text-white">
                  Formula: {activeMatrixStep.formula}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#35C98A] bg-[#35C98A]/10 px-3 py-1 rounded-lg border border-[#35C98A]/30">
                {activeMatrixStep.calculation}
              </span>
            </div>
          )}

          {/* Animated DP Matrix */}
          <div className="overflow-x-auto">
            <DPMatrix
              strA={strA}
              strB={strB}
              matrix={matrix}
              currentStep={activeMatrixStep}
              maxStepIndex={matrixStepIdx}
              algorithmType="lcs"
            />
          </div>
        </div>
      )}

      {/* ================= STAGE 4: BACKTRACKING PATH ================= */}
      {currentStage === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#35C98A] font-bold">
                  Stage 4 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/15 text-[#35C98A] border border-[#35C98A]/30">
                  Tracing Optimal Decisions
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Deterministic Matrix Backtracking
              </h3>
            </div>

            {/* Backtrack step controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBacktrackIdx((prev) => Math.max(0, prev - 1))}
                disabled={backtrackIdx <= 0}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                Path Step {backtrackIdx + 1} / {backtrackSteps.length}
              </span>
              <button
                onClick={() => setBacktrackIdx((prev) => Math.min(backtrackSteps.length - 1, prev + 1))}
                disabled={backtrackIdx >= backtrackSteps.length - 1}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Backtrack transition highlight */}
          {activeBacktrackStep && (
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#35C98A]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#35C98A] animate-ping"></span>
                  Transition: ({activeBacktrackStep.i}, {activeBacktrackStep.j}) → ({activeBacktrackStep.nextI}, {activeBacktrackStep.nextJ})
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeBacktrackStep.action === 'MATCH'
                    ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40'
                    : 'bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40'
                }`}>
                  {activeBacktrackStep.action}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300">
                {activeBacktrackStep.reason}
              </p>
            </div>
          )}

          {/* Matrix with Backtrack Path */}
          <div className="overflow-x-auto">
            <DPMatrix
              strA={strA}
              strB={strB}
              matrix={matrix}
              isBacktracking={true}
              backtrackPathCoords={backtrackPathLookup}
              algorithmType="lcs"
            />
          </div>
        </div>
      )}

      {/* ================= STAGE 5: FINAL RESULT ================= */}
      {currentStage === 5 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-8 animate-fadeIn">
          <div className="space-y-1 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#35C98A]/10 text-[#35C98A] border border-[#35C98A]/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stage 5: Final Subsequence Synthesis</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Longest Common Subsequence Identified
            </h3>
            <p className="text-xs text-slate-400">
              The longest sequence appearing in both strings in identical relative order.
            </p>
          </div>

          {/* Big Subsequence Reveal Box */}
          <div className="p-8 rounded-2xl bg-[#0B0D12] border border-[#35C98A]/50 flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Reconstructed LCS String:
            </span>

            <div className="flex items-center gap-2 flex-wrap justify-center min-h-[50px]">
              {lcsString ? (
                lcsString.slice(0, revealedCharsCount).split('').map((ch, idx) => (
                  <span
                    key={idx}
                    className="w-12 h-14 rounded-xl bg-[#35C98A]/20 border border-[#35C98A] text-[#35C98A] font-mono text-2xl font-extrabold flex items-center justify-center shadow-glow-green animate-fadeIn"
                  >
                    {ch === ' ' ? '␣' : ch}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500 italic">[No common characters]</span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>LCS Length: <strong className="text-white text-sm">{finalLcsLength}</strong> characters</span>
              <span>•</span>
              <span>LCS Similarity: <strong className="text-[#35C98A] text-sm">{formatPercentage(lcsSimilarity)}</strong></span>
            </div>
          </div>

          {/* Metric Cards Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Text A Matched</span>
              <div className="text-lg font-bold text-white">
                {matchedIndicesA.length} / {m} chars
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Text B Matched</span>
              <div className="text-lg font-bold text-white">
                {matchedIndicesB.length} / {n} chars
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Time Complexity</span>
              <div className="text-lg font-bold text-[#35C98A]">
                O(m × n)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
