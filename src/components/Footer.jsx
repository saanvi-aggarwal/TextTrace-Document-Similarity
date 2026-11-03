import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-paper-card border-t border-paper-border text-xs font-mono text-ink-secondary mt-20">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-paper-border">
          <div className="space-y-1">
            <Link to="/" className="font-bold text-ink-primary tracking-wider text-sm hover:text-accent transition-colors">
              TEXTTRACE
            </Link>
            <p className="text-ink-muted text-[11px] font-sans">
              An Academic Dynamic Programming String Similarity & Plagiarism Analysis Platform • DSA-II Case Study
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link to="/" className="hover:text-ink-primary transition-colors">Home</Link>
            <Link to="/problem" className="hover:text-ink-primary transition-colors">Problem</Link>
            <Link to="/algorithms" className="hover:text-ink-primary transition-colors">Algorithms</Link>
            <Link to="/dp" className="hover:text-ink-primary transition-colors">DP Concept</Link>
            <Link to="/lab" className="hover:text-ink-primary transition-colors font-semibold text-accent">Lab & Studio</Link>
            <Link to="/results" className="hover:text-ink-primary transition-colors">Results</Link>
            <Link to="/about" className="hover:text-ink-primary transition-colors">About</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-muted">
          <span>© {new Date().getFullYear()} TEXTTRACE • Deterministic Educational Algorithm Visualizer</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-paper-border hover:bg-paper-muted text-ink-secondary hover:text-ink-primary transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
