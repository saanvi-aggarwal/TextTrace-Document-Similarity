import React from 'react';
import { BookOpen, Code2, Cpu, AlertCircle, FileText } from 'lucide-react';
import PagePagination from '../components/PagePagination';

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span>07. Project Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
            Academic Context & Engineering Specifications
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-3xl font-normal">
            TEXTTRACE was designed as an interactive computer science case study for Data Structures & Algorithms II (DSA-II), emphasizing exact Dynamic Programming mechanics over generic high-level approximations.
          </p>
        </div>

        {/* Academic Purpose Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-ink-primary">Academic Objectives</h2>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Demonstrating optimal substructure and overlapping subproblems through deterministic step-by-step matrix visualization and causal dependency tracing.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-ink-primary">Algorithmic Fidelity</h2>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Zero simulated or mocked data. Both Learning Mode and Animation Mode consume actual execution snapshots generated from the same core DP engine.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-ink-primary">Design Philosophy</h2>
            <p className="text-ink-secondary leading-relaxed font-sans text-xs">
              Restrained editorial typography, warm paper tones, and minimal distraction to keep cognitive focus entirely on computational principles.
            </p>
          </div>
        </div>

        {/* Algorithmic Complexity Table */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <h2 className="text-sm font-semibold text-ink-primary font-mono uppercase tracking-wider">
            Complexity & Performance Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-paper-border text-ink-muted">
                  <th className="pb-3 font-medium">Metric</th>
                  <th className="pb-3 font-medium">Longest Common Subsequence</th>
                  <th className="pb-3 font-medium">Levenshtein Edit Distance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border text-ink-secondary">
                <tr>
                  <td className="py-3 font-semibold text-ink-primary">Time Complexity</td>
                  <td className="py-3 text-emerald-800">O(m × n)</td>
                  <td className="py-3 text-emerald-800">O(m × n)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-ink-primary">Auxiliary Space</td>
                  <td className="py-3">O(m × n) table</td>
                  <td className="py-3">O(m × n) table</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-ink-primary">Space-Optimized (Score Only)</td>
                  <td className="py-3 text-ink-muted">O(min(m, n)) [2 rows]</td>
                  <td className="py-3 text-ink-muted">O(min(m, n)) [2 rows]</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-ink-primary">Cell Evaluation</td>
                  <td className="py-3">O(1) [Max of 2 candidates]</td>
                  <td className="py-3">O(1) [Min of 3 candidates]</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-ink-primary">Backtracking Cost</td>
                  <td className="py-3">O(m + n) steps</td>
                  <td className="py-3">O(m + n) steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Limitations & Scope */}
        <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-ink-primary">
            <AlertCircle className="w-4 h-4 text-accent" />
            <h2 className="font-semibold text-sm">System Limitations & Scope</h2>
          </div>

          <ul className="space-y-2 text-ink-secondary font-sans leading-relaxed list-disc list-inside">
            <li>
              <strong>Memory Footprint:</strong> While O(m × n) space is feasible for sentences and document paragraphs in browser memory, multi-megabyte documents require divide-and-conquer Hirschberg linear-space algorithms or Myers' diff algorithm.
            </li>
            <li>
              <strong>Character-Level Granularity:</strong> TEXTTRACE computes character-level matrices. Production plagiarism detectors often employ n-gram tokenization, Rabin-Karp rolling hashes (winnowing), or semantic embedding vectors before dynamic programming alignment.
            </li>
            <li>
              <strong>Case Sensitivity:</strong> Character comparison treats uppercase and lowercase as distinct ASCII codepoints, demonstrating exact mathematical equality.
            </li>
          </ul>
        </div>

        {/* Academic References */}
        <div className="p-6 rounded-xl bg-paper-muted border border-paper-border space-y-3 font-mono text-xs">
          <span className="text-ink-muted uppercase tracking-wider text-[11px] block">Academic References</span>
          <ol className="space-y-1.5 text-ink-secondary font-sans text-xs list-decimal list-inside">
            <li>Levenshtein, V. I. (1966). Binary codes capable of correcting deletions, insertions, and reversals. <em>Soviet Physics Doklady</em>, 10(8), 707–710.</li>
            <li>Hirschberg, D. S. (1975). A linear space algorithm for computing maximal common subsequences. <em>Communications of the ACM</em>, 18(6), 341–343.</li>
            <li>Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). <em>Introduction to Algorithms (3rd ed.)</em>. MIT Press (Chapter 15: Dynamic Programming).</li>
          </ol>
        </div>

        {/* Page Pagination */}
        <PagePagination
          prev={{ path: '/results', label: '06. Results & Analysis' }}
          next={{ path: '/', label: '01. Home' }}
        />
      </div>
    </div>
  );
}

