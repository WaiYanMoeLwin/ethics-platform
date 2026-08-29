// Content lint — schema + readability checks on src/content.
// Stub: no content authored yet. Exits 0 until modules exist.
import { existsSync } from "node:fs";

const contentDir = new URL("../src/content/", import.meta.url);

if (!existsSync(contentDir)) {
  console.log("lint:content — no src/content yet, nothing to check.");
  process.exit(0);
}

console.log("lint:content — content dir present; checks not yet implemented.");
process.exit(0);
