/**
 * Longest Common Subsequence (LCS) Dynamic Programming Engine
 * Character-based, case-sensitive, exact whitespace & punctuation preservation.
 */

/**
 * Computes the full LCS Dynamic Programming table, step-by-step history,
 * predecessor information, and backtracking sequence.
 *
 * @param {string} strA - First input string (Text A)
 * @param {string} strB - Second input string (Text B)
 * @returns {Object} Complete DP matrix, step records, backtracking path, and metrics.
 */
export function computeLCS(strA, strB) {
  const m = strA.length;
  const n = strB.length;

  // Initialize (m + 1) x (n + 1) matrix with zeros
  const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Base case initialization steps (Row 0 and Column 0)
  const baseSteps = [];
  for (let j = 0; j <= n; j++) {
    baseSteps.push({
      i: 0,
      j,
      value: 0,
      type: 'base',
      reason: `Base case: L[0][${j}] = 0 (empty prefix of Text A compared with prefix of Text B of length ${j})`,
    });
  }
  for (let i = 1; i <= m; i++) {
    baseSteps.push({
      i,
      j: 0,
      value: 0,
      type: 'base',
      reason: `Base case: L[${i}][0] = 0 (prefix of Text A of length ${i} compared with empty prefix of Text B)`,
    });
  }

  // Row-major step calculation history
  const steps = [];
  let stepCounter = 0;

  for (let i = 1; i <= m; i++) {
    const charA = strA[i - 1];
    for (let j = 1; j <= n; j++) {
      const charB = strB[j - 1];
      const isMatch = charA === charB;

      let cellValue;
      let predecessors = [];
      let formula = '';
      let calculation = '';
      let explanation = '';

      if (isMatch) {
        const diagVal = matrix[i - 1][j - 1];
        cellValue = 1 + diagVal;
        matrix[i][j] = cellValue;

        predecessors = [
          { i: i - 1, j: j - 1, type: 'diagonal', label: 'Diagonal L[i-1][j-1]', value: diagVal }
        ];

        formula = `L[${i}][${j}] = 1 + L[${i - 1}][${j - 1}]`;
        calculation = `1 + ${diagVal} = ${cellValue}`;
        explanation = `Characters match ('${formatChar(charA)}' === '${formatChar(charB)}'). We extend the longest common subsequence found up to L[${i - 1}][${j - 1}] by 1.`;
      } else {
        const topVal = matrix[i - 1][j];
        const leftVal = matrix[i][j - 1];
        cellValue = Math.max(topVal, leftVal);
        matrix[i][j] = cellValue;

        predecessors = [
          { i: i - 1, j, type: 'top', label: 'Top L[i-1][j]', value: topVal, isMax: topVal >= leftVal },
          { i, j: j - 1, type: 'left', label: 'Left L[i][j-1]', value: leftVal, isMax: leftVal >= topVal }
        ];

        formula = `L[${i}][${j}] = max(L[${i - 1}][${j}], L[${i}][${j - 1}])`;
        calculation = `max(${topVal}, ${leftVal}) = ${cellValue}`;
        explanation = `Characters do not match ('${formatChar(charA)}' !== '${formatChar(charB)}'). We take the maximum length achieved by either excluding '${formatChar(charA)}' (Top: ${topVal}) or excluding '${formatChar(charB)}' (Left: ${leftVal}).`;
      }

      steps.push({
        stepIndex: stepCounter++,
        i,
        j,
        charA,
        charB,
        isMatch,
        value: cellValue,
        predecessors,
        formula,
        calculation,
        explanation,
      });
    }
  }

  // Backtracking to reconstruct LCS
  const backtrack = backtrackLCS(matrix, strA, strB);

  return {
    strA,
    strB,
    m,
    n,
    matrix,
    baseSteps,
    steps,
    totalSteps: steps.length,
    finalLcsLength: matrix[m][n],
    lcsString: backtrack.lcsString,
    backtrackSteps: backtrack.steps,
    matchedIndicesA: backtrack.matchedIndicesA,
    matchedIndicesB: backtrack.matchedIndicesB,
    skippedIndicesA: backtrack.skippedIndicesA,
    skippedIndicesB: backtrack.skippedIndicesB,
  };
}

/**
 * Deterministic Backtracking for LCS from (m, n) down to (0, 0)
 */
export function backtrackLCS(matrix, strA, strB) {
  let i = strA.length;
  let j = strB.length;
  const chars = [];
  const steps = [];
  const matchedIndicesA = [];
  const matchedIndicesB = [];

  // Record full path coordinates
  while (i > 0 && j > 0) {
    const charA = strA[i - 1];
    const charB = strB[j - 1];

    if (charA === charB) {
      // Diagonal transition - character matches and is added to LCS
      chars.push(charA);
      matchedIndicesA.push(i - 1);
      matchedIndicesB.push(j - 1);

      steps.push({
        i,
        j,
        nextI: i - 1,
        nextJ: j - 1,
        transition: 'diagonal',
        action: 'MATCH',
        char: charA,
        reason: `A[${i - 1}] ('${formatChar(charA)}') === B[${j - 1}] ('${formatChar(charB)}'): Character included in LCS. Move diagonally to L[${i - 1}][${j - 1}].`,
      });

      i--;
      j--;
    } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
      // Top predecessor has strictly higher value
      steps.push({
        i,
        j,
        nextI: i - 1,
        nextJ: j,
        transition: 'top',
        action: 'SKIP_A',
        char: charA,
        reason: `L[${i - 1}][${j}] (${matrix[i - 1][j]}) > L[${i}][${j - 1}] (${matrix[i][j - 1]}): Top value is greater. Exclude '${formatChar(charA)}' from Text A and move UP to L[${i - 1}][${j}].`,
      });
      i--;
    } else if (matrix[i][j - 1] > matrix[i - 1][j]) {
      // Left predecessor has strictly higher value
      steps.push({
        i,
        j,
        nextI: i,
        nextJ: j - 1,
        transition: 'left',
        action: 'SKIP_B',
        char: charB,
        reason: `L[${i}][${j - 1}] (${matrix[i][j - 1]}) > L[${i - 1}][${j}] (${matrix[i - 1][j]}): Left value is greater. Exclude '${formatChar(charB)}' from Text B and move LEFT to L[${i}][${j - 1}].`,
      });
      j--;
    } else {
      // Equal values: Deterministic tie-breaking rule
      // Rule: Favor UP (Top predecessor) to remain deterministic and reproducible
      steps.push({
        i,
        j,
        nextI: i - 1,
        nextJ: j,
        transition: 'top',
        action: 'SKIP_A',
        char: charA,
        reason: `Tie-break: Top L[${i - 1}][${j}] (${matrix[i - 1][j]}) == Left L[${i}][${j - 1}] (${matrix[i][j - 1]}). Deterministically favoring UP (Top predecessor) to L[${i - 1}][${j}].`,
      });
      i--;
    }
  }

  // Add remaining transitions to (0,0) if any
  while (i > 0) {
    steps.push({
      i,
      j: 0,
      nextI: i - 1,
      nextJ: 0,
      transition: 'top',
      action: 'SKIP_A',
      char: strA[i - 1],
      reason: `Reached column 0. Move UP to L[${i - 1}][0].`,
    });
    i--;
  }

  while (j > 0) {
    steps.push({
      i: 0,
      j,
      nextI: 0,
      nextJ: j - 1,
      transition: 'left',
      action: 'SKIP_B',
      char: strB[j - 1],
      reason: `Reached row 0. Move LEFT to L[0][${j - 1}].`,
    });
    j--;
  }

  // Reverse chars to get original order
  chars.reverse();
  const lcsString = chars.join('');

  matchedIndicesA.reverse();
  matchedIndicesB.reverse();

  const skippedIndicesA = [];
  for (let idx = 0; idx < strA.length; idx++) {
    if (!matchedIndicesA.includes(idx)) skippedIndicesA.push(idx);
  }

  const skippedIndicesB = [];
  for (let idx = 0; idx < strB.length; idx++) {
    if (!matchedIndicesB.includes(idx)) skippedIndicesB.push(idx);
  }

  return {
    lcsString,
    steps,
    matchedIndicesA,
    matchedIndicesB,
    skippedIndicesA,
    skippedIndicesB,
  };
}

/**
 * Format special characters (like space, newline, tab) for clean UI display
 */
export function formatChar(ch) {
  if (ch === ' ') return '␣ (space)';
  if (ch === '\t') return '\\t (tab)';
  if (ch === '\n') return '\\n (newline)';
  return ch;
}

