/**
 * TextTrace Similarity Calculations
 * Strict character-based similarity metrics based on original DSA-II C++ formulas.
 */

/**
 * Calculates LCS Similarity percentage:
 * Formula: (2 * LCS(A, B) / (m + n)) * 100
 * Special case: If m + n == 0, returns 100%.
 *
 * @param {number} lcsLength - Length of Longest Common Subsequence
 * @param {number} m - Length of Text A
 * @param {number} n - Length of Text B
 * @returns {number} Percentage formatted number (0 - 100)
 */
export function calculateLcsSimilarity(lcsLength, m, n) {
  if (m === 0 && n === 0) {
    return 100;
  }
  if (m + n === 0) {
    return 100;
  }
  const score = (2 * lcsLength) / (m + n) * 100;
  return Math.max(0, Math.min(100, score));
}

/**
 * Calculates Edit Similarity percentage:
 * Formula: (1 - EditDistance(A, B) / max(m, n)) * 100
 * Special case: If max(m, n) == 0, returns 100%.
 *
 * @param {number} editDistance - Levenshtein Edit Distance
 * @param {number} m - Length of Text A
 * @param {number} n - Length of Text B
 * @returns {number} Percentage formatted number (0 - 100)
 */
export function calculateEditSimilarity(editDistance, m, n) {
  const maxLen = Math.max(m, n);
  if (maxLen === 0) {
    return 100;
  }
  const score = (1 - editDistance / maxLen) * 100;
  return Math.max(0, Math.min(100, score));
}

/**
 * Format percentage nicely to 2 decimal places or 0 if whole number.
 */
export function formatPercentage(num) {
  if (Number.isInteger(num)) return `${num}%`;
  return `${Number(num.toFixed(2))}%`;
}

