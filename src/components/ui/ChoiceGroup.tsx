import { useRef, type KeyboardEvent } from "react";

export interface Choice {
  id: string;
  label: string;
  hint?: string;
}

/**
 * A keyboard-operable single-select group. Every option is in the tab order;
 * arrow keys also move focus; Enter or Space selects (CLAUDE.md quality floor).
 * Selecting does not commit anything on its own — the parent decides what a
 * choice means and when to lock it with `locked`.
 */
export default function ChoiceGroup({
  label,
  choices,
  value,
  onChange,
  locked = false,
}: {
  label: string;
  choices: Choice[];
  value: string | null;
  onChange: (id: string) => void;
  /** show the current choice but stop further changes */
  locked?: boolean;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveFocus(from: number, delta: number) {
    const count = choices.length;
    const to = (from + delta + count) % count;
    refs.current[to]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(i, 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(i, -1);
    }
  }

  return (
    <div role="radiogroup" aria-label={label} className="space-y-2">
      {choices.map((choice, i) => {
        const checked = value === choice.id;
        let tone = "border-rule bg-white hover:border-ink";
        if (checked && locked) tone = "border-ink bg-white";
        else if (checked) tone = "border-ink bg-white";
        else if (locked) tone = "border-rule bg-white opacity-60";

        return (
          <button
            key={choice.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-disabled={locked}
            onClick={() => {
              if (!locked) onChange(choice.id);
            }}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex w-full flex-col gap-0.5 rounded-lg border px-4 py-3 text-left transition-colors ${tone} ${
              locked ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <span className="font-medium leading-snug">
              {choice.label}
              {checked ? (
                <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
                  <span aria-hidden="true">● </span>chosen
                </span>
              ) : null}
            </span>
            {choice.hint ? (
              <span className="text-sm leading-snug text-slate">
                {choice.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
