import { Fragment, type ReactNode } from "react";
import { glossary, type GlossaryTerm } from "../../content";

// Longest terms first, so "informed consent" wins over "consent" at the same
// position in the alternation.
const sortedTerms = [...glossary].sort(
  (a, b) => b.term.length - a.term.length,
);

const byLower = new Map(glossary.map((g) => [g.term.toLowerCase(), g]));

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Match a known term, tolerating a trailing plural "s"/"es".
const TERM_RE = new RegExp(
  `\\b(${sortedTerms.map((g) => escape(g.term)).join("|")})(es|s)?\\b`,
  "gi",
);

function glossText(entry: GlossaryTerm): string {
  const isAcronym =
    entry.term.length <= 4 && entry.term === entry.term.toUpperCase();
  if (isAcronym) return entry.plain;
  return entry.plain.charAt(0).toLowerCase() + entry.plain.slice(1);
}

function FirstUse({ surface, entry }: { surface: string; entry: GlossaryTerm }) {
  return (
    <span>
      <span className="border-b border-dotted border-slate">{surface}</span>{" "}
      <span className="text-slate">({glossText(entry)})</span>
    </span>
  );
}

function Mention({ surface, entry }: { surface: string; entry: GlossaryTerm }) {
  return (
    <span
      className="border-b border-dotted border-rule"
      title={entry.plain}
    >
      {surface}
    </span>
  );
}

/**
 * Render a body string, marking glossary terms. The first time a term appears
 * in this render pass (`seen`), it is shown with an inline definition. Later
 * uses get a quiet dotted underline and a title attribute. Pass one shared
 * `seen` set for a whole module so "first use" means first use in the module
 * (CLAUDE.md §9).
 */
export function renderGlossaryProse(
  text: string,
  seen: Set<string>,
): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  TERM_RE.lastIndex = 0;

  for (let m = TERM_RE.exec(text); m !== null; m = TERM_RE.exec(text)) {
    const entry = byLower.get(m[1].toLowerCase());
    if (!entry) continue;

    if (m.index > last) out.push(text.slice(last, m.index));

    const surface = m[0];
    if (seen.has(entry.term)) {
      out.push(<Mention key={key++} surface={surface} entry={entry} />);
    } else {
      seen.add(entry.term);
      out.push(<FirstUse key={key++} surface={surface} entry={entry} />);
    }
    last = m.index + surface.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
