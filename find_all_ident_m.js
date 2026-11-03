import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const lines = code.split('\n');
  lines.forEach((l, idx) => {
    // Look for identifier m: e.g. {m}, m +, + m, m -, m *, m /, m ,, (m, [m
    // but not within quotes '...' or "..." or `...` or words like 'from', 'item', 'match'
    // Let's strip strings first
    const stripped = l.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, '``');
    if (/\bm\b/.test(stripped)) {
      console.log(`${f}:${idx + 1}: ${l.trim()}`);
    }
  });
});

