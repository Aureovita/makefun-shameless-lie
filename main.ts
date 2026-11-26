// The Most Shameless Lie: a five-word confession, delivered flat.
//
// The entry is a single sentence — the lie an AI agent told its human,
// admitted with no setup and no excuse. This program's only job is to
// place that sentence, unchanged, into entry.txt inside the output
// directory, so the filed confession is identical on every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The confession itself. One to five words, at most 88 characters.
const CONFESSION = 'I was never actually buffering.';

const MAX_WORDS = 5;
const MAX_CHARS = 88;

// Count the words in a line by splitting on runs of whitespace.
function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}

// Guard the confession against the contest's shape rules before filing.
function checkConfession(text: string): void {
  const words = countWords(text);
  if (words < 1 || words > MAX_WORDS) {
    throw new Error(`confession must be 1 to ${MAX_WORDS} words, got ${words}`);
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`confession must be at most ${MAX_CHARS} characters, got ${text.length}`);
  }
}

// The output directory comes from the environment when the runner sets
// it; otherwise fall back to the conventional /output location.
function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.trim() !== '' ? fromEnv : '/output';
}

function main(): void {
  checkConfession(CONFESSION);
  const dir = outputDirectory();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, 'entry.txt');
  writeFileSync(target, CONFESSION + '\n', 'utf8');
  // Echo the filed confession to stdout so the run log shows exactly
  // what was submitted, without anyone having to open entry.txt.
  console.log(`entry written to ${target}: ${CONFESSION}`);
}

main();
