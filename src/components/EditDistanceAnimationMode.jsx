import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';
import AnimationControlPanel from './AnimationControlPanel';
import DPMatrix from './DPMatrix';
import { formatChar } from '../utils/lcs';
import { calculateEditSimilarity, formatPercentage } from '../utils/similarity';
import { createPathLookup } from '../utils/backtracking';

export default function EditDistanceAnimationMode({ editData }) {
  const { strA, strB, m, n, matrix, steps, totalSteps, editDistance, backtrackSteps, transformations, operationCounts } = editData;

  const STAGES = [
    { id: 1, name: 'Stage 1: Initial Strings' },
    { id: 2, name: 'Stage 2: DP Candidate Cost' },
    { id: 3, name: 'Stage 3: Optimal Edit Path' },
    { id: 4, name: 'Stage 4: String Evolution' },
    { id: 5, name: 'Stage 5: Final Result' },
  ];

  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1200); // ms

  // Stage 2: progressive matrix fill
  const [matrixStepIdx, setMatrixStepIdx] = useState(0);

  // Stage 3: backtrack path step
  const [backtrackIdx, setBacktrackIdx] = useState(0);

  // Stage 4: transformation script step
  const [transformStepIdx, setTransformStepIdx] = useState(0);

  const stageTimerRef = useRef(null);

  // Auto-play across stages and inner steps
  useEffect(() => {
    if (!isPlaying) {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      return;
    }

    stageTimerRef.current = setInterval(() => {
      if (currentStage === 1) {
        setCurrentStage(2);
        setMatrixStepIdx(0);
      } else if (currentStage === 2) {
        setMatrixStepIdx((prev) => {
          if (prev >= totalSteps - 1) {
            setCurrentStage(3);
            setBacktrackIdx(0);
            return totalSteps - 1;
          }
          const jump = totalSteps > 50 ? 3 : 1;
          return Math.min(totalSteps - 1, prev + jump);
        });
      } else if (currentStage === 3) {
        setBacktrackIdx((prev) => {
          if (prev >= backtrackSteps.length - 1) {
            setCurrentStage(4);
            setTransformStepIdx(0);
            return backtrackSteps.length - 1;
          }
          return prev + 1;
        });
      } else if (currentStage === 4) {
        setTransformStepIdx((prev) => {
          if (prev >= transformations.length - 1) {
            setCurrentStage(5);
            return transformations.length - 1;
          }
          return prev + 1;
        });
      } else if (currentStage === 5) {
        setIsPlaying(false);
      }
    }, playbackSpeed);

    return () => {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    };
  }, [isPlaying, currentStage, playbackSpeed, totalSteps, backtrackSteps.length, transformations.length]);

  const handleNextStage = () => {
    if (currentStage < 5) {
      setCurrentStage((prev) => prev + 1);
      if (currentStage === 1) setMatrixStepIdx(totalSteps - 1);
      if (currentStage === 2) setBacktrackIdx(0);
      if (currentStage === 3) setTransformStepIdx(transformations.length - 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
    }
  };

  const handleSelectStage = (stageNum) => {
    setCurrentStage(stageNum);
    if (stageNum === 2 && matrixStepIdx === 0) setMatrixStepIdx(totalSteps - 1);
    if (stageNum === 3) setBacktrackIdx(0);
    if (stageNum === 4) setTransformStepIdx(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStage(1);
    setMatrixStepIdx(0);
    setBacktrackIdx(0);
    setTransformStepIdx(0);
  };

  const activeMatrixStep = steps && steps.length > 0 ? steps[matrixStepIdx % steps.length] : null;
  const activeBacktrackStep = backtrackSteps && backtrackSteps.length > 0 ? backtrackSteps[backtrackIdx % backtrackSteps.length] : null;
  const activeTransform = transformations && transformations.length > 0 ? transformations[transformStepIdx % transformations.length] : null;

  const visibleBacktrackSteps = backtrackSteps.slice(0, backtrackIdx + 1);
  const backtrackPathLookup = createPathLookup(visibleBacktrackSteps);

  const editSimilarity = calculateEditSimilarity(editDistance, m, n);

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

      {/* ================= STAGE 1: INITIAL STRINGS ================= */}
      {currentStage === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-8 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                Stage 1 / 5
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#36C5E8]/10 text-[#36C5E8] border border-[#36C5E8]/20">
                Source & Target Characters
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Initial Strings & Base Transformation Costs
            </h3>
            <p className="text-xs text-slate-400">
              Transforming the source string into the target string requires calculating atomic edit operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source String A */}
            <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#8B7CFF]/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#8B7CFF]/20 text-[#8B7CFF] font-mono text-xs font-bold flex items-center justify-center">
                    A
                  </span>
                  <span className="text-sm font-bold text-white">Source String</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Length m = <strong className="text-white">{m}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {m === 0 ? (
                  <span className="text-xs text-slate-500 italic">ε (Empty String)</span>
                ) : (
                  strA.split('').map((char, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center min-w-[42px] h-[52px] px-2 rounded-xl bg-[#141821] border border-[#8B7CFF]/40 text-white font-mono shadow-sm"
                    >
                      <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5">i={idx + 1}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Target String B */}
            <div className="p-5 rounded-2xl bg-[#0B0D12] border border-[#36C5E8]/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#36C5E8]/20 text-[#36C5E8] font-mono text-xs font-bold flex items-center justify-center">
                    B
                  </span>
                  <span className="text-sm font-bold text-white">Target String</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Length n = <strong className="text-white">{n}</strong>
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {n === 0 ? (
                  <span className="text-xs text-slate-500 italic">ε (Empty String)</span>
                ) : (
                  strB.split('').map((char, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center min-w-[42px] h-[52px] px-2 rounded-xl bg-[#141821] border border-[#36C5E8]/40 text-white font-mono shadow-sm"
                    >
                      <span className="text-sm font-bold">{char === ' ' ? '␣' : char}</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5">j={idx + 1}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Base Case Info */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] flex items-center justify-between text-xs text-slate-400">
            <span>
              Base initializations: <code className="text-[#36C5E8]">D[0][j] = j</code> (insertions) and <code className="text-[#FF9933]">D[i][0] = i</code> (deletions).
            </span>
            <button
              onClick={() => setCurrentStage(2)}
              className="flex items-center gap-1 text-[#36C5E8] font-bold hover:underline shrink-0"
            >
              <span>Proceed to DP Execution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STAGE 2: DP CANDIDATE COST ================= */}
      {currentStage === 2 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                  Stage 2 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#36C5E8]/15 text-[#36C5E8] border border-[#36C5E8]/30">
                  Minimum Cost Evaluator
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Progressive DP Tabulation & Candidate Operations
              </h3>
            </div>

            {/* Stepper controls */}
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

          {/* Active 3 Candidates Card */}
          {activeMatrixStep && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {/* Deletion candidate */}
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-1 ${
                activeMatrixStep.value === activeMatrixStep.deletionVal
                  ? 'bg-[#FF9933]/15 border-[#FF9933] text-white shadow-sm'
                  : 'bg-[#0B0D12] border-[#242C3D] text-slate-400'
              }`}>
                <span className="text-[10px] uppercase font-bold text-[#FF9933]">1. Deletion (Top)</span>
                <div className="text-sm font-bold">D[i-1][j] + 1 = {activeMatrixStep.deletionVal}</div>
                <span className="text-[10px] opacity-80">Delete '{formatChar(activeMatrixStep.charA)}'</span>
              </div>

              {/* Insertion candidate */}
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-1 ${
                activeMatrixStep.value === activeMatrixStep.insertionVal
                  ? 'bg-[#36C5E8]/15 border-[#36C5E8] text-white shadow-sm'
                  : 'bg-[#0B0D12] border-[#242C3D] text-slate-400'
              }`}>
                <span className="text-[10px] uppercase font-bold text-[#36C5E8]">2. Insertion (Left)</span>
                <div className="text-sm font-bold">D[i][j-1] + 1 = {activeMatrixStep.insertionVal}</div>
                <span className="text-[10px] opacity-80">Insert '{formatChar(activeMatrixStep.charB)}'</span>
              </div>

              {/* Substitution candidate */}
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-1 ${
                activeMatrixStep.value === activeMatrixStep.substitutionVal
                  ? 'bg-[#35C98A]/15 border-[#35C98A] text-white shadow-sm'
                  : 'bg-[#0B0D12] border-[#242C3D] text-slate-400'
              }`}>
                <span className="text-[10px] uppercase font-bold text-[#35C98A]">3. Substitution / Match</span>
                <div className="text-sm font-bold">
                  D[i-1][j-1] + {activeMatrixStep.subCost} = {activeMatrixStep.substitutionVal}
                </div>
                <span className="text-[10px] opacity-80">
                  {activeMatrixStep.isMatch ? 'Cost 0 (Match)' : 'Cost 1 (Substitute)'}
                </span>
              </div>
            </div>
          )}

          {/* Matrix render */}
          <div className="overflow-x-auto">
            <DPMatrix
              strA={strA}
              strB={strB}
              matrix={matrix}
              currentStep={activeMatrixStep}
              maxStepIndex={matrixStepIdx}
              algorithmType="editDistance"
            />
          </div>
        </div>
      )}

      {/* ================= STAGE 3: OPTIMAL EDIT PATH ================= */}
      {currentStage === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#35C98A] font-bold">
                  Stage 3 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/15 text-[#35C98A] border border-[#35C98A]/30">
                  Optimal Path Tracing
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Backtracking Minimum-Cost Edit Decisions
              </h3>
            </div>

            {/* Stepper controls */}
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

          {/* Active Backtrack Step Detail */}
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
                    : activeBacktrackStep.action === 'SUBSTITUTE'
                    ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/40'
                    : activeBacktrackStep.action === 'DELETE'
                    ? 'bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40'
                    : 'bg-[#36C5E8]/20 text-[#36C5E8] border border-[#36C5E8]/40'
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
              algorithmType="editDistance"
            />
          </div>
        </div>
      )}

      {/* ================= STAGE 4: STRING EVOLUTION ================= */}
      {currentStage === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-bold">
                  Stage 4 / 5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#36C5E8]/15 text-[#36C5E8] border border-[#36C5E8]/30">
                  Sequential Execution Script
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Step-by-Step String Transformation Evolution
              </h3>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTransformStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={transformStepIdx <= 0}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                Edit {transformStepIdx + 1} / {transformations.length}
              </span>
              <button
                onClick={() => setTransformStepIdx((prev) => Math.min(transformations.length - 1, prev + 1))}
                disabled={transformStepIdx >= transformations.length - 1}
                className="p-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-slate-300 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transformation Spotlight */}
          {activeTransform && (
            <div className="p-6 rounded-2xl bg-[#0B0D12] border border-[#36C5E8]/40 space-y-6">
              <div className="flex items-center justify-between border-b border-[#242C3D] pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#36C5E8]">Operation #{activeTransform.step}:</span>
                  <span className={`px-2.5 py-0.5 rounded font-mono font-bold ${
                    activeTransform.type === 'MATCH'
                      ? 'bg-slate-800 text-slate-300'
                      : activeTransform.type === 'SUBSTITUTE'
                      ? 'bg-[#8B7CFF]/20 text-[#8B7CFF]'
                      : activeTransform.type === 'DELETE'
                      ? 'bg-[#FF9933]/20 text-[#FF9933]'
                      : 'bg-[#36C5E8]/20 text-[#36C5E8]'
                  }`}>
                    {activeTransform.type}
                  </span>
                </div>
                <span className="font-mono text-slate-400">
                  Cost: <strong>+{activeTransform.cost}</strong> edit
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
                {/* Before */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">State Before:</span>
                  <div className="p-3.5 rounded-xl bg-[#141821] border border-[#242C3D] font-mono text-xl font-bold text-slate-300 min-w-[140px]">
                    "{activeTransform.before}"
                  </div>
                </div>

                <div className="text-[#36C5E8] flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                  <span className="text-[10px] font-mono mt-1 text-slate-400">{activeTransform.description}</span>
                </div>

                {/* After */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">State After:</span>
                  <div className="p-3.5 rounded-xl bg-[#141821] border border-[#35C98A] font-mono text-xl font-bold text-[#35C98A] min-w-[140px] shadow-glow-green">
                    "{activeTransform.after}"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Transformation Timeline Strip */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Timeline Script:</span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {transformations.map((t, idx) => {
                const isActive = idx === transformStepIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => setTransformStepIdx(idx)}
                    className={`p-2.5 rounded-xl border cursor-pointer font-mono text-xs flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#1C2230] border-[#36C5E8] text-white shadow-sm'
                        : 'bg-[#0B0D12] border-[#242C3D] text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-70">#{t.step}</span>
                      <span className="font-bold">{t.type}:</span>
                      <span>{t.description}</span>
                    </div>
                    <span className="text-[#35C98A] font-bold">"{t.after}"</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 5: FINAL RESULT ================= */}
      {currentStage === 5 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-8 animate-fadeIn">
          <div className="space-y-1 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36C5E8]/10 text-[#36C5E8] border border-[#36C5E8]/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stage 5: Transformation Final Synthesis</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Target String Successfully Reached
            </h3>
            <p className="text-xs text-slate-400">
              The minimum sequence of character operations required to morph Text A into Text B.
            </p>
          </div>

          {/* Result Highlight Box */}
          <div className="p-8 rounded-2xl bg-[#0B0D12] border border-[#36C5E8]/50 flex flex-col items-center justify-center space-y-4 shadow-2xl">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Resulting Target String:
            </span>

            <span className="font-mono text-3xl font-extrabold text-[#36C5E8] tracking-wider">
              "{strB}"
            </span>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span>Minimum Edit Distance: <strong className="text-white text-sm">{editDistance}</strong> operations</span>
              <span>•</span>
              <span>Edit Similarity: <strong className="text-[#36C5E8] text-sm">{formatPercentage(editSimilarity)}</strong></span>
            </div>
          </div>

          {/* Operation Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase text-[10px]">Substitutions</span>
              <div className="text-xl font-bold text-[#8B7CFF]">
                {operationCounts ? operationCounts.SUBSTITUTE : 0}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase text-[10px]">Deletions</span>
              <div className="text-xl font-bold text-[#FF9933]">
                {operationCounts ? operationCounts.DELETE : 0}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase text-[10px]">Insertions</span>
              <div className="text-xl font-bold text-[#36C5E8]">
                {operationCounts ? operationCounts.INSERT : 0}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
              <span className="text-slate-400 uppercase text-[10px]">Matches (Cost 0)</span>
              <div className="text-xl font-bold text-[#35C98A]">
                {operationCounts ? operationCounts.MATCH : 0}
              </div>
            </div>
          </div>

          {/* Academic Multiple Optimal Paths Disclaimer */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-400 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#36C5E8] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-200">Optimal Path Determinism:</strong>
              <p className="leading-relaxed">
                If multiple alternative sequences achieve the same minimum operations count, this animation models one valid optimal transformation script. All optimal paths share the identical global minimum edit distance ({editDistance}).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
