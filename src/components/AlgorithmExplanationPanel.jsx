import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowDownRight, 
  ArrowUp, 
  ArrowLeft, 
  Info, 
  Calculator
} from 'lucide-react';
import { formatChar } from '../utils/lcs';

export default function AlgorithmExplanationPanel({
  step,
  algorithmType = 'lcs', // 'lcs' or 'editDistance'
  matrixName = 'L', // 'L' for LCS or 'D' for Edit Distance
}) {
  if (!step) {
    return (
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] text-center space-y-3">
        <Info className="w-8 h-8 text-[#8B7CFF] mx-auto opacity-70" />
        <h3 className="text-sm font-bold text-white">Dynamic Step Explanation</h3>
        <p className="text-xs text-slate-400">
          Use the playback controls or click any matrix cell to inspect its exact recurrence calculation, predecessor values, and arithmetic derivation.
        </p>
      </div>
    );
  }

  const { i, j, charA, charB, isMatch, value, formula, calculation, explanation, predecessors } = step;

  return (
    <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-5 shadow-lg">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#242C3D]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Current Computation
          </span>
        </div>
        <div className="px-3 py-1 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6] font-mono text-xs font-bold">
          {matrixName}[{i}][{j}] = {value}
        </div>
      </div>

      {/* Characters Compared */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Characters Compared
        </span>
        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-[10px] text-slate-300 block">Text A [index {i - 1}]:</span>
            <div className="text-sm font-bold text-white">
              '{formatChar(charA)}'
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-[10px] text-slate-300 block">Text B [index {j - 1}]:</span>
            <div className="text-sm font-bold text-white">
              '{formatChar(charB)}'
            </div>
          </div>
        </div>
      </div>

      {/* Condition / Comparison State */}
      <div className="space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Condition
        </span>
        <div
          className={`p-3 rounded-xl border flex items-center gap-3 ${
            isMatch
              ? 'bg-[#35C98A]/10 border-[#35C98A]/30 text-[#35C98A]'
              : 'bg-[#FF6B70]/10 border-[#FF6B70]/30 text-[#FF6B70]'
          }`}
        >
          {isMatch ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0" />
          )}
          <div>
            <div className="text-xs font-bold">
              {isMatch ? 'Characters Match' : 'Characters Differ (Mismatch)'}
            </div>
            <div className="text-[11px] opacity-90 font-mono mt-0.5">
              {isMatch
                ? `A[${i - 1}] === B[${j - 1}] ('${formatChar(charA)}')`
                : `A[${i - 1}] !== B[${j - 1}] ('${formatChar(charA)}' ≠ '${formatChar(charB)}')`}
            </div>
          </div>
        </div>
      </div>

      {/* Recurrence Relation & Explicit Arithmetic */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-3.5 h-3.5 text-[#8B7CFF]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Recurrence Evaluation & Arithmetic
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs space-y-2">
          <div className="text-[#36C5E8] font-semibold">
            Formula: {formula}
          </div>
          <div className="text-[#35C98A] font-bold text-sm">
            Calculation: {calculation}
          </div>
        </div>
      </div>

      {/* Predecessors Breakdown */}
      {predecessors && predecessors.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Candidate Predecessors Evaluated
          </span>
          <div className="space-y-1.5 font-mono text-xs">
            {predecessors.map((p, pIdx) => {
              const isSelected = p.isMax || p.isMin || predecessors.length === 1;
              return (
                <div
                  key={pIdx}
                  className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#1C2230] border-slate-400 text-white font-semibold'
                      : 'bg-[#0B0D12] border-[#242C3D] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {p.type === 'diagonal' && <ArrowDownRight className="w-3.5 h-3.5 text-[#36C5E8]" />}
                    {p.type === 'top' && <ArrowUp className="w-3.5 h-3.5 text-[#FF9933]" />}
                    {p.type === 'left' && <ArrowLeft className="w-3.5 h-3.5 text-[#A855F7]" />}
                    <span>{p.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">({p.i}, {p.j}) =</span>
                    <span className="font-bold">{p.total !== undefined ? p.total : p.value}</span>
                    {isSelected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#35C98A]/20 text-[#35C98A] font-sans font-bold">
                        SELECTED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Narrative Explanation */}
      <div className="p-3.5 rounded-xl bg-[#0B0D12]/70 border border-[#242C3D] text-xs text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-200 block mb-1">
          Why this happens:
        </span>
        {explanation}
      </div>
    </div>
  );
}

