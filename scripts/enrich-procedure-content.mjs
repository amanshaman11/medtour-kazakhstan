/**
 * Add summary to procedure items in en.json.
 * Run: node scripts/enrich-procedure-content.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const enPath = join(__dirname, "../lib/i18n/translations/en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

for (const item of Object.values(en.procedures.items)) {
  const description = item.description;
  const firstSentence = description.split(/(?<=[.!?])\s+/)[0] ?? description;
  item.summary = firstSentence.length > 140 ? `${firstSentence.slice(0, 137).trim()}…` : firstSentence;
}

writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n", "utf8");
console.log("Added summary to en.json procedure items");
