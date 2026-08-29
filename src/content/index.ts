export type {
  PrincipleId,
  Verdict,
  DataField,
  CaseStudy,
  QuizQuestion,
  Module,
  Scenario,
  GlossaryTerm,
} from "./types.ts";

import type { PrincipleId, Module, CaseStudy, Scenario, GlossaryTerm } from "./types.ts";
import { modules } from "./modules/index.ts";
import { cases } from "./cases.ts";
import { scenarios } from "./scenarios.ts";
import { glossary } from "./glossary.ts";

export { modules, cases, scenarios, glossary };

/** The five principle ids, mirroring the PrincipleId union in types.ts. */
export const PRINCIPLE_IDS: PrincipleId[] = [
  "tradeoff",
  "consent",
  "minimization",
  "purpose",
  "sensitive",
];

export const getModule = (id: PrincipleId): Module | undefined =>
  modules.find((m) => m.id === id);

export const getCase = (id: string): CaseStudy | undefined =>
  cases.find((c) => c.id === id);

export const getScenario = (id: string): Scenario | undefined =>
  scenarios.find((s) => s.id === id);

export const getGlossaryTerm = (term: string): GlossaryTerm | undefined =>
  glossary.find((g) => g.term.toLowerCase() === term.toLowerCase());
