import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Check, 
  Sparkles, 
  ArrowDownRight, 
  ArrowUp, 
  Layers,
  Info
} from 'lucide-react';
import { formatChar } from '../utils/lcs';
import { TIE_BREAKING_DOCUMENTATION } from '../utils/backtracking';

export default function BacktrackingVisualizer({
  algorithmType = 'lcs', // 'lcs' or 'editDistance'
  data, // return object from computeLCS or computeEditDistance
  onHighlightStep,
}) {
  const isLCS = algorithmType === 'lcs';
  const steps = data.backtrackSteps || [];
  const [currentBacktrackIdx, setCurrentBacktrackIdx] = useState(0);

  const currentStep = steps[currentBacktrackIdx];

  const handleNext = () => {
    if (currentBacktrackIdx < steps.length - 1) {
      const nextIdx = currentBacktrackIdx + 1;
      setCurrentBacktrackIdx(nextIdx);
      if (onHighlightStep) onHighlightStep(steps[nextIdx]);
    }
  };

  const handlePrev = () => {
    if (currentBacktrackIdx > 0) {
      const prevIdx = currentBacktrackIdx - 1;
      setCurrentBacktrackIdx(prevIdx);
      if (onHighlightStep) onHighlightStep(steps[prevIdx]);
    }
  };

  const handleReset = () => {
    setCurrentBacktrackIdx(0);
    if (onHighlightStep && steps.length > 0) onHighlightStep(steps[0]);
  };

  return (
    <div className="space-y-6">
      {/* Backtrack Header & Controls */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#35C98A] font-semibold">
              Backtracking Reconstruction
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/10 text-[#35C98A] border border-[#35C98A]/20">
              Starts at ({data.m}, {data.n})
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {isLCS ? 'Subsequence Alignment Path' : 'Optimal Edit Transformation Script'}
          </h3>
          <p className="text-xs text-slate-400">
            Traces backwards from the bottom-right cell to determine the sequence of optimal decisions.
          </p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentBacktrackIdx === 0}
            className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 disabled:opacity-40 hover:bg-[#242C3D] transition-colors"
            title="Previous Backtrack Step"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0B0D12] text-slate-300 border border-[#242C3D]">
            Step {steps.length > 0 ? currentBacktrackIdx + 1 : 0} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentBacktrackIdx >= steps.length - 1}
            className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 disabled:opacity-40 hover:bg-[#242C3D] transition-colors"
            title="Next Backtrack Step"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-400 hover:text-white hover:bg-[#242C3D] transition-colors"
            title="Reset to Start of Backtracking"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Backtrack Step Detail Card */}
      {currentStep && (
        <div className="p-5 rounded-2xl bg-[#141821] border border-[#35C98A]/40 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#35C98A] animate-ping"></span>
              <span className="text-xs font-mono font-bold text-white">
                Matrix Step: ({currentStep.i}, {currentStep.j}) → ({currentStep.nextI}, {currentStep.nextJ})
              </span>
            </div>
            <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md ${
              currentStep.action === 'MATCH'
                ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40'
                : currentStep.action === 'SUBSTITUTE'
                ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/40'
                : currentStep.action === 'DELETE' || currentStep.action === 'SKIP_A'
                ? 'bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40'
                : 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/40'
            }`}>
              ACTION: {currentStep.action}
            </span>
          </div>

          <p className="text-xs font-mono text-slate-300 bg-[#0B0D12] p-3 rounded-xl border border-[#242C3D]">
            {currentStep.reason}
          </p>
        </div>
      )}

      {/* LCS Specific Reconstructed Strings & Char Highlighting */}
      {isLCS && (
        <div className="space-y-4">
          {/* Result Subsequence */}
          <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Reconstructed Longest Common Subsequence
              </span>
              <span className="text-xs font-mono text-[#35C98A] font-bold">
                Length: {data.finalLcsLength}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] flex items-center justify-center">
              {data.lcsString ? (
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#35C98A] tracking-wider">
                  "{data.lcsString}"
                </span>
              ) : (
                <span className="text-xs text-slate-500 italic">
                  [Empty: No common characters found between the two strings]
                </span>
              )}
            </div>
          </div>

          {/* Matched & Skipped Characters in Text A and Text B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Text A Character Breakdown */}
            <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Text A Character Alignment</span>
                <span className="text-[11px] font-mono text-slate-400">{data.strA.length} chars</span>
              </div>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D]">
                {data.strA.split('').map((ch, idx) => {
                  const isMatched = data.matchedIndicesA.includes(idx);
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded font-mono text-xs font-bold transition-all ${
                        isMatched
                          ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/60'
                          : 'bg-[#1C2230] text-slate-500 line-through'
                      }`}
                      title={isMatched ? `Index ${idx}: '${formatChar(ch)}' is included in LCS` : `Index ${idx}: '${formatChar(ch)}' is skipped`}
                    >
                      {ch === ' ' ? '␣' : ch}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="text-[#35C98A] font-medium">● {data.matchedIndicesA.length} Matched</span>
                <span className="text-slate-500">● {data.skippedIndicesA.length} Skipped</span>
              </div>
            </div>

            {/* Text B Character Breakdown */}
            <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Text B Character Alignment</span>
                <span className="text-[11px] font-mono text-slate-400">{data.strB.length} chars</span>
              </div>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D]">
                {data.strB.split('').map((ch, idx) => {
                  const isMatched = data.matchedIndicesB.includes(idx);
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded font-mono text-xs font-bold transition-all ${
                        isMatched
                          ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/60'
                          : 'bg-[#1C2230] text-slate-500 line-through'
                      }`}
                      title={isMatched ? `Index ${idx}: '${formatChar(ch)}' is included in LCS` : `Index ${idx}: '${formatChar(ch)}' is skipped`}
                    >
                      {ch === ' ' ? '␣' : ch}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="text-[#35C98A] font-medium">● {data.matchedIndicesB.length} Matched</span>
                <span className="text-slate-500">● {data.skippedIndicesB.length} Skipped</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Distance Specific Transformation Sequence */}
      {!isLCS && data.transformations && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#36C5E8] font-semibold">
                  Step-by-Step String Evolution Script
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Transforming Text A ("{data.strA}") → Text B ("{data.strB}")
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#36C5E8]/15 text-[#36C5E8] border border-[#36C5E8]/30 font-bold">
                  Total Operations: {data.editDistance}
                </span>
              </div>
            </div>

            {/* Sequence of Transformations */}
            <div className="space-y-2">
              {data.transformations.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs transition-all ${
                    t.type === 'MATCH'
                      ? 'bg-[#0B0D12] border-[#242C3D] text-slate-300'
                      : 'bg-[#141821] border-slate-700 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-300 w-5">#{t.step}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.type === 'MATCH'
                        ? 'bg-slate-800 text-slate-400'
                        : t.type === 'SUBSTITUTE'
                        ? 'bg-[#8B7CFF]/20 text-[#8B7CFF]'
                        : t.type === 'DELETE'
                        ? 'bg-[#FF9933]/20 text-[#FF9933]'
                        : 'bg-[#36C5E8]/20 text-[#36C5E8]'
                    }`}>
                      {t.type}
                    </span>
                    <span className="text-slate-300">{t.description}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 pl-8 sm:pl-0">
                    <span className="text-slate-400">Result:</span>
                    <span className="text-[#35C98A] font-bold">"{t.after}"</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      (+{t.cost})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Academic Tie-Breaking and Alternative Paths Note */}
      <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#8B7CFF] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200">
            {isLCS ? 'LCS Tie-Breaking Determinism:' : 'Multiple Optimal Solution Note:'}
          </strong>
          <p className="leading-relaxed">
            {isLCS
              ? TIE_BREAKING_DOCUMENTATION.lcs.explanation
              : `${TIE_BREAKING_DOCUMENTATION.editDistance.explanation} If multiple transformation sequences achieve the same minimum operations count, this path represents one valid optimal execution script.`}
          </p>
        </div>
      </div>
    </div>
  );
}

