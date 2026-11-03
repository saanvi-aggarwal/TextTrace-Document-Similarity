import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Table, 
  Binary, 
  Code2, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  HardDrive,
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function LearningCentre() {
  const [activeTab, setActiveTab] = useState('dp-core'); // 'dp-core', 'lcs-math', 'edit-math', 'complexity'

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/30 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>DSA-II Academic Curriculum Reference</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Dynamic Programming Learning Centre
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Rigorous theoretical documentation, recurrence derivations, dry-run analyses, and computational complexity proofs.
        </p>
      </div>

      {/* Chapter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-[#242C3D]">
        {[
          { id: 'dp-core', label: '1. DP Fundamentals', icon: Layers },
          { id: 'lcs-math', label: '2. LCS Derivation & Pseudocode', icon: Table },
          { id: 'edit-math', label: '3. Levenshtein Derivation', icon: Binary },
          { id: 'complexity', label: '4. Complexity & Matrix Proofs', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#8B7CFF] text-white shadow-glow-violet'
                  : 'bg-[#141821] text-slate-400 hover:text-white border border-[#242C3D]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chapter 1: DP Fundamentals */}
      {activeTab === 'dp-core' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Card 1: What is DP? */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8B7CFF]" />
              What is Dynamic Programming?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dynamic Programming (DP) is an algorithmic optimization paradigm invented by Richard Bellman in the 1950s. It solves complex problems by breaking them down into simpler, overlapping subproblems, solving each subproblem <strong>exactly once</strong>, and storing its answer in a memory table (tabulation or memoization) to avoid redundant computation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-2">
                <span className="text-xs font-mono font-bold text-[#8B7CFF] uppercase">1. Overlapping Subproblems</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The recursive solution revisits identical states multiple times. For example, comparing substrings of A and B branches into identical prefix queries. Tabulation caches results in a 2D matrix so each state <code className="text-slate-200">(i, j)</code> is evaluated once in <code className="text-[#35C98A]">O(1)</code> time.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] space-y-2">
                <span className="text-xs font-mono font-bold text-[#36C5E8] uppercase">2. Optimal Substructure</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  An optimal solution to the overall string comparison is composed of optimal solutions to its sub-strings. Knowing the optimal LCS or Edit Distance up to indices <code className="text-slate-200">(i-1, j-1)</code>, <code className="text-slate-200">(i-1, j)</code>, and <code className="text-slate-200">(i, j-1)</code> directly yields the optimal answer for <code className="text-slate-200">(i, j)</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Subsequence vs Substring */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#36C5E8]" />
              What is a Subsequence vs. Substring?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="p-5 rounded-xl bg-[#0B0D12] border border-[#35C98A]/30 space-y-2">
                <span className="text-xs font-mono font-bold text-[#35C98A] uppercase">Subsequence (Non-Contiguous)</span>
                <p className="leading-relaxed">
                  A sequence derived by deleting zero or more characters from a string without altering the relative ordering of the remaining characters.
                </p>
                <div className="p-3 rounded-lg bg-[#141821] font-mono text-slate-200">
                  Example: For string <span className="text-[#8B7CFF]">"apple"</span>:<br />
                  Valid: <span className="text-[#35C98A]">"ape"</span>, <span className="text-[#35C98A]">"ple"</span>, <span className="text-[#35C98A]">"al"</span><br />
                  Invalid: <span className="text-[#FF6B70]">"pa"</span> (order reversed)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#0B0D12] border border-slate-700 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Substring (Contiguous)</span>
                <p className="leading-relaxed">
                  A strictly continuous, unbroken segment of characters within a string. Every substring is a subsequence, but not every subsequence is a substring.
                </p>
                <div className="p-3 rounded-lg bg-[#141821] font-mono text-slate-200">
                  Example: For string <span className="text-[#8B7CFF]">"apple"</span>:<br />
                  Valid: <span className="text-slate-300">"app"</span>, <span className="text-slate-300">"ppl"</span><br />
                  Invalid: <span className="text-[#FF6B70]">"ape"</span> (broken continuity)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter 2: LCS Derivation & Pseudocode */}
      {activeTab === 'lcs-math' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Recurrence Relation */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Table className="w-5 h-5 text-[#8B7CFF]" />
              LCS Mathematical Recurrence Relation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Let <code className="text-[#8B7CFF]">L[i][j]</code> denote the length of the Longest Common Subsequence of prefixes <code className="text-slate-200">A[0..i-1]</code> and <code className="text-slate-200">B[0..j-1]</code>.
            </p>

            <div className="p-5 rounded-xl bg-[#0B0D12] border border-[#8B7CFF]/40 font-mono text-sm text-slate-200 space-y-3">
              <div className="text-xs text-slate-400 uppercase font-sans font-semibold">Mathematical Definition:</div>
              <div className="pl-4 border-l-2 border-[#8B7CFF] space-y-2">
                <div>
                  <span className="text-slate-400">Base Cases: </span>
                  L[i][0] = 0 (for all 0 ≤ i ≤ m), L[0][j] = 0 (for all 0 ≤ j ≤ n)
                </div>
                <div className="text-[#35C98A]">
                  If A[i-1] == B[j-1]: <br />
                  &nbsp;&nbsp;L[i][j] = 1 + L[i-1][j-1]
                </div>
                <div className="text-[#FF9933]">
                  If A[i-1] != B[j-1]: <br />
                  &nbsp;&nbsp;L[i][j] = max(L[i-1][j], L[i][j-1])
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Intuition:</strong> If the last characters match, that character must be appended to the optimal LCS of the shorter prefixes (diagonal transition). If they differ, the optimal sequence cannot use both simultaneously, so we take the best result from excluding either <code className="text-slate-200">A[i-1]</code> (Top) or <code className="text-slate-200">B[j-1]</code> (Left).
            </p>
          </div>

          {/* Pseudocode Box */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#8B7CFF]" />
              LCS Algorithm Pseudocode (C++ Reference)
            </h3>
            <pre className="p-5 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`// C++ DSA-II Formulation
int computeLCS(const string& A, const string& B) {
    int m = A.length();
    int n = B.length();
    vector<vector<int>> L(m + 1, vector<int>(n + 1, 0));

    // Fill table in bottom-up row-major order
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (A[i - 1] == B[j - 1]) {
                L[i][j] = 1 + L[i - 1][j - 1]; // Diagonal match
            } else {
                L[i][j] = max(L[i - 1][j], L[i][j - 1]); // Top vs Left
            }
        }
    }
    return L[m][n];
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Chapter 3: Levenshtein Derivation */}
      {activeTab === 'edit-math' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Recurrence Relation */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Binary className="w-5 h-5 text-[#36C5E8]" />
              Levenshtein Edit Distance Mathematical Recurrence
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Let <code className="text-[#36C5E8]">D[i][j]</code> represent the minimum number of single-character operations required to transform prefix <code className="text-slate-200">A[0..i-1]</code> into prefix <code className="text-slate-200">B[0..j-1]</code>.
            </p>

            <div className="p-5 rounded-xl bg-[#0B0D12] border border-[#36C5E8]/40 font-mono text-sm text-slate-200 space-y-3">
              <div className="text-xs text-slate-400 uppercase font-sans font-semibold">Mathematical Definition:</div>
              <div className="pl-4 border-l-2 border-[#36C5E8] space-y-2">
                <div>
                  <span className="text-slate-400">Base Cases: </span>
                  D[i][0] = i (i deletions to reach empty string), D[0][j] = j (j insertions into empty string)
                </div>
                <div className="text-xs text-slate-400">
                  cost = (A[i-1] == B[j-1]) ? 0 : 1
                </div>
                <div className="text-[#36C5E8] space-y-1">
                  <div>D[i][j] = min(</div>
                  <div className="pl-4 text-[#FF9933]">&nbsp;&nbsp;D[i-1][j] + 1,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Deletion of A[i-1]</div>
                  <div className="pl-4 text-[#A855F7]">&nbsp;&nbsp;D[i][j-1] + 1,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Insertion of B[j-1]</div>
                  <div className="pl-4 text-[#35C98A]">&nbsp;&nbsp;D[i-1][j-1] + cost&nbsp;&nbsp;&nbsp;// Substitution / Match</div>
                  <div>)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocode Box */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#36C5E8]" />
              Edit Distance Algorithm Pseudocode (C++ Reference)
            </h3>
            <pre className="p-5 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`// C++ DSA-II Formulation
int minEditDistance(const string& A, const string& B) {
    int m = A.length();
    int n = B.length();
    vector<vector<int>> D(m + 1, vector<int>(n + 1, 0));

    // Base initializations
    for (int i = 0; i <= m; i++) D[i][0] = i; // Deletions
    for (int j = 0; j <= n; j++) D[0][j] = j; // Insertions

    // Tabulation in row-major order
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            int cost = (A[i - 1] == B[j - 1]) ? 0 : 1;
            D[i][j] = min({
                D[i - 1][j] + 1,        // Deletion
                D[i][j - 1] + 1,        // Insertion
                D[i - 1][j - 1] + cost  // Substitution or Match
            });
        }
    }
    return D[m][n];
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Chapter 4: Complexity & Matrix Proofs */}
      {activeTab === 'complexity' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Complexity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Time Complexity: O(m × n)</h4>
                  <span className="text-xs text-slate-400">Strictly polynomial execution</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The DP table has exactly <code className="text-white">(m + 1) × (n + 1)</code> cells. Every cell computation performs a fixed number of operations: character comparison (<code className="text-[#35C98A]">O(1)</code>) and looking up 2 or 3 predecessor values (<code className="text-[#35C98A]">O(1)</code>).
              </p>
              <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300">
                Total Operations = (m × n) × O(1) = <strong>O(m × n)</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#36C5E8]/15 flex items-center justify-center text-[#36C5E8]">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Space Complexity: O(m × n)</h4>
                  <span className="text-xs text-slate-400">Required for full backtracking reconstruction</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retaining the complete <code className="text-white">(m + 1) × (n + 1)</code> matrix in memory requires <code className="text-[#36C5E8]">O(m × n)</code> space. This full table is mandatory to reconstruct the actual subsequence or sequence of edits backwards from <code className="text-white">(m, n)</code>.
              </p>
              <div className="p-3 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-slate-300">
                Memory Footprint = (m + 1) × (n + 1) × sizeof(int) = <strong>O(m × n)</strong>.
              </div>
            </div>
          </div>

          {/* Why Each Cell is Computed Once */}
          <div className="p-8 rounded-2xl bg-[#141821] border border-[#242C3D] space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#35C98A]" />
              Why is Each Matrix Cell Computed Only Once?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Without Dynamic Programming, a naive recursive implementation explores an exponential call tree:
              whenever both characters differ, the algorithm makes two recursive calls (for LCS) or three recursive calls (for Edit Distance).
              This produces a branching factor of 2 or 3, leading to an exponential time complexity of <code className="text-[#FF6B70] font-mono">O(2^(m+n))</code> or <code className="text-[#FF6B70] font-mono">O(3^(m+n))</code>.
            </p>
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#35C98A]/30 text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="font-bold text-[#35C98A]">Tabulation Guarantee:</div>
              <p>
                By iterating through rows <code className="text-white">i = 1..m</code> and columns <code className="text-white">j = 1..n</code> in row-major order:
                Cell <code className="text-[#8B7CFF]">(i, j)</code> is evaluated <strong>after</strong> its predecessors <code className="text-slate-300">(i-1, j-1)</code>, <code className="text-slate-300">(i-1, j)</code>, and <code className="text-slate-300">(i, j-1)</code> have already been computed and stored in memory.
                Consequently, the cell value is computed in a single <code className="text-[#35C98A]">O(1)</code> lookup step and never recalculated.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

