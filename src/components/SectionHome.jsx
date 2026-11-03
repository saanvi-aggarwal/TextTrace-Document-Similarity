import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function SectionHome({ onExplore, onOpenLab }) {
  // Demonstration alignment visual for "data structures"
  const docAChars = ['d','a','t','a',' ','s','t','r','u','c','t','u','r','e','s'];
  const docBChars = ['d','a','t','a',' ','s','y','s','t','e','m','s'];

  return (
    <section id="home" className="pt-20 pb-24 border-b border-paper-border">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Header tag */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-muted border border-paper-border text-ink-secondary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span>DSA-II Academic Case Study • Dynamic Programming</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-ink-primary leading-tight max-w-3xl">
            Quantifying document similarity through exact string algorithms.
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl font-normal">
            TEXTTRACE is an educational algorithm laboratory demonstrating how Dynamic Programming
            evaluates structural resemblance and transformation cost between text documents using
            <strong className="text-ink-primary font-medium"> Longest Common Subsequence</strong> and 
            <strong className="text-ink-primary font-medium"> Levenshtein Edit Distance</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-paper-card border border-paper-borderDark text-ink-primary text-xs sm:text-sm font-mono font-medium hover:bg-paper-muted transition-colors cursor-pointer"
          >
            <span>Explore the Project</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenLab}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-primary text-white text-xs sm:text-sm font-mono font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <span>Try Interactive Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Meaningful Visual: Two Documents Being Compared */}
        <div className="p-6 sm:p-8 rounded-xl bg-paper-card border border-paper-border space-y-6">
          <div className="flex items-center justify-between border-b border-paper-border pb-3 text-xs font-mono text-ink-muted">
            <span>FIGURE 1.1 — CHARACTER-LEVEL ALIGNMENT VISUALIZATION</span>
            <span className="text-accent font-semibold">Shared Sequence: "data s"</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Document A Excerpt */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-ink-muted uppercase">Document A:</span>
              <div className="flex flex-wrap gap-1 p-3 rounded-lg bg-paper-muted border border-paper-border">
                {docAChars.map((ch, idx) => {
                  const isMatch = idx < 6;
                  return (
                    <span
                      key={idx}
                      className={`w-7 h-8 flex items-center justify-center rounded font-semibold border text-xs ${
                        isMatch
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-ink-muted border-paper-border'
                      }`}
                    >
                      {ch === ' ' ? '␣' : ch}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Document B Excerpt */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-ink-muted uppercase">Document B:</span>
              <div className="flex flex-wrap gap-1 p-3 rounded-lg bg-paper-muted border border-paper-border">
                {docBChars.map((ch, idx) => {
                  const isMatch = idx < 6;
                  return (
                    <span
                      key={idx}
                      className={`w-7 h-8 flex items-center justify-center rounded font-semibold border text-xs ${
                        isMatch
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-ink-muted border-paper-border'
                      }`}
                    >
                      {ch === ' ' ? '␣' : ch}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-xs text-ink-secondary leading-relaxed pt-1">
            Dynamic Programming maps these character sequences into a 2D state matrix to find global optimal alignment in polynomial $O(m \times n)$ time.
          </p>
        </div>
      </div>
    </section>
  );
}
