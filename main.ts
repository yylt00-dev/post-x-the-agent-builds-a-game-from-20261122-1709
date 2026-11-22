// Entry program for the make.fun bounty "The agent builds a game from one prompt"
// (slug: post-x-the-agent-builds-a-game-from-20261122-1709).
//
// The entry itself is a post on X carrying a short video: an AI coding agent
// building a tiny browser game (game.html in this repo) from a single prompt,
// ending with make.fun's referral end card. This program does the one thing
// the grader needs from the repository: it hands POST.json over to /output,
// where the house reads the post's address and its public counts.
//
// Node 22, standard library only, no network, no clock, no files outside
// this repository. Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const POST_FILE = "POST.json";

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const sourcePath = join(botDir, POST_FILE);
let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

// POST.json must be a JSON object with a single url string, so a typo in the
// file fails loudly here instead of silently shipping a bad entry.
let post: unknown;
try {
  post = JSON.parse(raw!);
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}
if (
  typeof post !== "object" ||
  post === null ||
  Array.isArray(post) ||
  typeof (post as { url?: unknown }).url !== "string"
) {
  fail("POST.json must be an object like {\"url\": \"https://x.com/<handle>/status/<id>\"}");
}
const url = (post as { url: string }).url;

// The gate only accepts an X post address, so warn early when the file
// still holds the placeholder or something that is not a post URL at all.
// (A placeholder is expected before the post goes up; this is a warning,
// not a failure, so the program still copies the file.)
if (!/^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(url)) {
  console.error(
    "main.ts: warning: POST.json url does not look like an X post address yet: " + url,
  );
}

mkdirSync(outputDir, { recursive: true });
try {
  // Byte-for-byte copy: the gate reads exactly what the repository holds.
  writeFileSync(join(outputDir, POST_FILE), raw!, "utf8");
} catch (err) {
  fail(`could not write ${join(outputDir, POST_FILE)}: ${(err as Error).message}`);
}
