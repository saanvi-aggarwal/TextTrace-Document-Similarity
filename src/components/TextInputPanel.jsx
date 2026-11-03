import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  RotateCcw, 
  Play, 
  Trash2, 
  Sparkles, 
  FileText, 
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const SAMPLE_TEST_CASES = [
  {
    id: 'edited',
    name: '2. Edited Words ("kitten" / "sitting")',
    textA: 'kitten',
    textB: 'sitting',
    description: 'Classic Levenshtein benchmark showing 3 edits and 4-character LCS ("ittn").'
  },
  {
    id: 'identical',
    name: '1. Identical ("data structures")',
    textA: 'data structures',
    textB: 'data structures',
    description: 'Perfect 100% similarity across both metrics with 0 edit distance.'
  },
  {
    id: 'partial',
    name: '3. Partially Similar ("the cat sat" / "the cat sleeps")',
    textA: 'the cat sat',
    textB: 'the cat sleeps',
    description: 'Shared prefix and partial overlap with space preserved.'
  },
  {
    id: 'different',
    name: '4. Completely Different ("apple" / "xyz")',
    textA: 'apple',
    textB: 'xyz',
    description: 'Zero common characters: 0% LCS similarity, maximum edit distance.'
  },
  {
    id: 'empty-single',
    name: '5. Single Empty Input ("" / "hello")',
    textA: '',
    textB: 'hello',
    description: 'Edge case: Text A is empty, Text B has 5 characters.'
  },
  {
    id: 'empty-both',
    name: 'Edge: Both Empty ("" / "")',
    textA: '',
    textB: '',
    description: 'Theoretical zero-denominator edge case: exactly 100% similarity.'
  },
  {
    id: 'subsequence-demo',
    name: 'Benchmark: Subsequence ("ABC" / "AC")',
    textA: 'ABC',
    textB: 'AC',
    description: 'Simple deletion showing LCS="AC" and Edit Distance=1.'
  }
];

export default function TextInputPanel({ 
  textA, 
  setTextA, 
  textB, 
  setTextB, 
  onCompare, 
  onReset 
}) {
  const [selectedSample, setSelectedSample] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleLoadSample = (sampleId) => {
    setSelectedSample(sampleId);
    const sample = SAMPLE_TEST_CASES.find((s) => s.id === sampleId);
    if (sample) {
      setTextA(sample.textA);
      setTextB(sample.textB);
      setValidationError('');
    }
  };

  const handleSwap = () => {
    const temp = textA;
    setTextA(textB);
    setTextB(temp);
  };

  const handleClearA = () => {
    setTextA('');
    setSelectedSample('');
  };

  const handleClearB = () => {
    setTextB('');
    setSelectedSample('');
  };

  const handleCompareClick = () => {
    // Both strings empty is a valid theoretical edge case!
    // But if both are empty, we allow compare and inform the user
    setValidationError('');
    onCompare();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header and Sample selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141821] border border-[#242C3D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B7CFF] font-semibold">
              Input Workbench
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35C98A]/10 text-[#35C98A] border border-[#35C98A]/20">
              Exact Character-Level Mode
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Document Comparison Studio
          </h2>
          <p className="text-xs text-slate-400">
            Compare two text segments with strict case sensitivity, exact spacing, and full punctuation preservation.
          </p>
        </div>

        {/* Preset Sample Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B7CFF] shrink-0" />
            <label htmlFor="sample-picker" className="text-xs text-slate-300 font-medium whitespace-nowrap">
              Load Preset:
            </label>
          </div>
          <select
            id="sample-picker"
            value={selectedSample}
            onChange={(e) => handleLoadSample(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-200 focus:outline-none focus:border-[#8B7CFF] font-medium"
          >
            <option value="">-- Choose Sample Test Case --</option>
            {SAMPLE_TEST_CASES.map((sample) => (
              <option key={sample.id} value={sample.id}>
                {sample.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Editor: Text A */}
        <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#8B7CFF]/40 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-[#242C3D]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#8B7CFF]/15 flex items-center justify-center text-[#8B7CFF] font-mono text-xs font-bold">
                A
              </div>
              <span className="text-sm font-bold text-white">Source Document (Text A)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 bg-[#0B0D12] px-2 py-0.5 rounded border border-[#242C3D]">
                Length: <strong className="text-white">{textA.length}</strong> chars
              </span>
              <button
                onClick={handleClearA}
                title="Clear Text A"
                className="p-1 rounded-lg hover:bg-[#1C2230] text-slate-400 hover:text-[#FF6B70] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={textA}
              onChange={(e) => {
                setTextA(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter or paste Text A here..."
              rows={6}
              className="w-full p-3.5 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-slate-100 font-mono text-sm leading-relaxed placeholder:text-slate-600 focus:outline-none focus:border-[#8B7CFF] transition-all resize-y"
            />
          </div>

          {/* Quick Stats on Text A */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Lines: {textA ? textA.split('\n').length : 0}</span>
            <span>Spaces: {(textA.match(/ /g) || []).length}</span>
            <span>Words: {textA.trim() ? textA.trim().split(/\s+/).length : 0}</span>
          </div>
        </div>

        {/* Right Editor: Text B */}
        <div className="p-5 rounded-2xl bg-[#141821] border border-[#242C3D] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#36C5E8]/40 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-[#242C3D]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#36C5E8]/15 flex items-center justify-center text-[#36C5E8] font-mono text-xs font-bold">
                B
              </div>
              <span className="text-sm font-bold text-white">Target Document (Text B)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 bg-[#0B0D12] px-2 py-0.5 rounded border border-[#242C3D]">
                Length: <strong className="text-white">{textB.length}</strong> chars
              </span>
              <button
                onClick={handleClearB}
                title="Clear Text B"
                className="p-1 rounded-lg hover:bg-[#1C2230] text-slate-400 hover:text-[#FF6B70] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={textB}
              onChange={(e) => {
                setTextB(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter or paste Text B here..."
              rows={6}
              className="w-full p-3.5 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-slate-100 font-mono text-sm leading-relaxed placeholder:text-slate-600 focus:outline-none focus:border-[#36C5E8] transition-all resize-y"
            />
          </div>

          {/* Quick Stats on Text B */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Lines: {textB ? textB.split('\n').length : 0}</span>
            <span>Spaces: {(textB.match(/ /g) || []).length}</span>
            <span>Words: {textB.trim() ? textB.trim().split(/\s+/).length : 0}</span>
          </div>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#141821] border border-[#242C3D]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSwap}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C2230] hover:bg-[#242C3D] text-slate-200 text-xs font-semibold border border-[#242C3D] transition-colors active:scale-95"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#8B7CFF]" />
            <span>Swap A ⇄ B</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C2230] hover:bg-[#242C3D] text-slate-200 text-xs font-semibold border border-[#242C3D] transition-colors active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Inputs</span>
          </button>
        </div>

        {/* Compare Execution CTA */}
        <div className="flex items-center gap-3">
          {textA.length > 25 || textB.length > 25 ? (
            <span className="text-[11px] text-amber-400/90 font-mono hidden sm:inline">
              Note: Inputs &gt; 25 chars create large matrices (scrollable).
            </span>
          ) : null}

          <button
            onClick={handleCompareClick}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B7CFF] to-[#36C5E8] text-white text-xs font-bold hover:opacity-95 shadow-glow-violet transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Compute & Visualize Algorithms</span>
          </button>
        </div>
      </div>

      {/* Strict Fidelity Specification Notice */}
      <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#36C5E8] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200">Strict Character-Based Case Study Fidelity:</strong>
          <p className="leading-relaxed">
            As implemented in the foundational C++ algorithm:
            Comparison is strictly <strong>case-sensitive</strong> ('A' !== 'a'), spaces (<code>' '</code>) and punctuation marks are preserved and evaluated as distinct characters. No silent tokenization, stemming, or lowercasing is applied.
          </p>
        </div>
      </div>
    </div>
  );
}

