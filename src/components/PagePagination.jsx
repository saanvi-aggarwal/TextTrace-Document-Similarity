import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PagePagination({ prev, next }) {
  return (
    <div className="pt-12 mt-16 border-t border-paper-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
      {prev ? (
        <Link
          to={prev.path}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-paper-border bg-paper-card text-ink-secondary hover:text-ink-primary hover:border-neutral-300 transition-colors w-full sm:w-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <div className="text-left">
            <span className="text-[10px] text-ink-muted block uppercase">Previous Section</span>
            <span className="font-semibold text-ink-primary">{prev.label}</span>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && (
        <Link
          to={next.path}
          className="flex items-center justify-end gap-2 px-4 py-2.5 rounded-lg border border-paper-border bg-ink-primary text-white hover:bg-neutral-800 transition-colors w-full sm:w-auto text-right"
        >
          <div>
            <span className="text-[10px] text-neutral-300 block uppercase">Next Section</span>
            <span className="font-semibold text-white">{next.label}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

