import type { Module } from "../types.ts";
import tradeoff from "./01-tradeoff.ts";
import consent from "./02-consent.ts";
import minimization from "./03-minimization.ts";
import purpose from "./04-purpose.ts";
import sensitive from "./05-sensitive.ts";

/** All modules, in reading order. */
export const modules: Module[] = [
  tradeoff,
  consent,
  minimization,
  purpose,
  sensitive,
].sort((a, b) => a.order - b.order);

export { tradeoff, consent, minimization, purpose, sensitive };
