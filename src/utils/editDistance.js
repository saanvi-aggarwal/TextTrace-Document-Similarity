/**
 * Levenshtein Edit Distance Dynamic Programming Engine
 * Character-based, case-sensitive, exact whitespace & punctuation preservation.
 */
import { formatChar } from './lcs.js';

/**
 * Computes the full Levenshtein Edit Distance DP matrix, step records,
 * predecessor information, and transformation sequence.
 *
 * @param {string} strA - Source string (Text A)
 * @param {string} strB - Target string (Text B)
 * @returns {Object} Complete DP matrix, step records, transformation history, and metrics.
 */
export function computeEditDistance(strA, strB) {
  const m = strA.length;
  const n = strB.length;

  // Initialize (m + 1) x (n + 1) matrix
  const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Base cases:
  // D[i][0] = i (deleting all characters of prefix A[0..i-1] to get empty string)
  // D[0][j] = j (inserting all characters of prefix B[0..j-1] into empty string)
  const baseSteps = [];

  for (let i = 0; i <= m; i++) {
    matrix[i][0] = i;
    baseSteps.push({
      i,
      j: 0,
      value: i,
      operation: 'DELETION_BASE',
      reason: i === 0
        ? 'D[0][0] = 0 (both empty strings require 0 operations)'
        : `D[${i}][0] = ${i}: Converting "${strA.slice(0, i)}" to "" requires ${i} deletion${i > 1 ? 's' : ''}.`
    });
  }

  for (let j = 1; j <= n; j++) {
    matrix[0][j] = j;
    baseSteps.push({
      i: 0,
      j,
      value: j,
      operation: 'INSERTION_BASE',
      reason: `D[0][${j}] = ${j}: Converting "" to "${strB.slice(0, j)}" requires ${j} insertion${j > 1 ? 's' : ''}.`
    });
  }

  // Row-major step calculation
  const steps = [];
  let stepCounter = 0;

  for (let i = 1; i <= m; i++) {
    const charA = strA[i - 1];
    for (let j = 1; j <= n; j++) {
      const charB = strB[j - 1];
      const isMatch = charA === charB;
      const subCost = isMatch ? 0 : 1;

      const deletionVal = matrix[i - 1][j] + 1;
      const insertionVal = matrix[i][j - 1] + 1;
      const substitutionVal = matrix[i - 1][j - 1] + subCost;

      const minVal = Math.min(deletionVal, insertionVal, substitutionVal);
      matrix[i][j] = minVal;

      // Determine winning operation(s)
      let chosenOperation = '';
      if (isMatch && minVal === substitutionVal) {
        chosenOperation = 'MATCH';
      } else if (minVal === substitutionVal) {
        chosenOperation = 'SUBSTITUTION';
      } else if (minVal === deletionVal) {
        chosenOperation = 'DELETION';
      } else {
        chosenOperation = 'INSERTION';
      }

      const predecessors = [
        {
          type: 'top',
          label: 'Deletion: D[i-1][j] + 1',
          i: i - 1,
          j,
          cellVal: matrix[i - 1][j],
          total: deletionVal,
          isMin: deletionVal === minVal,
        },
        {
          type: 'left',
          label: 'Insertion: D[i][j-1] + 1',
          i,
          j: j - 1,
          cellVal: matrix[i][j - 1],
          total: insertionVal,
          isMin: insertionVal === minVal,
        },
        {
          type: 'diagonal',
          label: isMatch ? 'Match (No-op): D[i-1][j-1] + 0' : 'Substitution: D[i-1][j-1] + 1',
          i: i - 1,
          j: j - 1,
          cellVal: matrix[i - 1][j - 1],
          cost: subCost,
          total: substitutionVal,
          isMin: substitutionVal === minVal,
        }
      ];

      const formula = `D[${i}][${j}] = min(D[${i - 1}][${j}] + 1, D[${i}][${j - 1}] + 1, D[${i - 1}][${j - 1}] + ${subCost})`;
      const calculation = `min(${deletionVal}, ${insertionVal}, ${substitutionVal}) = ${minVal}`;

      let explanation = '';
      if (isMatch) {
        explanation = `Characters match ('${formatChar(charA)}' === '${formatChar(charB)}'). Substitution cost is 0. Diagonal candidate (${matrix[i - 1][j - 1]} + 0 = ${substitutionVal}) is optimal, achieving min value ${minVal}.`;
      } else {
        explanation = `Characters differ ('${formatChar(charA)}' !== '${formatChar(charB)}'). Evaluating Deletion (${deletionVal}), Insertion (${insertionVal}), and Substitution (${substitutionVal}). Minimum cost is ${minVal}.`;
      }

      steps.push({
        stepIndex: stepCounter++,
        i,
        j,
        charA,
        charB,
        isMatch,
        subCost,
        deletionVal,
        insertionVal,
        substitutionVal,
        value: minVal,
        chosenOperation,
        predecessors,
        formula,
        calculation,
        explanation,
      });
    }
  }

  // Backtracking to find optimal alignment and transformation script
  const backtrack = backtrackEditDistance(matrix, strA, strB);

  return {
    strA,
    strB,
    m,
    n,
    matrix,
    baseSteps,
    steps,
    totalSteps: steps.length,
    editDistance: matrix[m][n],
    backtrackSteps: backtrack.steps,
    transformations: backtrack.transformations,
    operationCounts: backtrack.operationCounts,
  };
}

/**
 * Deterministic Backtracking for Levenshtein Distance
 */
export function backtrackEditDistance(matrix, strA, strB) {
  let i = strA.length;
  let j = strB.length;
  const rawOps = [];
  const steps = [];

  while (i > 0 || j > 0) {
    const currentVal = matrix[i][j];

    if (i > 0 && j > 0) {
      const charA = strA[i - 1];
      const charB = strB[j - 1];
      const cost = charA === charB ? 0 : 1;

      // Check diagonal (Match or Substitution)
      if (currentVal === matrix[i - 1][j - 1] + cost) {
        if (cost === 0) {
          rawOps.push({ type: 'MATCH', charA, charB, i, j });
          steps.push({
            i,
            j,
            nextI: i - 1,
            nextJ: j - 1,
            transition: 'diagonal',
            action: 'MATCH',
            reason: `'${formatChar(charA)}' matches '${formatChar(charB)}' (Cost 0). Retain character. Move diagonally to D[${i - 1}][${j - 1}].`
          });
        } else {
          rawOps.push({ type: 'SUBSTITUTE', charA, charB, i, j });
          steps.push({
            i,
            j,
            nextI: i - 1,
            nextJ: j - 1,
            transition: 'diagonal',
            action: 'SUBSTITUTE',
            reason: `Substitute '${formatChar(charA)}' -> '${formatChar(charB)}' (Cost 1). Move diagonally to D[${i - 1}][${j - 1}].`
          });
        }
        i--;
        j--;
        continue;
      }
    }

    // Check Deletion (from top D[i-1][j] + 1)
    if (i > 0 && currentVal === matrix[i - 1][j] + 1) {
      const charA = strA[i - 1];
      rawOps.push({ type: 'DELETE', charA, charB: null, i, j });
      steps.push({
        i,
        j,
        nextI: i - 1,
        nextJ: j,
        transition: 'top',
        action: 'DELETE',
        reason: `Delete '${formatChar(charA)}' from Text A (Cost 1). Move UP to D[${i - 1}][${j}].`
      });
      i--;
      continue;
    }

    // Check Insertion (from left D[i][j-1] + 1)
    if (j > 0 && currentVal === matrix[i][j - 1] + 1) {
      const charB = strB[j - 1];
      rawOps.push({ type: 'INSERT', charA: null, charB, i, j });
      steps.push({
        i,
        j,
        nextI: i,
        nextJ: j - 1,
        transition: 'left',
        action: 'INSERT',
        reason: `Insert '${formatChar(charB)}' into Text A (Cost 1). Move LEFT to D[${i}][${j - 1}].`
      });
      j--;
      continue;
    }

    // Fallback break if at (0,0)
    break;
  }

  // Reverse raw operations to execute chronologically from index 0 to length
  rawOps.reverse();

  // Generate transformation stages:
  // e.g., kitten -> replace k with s -> sitten -> replace e with i -> sittin -> insert g -> sitting
  const transformations = [];
  let currentString = strA;
  const operationCounts = {
    MATCH: 0,
    SUBSTITUTE: 0,
    INSERT: 0,
    DELETE: 0,
    TOTAL_EDITS: 0,
  };

  // Build transformation steps
  let currentPos = 0; // tracking position in intermediate string
  rawOps.forEach((op, idx) => {
    if (op.type === 'MATCH') {
      operationCounts.MATCH++;
      currentPos++;
      transformations.push({
        step: idx + 1,
        type: 'MATCH',
        description: `Keep '${formatChar(op.charA)}'`,
        before: currentString,
        after: currentString,
        highlightIndex: currentPos - 1,
        cost: 0,
      });
    } else if (op.type === 'SUBSTITUTE') {
      operationCounts.SUBSTITUTE++;
      operationCounts.TOTAL_EDITS++;
      const before = currentString;
      const chars = currentString.split('');
      chars[currentPos] = op.charB;
      currentString = chars.join('');
      transformations.push({
        step: idx + 1,
        type: 'SUBSTITUTE',
        description: `Replace '${formatChar(op.charA)}' with '${formatChar(op.charB)}'`,
        before,
        after: currentString,
        highlightIndex: currentPos,
        cost: 1,
      });
      currentPos++;
    } else if (op.type === 'DELETE') {
      operationCounts.DELETE++;
      operationCounts.TOTAL_EDITS++;
      const before = currentString;
      const chars = currentString.split('');
      chars.splice(currentPos, 1);
      currentString = chars.join('');
      transformations.push({
        step: idx + 1,
        type: 'DELETE',
        description: `Delete '${formatChar(op.charA)}'`,
        before,
        after: currentString,
        highlightIndex: currentPos,
        cost: 1,
      });
    } else if (op.type === 'INSERT') {
      operationCounts.INSERT++;
      operationCounts.TOTAL_EDITS++;
      const before = currentString;
      const chars = currentString.split('');
      chars.splice(currentPos, 0, op.charB);
      currentString = chars.join('');
      transformations.push({
        step: idx + 1,
        type: 'INSERT',
        description: `Insert '${formatChar(op.charB)}'`,
        before,
        after: currentString,
        highlightIndex: currentPos,
        cost: 1,
      });
      currentPos++;
    }
  });

  return {
    steps,
    rawOps,
    transformations,
    operationCounts,
  };
}
