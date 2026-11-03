import React, { useState } from 'react';
import { Table, Binary, ArrowRight, CheckCircle2 } from 'lucide-react';
import PagePagination from '../components/PagePagination';

export default function AlgorithmsPage() {
  const [activeAlgo, setActiveAlgo] = useState('lcs'); // 'lcs' or 'edit'

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>03. Algorithmic Formulations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
            Subsequence Preservation vs Transformation Distance
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-3xl font-normal">
            Dynamic Programming provides an exact, polynomial-time framework for comparing sequences by decomposing global comparison into overlapping prefix subproblems.
          </p>
        </div>

        {/* Tab Toggle for LCS vs Edit Distance */}
        <div className="inline-flex p-1 rounded-lg bg-paper-muted border border-paper-border text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveAlgo('lcs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeAlgo === 'lcs'
                ? 'bg-paper-card text-ink-primary font-semibold shadow-xs'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-accent" />
            <span>1. Longest Common Subsequence (LCS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAlgo('edit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeAlgo === 'edit'
                ? 'bg-paper-card text-ink-primary font-semibold shadow-xs'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Binary className="w-3.5 h-3.5 text-accent" />
            <span>2. Levenshtein Edit Distance</span>
          </button>
        </div>

        {/* Algorithm 1: LCS */}
        {activeAlgo === 'lcs' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-accent font-semibold uppercase">Formulation 1</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-primary">Longest Common Subsequence (LCS)</h2>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  A <strong>subsequence</strong> is a sequence derived by deleting zero or more characters from a string without altering the relative order of the remaining characters. The LCS problem seeks the maximum-length subsequence shared by two strings A and B.
                </p>
              </div>

              {/* Simple Example */}
              <div className="p-4 rounded-lg bg-paper-muted border border-paper-border font-mono text-xs space-y-2">
                <span className="text-ink-muted text-[11px] block uppercase">Concrete Example:</span>
                <div className="text-ink-primary space-y-1">
                  <div>String A = <strong className="text-ink-primary">"ABCD"</strong></div>
                  <div>String B = <strong className="text-ink-primary">"ACDF"</strong></div>
                  <div className="text-accent font-semibold pt-1">LCS(A, B) = "ACD" (Length = 3)</div>
                </div>
              </div>

              {/* Recurrence Relation & Base Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1.5">
                  <span className="text-ink-muted text-[11px] uppercase block">Recurrence Relation:</span>
                  <div className="text-ink-primary space-y-1">
                    <div className="text-emerald-800">if A[i-1] == B[j-1]:</div>
                    <div className="pl-4">L[i][j] = 1 + L[i-1][j-1]</div>
                    <div className="text-amber-800 pt-1">else:</div>
                    <div className="pl-4">L[i][j] = max(L[i-1][j], L[i][j-1])</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1.5">
                  <span className="text-ink-muted text-[11px] uppercase block">Base Cases & Invariants:</span>
                  <div className="text-ink-secondary space-y-1">
                    <div>L[i][0] = 0 (for all 0 ≤ i ≤ m)</div>
                    <div>L[0][j] = 0 (for all 0 ≤ j ≤ n)</div>
                    <div className="text-[11px] text-ink-muted pt-1">
                      Comparing any prefix with an empty string ε yields zero shared characters.
                    </div>
                  </div>
                </div>
              </div>

              {/* DP Resolution */}
              <div className="space-y-2 text-xs text-ink-secondary">
                <strong className="text-ink-primary font-mono block">How Dynamic Programming Solves It:</strong>
                <p className="leading-relaxed">
                  A naive recursive formulation inspects 2^(m+n) branches by exploring all possible subsequences. Dynamic Programming tabulates optimal prefix alignments in a 2D matrix of size (m+1) × (n+1), computing each cell exactly once in O(1) time, yielding an optimal overall runtime of O(m × n).
                </p>
              </div>
            </div>

            {/* LCS Backtracking Explanation */}
            <div className="p-6 rounded-xl bg-paper-muted border border-paper-border space-y-3 font-mono text-xs">
              <span className="text-accent uppercase text-[11px] block">Reconstruction via Backtracking</span>
              <h3 className="text-sm font-semibold text-ink-primary font-sans">
                Tracing the Aligned Subsequence
              </h3>
              <p className="text-ink-secondary font-sans leading-relaxed">
                Starting from cell (m, n), if characters match (A[i-1] == B[j-1]), we prepend the character to our result and transition diagonally to (i-1, j-1). If they differ, we transition to the predecessor that yielded the maximal value (L[i-1][j] or L[i][j-1]). Standard tie-breaking prioritizes the top predecessor to maintain deterministic behavior.
              </p>
            </div>
          </div>
        )}

        {/* Algorithm 2: Levenshtein Edit Distance */}
        {activeAlgo === 'edit' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-accent font-semibold uppercase">Formulation 2</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-primary">Levenshtein Edit Distance</h2>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  Formulated by Vladimir Levenshtein in 1965, this metric quantifies the minimum number of single-character <strong>insertions</strong>, <strong>deletions</strong>, and <strong>substitutions</strong> required to transform string A into string B.
                </p>
              </div>

              {/* Simple Example */}
              <div className="p-4 rounded-lg bg-paper-muted border border-paper-border font-mono text-xs space-y-2">
                <span className="text-ink-muted text-[11px] block uppercase">Concrete Example:</span>
                <div className="text-ink-primary space-y-1">
                  <div>Source A = <strong className="text-ink-primary">"kitten"</strong></div>
                  <div>Target B = <strong className="text-ink-primary">"sitting"</strong></div>
                  <div className="text-accent font-semibold pt-1">
                    EditDistance(A, B) = 3 operations (k→s, e→i, +g)
                  </div>
                </div>
              </div>

              {/* Recurrence Relation & Base Cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1.5">
                  <span className="text-ink-muted text-[11px] uppercase block">Recurrence Relation:</span>
                  <div className="text-ink-primary space-y-0.5">
                    <div>cost = (A[i-1] == B[j-1]) ? 0 : 1</div>
                    <div className="pt-1">D[i][j] = min(</div>
                    <div className="pl-4 text-orange-800">D[i-1][j] + 1,       // Deletion</div>
                    <div className="pl-4 text-purple-800">D[i][j-1] + 1,       // Insertion</div>
                    <div className="pl-4 text-blue-800">D[i-1][j-1] + cost   // Substitution</div>
                    <div>)</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-paper-muted border border-paper-border space-y-1.5">
                  <span className="text-ink-muted text-[11px] uppercase block">Base Cases & Invariants:</span>
                  <div className="text-ink-secondary space-y-1">
                    <div>D[i][0] = i (i deletions to reach empty string)</div>
                    <div>D[0][j] = j (j insertions into empty string)</div>
                    <div className="text-[11px] text-ink-muted pt-1">
                      Converting between a non-empty string and ε costs exactly the length in deletions or insertions.
                    </div>
                  </div>
                </div>
              </div>

              {/* DP Resolution */}
              <div className="space-y-2 text-xs text-ink-secondary">
                <strong className="text-ink-primary font-mono block">How Dynamic Programming Solves It:</strong>
                <p className="leading-relaxed">
                  Dynamic Programming memoizes the prefix conversion costs into table D[0..m][0..n]. Each cell D[i][j] resolves the minimum of its three immediate causal predecessors (top, left, diagonal) in constant O(1) operations, guaranteeing a deterministic O(m × n) solution.
                </p>
              </div>
            </div>

            {/* Edit Script Backtracking */}
            <div className="p-6 rounded-xl bg-paper-muted border border-paper-border space-y-3 font-mono text-xs">
              <span className="text-accent uppercase text-[11px] block">Transformation Script Reconstruction</span>
              <h3 className="text-sm font-semibold text-ink-primary font-sans">
                Tracing the Minimal Edit Sequence
              </h3>
              <p className="text-ink-secondary font-sans leading-relaxed">
                Backtracking begins at cell D[m][n] and reconstructs which operation achieved the minimum cost at each coordinate. A diagonal step corresponds to Match (cost 0) or Substitute (cost 1). A vertical step corresponds to Deletion from Document A. A horizontal step corresponds to Insertion into Document A.
              </p>
            </div>
          </div>
        )}

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/problem', label: '02. Problem Statement' }}
          next={{ path: '/dp', label: '04. DP Concept' }}
        />
      </div>
    </div>
  );
}

