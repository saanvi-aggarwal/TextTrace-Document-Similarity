/**
 * Backtracking Helper Utilities for LCS and Edit Distance
 */

/**
 * Returns a Set of formatted coordinate keys "i,j" from a path list
 * for O(1) cell lookup in the matrix renderer.
 *
 * @param {Array<{i: number, j: number}>} path
 * @returns {Set<string>}
 */
export function createPathLookup(path = []) {
  const set = new Set();
  path.forEach((step) => {
    set.add(`${step.i},${step.j}`);
    if (step.nextI !== undefined && step.nextJ !== undefined) {
      set.add(`${step.nextI},${step.nextJ}`);
    }
  });
  return set;
}

/**
 * Explains tie-breaking behavior for academic transparency.
 */
export const TIE_BREAKING_DOCUMENTATION = {
  lcs: {
    rule: 'Favor Top Predecessor (L[i-1][j])',
    explanation: 'When both Top (excluding character of Text A) and Left (excluding character of Text B) yield identical DP values, our algorithm deterministically chooses the Top predecessor. This guarantees a consistent, reproducible optimal path while demonstrating valid alternative optimal substructures.',
  },
  editDistance: {
    rule: 'Priority Order: Substitution/Match -> Deletion -> Insertion',
    explanation: 'When multiple operations yield the identical minimum cost, the visualizer prioritizes Match/Substitution (diagonal), followed by Deletion (top), then Insertion (left). While alternative paths may exist, all such paths share the identical global minimum edit distance.',
  }
};

