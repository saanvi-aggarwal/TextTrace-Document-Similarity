import React from 'react';
import { 
  Table, 
  Binary, 
  AlertTriangle 
} from 'lucide-react';
import { computeLCS } from '../utils/lcs';
import { computeEditDistance } from '../utils/editDistance';
import { 
  calculateLcsSimilarity, 
  calculateEditSimilarity, 
  formatPercentage 
} from '../utils/similarity';

export default function ResultsDashboard({ strA, strB, setActiveTab }) {
  const m = strA.length;
  const n = strB.length;

  const lcsRes = computeLCS(strA, strB);
  const editRes = computeEditDistance(strA, strB);

  const lcsSimValue = calculateLcsSimilarity(lcsRes.finalLcsLength, m, n);
  const editSimValue = calculateEditSimilarity(editRes.editDistance, m, n);

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#35C98A] font-semibold">
              Evaluation Completed
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/10 text-[#35C98A] border border-[#35C98A]/20">
              Deterministic DP
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Comparative Similarity Analysis Dashboard
          </h2>
          <p className="text-xs text-slate-400">
            Independent evaluations of subproblem alignment and single-character edit transformations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('lcs')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 text-xs font-semibold hover:border-[#8B7CFF] transition-all"
          >
            <Table className="w-3.5 h-3.5 text-[#8B7CFF]" />
            <span>Open LCS Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('edit-distance')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C2230] border border-[#242C3D] text-slate-200 text-xs font-semibold hover:border-[#36C5E8] transition-all"
          >
            <Binary className="w-3.5 h-3.5 text-[#36C5E8]" />
            <span>Open Edit Matrix</span>
          </button>
        </div>
      </div>

      {/* Primary Similarity Score Cards (Independent - NOT merged) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LCS Similarity Score Card */}
        <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] hover:border-[#8B7CFF]/50 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
                <Table className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">LCS Subsequence Similarity</h3>
                <span className="text-[11px] text-slate-400">Order-preserving shared subsequence</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              Formula: (2 × LCS / (m + n)) × 100
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#8B7CFF] font-mono">
              {formatPercentage(lcsSimValue)}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (LCS Length: <strong className="text-white">{lcsRes.finalLcsLength}</strong>)
            </span>
          </div>

          {/* Progress gauge bar */}
          <div className="w-full bg-[#0B0D12] rounded-full h-2.5 overflow-hidden border border-[#242C3D]">
            <div
              className="bg-gradient-to-r from-[#8B7CFF] to-[#6366F1] h-2.5 rounded-full transition-all duration-700 shadow-glow-violet"
              style={{ width: `${lcsSimValue}%` }}
            ></div>
          </div>

          {/* Detailed Metric Line */}
          <div className="pt-2 border-t border-[#242C3D] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>2 × {lcsRes.finalLcsLength} / ({m} + {n})</span>
            <span className="text-slate-300">
              LCS: <strong className="text-[#8B7CFF]">"{lcsRes.lcsString}"</strong>
            </span>
          </div>
        </div>

        {/* Levenshtein Edit Similarity Score Card */}
        <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] hover:border-[#36C5E8]/50 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#36C5E8]/15 flex items-center justify-center text-[#36C5E8]">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Levenshtein Edit Similarity</h3>
                <span className="text-[11px] text-slate-400">Single-character edit distance</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#36C5E8]/15 text-[#36C5E8] border border-[#36C5E8]/30">
              Formula: (1 - dist / max(m, n)) × 100
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#36C5E8] font-mono">
              {formatPercentage(editSimValue)}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (Edit Distance: <strong className="text-white">{editRes.editDistance}</strong>)
            </span>
          </div>

          {/* Progress gauge bar */}
          <div className="w-full bg-[#0B0D12] rounded-full h-2.5 overflow-hidden border border-[#242C3D]">
            <div
              className="bg-gradient-to-r from-[#36C5E8] to-[#0284C7] h-2.5 rounded-full transition-all duration-700 shadow-glow-cyan"
              style={{ width: `${editSimValue}%` }}
            ></div>
          </div>

          {/* Detailed Metric Line */}
          <div className="pt-2 border-t border-[#242C3D] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>1 - ({editRes.editDistance} / {Math.max(m, n)})</span>
            <span className="text-slate-300">
              Min Edits: <strong className="text-[#36C5E8]">{editRes.editDistance}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Length Text A (m)</span>
          <span className="text-lg font-bold text-white">{m}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Length Text B (n)</span>
          <span className="text-lg font-bold text-white">{n}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">LCS Length</span>
          <span className="text-lg font-bold text-[#8B7CFF]">{lcsRes.finalLcsLength}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Edit Distance</span>
          <span className="text-lg font-bold text-[#36C5E8]">{editRes.editDistance}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Matrix Cells</span>
          <span className="text-lg font-bold text-slate-200">{(m + 1) * (n + 1)}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#141821] border border-[#242C3D] space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Time Complexity</span>
          <span className="text-lg font-bold text-[#35C98A]">O(m×n)</span>
        </div>
      </div>

      {/* Visual Character-Level Alignment & Diff View */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Character-Level Alignment</h3>
            <p className="text-xs text-slate-400">
              Matched characters in the Longest Common Subsequence highlighted in green.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#35C98A]"></span>
              <span className="text-slate-300">LCS Match</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <span className="text-slate-400">Skipped/Edited</span>
            </span>
          </div>
        </div>

        {/* Text A Character Breakdown */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-slate-400">Text A Alignment:</span>
          <div className="flex flex-wrap gap-1 p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs">
            {m === 0 ? (
              <span className="text-slate-600 italic">[Empty String]</span>
            ) : (
              strA.split('').map((ch, idx) => {
                const isMatch = lcsRes.matchedIndicesA.includes(idx);
                return (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded font-bold transition-all ${
                      isMatch
                        ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/50'
                        : 'bg-[#141821] text-slate-500'
                    }`}
                  >
                    {ch === ' ' ? '␣' : ch}
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Text B Character Breakdown */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-slate-400">Text B Alignment:</span>
          <div className="flex flex-wrap gap-1 p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs">
            {n === 0 ? (
              <span className="text-slate-600 italic">[Empty String]</span>
            ) : (
              strB.split('').map((ch, idx) => {
                const isMatch = lcsRes.matchedIndicesB.includes(idx);
                return (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded font-bold transition-all ${
                      isMatch
                        ? 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/50'
                        : 'bg-[#141821] text-slate-500'
                    }`}
                  >
                    {ch === ' ' ? '␣' : ch}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Edit Operations Breakdown */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
        <h3 className="text-base font-bold text-white">Levenshtein Edit Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-slate-400">Matches (No-op)</span>
            <div className="text-xl font-bold text-[#35C98A]">
              {editRes.operationCounts ? editRes.operationCounts.MATCH : 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-slate-400">Substitutions</span>
            <div className="text-xl font-bold text-[#8B7CFF]">
              {editRes.operationCounts ? editRes.operationCounts.SUBSTITUTE : 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-slate-400">Deletions</span>
            <div className="text-xl font-bold text-[#FF9933]">
              {editRes.operationCounts ? editRes.operationCounts.DELETE : 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-1">
            <span className="text-slate-400">Insertions</span>
            <div className="text-xl font-bold text-[#36C5E8]">
              {editRes.operationCounts ? editRes.operationCounts.INSERT : 0}
            </div>
          </div>
        </div>
      </div>

      {/* Clear Academic Plagiarism Disclaimer Card */}
      <div className="p-5 rounded-2xl bg-[#141821] border border-[#FF6B70]/30 shadow-md flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-[#FF6B70]/15 text-[#FF6B70] shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Academic Caution & Context</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            "These scores represent textual similarity only. They do not establish plagiarism or determine authorship."
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Dynamic Programming provides rigorous mathematical character overlap. True academic attribution requires human contextual evaluation, citation analysis, and semantic understanding.
          </p>
        </div>
      </div>
    </div>
  );
}

