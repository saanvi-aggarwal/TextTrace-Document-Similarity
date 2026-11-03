import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: '01. Home' },
    { path: '/problem', label: '02. Problem' },
    { path: '/algorithms', label: '03. Algorithms' },
    { path: '/dp', label: '04. DP Concept' },
    { path: '/lab', label: '05. Lab & Visualizer' },
    { path: '/results', label: '06. Results' },
    { path: '/about', label: '07. About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-paper-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="font-mono font-bold tracking-wider text-ink-primary text-sm group-hover:text-accent transition-colors">
            TEXTTRACE
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-paper-card border border-paper-border text-accent font-semibold shadow-xs'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-paper-muted'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </div>

        {/* Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-ink-primary text-white text-xs font-mono font-medium hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <span>Open Lab</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-ink-secondary hover:text-ink-primary rounded"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-paper-border bg-paper-card px-6 py-4 space-y-2 font-mono text-xs shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full py-2 px-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-paper-muted text-accent font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-paper-border">
            <Link
              to="/lab"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-ink-primary text-white font-medium"
            >
              <span>Launch Interactive Lab</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
