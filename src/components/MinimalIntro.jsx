import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function MinimalIntro({ onScrollDown }) {
  return (
    <header className="pt-20 pb-16 border-b border-paper-border">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Wordmark & Metadata */}
        <div className="flex items-center justify-between text-xs font-mono text-ink-muted uppercase tracking-wider">
          <span>TEXTTRACE</span>
          <span>DSA-II Academic Study</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-primary leading-tight">
          Understanding how two documents are compared.
        </h1>

        {/* Concise Description */}
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl font-normal">
          This study examines character-level document similarity through two Dynamic Programming formulations:
          <strong className="text-ink-primary font-medium"> Longest Common Subsequence (LCS)</strong>, which identifies the longest shared sequence preserving relative ordering, and 
          <strong className="text-ink-primary font-medium"> Levenshtein Edit Distance</strong>, which computes the minimum number of insertions, deletions, and substitutions required to transform one document into another.
        </p>

        {/* Subtle Scroll Indicator */}
        <div className="pt-4">
          <button
            onClick={onScrollDown}
            className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink-primary transition-colors cursor-pointer group"
          >
            <span>Begin comparison</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}

