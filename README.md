# TEXTTRACE — Document Similarity & Algorithm Visualization Platform

**TEXTTRACE** is a minimal, multi-section academic project platform developed for **DSA-II**. It provides an editorial, structured user journey demonstrating Document Similarity and Plagiarism Detection using:
1. **Longest Common Subsequence (LCS)**
2. **Levenshtein Edit Distance**
3. **Dynamic Programming (DP)**

---

## 🗺️ Natural Academic User Journey

```
01. HOME → 02. PROBLEM STATEMENT → 03. ALGORITHMS → 04. DYNAMIC PROGRAMMING → 
05. INTERACTIVE LAB → 06. VISUALIZATION STUDIO → 07. RESULTS & ANALYSIS → 08. ABOUT THE PROJECT
```

Users can either progress through the narrative sequentially or jump directly to the **Interactive Lab** or **Visualization Studio** via the top navigation bar.

---

## 🏛️ Eight Core Sections

### 01. HOME
- Minimal `TEXTTRACE` branding with `DSA-II Academic Project` tag.
- Headline introducing character-level document similarity.
- Visual alignment preview showing Document A and Document B with character matching.
- Direct CTAs: *"Explore the Project"* and *"Try Interactive Lab"*.

### 02. PROBLEM STATEMENT
- Mathematical formulation of string alignment and transformation.
- Real-world motivation: plagiarism screening, version control diffing, genomics alignment.
- Visual before-and-after comparison (`"kitten"` $\to$ `"sitting"`).
- Academic caveat distinguishing literal string resemblance from proof of plagiarism.

### 03. ALGORITHMS
Two distinct, visually consistent formulation breakdowns:
- **Longest Common Subsequence (LCS)**:
  - Definition, non-contiguous ordering preservation.
  - Concrete example ($ABCD$ & $ACDF \to ACD$).
  - Full recurrence relation: $L[i][j] = 1 + L[i-1][j-1]$ on match, else $\max(L[i-1][j], L[i][j-1])$.
  - Base cases: $L[i][0] = 0, L[0][j] = 0$.
- **Levenshtein Edit Distance**:
  - Definition of atomic insertions, deletions, and substitutions.
  - Concrete example ($kitten \to sitting$, 3 edits).
  - Full recurrence relation: $\min(D[i-1][j]+1, D[i][j-1]+1, D[i-1][j-1]+\text{cost})$.
  - Base cases: $D[i][0] = i, D[0][j] = j$.

### 04. DYNAMIC PROGRAMMING
- Tabulation matrix mechanics: rows represent characters of Document A, columns represent Document B.
- Causal predecessor breakdown: Diagonal $(i-1, j-1)$, Top $(i-1, j)$, and Left $(i, j-1)$.
- Interactive mini matrix demo ($CAT$ vs $CAR$) showing step-by-step row-major cell population.
- Mathematical complexity guarantees: $O(m \times n)$ time and $O(m \times n)$ space.

### 05. INTERACTIVE LAB
- Clean text input areas for Document A and Document B with dynamic character counters.
- Benchmark sample presets (`kitten` / `sitting`, `ABC` / `AC`, `the cat sat` / `the cat sleeps`, `data structures`, `apple` / `xyz`).
- Algorithm selector: LCS or Levenshtein Edit Distance.
- Quick swap and reset controls.
- Primary CTA: *"Begin Visualization"*.

### 06. VISUALIZATION STUDIO
Two synchronized presentation modes powered by the same underlying algorithm engine:
- **Learning Mode**:
  - Full $(m+1) \times (n+1)$ Dynamic Programming matrix.
  - Active cell highlight with causal predecessor dependencies.
  - Recurrence formula & explicit arithmetic calculation.
  - Backtracking path toggle.
  - Controls: Previous step, Next step, Play / Pause, Replay, and Speed selector (0.5x, 1x, 1.5x).
- **Animation Mode**:
  - Stage 1: Character-by-character scan & match/mismatch status.
  - Stage 2: Progressive DP matrix construction with active cell calculations.
  - Stage 3: Backtracking path tracing cell by cell.
  - Stage 4: Sequential LCS string reconstruction or string mutation script.

### 07. RESULTS & ANALYSIS
- Exact formula-derived similarity scores:
  - **LCS Similarity**: $\frac{2 \times \text{LCS}}{m + n} \times 100\%$
  - **Edit Similarity**: $\left(1 - \frac{\text{dist}}{\max(m, n)}\right) \times 100\%$
- Operation breakdown (substitutions, deletions, insertions, matches).
- Clear academic distinction: *"Similarity is an indication for comparison, not proof of plagiarism."*

### 08. ABOUT THE PROJECT
- Academic project objectives.
- Technology stack: pure JavaScript DP engines, React 19, Vite, Tailwind CSS.
- Theoretical time and space complexity guarantees.
- Methodological limitations (character-level vs semantic NLP).
- Academic citations: Levenshtein (1966), Wagner & Fischer (1974), Hirschberg (1975), Cormen et al. CLRS (2009).

---

## 🛠️ Automated Test Suite Verification

Run the automated test suite:

```bash
node test_suite.js
```

All 6 test cases pass with 100% mathematical accuracy:
- `kitten` / `sitting`: LCS length = 4, Edit Distance = 3, LCS Sim = 61.54%, Edit Sim = 57.14%
- `data structures` / `data structures`: LCS Sim = 100%, Edit Distance = 0, Edit Sim = 100%
- `apple` / `xyz`: LCS len = 0, Edit Distance = 5, Both Sim = 0%
- `""` / `"hello"`: LCS len = 0, Edit Distance = 5, Both Sim = 0%
- `""` / `""`: Both Sim = 100%, Edit Distance = 0
- `ABC` / `AC`: LCS len = 2 ("AC"), Edit Distance = 1, LCS Sim = 80%, Edit Sim = 66.67%

---

## 💻 Running the Application

```bash
npm run dev
```

Open **`http://localhost:5173/`** in your browser.
