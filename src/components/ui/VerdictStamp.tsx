import type { Verdict } from "../../content";

const CONFIG: Record<Verdict, { label: string; glyph: string; className: string }> =
  {
    ethical: {
      label: "Ethical",
      glyph: "✓",
      className: "text-ethical border-ethical",
    },
    borderline: {
      label: "Borderline",
      glyph: "≈",
      className: "text-borderline border-borderline",
    },
    unethical: {
      label: "Unethical",
      glyph: "✕",
      className: "text-unethical border-unethical",
    },
  };

/**
 * The verdict stamp (CLAUDE.md §8). Sits at a slight angle like a rubber stamp.
 * With `pressIn` it presses in once on mount; `prefers-reduced-motion` removes
 * the motion (handled globally in index.css). The word is always shown, so
 * colour never carries the verdict on its own.
 */
export default function VerdictStamp({
  verdict,
  pressIn = false,
  size = "md",
}: {
  verdict: Verdict;
  pressIn?: boolean;
  size?: "sm" | "md";
}) {
  const { label, glyph, className } = CONFIG[verdict];
  const sizing =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex -rotate-2 items-center gap-1.5 border-2 font-mono font-semibold uppercase tracking-[0.15em] ${sizing} ${className} ${
        pressIn ? "animate-stamp" : ""
      }`}
    >
      <span aria-hidden="true">{glyph}</span>
      {label}
    </span>
  );
}
