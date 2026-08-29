// Content lint for src/content.
//
// Checks, in order:
//   1. every content object has the shape its type requires
//   2. referenced case ids and principle ids resolve
//   3. Flesch Reading Ease per module section (fail < 55, warn < 60)
//
// Run with: npm run lint:content
// The npm script passes --experimental-strip-types so Node can import the .ts
// content files directly.

import process from "node:process";

const CONTENT_URL = new URL("../src/content/index.ts", import.meta.url);

const PRINCIPLE_IDS = [
  "tradeoff",
  "consent",
  "minimization",
  "purpose",
  "sensitive",
];
const NECESSITY = ["needed", "not-needed", "inferred"];
const VERDICTS = ["ethical", "borderline", "unethical"];

const FAIL_BELOW = 55;
const WARN_BELOW = 60;

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const isArr = (v) => Array.isArray(v);

// --------------------------------------------------------------------------
// Readability
// --------------------------------------------------------------------------

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const groups = word.match(/[aeiouy]{1,2}/g);
  return groups ? groups.length : 1;
}

function fleschReadingEase(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  const words = clean.split(/\s+/).filter((w) => /[a-z]/i.test(w));
  if (words.length === 0) return 100;
  const sentences = Math.max(1, (clean.match(/[.!?]+/g) || []).length);
  const syllables = words.reduce((n, w) => n + countSyllables(w), 0);
  return (
    206.835 -
    1.015 * (words.length / sentences) -
    84.6 * (syllables / words.length)
  );
}

// --------------------------------------------------------------------------
// Shape checks
// --------------------------------------------------------------------------

function checkDataField(f, where) {
  if (!f || typeof f !== "object") return err(`${where}: not an object`);
  if (!isStr(f.name)) err(`${where}: name must be a non-empty string`);
  if (!NECESSITY.includes(f.necessity))
    err(`${where}: necessity must be one of ${NECESSITY.join(", ")}`);
  if (f.note !== undefined && !isStr(f.note))
    err(`${where}: note must be a non-empty string when present`);
}

function checkQuizQuestion(q, where, expectedPrinciple) {
  if (!isStr(q.id)) return err(`${where}: id must be a non-empty string`);
  if (!PRINCIPLE_IDS.includes(q.principle))
    err(`${where} (${q.id}): principle "${q.principle}" is not valid`);
  if (expectedPrinciple && q.principle !== expectedPrinciple)
    warn(`${where} (${q.id}): principle "${q.principle}" differs from module "${expectedPrinciple}"`);
  if (!isStr(q.prompt)) err(`${where} (${q.id}): prompt must be a non-empty string`);
  if (!isStr(q.explanation))
    err(`${where} (${q.id}): explanation must be a non-empty string`);
  if (!isArr(q.options) || q.options.length < 2)
    return err(`${where} (${q.id}): options must have at least 2 entries`);
  const ids = new Set();
  for (const o of q.options) {
    if (!isStr(o.id) || !isStr(o.text))
      err(`${where} (${q.id}): each option needs an id and text`);
    if (ids.has(o.id)) err(`${where} (${q.id}): duplicate option id "${o.id}"`);
    ids.add(o.id);
  }
  if (!ids.has(q.correctOptionId))
    err(`${where} (${q.id}): correctOptionId "${q.correctOptionId}" is not an option id`);
}

function checkModule(m, caseIds) {
  const where = `module "${m.id}"`;
  if (!PRINCIPLE_IDS.includes(m.id)) err(`${where}: id is not a valid PrincipleId`);
  if (typeof m.order !== "number") err(`${where}: order must be a number`);
  if (!isStr(m.title)) err(`${where}: title must be a non-empty string`);
  if (!isStr(m.oneLiner)) err(`${where}: oneLiner must be a non-empty string`);
  if (typeof m.readingMinutes !== "number" || m.readingMinutes <= 0)
    err(`${where}: readingMinutes must be a positive number`);
  else if (m.readingMinutes < 3 || m.readingMinutes > 7)
    warn(`${where}: readingMinutes is ${m.readingMinutes}, target is 4-5`);

  if (!isArr(m.sections) || m.sections.length < 2 || m.sections.length > 4)
    err(`${where}: sections must have 2 to 4 entries`);
  else
    m.sections.forEach((s, i) => {
      if (!isStr(s.heading)) err(`${where} section ${i + 1}: heading must be a non-empty string`);
      if (!isArr(s.body) || s.body.length === 0 || !s.body.every(isStr))
        err(`${where} section ${i + 1}: body must be a non-empty array of non-empty strings`);
    });

  if (!isArr(m.caseIds) || m.caseIds.length === 0)
    err(`${where}: caseIds must list at least one case`);
  else
    for (const id of m.caseIds)
      if (!caseIds.has(id)) err(`${where}: caseId "${id}" does not resolve to a case`);

  if (!isArr(m.takeaways) || m.takeaways.length < 3 || m.takeaways.length > 4)
    err(`${where}: takeaways must have 3 or 4 entries`);
  else if (!m.takeaways.every(isStr))
    err(`${where}: every takeaway must be a non-empty string`);

  if (!isArr(m.quiz) || m.quiz.length !== 3)
    err(`${where}: quiz must have exactly 3 questions`);
  else m.quiz.forEach((q, i) => checkQuizQuestion(q, `${where} quiz ${i + 1}`, m.id));

  // Readability per section.
  if (isArr(m.sections))
    m.sections.forEach((s, i) => {
      if (!isArr(s.body)) return;
      const score = fleschReadingEase(s.body.join(" "));
      const label = `${where} section ${i + 1} ("${s.heading}")`;
      const rounded = score.toFixed(1);
      if (score < FAIL_BELOW) err(`${label}: Flesch Reading Ease ${rounded} is below ${FAIL_BELOW}`);
      else if (score < WARN_BELOW) warn(`${label}: Flesch Reading Ease ${rounded} is below ${WARN_BELOW}`);
      else console.log(`  ok  ${label}: FRE ${rounded}`);
    });
}

function checkCase(c, seenIds) {
  const where = `case "${c.id}"`;
  if (!isStr(c.id)) return err("a case is missing its id");
  if (seenIds.has(c.id)) err(`${where}: duplicate case id`);
  seenIds.add(c.id);
  if (!isStr(c.title)) err(`${where}: title must be a non-empty string`);
  if (!PRINCIPLE_IDS.includes(c.principle))
    err(`${where}: principle "${c.principle}" is not valid`);
  if (!isArr(c.dataCollected) || c.dataCollected.length === 0)
    err(`${where}: dataCollected must list at least one field`);
  else c.dataCollected.forEach((f, i) => checkDataField(f, `${where} dataCollected[${i}]`));
  for (const k of ["statedPurpose", "whatHappened", "principleBroken", "minimalAlternative"])
    if (!isStr(c[k])) err(`${where}: ${k} must be a non-empty string`);
  if (!c.source || !isStr(c.source.citation))
    err(`${where}: source.citation must be a non-empty string`);
  if (c.source && c.source.url !== undefined && !isStr(c.source.url))
    err(`${where}: source.url must be a non-empty string when present`);
  if (c.source && !c.source.url)
    warn(`${where}: no source.url — add and verify one before the sessions`);
}

function checkScenario(s, seenIds) {
  const where = `scenario "${s.id}"`;
  if (!isStr(s.id)) return err("a scenario is missing its id");
  if (seenIds.has(s.id)) err(`${where}: duplicate scenario id`);
  seenIds.add(s.id);
  if (!isStr(s.title)) err(`${where}: title must be a non-empty string`);
  if (!isStr(s.context)) err(`${where}: context must be a non-empty string`);
  if (!isStr(s.statedJustification))
    err(`${where}: statedJustification must be a non-empty string`);
  if (!isStr(s.principleFeedback))
    err(`${where}: principleFeedback must be a non-empty string`);
  if (!isArr(s.request) || s.request.length === 0)
    err(`${where}: request must list at least one field`);
  else s.request.forEach((f, i) => checkDataField(f, `${where} request[${i}]`));
  if (!VERDICTS.includes(s.correctVerdict))
    err(`${where}: correctVerdict "${s.correctVerdict}" is not valid`);
  if (!PRINCIPLE_IDS.includes(s.correctPrinciple))
    err(`${where}: correctPrinciple "${s.correctPrinciple}" is not valid`);
  if (!s.feedback || typeof s.feedback !== "object")
    err(`${where}: feedback must be an object`);
  else
    for (const v of VERDICTS)
      if (!isStr(s.feedback[v]))
        err(`${where}: feedback["${v}"] must be a non-empty string`);
}

function checkGlossary(g, seenTerms) {
  const where = `glossary term "${g.term}"`;
  if (!isStr(g.term)) return err("a glossary entry is missing its term");
  const key = g.term.toLowerCase();
  if (seenTerms.has(key)) err(`${where}: duplicate term`);
  seenTerms.add(key);
  if (!isStr(g.plain)) err(`${where}: plain must be a non-empty string`);
  if (g.th !== undefined && !isStr(g.th))
    err(`${where}: th must be a non-empty string when present`);
}

// --------------------------------------------------------------------------
// Run
// --------------------------------------------------------------------------

const content = await import(CONTENT_URL.href);
const { modules, cases, scenarios, glossary } = content;

console.log("Checking content...\n");

const caseIds = new Set();
if (!isArr(cases) || cases.length === 0) err("cases: expected a non-empty array");
else cases.forEach((c) => checkCase(c, caseIds));

if (!isArr(modules) || modules.length !== 5)
  err(`modules: expected 5 modules, found ${isArr(modules) ? modules.length : "none"}`);
if (isArr(modules)) {
  modules.forEach((m) => checkModule(m, caseIds));
  const orders = modules.map((m) => m.order).sort((a, b) => a - b);
  if (orders.join(",") !== "1,2,3,4,5")
    warn(`modules: orders are ${orders.join(",")}, expected 1,2,3,4,5`);
}

const scenarioIds = new Set();
if (!isArr(scenarios) || scenarios.length !== 7)
  err(`scenarios: expected 7 scenarios, found ${isArr(scenarios) ? scenarios.length : "none"}`);
if (isArr(scenarios)) {
  scenarios.forEach((s) => checkScenario(s, scenarioIds));
  const verdicts = new Set(scenarios.map((s) => s.correctVerdict));
  if (!verdicts.has("ethical"))
    warn("scenarios: no clearly ethical scenario — the set risks teaching 'always pick unethical'");
  if (!verdicts.has("borderline"))
    warn("scenarios: no borderline scenario — the set risks teaching 'always pick unethical'");
}

const terms = new Set();
if (!isArr(glossary) || glossary.length === 0)
  err("glossary: expected a non-empty array");
else glossary.forEach((g) => checkGlossary(g, terms));

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------

console.log("");
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);

console.log(
  `\n${errors.length} error(s), ${warnings.length} warning(s).`,
);

process.exit(errors.length > 0 ? 1 : 0);
