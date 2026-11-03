import React from 'react';
import { 
  ArrowRight, 
  Table, 
  Binary, 
  GitCompare, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  Layers, 
  AlertTriangle,
  Code2,
  Workflow,
  Compass,
  BarChart3
} from 'lucide-react';

export default function LandingPage({ setActiveTab, onSelectSample }) {
  // Mini animated DP matrix preview state
  const previewCells = [
    ['ε', 'ε', 'A', 'B', 'C'],
    ['ε', '0', '0', '0', '0'],
    ['A', '0', '1', '1', '1'],
    ['C', '0', '1', '1', '2'],
  ];

  return (
    <div className="space-y-20 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B7CFF]/10 border border-[#8B7CFF]/30 text-[#8B7CFF] text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#36C5E8]" />
          <span>DSA-II Academic Project: Dynamic Programming In Action</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Understand Similarity. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] via-[#36C5E8] to-[#35C98A]">
            Visualize Every Step.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Explore how Dynamic Programming identifies common sequences and calculates the minimum transformations between two strings. Built for students, educators, and algorithmic exploration.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveTab('compare')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#6366F1] text-white text-sm font-semibold hover:opacity-95 shadow-glow-violet transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Start Visualization</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141821] border border-[#242C3D] text-slate-200 text-sm font-semibold hover:bg-[#1C2230] hover:border-[#8B7CFF]/50 transition-all"
          >
            <Compass className="w-4 h-4 text-[#36C5E8]" />
            <span>Explore Algorithms</span>
          </button>
        </div>

        {/* Interactive Matrix Preview snippet */}
        <div className="pt-8 max-w-xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#141821]/80 border border-[#242C3D] backdrop-blur shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#242C3D] text-xs text-slate-400">
              <span className="flex items-center gap-2 font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-[#35C98A] animate-pulse"></span>
                Tabulation State Preview: A = "AC", B = "ABC"
              </span>
              <span className="font-mono text-[#8B7CFF] text-[11px]">LCS(A, B) = 2 ("AC")</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 pt-3 font-mono text-center text-xs">
              {previewCells.map((row, rIdx) => (
                <React.Fragment key={rIdx}>
                  {row.map((cell, cIdx) => {
                    const isHeader = rIdx === 0 || cIdx === 0;
                    const isOptimal = (rIdx === 2 && cIdx === 2) || (rIdx === 3 && cIdx === 4);
                    const isMatch = rIdx === 3 && cIdx === 4;
                    return (
                      <div
                        key={cIdx}
                        className={`h-9 flex items-center justify-center rounded-lg font-semibold transition-all ${
                          isHeader
                            ? 'bg-[#1C2230] text-slate-400 border border-[#242C3D]'
                            : isMatch
                            ? 'bg-[#35C98A]/25 text-[#35C98A] border border-[#35C98A] shadow-glow-green font-bold animate-pulse'
                            : isOptimal
                            ? 'bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/60'
                            : 'bg-[#0B0D12] text-slate-300 border border-[#242C3D]/50'
                        }`}
                      >
                        {cell}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-3 font-mono">
              Green cell represents optimal subproblem solution with diagonal backtrack transition.
            </p>
          </div>
        </div>
      </section>

      {/* Two Prominent Algorithm Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Two Foundational Dynamic Programming Paradigms
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Choose between subsequence alignment and string transformation metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LCS Card */}
          <div className="relative p-7 rounded-2xl bg-[#141821] border border-[#242C3D] hover:border-[#8B7CFF]/60 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 flex items-center justify-center text-[#8B7CFF] group-hover:scale-110 transition-transform">
                  <Table className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/20">
                    O(m × n) Time & Space
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#8B7CFF] transition-colors">
                  Longest Common Subsequence (LCS)
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Identifies the longest sequence of characters appearing in both strings in the same relative order without requiring consecutive placement.
                </p>
              </div>

              {/* Recurrence snippet */}
              <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans font-semibold">
                  Recurrence Relation
                </div>
                <div className="text-[#36C5E8]">
                  if A[i-1] == B[j-1] → 1 + L[i-1][j-1]
                </div>
                <div className="text-[#FF9933]">
                  else → max(L[i-1][j], L[i][j-1])
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C98A]" />
                  <span>Formula: <code className="text-[#8B7CFF] font-mono">(2 × LCS / (m + n)) × 100</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C98A]" />
                  <span>Preserves structural ordering & common phrase detection</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveTab('lcs')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C2230] hover:bg-[#8B7CFF] hover:text-white text-slate-200 text-xs font-semibold border border-[#242C3D] hover:border-transparent transition-all"
              >
                <span>Launch LCS Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Edit Distance Card */}
          <div className="relative p-7 rounded-2xl bg-[#141821] border border-[#242C3D] hover:border-[#36C5E8]/60 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#36C5E8]/15 border border-[#36C5E8]/30 flex items-center justify-center text-[#36C5E8] group-hover:scale-110 transition-transform">
                  <Binary className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#36C5E8]/10 text-[#36C5E8] border border-[#36C5E8]/20">
                    O(m × n) Time & Space
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#36C5E8] transition-colors">
                  Levenshtein Edit Distance
                </h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Calculates the minimum number of single-character operations (insertions, deletions, substitutions) required to transform Text A into Text B.
                </p>
              </div>

              {/* Recurrence snippet */}
              <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans font-semibold">
                  Recurrence Relation
                </div>
                <div className="text-[#36C5E8]">
                  min(D[i-1][j] + 1, D[i][j-1] + 1, D[i-1][j-1] + cost)
                </div>
                <div className="text-slate-400 text-[11px]">
                  cost = (A[i-1] == B[j-1] ? 0 : 1)
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C98A]" />
                  <span>Formula: <code className="text-[#36C5E8] font-mono">(1 - dist / max(m, n)) × 100</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C98A]" />
                  <span>Tracks exact insertion, deletion, and substitution edits</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActiveTab('edit-distance')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C2230] hover:bg-[#36C5E8] hover:text-[#0B0D12] text-slate-200 text-xs font-semibold border border-[#242C3D] hover:border-transparent transition-all"
              >
                <span>Launch Edit Distance Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Programming Core Concepts Section */}
      <section className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242C3D] pb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8B7CFF] font-semibold">
              Theoretical Foundation
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Why Dynamic Programming?
            </h2>
          </div>
          <p className="text-slate-400 text-xs max-w-md">
            Naive recursive approaches evaluate exponential subproblems <span className="font-mono text-slate-200">O(2^(m+n))</span>. Dynamic Programming evaluates each subproblem state exactly once in <span className="font-mono text-[#35C98A]">O(m × n)</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D]/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Overlapping Subproblems</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The problem can be broken down into recurring smaller subproblems that are solved repeatedly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D]/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#36C5E8]/15 flex items-center justify-center text-[#36C5E8]">
              <Workflow className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Optimal Substructure</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The optimal solution to the overall string comparison is constructed directly from optimal solutions of its prefixes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D]/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#35C98A]/15 flex items-center justify-center text-[#35C98A]">
              <Table className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Bottom-Up Tabulation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Iteratively populates the <code className="text-[#35C98A]">(m+1) × (n+1)</code> matrix in row-major order, guaranteeing predecessors are cached before access.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D]/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B70]/15 flex items-center justify-center text-[#FF6B70]">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Deterministic Backtrack</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traces backwards from the bottom-right cell <code className="text-[#FF6B70]">(m, n)</code> to reconstruct the exact aligned subsequence or edit script.
            </p>
          </div>
        </div>
      </section>

      {/* How the Platform Works Walkthrough */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How TextTrace Works
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            A three-step interactive cycle designed for visual and conceptual mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3 relative overflow-hidden">
            <span className="text-4xl font-extrabold text-[#242C3D] absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-xl bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Input Raw Documents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provide or select test cases. Strict character-level fidelity is maintained: case, spaces, and punctuation remain unaltered.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3 relative overflow-hidden">
            <span className="text-4xl font-extrabold text-[#242C3D] absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-xl bg-[#36C5E8]/15 flex items-center justify-center text-[#36C5E8]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Step-by-Step Visualization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step through individual matrix cells. Watch predecessors light up, evaluate recurrence arithmetic live, and control playback speed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-3 relative overflow-hidden">
            <span className="text-4xl font-extrabold text-[#242C3D] absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-xl bg-[#35C98A]/15 flex items-center justify-center text-[#35C98A]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Backtracking & Comparative Metrics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect the reconstructed path, view the sequential transformation script, and analyze independent LCS and Levenshtein metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Disclaimer */}
      <section className="p-5 rounded-2xl bg-[#141821] border border-[#FF6B70]/30 shadow-lg flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-[#FF6B70]/10 text-[#FF6B70] shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Academic Integrity & Similarity Notice</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Similarity indicates textual resemblance, not proof of plagiarism. These metrics quantify character-level structural overlap and edit distances; they do not assess intellectual authorship, citation validity, paraphrasing, or conceptual equivalence.
          </p>
        </div>
      </section>
    </div>
  );
}

