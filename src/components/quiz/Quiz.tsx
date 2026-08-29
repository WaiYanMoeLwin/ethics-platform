import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { QuizQuestion } from "../../content";

/**
 * Formative end-of-module quiz. One question at a time. Answering a question
 * reveals whether it was right AND the explanation — the explanation shows for
 * correct answers too, because that is where the learning happens.
 *
 * Nothing is scored, counted, or saved. There is no results screen. Finishing
 * all three questions marks the module complete (CLAUDE.md: quizzes are
 * formative only and are not study data).
 */
export default function Quiz({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const promptRef = useRef<HTMLParagraphElement | null>(null);
  const advanceRef = useRef<HTMLButtonElement | null>(null);
  const finishedRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = answered && selected === question.correctOptionId;

  // Move focus to the prompt when the question changes, but not on first mount
  // (that would pull focus away from the page as soon as it loads).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    promptRef.current?.focus();
  }, [index]);

  // After answering, move focus to the advance button.
  useEffect(() => {
    if (answered) advanceRef.current?.focus();
  }, [answered]);

  // On finishing, move focus to the closing message so it is read.
  useEffect(() => {
    if (finished) finishedRef.current?.focus();
  }, [finished]);

  function choose(optionId: string) {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);
  }

  function moveFocus(from: number, delta: number) {
    const count = question.options.length;
    const to = (from + delta + count) % count;
    optionRefs.current[to]?.focus();
  }

  function onOptionKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(i, 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(i, -1);
    }
  }

  function advance() {
    if (isLast) {
      setFinished(true);
      onComplete();
      return;
    }
    setIndex((v) => v + 1);
    setSelected(null);
    setAnswered(false);
  }

  if (finished) {
    return (
      <div
        ref={finishedRef}
        role="status"
        tabIndex={-1}
        className="rounded-lg border border-rule bg-white p-5 outline-none"
      >
        <p className="font-mono text-sm text-ethical">
          <span aria-hidden="true">✓ </span>
          That is all three questions. This module is now marked complete.
        </p>
        <p className="mt-2 text-sm text-slate">
          These questions are only for your own learning. Nothing was scored or
          saved. You can reread the module at any time.
        </p>
      </div>
    );
  }

  const promptId = `quiz-prompt-${index}`;

  return (
    <div className="rounded-lg border border-rule bg-white p-5">
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
        Question {index + 1} of {questions.length}
      </p>

      <p
        ref={promptRef}
        id={promptId}
        tabIndex={-1}
        className="mt-2 font-display text-lg font-semibold leading-snug outline-none"
      >
        {question.prompt}
      </p>

      <div
        role="radiogroup"
        aria-labelledby={promptId}
        className="mt-4 space-y-2"
      >
        {question.options.map((option, i) => {
          const chosen = selected === option.id;
          const isAnswerKey = option.id === question.correctOptionId;

          let tone = "border-rule bg-white hover:border-ink";
          if (answered && isAnswerKey) tone = "border-ethical bg-white";
          else if (answered && chosen) tone = "border-unethical bg-white";
          else if (answered) tone = "border-rule bg-white opacity-70";

          return (
            <button
              key={option.id}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={chosen}
              aria-disabled={answered}
              onClick={() => choose(option.id)}
              onKeyDown={(e) => onOptionKeyDown(e, i)}
              className={`flex w-full items-start justify-between gap-3 rounded-lg border px-4 py-3 text-left leading-snug transition-colors ${tone} ${
                answered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span>{option.text}</span>
              {answered && isAnswerKey ? (
                <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-ethical">
                  <span aria-hidden="true">✓ </span>Correct
                </span>
              ) : answered && chosen ? (
                <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-unethical">
                  <span aria-hidden="true">✕ </span>Your answer
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div role="status" aria-live="polite" className="mt-4">
        {answered ? (
          <div
            className={`border-l-2 pl-3 ${
              isCorrect ? "border-ethical" : "border-unethical"
            }`}
          >
            <p className="font-mono text-sm">
              <span aria-hidden="true">{isCorrect ? "✓ " : "✕ "}</span>
              {isCorrect ? "Correct." : "Not quite."}
            </p>
            <p className="mt-1 max-w-prose text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        ) : null}
      </div>

      {answered ? (
        <button
          ref={advanceRef}
          type="button"
          onClick={advance}
          className="mt-4 rounded bg-ethical px-4 py-2 font-mono text-sm text-white"
        >
          {isLast ? "Finish" : "Next question"}
        </button>
      ) : null}
    </div>
  );
}
