import React, { useState } from 'react';
import { 
  Scale, 
  Table, 
  Binary, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Code2
} from 'lucide-react';
import { computeLCS } from '../utils/lcs';
import { computeEditDistance } from '../utils/editDistance';
import { calculateLcsSimilarity, calculateEditSimilarity, formatPercentage } from '../utils/similarity';

export default function AlgorithmComparison({ onTryInputs }) {
  // Interactive mini experiment
  const [demoA, setDemoA] = useState('algorithm');
  const [demoB, setDemoB] = useState('logarithm');

  const lcsRes = computeLCS(demoA, demoB);
  const editRes = computeEditDistance(demoA, demoB);
  const lcsSim = calculateLcsSimilarity(lcsRes.finalLcsLength, demoA.length, demoB.length);
  const editSim = calculateEditSimilarity(editRes.editDistance, demoA.length, demoB.length);

  const comparisonRows = [
    {
      feature: 'Core Purpose',
      lcs: 'Find the maximum length of matching characters that maintain relative order without needing to be contiguous.',
      edit: 'Find the minimum count of atomic edit operations required to convert string A into string B.',
    },
    {
      feature: 'DP State Meaning',
      lcs: 'L[i][j]: Length of the LCS of prefixes A[0..i-1] and B[0..j-1].',
      edit: 'D[i][j]: Minimum edit distance between prefixes A[0..i-1] and B[0..j-1].',
    },
    {
      feature: 'Base Cases',
      lcs: 'L[i][0] = 0, L[0][j] = 0 (comparing with an empty string yields 0 common characters).',
      edit: 'D[i][0] = i (i deletions), D[0][j] = j (j insertions).',
    },
    {
      feature: 'Recurrence Relation',
      lcs: 'If match: 1 + L[i-1][j-1]\nElse: max(L[i-1][j], L[i][j-1])',
      edit: 'min(D[i-1][j]+1, D[i][j-1]+1, D[i-1][j-1] + (A[i-1]==B[j-1]? 0 : 1))',
    },
    {
      feature: 'Allowed Operations',
      lcs: 'Keep matching character (diagonal) or Skip character from A (up) / Skip from B (left).',
      edit: 'Match (0 cost), Substitution (1 cost), Deletion (1 cost), Insertion (1 cost).',
    },
    {
      feature: 'Primary Output',
      lcs: 'Subsequence string and length (e.g. "ittn", length 4).',
      edit: 'Integer edit count and sequential step transformation script.',
    },
    {
      feature: 'Time Complexity',
      lcs: 'O(m × n) where m = |A|, n = |B|.',
      edit: 'O(m × n) where m = |A|, n = |B|.',
    },
    {
      feature: 'Space Complexity',
      lcs: 'O(m × n) matrix for full backtracking reconstruction.',
      edit: 'O(m × n) matrix for full transformation backtracking.',
    },
    {
      feature: 'Key Strengths',
      lcs: 'Immune to filler words/noise insertion; captures overall retained structural phrases and sequence flow.',
      edit: 'Sensitive to localized typos, transpositions, and exact edit penalties; ideal for spelling correction.',
    },
    {
      feature: 'Limitations',
      lcs: 'Ignores character transpositions and substitutions; does not penalize distance between matching fragments.',
      edit: 'Penalizes large structural movements severely (e.g. moving a paragraph requires deleting and reinserting).',
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/30 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Comparative Algorithmic Framework</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          LCS vs. Levenshtein Edit Distance
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Both algorithms employ 2D Dynamic Programming tables of size <code className="text-[#36C5E8]">(m+1) × (n+1)</code>, yet optimize fundamentally distinct objective functions.
        </p>
      </div>

      {/* Interactive Case Demonstration: Why they differ */}
      <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242C3D]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B7CFF]" />
              Interactive Divergence Sandbox
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Observe how rearranging or moving a prefix affects LCS vs. Edit Distance differently.
            </p>
          </div>

          {/* Quick presets for this demonstration */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => { setDemoA('algorithm'); setDemoB('logarithm'); }}
              className="px-2.5 py-1 rounded-lg bg-[#1C2230] text-slate-300 hover:text-white border border-[#242C3D]"
            >
              "algorithm" / "logarithm"
            </button>
            <button
              onClick={() => { setDemoA('kitten'); setDemoB('sitting'); }}
              className="px-2.5 py-1 rounded-lg bg-[#1C2230] text-slate-300 hover:text-white border border-[#242C3D]"
            >
              "kitten" / "sitting"
            </button>
          </div>
        </div>

        {/* Inputs for sandbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">String A:</label>
            <input
              type="text"
              value={demoA}
              onChange={(e) => setDemoA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-white font-mono text-xs focus:outline-none focus:border-[#8B7CFF]"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">String B:</label>
            <input
              type="text"
              value={demoB}
              onChange={(e) => setDemoB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-white font-mono text-xs focus:outline-none focus:border-[#36C5E8]"
            />
          </div>
        </div>

        {/* Live Comparison Result */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* LCS Result */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#8B7CFF]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8B7CFF] font-bold">LCS Metric</span>
              <span className="text-white font-bold">{formatPercentage(lcsSim)}</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Common Subsequence: <strong className="text-white font-mono">"{lcsRes.lcsString}"</strong></div>
              <div className="text-[11px] text-slate-400">Length: {lcsRes.finalLcsLength} chars</div>
            </div>
          </div>

          {/* Edit Distance Result */}
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#36C5E8]/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#36C5E8] font-bold">Edit Distance Metric</span>
              <span className="text-white font-bold">{formatPercentage(editSim)}</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Operations Required: <strong className="text-white font-mono">{editRes.editDistance}</strong> edits</div>
              <div className="text-[11px] text-slate-400">Transformations: delete/insert/substitute</div>
            </div>
          </div>
        </div>

        {onTryInputs && (
          <div className="text-right">
            <button
              onClick={() => onTryInputs(demoA, demoB)}
              className="inline-flex items-center gap-1.5 text-xs text-[#8B7CFF] hover:underline font-semibold"
            >
              <span>Load this pair into full visualizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Comprehensive Side-by-Side Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#242C3D] bg-[#141821] shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#242C3D] bg-[#0E121B]">
              <th className="py-4 px-6 font-mono text-slate-400 uppercase tracking-wider font-semibold w-1/4">
                Aspect / Dimension
              </th>
              <th className="py-4 px-6 font-mono text-[#8B7CFF] uppercase tracking-wider font-semibold w-3/8">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  <span>Longest Common Subsequence (LCS)</span>
                </div>
              </th>
              <th className="py-4 px-6 font-mono text-[#36C5E8] uppercase tracking-wider font-semibold w-3/8">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4" />
                  <span>Levenshtein Edit Distance</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#242C3D]/60">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#1C2230]/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-white font-sans align-top">
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-slate-300 leading-relaxed font-sans align-top whitespace-pre-line">
                  {row.lcs}
                </td>
                <td className="py-4 px-6 text-slate-300 leading-relaxed font-sans align-top whitespace-pre-line">
                  {row.edit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

