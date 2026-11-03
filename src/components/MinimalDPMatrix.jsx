import React from 'react';
import { formatChar } from '../utils/lcs';

export default function MinimalDPMatrix({
  strA,
  strB,
  matrix,
  currentStep,
  maxStepIndex,
  isBacktracking = false,
  backtrackPathCoords = new Set(),
  onCellClick,
  matrixName = 'L',
}) {
  const m = strA.length;
  const n = strB.length;

  const currentI = currentStep ? currentStep.i : null;
  const currentJ = currentStep ? currentStep.j : null;

  const predecessors = currentStep && currentStep.predecessors ? currentStep.predecessors : [];
  const diagPred = predecessors.find((p) => p.type === 'diagonal');
  const topPred = predecessors.find((p) => p.type === 'top');
  const leftPred = predecessors.find((p) => p.type === 'left');

  const isCellComputed = (i, j) => {
    if (i === 0 || j === 0) return true;
    if (maxStepIndex === undefined || maxStepIndex === null) return true;
    const stepIdxOfCell = (i - 1) * n + (j - 1);
    return stepIdxOfCell <= maxStepIndex;
  };

  return (
    <div className="space-y-3 select-none">
      {/* Scrollable Matrix Table */}
      <div className="overflow-auto max-h-[520px] p-4 sm:p-5 rounded-xl bg-paper-card border border-paper-border shadow-xs">
        <div className="inline-block min-w-full">
          {/* Header Row: Indices & Characters of Text B */}
          <div className="flex items-end mb-1.5">
            <div className="w-16 shrink-0 text-right pr-3 pb-1 text-[11px] font-mono text-ink-muted">
              i \ j
            </div>

            {/* Column 0: Epsilon */}
            <div className="flex flex-col items-center min-w-[42px] px-1 pb-1 text-center font-mono text-xs">
              <span className="text-[10px] text-ink-muted">0</span>
              <span className="text-xs font-bold text-ink-secondary">ε</span>
            </div>

            {/* Columns 1..n */}
            {strB.split('').map((ch, idx) => {
              const colIdx = idx + 1;
              const isActive = currentJ === colIdx;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center min-w-[42px] px-1 pb-1 text-center font-mono text-xs transition-colors rounded-t ${
                    isActive ? 'bg-accent/10 text-accent font-bold ring-1 ring-accent/30' : 'text-ink-secondary'
                  }`}
                >
                  <span className="text-[10px] text-ink-muted">{colIdx}</span>
                  <span className="text-sm font-bold" title={`B[${idx}] = '${formatChar(ch)}'`}>
                    {ch === ' ' ? '␣' : ch}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Matrix Body: Rows 0..m */}
          {Array.from({ length: m + 1 }).map((_, rIdx) => {
            const isRowActive = currentI === rIdx;
            const rowChar = rIdx > 0 ? strA[rIdx - 1] : 'ε';

            return (
              <div key={rIdx} className="flex items-center mb-1.5">
                {/* Row Header along Left */}
                <div
                  className={`w-16 shrink-0 flex items-center justify-end gap-2 pr-3 font-mono text-xs transition-colors rounded-l py-1 ${
                    isRowActive ? 'bg-accent/10 text-accent font-bold ring-1 ring-accent/30' : 'text-ink-secondary'
                  }`}
                >
                  <span className="text-[10px] text-ink-muted">{rIdx}</span>
                  <span
                    className="font-bold text-sm"
                    title={rIdx > 0 ? `A[${rIdx - 1}] = '${formatChar(rowChar)}'` : 'ε'}
                  >
                    {rowChar === ' ' ? '␣' : rowChar}
                  </span>
                </div>

                {/* Cells in Row */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: n + 1 }).map((__, cIdx) => {
                    const isCurrent = currentI === rIdx && currentJ === cIdx;
                    const isDiag = diagPred && diagPred.i === rIdx && diagPred.j === cIdx;
                    const isTop = topPred && topPred.i === rIdx && topPred.j === cIdx;
                    const isLeft = leftPred && leftPred.i === rIdx && leftPred.j === cIdx;
                    const isBacktrack = isBacktracking && backtrackPathCoords.has(`${rIdx},${cIdx}`);
                    const isComputed = isCellComputed(rIdx, cIdx);

                    let cellStyle = 'bg-white text-ink-primary border-paper-border hover:border-neutral-400 hover:bg-neutral-50';
                    let badge = null;

                    if (isCurrent) {
                      cellStyle = 'bg-accent text-white border-accent font-extrabold shadow-sm ring-2 ring-accent/30 scale-105 z-10';
                    } else if (isBacktrack) {
                      cellStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-extrabold ring-1 ring-emerald-300';
                      badge = '★';
                    } else if (isDiag) {
                      cellStyle = 'bg-blue-100 text-blue-950 border-blue-300 font-bold';
                      badge = '↖';
                    } else if (isTop) {
                      cellStyle = 'bg-amber-100 text-amber-950 border-amber-300 font-bold';
                      badge = '↑';
                    } else if (isLeft) {
                      cellStyle = 'bg-purple-100 text-purple-950 border-purple-300 font-bold';
                      badge = '←';
                    } else if (!isComputed) {
                      cellStyle = 'bg-paper-muted text-neutral-300 border-paper-border';
                    }

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => onCellClick && onCellClick(rIdx, cIdx)}
                        title={`${matrixName}[${rIdx}][${cIdx}] = ${isComputed ? matrix[rIdx][cIdx] : 'Uncomputed'}${
                          rIdx > 0 && cIdx > 0 ? ` (A[${rIdx-1}]='${formatChar(strA[rIdx-1])}', B[${cIdx-1}]='${formatChar(strB[cIdx-1])}')` : ''
                        }`}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center font-mono text-xs border rounded-lg transition-all cursor-pointer ${cellStyle}`}
                      >
                        {badge && !isCurrent && (
                          <span className="absolute top-0.5 right-1 text-[9px] opacity-75 font-sans leading-none">
                            {badge}
                          </span>
                        )}
                        <span className="font-semibold text-xs sm:text-sm">
                          {isComputed ? matrix[rIdx][cIdx] : '·'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Legend & Interactive Hint */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-secondary pt-1 px-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-ink-muted text-[11px] uppercase">Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-accent border border-accent"></span>
            <span className="text-ink-primary font-medium">Active (i, j)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 text-blue-900 text-[10px] flex items-center justify-center">↖</span>
            <span>Diagonal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[10px] flex items-center justify-center">↑</span>
            <span>Top</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-100 border border-purple-300 text-purple-900 text-[10px] flex items-center justify-center">←</span>
            <span>Left</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 text-emerald-900 text-[10px] flex items-center justify-center">★</span>
            <span className="text-emerald-800 font-semibold">Optimal Path</span>
          </div>
        </div>

        <span className="text-ink-muted text-[11px] hidden sm:inline">
          Tip: Click any cell to inspect its calculation
        </span>
      </div>
    </div>
  );
}
