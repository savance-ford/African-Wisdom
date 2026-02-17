// come back to this

// import { QUOTES } from "../constants/quotes";

// function normalize(s: string) {
//   return s
//     .toLowerCase()
//     .replace(/[’']/g, "'")
//     .replace(/[^a-z0-9\s]/g, "")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// // Exact duplicates (normalized)
// const map = new Map<string, string[]>();

// for (const q of QUOTES) {
//   const key = normalize(q.text);
//   map.set(key, [...(map.get(key) ?? []), q.id]);
// }

// const exactDupes = [...map.entries()].filter(([, ids]) => ids.length > 1);

// console.log("\n=== EXACT DUPLICATES (normalized text) ===");
// if (exactDupes.length === 0) console.log("None ✅");
// for (const [textKey, ids] of exactDupes) {
//   console.log(`- "${textKey}" -> ${ids.join(", ")}`);
// }

// // Near duplicates: same “signature” = remove stopwords + keep key words
// const STOP = new Set([
//   "a",
//   "an",
//   "the",
//   "and",
//   "or",
//   "but",
//   "is",
//   "are",
//   "was",
//   "were",
//   "be",
//   "been",
//   "being",
//   "to",
//   "of",
//   "in",
//   "on",
//   "for",
//   "with",
//   "that",
//   "this",
//   "it",
//   "as",
//   "at",
//   "by",
//   "from",
//   "who",
//   "whom",
//   "which",
//   "what",
//   "when",
//   "where",
//   "why",
//   "how",
//   "does",
//   "do",
//   "did",
//   "not",
//   "no",
//   "you",
//   "your",
//   "he",
//   "she",
//   "they",
//   "we",
//   "i",
//   "one",
// ]);

// function signature(s: string) {
//   return normalize(s)
//     .split(" ")
//     .filter((w) => w && !STOP.has(w))
//     .slice(0, 12) // keep it small
//     .join(" ");
// }

// const sigMap = new Map<string, string[]>();
// for (const q of QUOTES) {
//   const sig = signature(q.text);
//   sigMap.set(sig, [...(sigMap.get(sig) ?? []), q.id]);
// }

// const nearDupes = [...sigMap.entries()].filter(([, ids]) => ids.length > 1);

// console.log("\n=== POSSIBLE NEAR DUPLICATES (signature match) ===");
// if (nearDupes.length === 0) console.log("None ✅");
// for (const [sig, ids] of nearDupes) {
//   console.log(`- "${sig}" -> ${ids.join(", ")}`);
// }
