import React from 'react';
import { LayoutGrid, PlayCircle, Sparkles, BookOpen } from 'lucide-react';

export default function ModeSwitcher({ currentMode, onModeChange, algorithmName = 'LCS' }) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8B7CFF] animate-pulse"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Visualization Presentation Mode
          </span>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex p-1 rounded-xl bg-[#0B0D12] border border-[#242C3D] self-start sm:self-auto">
          <button
            onClick={() => onModeChange('learning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentMode === 'learning'
                ? 'bg-[#8B7CFF] text-white shadow-glow-violet'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C2230]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Learning Mode</span>
          </button>

          <button
            onClick={() => onModeChange('animation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentMode === 'animation'
                ? 'bg-gradient-to-r from-[#36C5E8] to-[#0284C7] text-[#0B0D12] font-bold shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C2230]'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Animation Mode</span>
          </button>
        </div>
      </div>

      {/* Mode Description Subtitle */}
      <div className="text-xs text-slate-400 flex items-center gap-2 pt-1 border-t border-[#242C3D]/60">
        {currentMode === 'learning' ? (
          <>
            <BookOpen className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0" />
            <span>
              <strong className="text-slate-200">Learning Mode:</strong> Understand every calculation, recurrence relation, and predecessor dependency step by step.
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-[#36C5E8] shrink-0" />
            <span>
              <strong className="text-slate-200">Animation Mode:</strong> Watch {algorithmName} execute through interactive visual storytelling across 5 sequential stages.
            </span>
          </>
        )}
      </div>
    </div>
  );
}

