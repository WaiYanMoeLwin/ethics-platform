import type { DataField } from "../../content";

const CONFIG: Record<
  DataField["necessity"],
  { label: string; glyph: string; className: string }
> = {
  needed: {
    label: "NEEDED",
    glyph: "✓", // check
    className: "text-ethical border-ethical",
  },
  "not-needed": {
    label: "NOT NEEDED",
    glyph: "✕", // cross
    className: "text-unethical border-unethical",
  },
  inferred: {
    label: "INFERRED",
    glyph: "≈", // approx
    className: "text-borderline border-borderline",
  },
};

/**
 * The stamp on a Data Receipt line. Colour never carries the meaning on its
 * own — the word is always there (CLAUDE.md §8).
 */
export default function NecessityStamp({
  necessity,
}: {
  necessity: DataField["necessity"];
}) {
  const { label, glyph, className } = CONFIG[necessity];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider ${className}`}
    >
      <span aria-hidden="true">{glyph}</span>
      {label}
    </span>
  );
}
