import React from 'react';

export default function MatrixCell({
  value,
  isComputed,
  isCurrent,
  isDiagonalPredecessor,
  isTopPredecessor,
  isLeftPredecessor,
  isBacktrackPath,
  isFinalResult,
  onClick,
  subLabel,
  tooltip,
}) {
  // Determine background and border styling based on status priority
  let bgClass = 'bg-[#141821] text-slate-500 border-[#242C3D]'; // default uncomputed
  let glowClass = '';

  if (isCurrent) {
    // Current active cell (Blue / Electric Violet)
    bgClass = 'bg-[#3B82F6] text-white border-blue-400 font-bold scale-105 z-20';
    glowClass = 'shadow-[0_0_15px_rgba(59,130,246,0.6)]';
  } else if (isBacktrackPath) {
    // Optimal Backtracking path (Green)
    bgClass = 'bg-[#35C98A]/25 text-[#35C98A] border-[#35C98A] font-bold z-10';
    glowClass = 'shadow-[0_0_10px_rgba(53,201,138,0.4)]';
  } else if (isDiagonalPredecessor) {
    // Diagonal predecessor (Cyan)
    bgClass = 'bg-[#36C5E8]/25 text-[#36C5E8] border-[#36C5E8] font-semibold';
    glowClass = 'ring-1 ring-[#36C5E8]/50';
  } else if (isTopPredecessor) {
    // Top predecessor (Orange)
    bgClass = 'bg-[#FF9933]/25 text-[#FF9933] border-[#FF9933] font-semibold';
    glowClass = 'ring-1 ring-[#FF9933]/50';
  } else if (isLeftPredecessor) {
    // Left predecessor (Purple)
    bgClass = 'bg-[#A855F7]/25 text-[#A855F7] border-[#A855F7] font-semibold';
    glowClass = 'ring-1 ring-[#A855F7]/50';
  } else if (isFinalResult) {
    // Final result bottom-right (Green border)
    bgClass = 'bg-[#35C98A]/15 text-[#35C98A] border-[#35C98A]/80 font-bold';
  } else if (isComputed) {
    // Computed regular cell
    bgClass = 'bg-[#0E121A] text-slate-200 border-[#242C3D] hover:border-slate-500';
  }

  return (
    <div
      onClick={onClick}
      title={tooltip || ''}
      className={`relative min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex flex-col items-center justify-center border rounded-lg cursor-pointer transition-all duration-150 select-none ${bgClass} ${glowClass}`}
    >
      <span className="font-mono text-sm leading-none font-bold">
        {isComputed ? value : '·'}
      </span>
      {subLabel && (
        <span className="text-[9px] font-mono opacity-80 leading-none mt-0.5">
          {subLabel}
        </span>
      )}
    </div>
  );
}

