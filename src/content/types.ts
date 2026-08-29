// Content schemas — the single source of truth for all learning content.
// Sections 1-8 below are the contract from CLAUDE.md §5 and must not drift.

export type PrincipleId =
  | "tradeoff"
  | "consent"
  | "minimization"
  | "purpose"
  | "sensitive";

export type Verdict = "ethical" | "borderline" | "unethical";

/** A single data field a system asks for. Renders in the DataReceipt. */
export interface DataField {
  name: string; // "Precise background location"
  necessity: "needed" | "not-needed" | "inferred";
  note?: string; // why, in one short clause
}

export interface CaseStudy {
  id: string;
  title: string;
  principle: PrincipleId;
  dataCollected: DataField[];
  statedPurpose: string;
  whatHappened: string;
  principleBroken: string;
  minimalAlternative: string; // the engineering fix — never omit
  source: { citation: string; url?: string };
}

export interface QuizQuestion {
  id: string;
  principle: PrincipleId;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string; // shown for right AND wrong answers
}

export interface Module {
  id: PrincipleId;
  order: number;
  title: string;
  oneLiner: string; // shown on the home grid
  readingMinutes: number; // target 4-5
  sections: { heading: string; body: string[] }[];
  caseIds: string[];
  takeaways: string[]; // 3-4 bullets
  quiz: QuizQuestion[]; // exactly 3
}

export interface Scenario {
  id: string;
  title: string;
  context: string; // the situation, 2-3 sentences
  request: DataField[];
  statedJustification: string;
  correctVerdict: Verdict;
  correctPrinciple: PrincipleId;
  feedback: Record<Verdict, string>; // reasoned response to each choice
  principleFeedback: string;
}

// ---------------------------------------------------------------------------
// Glossary — not in CLAUDE.md §5, but required by §4 and §9. One entry per
// technical or legal term used in module text. `th` is an optional Thai gloss,
// added later and checked by a colleague (§9). Do not machine-translate it.
// ---------------------------------------------------------------------------

export interface GlossaryTerm {
  term: string;
  plain: string; // one-line plain-English definition
  th?: string; // optional Thai gloss, verified by a human
}
