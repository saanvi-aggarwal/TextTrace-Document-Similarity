import React from 'react';
import MatrixCell from './MatrixCell';
import { formatChar } from '../utils/lcs';

export default function DPMatrix({
  strA,
  strB,
  matrix,
  currentStep,
  maxStepIndex,
  isBacktracking = false,
  backtrackPathCoords = new Set(),
  onCellClick,
  algorithmType = 'lcs' // 'lcs' or 'editDistance'
}) {
  const m = strA.length;
  const n = strB.length;

  // Active cell coordinates
  const currentI = currentStep ? currentStep.i : null;
  const currentJ = currentStep ? currentStep.j : null;

  // Predecessor lookup
  const predecessors = currentStep && currentStep.predecessors ? currentStep.predecessors : [];
  const diagPred = predecessors.find((p) => p.type === 'diagonal');
  const topPred = predecessors.find((p) => p.type === 'top');
  const leftPred = predecessors.find((p) => p.type === 'left');

  // Helper to test if a cell (i, j) is computed based on current playback step
  const isCellComputed = (i, j) => {
    // Row 0 and Col 0 are always computed base cases
    if (i === 0 || j === 0) return true;
    if (maxStepIndex === undefined || maxStepIndex === null) return true;
    // Step index in row-major order is (i - 1) * n + (j - 1)
    const stepIdxOfCell = (i - 1) * n + (j - 1);
    return stepIdxOfCell <= maxStepIndex;
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Scrollable Container for Matrix */}
      <div className="overflow-auto max-h-[580px] p-4 rounded-2xl bg-[#0B0D12] border border-[#242C3D] shadow-inner">
        <div className="inline-block min-w-full">
          {/* Header Row: Indices & Characters of Text B */}
          <div className="flex items-end mb-1">
            {/* Top-left blank headers */}
            <div className="w-16 sm:w-20 shrink-0 text-right pr-3 pb-1">
              <span className="text-[10px] font-mono text-slate-300 uppercase block">A ↓ / B →</span>
            </div>

            {/* Column 0: Epsilon / Empty prefix */}
            <div className="flex flex-col items-center min-w-[44px] sm:min-w-[48px] px-1 pb-1">
              <span className="text-[10px] font-mono text-slate-300">j=0</span>
              <div className="text-xs font-mono font-bold text-slate-400 bg-[#141821] px-2 py-1 rounded border border-[#242C3D]">
                ε
              </div>
            </div>

            {/* Columns 1..n */}
            {strB.split('').map((ch, idx) => {
              const colIdx = idx + 1;
              const isColActive = currentJ === colIdx;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center min-w-[44px] sm:min-w-[48px] px-1 pb-1 transition-colors ${
                    isColActive ? 'text-[#36C5E8]' : 'text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-mono">j={colIdx}</span>
                  <div
                    className={`text-xs font-mono font-bold px-2 py-1 rounded border transition-all ${
                      isColActive
                        ? 'bg-[#36C5E8]/20 text-[#36C5E8] border-[#36C5E8] shadow-glow-cyan'
                        : 'bg-[#141821] text-slate-300 border-[#242C3D]'
                    }`}
                    title={`Character B[${idx}] = '${formatChar(ch)}'`}
                  >
                    {ch === ' ' ? '␣' : ch}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Matrix Body: Rows 0..m */}
          {Array.from({ length: m + 1 }).map((_, rIdx) => {
            const isRowActive = currentI === rIdx;
            const rowChar = rIdx > 0 ? strA[rIdx - 1] : 'ε';

            return (
              <div key={rIdx} className="flex items-center mb-1">
                {/* Row Header along Left */}
                <div className="w-16 sm:w-20 shrink-0 flex items-center justify-end gap-1 pr-3">
                  <span className={`text-[10px] font-mono ${isRowActive ? 'text-[#8B7CFF] font-bold' : 'text-slate-300'}`}>
                    i={rIdx}
                  </span>
                  <div
                    className={`text-xs font-mono font-bold px-2 py-1 rounded border transition-all ${
                      isRowActive
                        ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border-[#8B7CFF] shadow-glow-violet'
                        : 'bg-[#141821] text-slate-300 border-[#242C3D]'
                    }`}
                    title={rIdx > 0 ? `Character A[${rIdx - 1}] = '${formatChar(rowChar)}'` : 'Empty string ε'}
                  >
                    {rowChar === ' ' ? '␣' : rowChar}
                  </div>
                </div>

                {/* Cells in Row */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: n + 1 }).map((__, cIdx) => {
                    const isCurrent = currentI === rIdx && currentJ === cIdx;
                    const isDiag = diagPred && diagPred.i === rIdx && diagPred.j === cIdx;
                    const isTop = topPred && topPred.i === rIdx && topPred.j === cIdx;
                    const isLeft = leftPred && leftPred.i === rIdx && leftPred.j === cIdx;
                    const isBacktrack = isBacktracking && backtrackPathCoords.has(`${rIdx},${cIdx}`);
                    const isFinal = rIdx === m && cIdx === n;
                    const isComputed = isCellComputed(rIdx, cIdx);

                    return (
                      <MatrixCell
                        key={cIdx}
                        value={matrix[rIdx][cIdx]}
                        isComputed={isComputed}
                        isCurrent={isCurrent}
                        isDiagonalPredecessor={isDiag}
                        isTopPredecessor={isTop}
                        isLeftPredecessor={isLeft}
                        isBacktrackPath={isBacktrack}
                        isFinalResult={isFinal}
                        tooltip={`Cell (${rIdx}, ${cIdx}) = ${isComputed ? matrix[rIdx][cIdx] : 'Uncomputed'}`}
                        onClick={() => {
                          if (onCellClick) {
                            onCellClick(rIdx, cIdx);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matrix Color Legend */}
      <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-mono text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
          Matrix Legend:
        </span>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#3B82F6] border border-blue-400 shadow-sm"></span>
            <span className="text-slate-300">Current Cell</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#36C5E8]/30 border border-[#36C5E8]"></span>
            <span className="text-[#36C5E8]">Diagonal (Match / Sub)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#FF9933]/30 border border-[#FF9933]"></span>
            <span className="text-[#FF9933]">Top (Exclude A / Del)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#A855F7]/30 border border-[#A855F7]"></span>
            <span className="text-[#A855F7]">Left (Exclude B / Ins)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#35C98A]/30 border border-[#35C98A]"></span>
            <span className="text-[#35C98A]">Optimal Path / Result</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#141821] border border-[#242C3D]"></span>
            <span className="text-slate-300">Uncomputed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

