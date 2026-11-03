import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Binary, Table, Sparkles, CheckCircle2 } from 'lucide-react';
import PagePagination from '../components/PagePagination';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { docA, docB } = useApp();

  const docAChars = ['d','a','t','a',' ','s','t','r','u','c','t','u','r','e'];
  const docBChars = ['d','a','t','a',' ','s','y','s','t','e','m','s'];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Editorial Wordmark & Headline */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper-muted border border-paper-border text-xs font-mono text-ink-secondary">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Academic Case Study • Data Structures & Algorithms II</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink-primary leading-[1.15]">
            Understanding how two documents are compared.
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl font-normal">
            An interactive educational platform exploring document similarity and plagiarism detection using 
            two fundamental Dynamic Programming algorithms: <strong>Longest Common Subsequence (LCS)</strong> and 
            <strong> Levenshtein Edit Distance</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <Link
              to="/lab"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-primary text-white font-medium hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>Launch Interactive Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/problem"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-paper-border bg-paper-card text-ink-primary font-medium hover:bg-paper-muted transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-ink-muted" />
              <span>Explore Problem Statement</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Character Alignment Visual Demonstration */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-paper-border pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider block">
                Visual Intuition • Prefix Sequence Alignment
              </span>
              <p className="text-xs text-ink-secondary font-mono">
                Highlighting matching subsequences versus required substitution & deletion edits.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-paper-muted text-accent font-semibold border border-paper-border">
              Case-Sensitive Match
            </span>
          </div>

          {/* Document A Character Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-ink-primary">Document A: "data structure"</span>
              <span className="text-ink-muted text-[11px]">14 chars</span>
            </div>
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {docAChars.map((ch, idx) => {
                const isMatch = [0,1,2,3,4,5,10].includes(idx); // d, a, t, a, ' ', s, t
                return (
                  <div
                    key={idx}
                    className={`w-7 h-8 flex items-center justify-center rounded font-semibold border text-xs ${
                      isMatch
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-neutral-50 border-paper-border text-ink-muted'
                    }`}
                    title={`A[${idx}] = '${ch}'`}
                  >
                    {ch === ' ' ? '␣' : ch}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document B Character Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-ink-primary">Document B: "data systems"</span>
              <span className="text-ink-muted text-[11px]">12 chars</span>
            </div>
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {docBChars.map((ch, idx) => {
                const isMatch = [0,1,2,3,4,5].includes(idx); // d, a, t, a, ' ', s
                return (
                  <div
                    key={idx}
                    className={`w-7 h-8 flex items-center justify-center rounded font-semibold border text-xs ${
                      isMatch
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-blue-50 border-blue-200 text-accent font-bold'
                    }`}
                    title={`B[${idx}] = '${ch}'`}
                  >
                    {ch === ' ' ? '␣' : ch}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed pt-2 font-mono">
            Dynamic Programming maps these character sequences into a 2D state matrix to determine global optimal alignment in polynomial O(m × n) time.
          </p>
        </div>

        {/* Academic Journey Overview Cards */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block">
              Curriculum Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-ink-primary">
              Structured Educational Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <Link
              to="/problem"
              className="p-6 rounded-xl bg-paper-card border border-paper-border hover:border-neutral-300 transition-all space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary">02. Problem Statement</h3>
              <p className="text-ink-secondary leading-relaxed font-sans text-xs">
                Examine why string comparison matters, practical applications, and the academic distinction between similarity and plagiarism.
              </p>
            </Link>

            <Link
              to="/algorithms"
              className="p-6 rounded-xl bg-paper-card border border-paper-border hover:border-neutral-300 transition-all space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                <Binary className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary">03. Algorithms</h3>
              <p className="text-ink-secondary leading-relaxed font-sans text-xs">
                Deep mathematical dive into LCS subsequence preservation vs Levenshtein minimum transformation distance.
              </p>
            </Link>

            <Link
              to="/dp"
              className="p-6 rounded-xl bg-paper-card border border-paper-border hover:border-neutral-300 transition-all space-y-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-paper-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                <Table className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-ink-primary">04. DP Concept</h3>
              <p className="text-ink-secondary leading-relaxed font-sans text-xs">
                Interactive step-by-step matrix populator demonstrating how subproblem memoization eliminates exponential recursions.
              </p>
            </Link>
          </div>
        </div>

        {/* Fast Action Card */}
        <div className="p-8 rounded-xl bg-paper-muted border border-paper-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-semibold text-ink-primary">
              Ready to experiment with your own text?
            </h3>
            <p className="text-xs text-ink-secondary font-mono">
              The Interactive Lab provides Dual Modes (Learning & Animation) for both algorithms.
            </p>
          </div>

          <Link
            to="/lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-blue-700 transition-colors font-mono text-xs shrink-0"
          >
            <span>Open Interactive Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Page Pagination */}
        <PagePagination
          next={{ path: '/problem', label: '02. Problem Statement' }}
        />
      </div>
    </div>
  );
}

