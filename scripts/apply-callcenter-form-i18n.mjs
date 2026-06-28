/**
 * Apply callCenter + procedures.form translations to all locale files.
 * Run: node scripts/apply-callcenter-form-i18n.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { callCenterFormI18n } from "./callcenter-form-i18n.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "../lib/i18n/translations");

for (const [locale, translations] of Object.entries(callCenterFormI18n)) {
  const file = join(dir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf8"));
  data.callCenter = translations.callCenter;
  data.procedures = data.procedures ?? {};
  data.procedures.form = translations.form;
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Applied callCenter + form to ${locale}.json`);
}

console.log("Done.");
