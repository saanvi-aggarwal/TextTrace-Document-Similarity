import React from 'react';
import { BookOpen, Code2, Cpu, AlertCircle, Layers, FileText } from 'lucide-react';

export default function SectionAbout() {
  return (
    <section id="about" className="py-20 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
            08. About the Project
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
            Academic Context & Technical Specification
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl font-normal">
            TEXTTRACE was designed as an educational tool for the Data Structures & Algorithms II (DSA-II) curriculum to provide visual, interactive intuition into Dynamic Programming.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          {/* Objectives */}
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="flex items-center gap-2 text-ink-primary font-bold">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Project Objectives</span>
            </div>
            <ul className="space-y-1.5 text-ink-secondary list-disc pl-4 font-sans leading-relaxed">
              <li>Demonstrate how overlapping subproblems and optimal substructures are exploited by Dynamic Programming.</li>
              <li>Provide step-by-step visual accountability for every cell in a 2D recurrence matrix.</li>
              <li>Bridge theoretical algorithmic recurrences with practical document comparison.</li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="flex items-center gap-2 text-ink-primary font-bold">
              <Code2 className="w-4 h-4 text-accent" />
              <span>Technology Stack</span>
            </div>
            <ul className="space-y-1.5 text-ink-secondary font-sans leading-relaxed">
              <li><strong className="text-ink-primary font-mono">Engine:</strong> Pure JavaScript DP matrix generation with deterministic backtracking.</li>
              <li><strong className="text-ink-primary font-mono">Frontend:</strong> React 19, Vite, Tailwind CSS with customized typography.</li>
              <li><strong className="text-ink-primary font-mono">Rendering:</strong> Dynamic responsive SVG and matrix grids with zero external AI/API dependencies.</li>
            </ul>
          </div>

          {/* Complexity Summary */}
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="flex items-center gap-2 text-ink-primary font-bold">
              <Cpu className="w-4 h-4 text-accent" />
              <span>Complexity Guarantees</span>
            </div>
            <div className="space-y-2 text-ink-secondary font-sans leading-relaxed">
              <div>
                <strong className="text-ink-primary font-mono">Time Complexity:</strong> $O(m \times n)$ for both LCS and Levenshtein Edit Distance. Every cell evaluates at most 3 predecessor references in $O(1)$ arithmetic operations.
              </div>
              <div>
                <strong className="text-ink-primary font-mono">Space Complexity:</strong> $O(m \times n)$ required to store the full matrix for deterministic backtracking.
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-3">
            <div className="flex items-center gap-2 text-ink-primary font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Methodological Limitations</span>
            </div>
            <ul className="space-y-1.5 text-ink-secondary list-disc pl-4 font-sans leading-relaxed">
              <li>Evaluates literal character sequences; insensitive to semantic synonyms (e.g., "car" vs "automobile").</li>
              <li>Case-sensitive and preserves exact spacing and punctuation matching the classical C++ case study.</li>
              <li>Not designed for multi-gigabyte files without linear-space Hirschberg optimization.</li>
            </ul>
          </div>
        </div>

        {/* Academic Citations & References */}
        <div className="p-6 rounded-xl bg-paper-card border border-paper-border space-y-4">
          <span className="text-xs font-mono text-ink-muted uppercase block">
            Academic References & Foundations
          </span>

          <ol className="list-decimal pl-5 space-y-2 text-xs font-mono text-ink-secondary leading-relaxed">
            <li>
              <strong className="text-ink-primary">Levenshtein, V. I. (1966).</strong> Binary codes capable of correcting deletions, insertions, and reversals. <em>Soviet Physics Doklady</em>, 10(8), 707–710.
            </li>
            <li>
              <strong className="text-ink-primary">Wagner, R. A., & Fischer, M. J. (1974).</strong> The string-to-string correction problem. <em>Journal of the ACM (JACM)</em>, 21(1), 168–173.
            </li>
            <li>
              <strong className="text-ink-primary">Hirschberg, D. S. (1975).</strong> A linear space algorithm for computing maximal common subsequences. <em>Communications of the ACM</em>, 18(6), 341–343.
            </li>
            <li>
              <strong className="text-ink-primary">Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009).</strong> <em>Introduction to Algorithms (3rd ed.)</em>. MIT Press. Chapter 15: Dynamic Programming.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

