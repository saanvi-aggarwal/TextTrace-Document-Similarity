import { computeLCS } from './src/utils/lcs.js';
import { computeEditDistance } from './src/utils/editDistance.js';
import { calculateLcsSimilarity, calculateEditSimilarity } from './src/utils/similarity.js';

function runTests() {
  const tests = [
    {
      id: 1,
      a: 'kitten',
      b: 'sitting',
      expectedLcsLen: 4,
      expectedEditDist: 3,
      expectedLcsSim: 61.54,
      expectedEditSim: 57.14,
    },
    {
      id: 2,
      a: 'data structures',
      b: 'data structures',
      expectedLcsLen: 15,
      expectedEditDist: 0,
      expectedLcsSim: 100,
      expectedEditSim: 100,
    },
    {
      id: 3,
      a: 'apple',
      b: 'xyz',
      expectedLcsLen: 0,
      expectedEditDist: 5,
      expectedLcsSim: 0,
      expectedEditSim: 0,
    },
    {
      id: 4,
      a: '',
      b: 'hello',
      expectedLcsLen: 0,
      expectedEditDist: 5,
      expectedLcsSim: 0,
      expectedEditSim: 0,
    },
    {
      id: 5,
      a: '',
      b: '',
      expectedLcsLen: 0,
      expectedEditDist: 0,
      expectedLcsSim: 100,
      expectedEditSim: 100,
    },
    {
      id: 6,
      a: 'ABC',
      b: 'AC',
      expectedLcsLen: 2,
      expectedLcsStr: 'AC',
      expectedEditDist: 1,
    }
  ];

  console.log('--- STARTING TEXTTRACE ALGORITHM TEST SUITE ---');
  let allPassed = true;

  tests.forEach((t) => {
    const lcsRes = computeLCS(t.a, t.b);
    const editRes = computeEditDistance(t.a, t.b);
    const lcsSim = Number(calculateLcsSimilarity(lcsRes.finalLcsLength, t.a.length, t.b.length).toFixed(2));
    const editSim = Number(calculateEditSimilarity(editRes.editDistance, t.a.length, t.b.length).toFixed(2));

    console.log(`\nTest #${t.id}: A="${t.a}", B="${t.b}"`);
    console.log(`  LCS len: computed=${lcsRes.finalLcsLength}, expected=${t.expectedLcsLen}`);
    console.log(`  LCS str: computed="${lcsRes.lcsString}"`);
    console.log(`  Edit dist: computed=${editRes.editDistance}, expected=${t.expectedEditDist}`);
    console.log(`  LCS sim: computed=${lcsSim}%, expected=${t.expectedLcsSim !== undefined ? t.expectedLcsSim + '%' : 'N/A'}`);
    console.log(`  Edit sim: computed=${editSim}%, expected=${t.expectedEditSim !== undefined ? t.expectedEditSim + '%' : 'N/A'}`);

    if (t.expectedLcsLen !== undefined && lcsRes.finalLcsLength !== t.expectedLcsLen) {
      console.error(`  FAIL: LCS len mismatch`);
      allPassed = false;
    }
    if (t.expectedLcsStr !== undefined && lcsRes.lcsString !== t.expectedLcsStr) {
      console.error(`  FAIL: LCS str mismatch`);
      allPassed = false;
    }
    if (t.expectedEditDist !== undefined && editRes.editDistance !== t.expectedEditDist) {
      console.error(`  FAIL: Edit dist mismatch`);
      allPassed = false;
    }
    if (t.expectedLcsSim !== undefined && Math.abs(lcsSim - t.expectedLcsSim) > 0.05) {
      console.error(`  FAIL: LCS sim mismatch`);
      allPassed = false;
    }
    if (t.expectedEditSim !== undefined && Math.abs(editSim - t.expectedEditSim) > 0.05) {
      console.error(`  FAIL: Edit sim mismatch`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log('\n>>> ALL 6 ALGORITHM TEST CASES PASSED WITH 100% ACCURACY! <<<');
  } else {
    console.error('\n>>> TEST FAILURES DETECTED <<<');
    process.exit(1);
  }
}

runTests();

