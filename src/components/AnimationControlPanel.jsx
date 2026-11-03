import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';

export default function AnimationControlPanel({
  currentStage,
  totalStages = 5,
  stages = [],
  isPlaying,
  onTogglePlay,
  onNextStage,
  onPrevStage,
  onSelectStage,
  onReset,
  playbackSpeed,
  onChangeSpeed,
}) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4 shadow-lg">
      {/* Top row: Stage Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {stages.map((stage, idx) => {
          const stageNum = idx + 1;
          const isActive = currentStage === stageNum;
          const isCompleted = currentStage > stageNum;

          return (
            <button
              key={stageNum}
              onClick={() => onSelectStage(stageNum)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#36C5E8]/20 text-[#36C5E8] border-[#36C5E8] shadow-glow-cyan'
                  : isCompleted
                  ? 'bg-[#1C2230] text-slate-300 border-[#242C3D] hover:border-slate-500'
                  : 'bg-[#0B0D12] text-slate-400 border-[#242C3D] hover:text-slate-300'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive
                  ? 'bg-[#36C5E8] text-[#0B0D12]'
                  : isCompleted
                  ? 'bg-[#35C98A] text-[#0B0D12]'
                  : 'bg-[#242C3D] text-slate-400'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : stageNum}
              </span>
              <span>{stage.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom row: Stepper Controls, Play/Pause, Speed */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#242C3D]">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-300 hover:text-white hover:bg-[#242C3D] transition-colors"
            title="Reset Animation to Stage 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onPrevStage}
            disabled={currentStage <= 1}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 text-xs font-semibold disabled:opacity-40 hover:bg-[#242C3D] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev Stage</span>
          </button>

          <button
            onClick={onTogglePlay}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#36C5E8] to-[#0284C7] text-[#0B0D12] text-xs font-bold hover:opacity-90 shadow-glow-cyan transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-[#0B0D12]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-[#0B0D12]" />
                <span>{currentStage >= totalStages ? 'Replay' : 'Play Story'}</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStage}
            disabled={currentStage >= totalStages}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 text-xs font-semibold disabled:opacity-40 hover:bg-[#242C3D] transition-colors"
          >
            <span className="hidden sm:inline">Next Stage</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector & Stage Counter */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-slate-300">
            Stage <strong className="text-[#36C5E8] text-sm">{currentStage}</strong> of {totalStages}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => onChangeSpeed(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-lg bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-200 focus:outline-none focus:border-[#36C5E8] font-mono font-medium"
            >
              <option value={2000}>0.5x (Slow)</option>
              <option value={1200}>1.0x (Normal)</option>
              <option value={800}>1.5x (Brisk)</option>
              <option value={450}>2.0x (Fast)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
