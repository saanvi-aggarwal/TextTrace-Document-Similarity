import React, { createContext, useContext, useState, useMemo } from 'react';
import { computeLCS } from '../utils/lcs';
import { computeEditDistance } from '../utils/editDistance';
import { calculateLcsSimilarity, calculateEditSimilarity } from '../utils/similarity';

const AppContext = createContext(null);

export const SAMPLE_INPUTS = [
  { label: 'Kitten → Sitting', docA: 'kitten', docB: 'sitting', desc: 'Classic edit distance demonstration' },
  { label: 'Data Structures', docA: 'data structure', docB: 'data structures', desc: 'Single insertion suffix difference' },
  { label: 'Plagiarism Sample', docA: 'the quick brown fox jumped over the lazy dog', docB: 'a quick brown fox leaps over a lazy dog', desc: 'Paraphrased text with structural overlap' },
  { label: 'Disjoint Strings', docA: 'algorithm', docB: 'complex', desc: 'Minimal character overlap' },
  { label: 'Identical Texts', docA: 'dynamic programming', docB: 'dynamic programming', desc: '100% similarity identity' },
];

export function AppProvider({ children }) {
  const [docA, setDocA] = useState('kitten');
  const [docB, setDocB] = useState('sitting');
  const [algorithm, setAlgorithm] = useState('lcs'); // 'lcs' | 'edit'

  // Deterministically compute actual algorithm results
  const lcsData = useMemo(() => {
    const res = computeLCS(docA, docB);
    const sim = calculateLcsSimilarity(res.finalLcsLength, docA.length, docB.length);
    return { ...res, similarity: sim };
  }, [docA, docB]);

  const editData = useMemo(() => {
    const res = computeEditDistance(docA, docB);
    const sim = calculateEditSimilarity(res.editDistance, docA.length, docB.length);
    return { ...res, similarity: sim };
  }, [docA, docB]);

  const loadSample = (sample) => {
    setDocA(sample.docA);
    setDocB(sample.docB);
  };

  return (
    <AppContext.Provider
      value={{
        docA,
        setDocA,
        docB,
        setDocB,
        algorithm,
        setAlgorithm,
        lcsData,
        editData,
        loadSample,
        SAMPLE_INPUTS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

