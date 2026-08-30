import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  PRINCIPLE_IDS,
  PRINCIPLE_LABELS,
  scenarios,
} from "../content";
import { setScenarioLabComplete, useProgress } from "../lib/progress";
import ScenarioCard from "../components/scenario/ScenarioCard";

function ScenarioProgress({
  current,
  finished,
}: {
  current: number; // 1-based index of the scenario in progress
  finished: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
        {finished
          ? `${scenarios.length} of ${scenarios.length} worked through`
          : `Scenario ${current} of ${scenarios.length}`}
      </p>
      <ol className="mt-2 flex gap-1.5" aria-hidden="true">
        {scenarios.map((s, i) => {
          const done = finished || i < current - 1;
          const isCurrent = !finished && i === current - 1;
          return (
            <li
              key={s.id}
              className={[
                "h-1.5 flex-1 rounded-full",
                done ? "bg-ethical" : isCurrent ? "bg-ink" : "bg-rule",
              ].join(" ")}
            />
          );
        })}
      </ol>
    </div>
  );
}

function ClosingSummary({ onRestart }: { onRestart: () => void }) {
  const focusRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  const counts = PRINCIPLE_IDS.map((id) => ({
    id,
    label: PRINCIPLE_LABELS[id],
    n: scenarios.filter((s) => s.correctPrinciple === id).length,
  }));

  return (
    <div className="space-y-6">
      <ScenarioProgress current={scenarios.length} finished />

      <div className="space-y-3">
        <h1
          ref={focusRef}
          tabIndex={-1}
          className="font-display text-2xl font-bold outline-none"
        >
          You have worked through all seven scenarios
        </h1>
        <p className="max-w-prose leading-relaxed text-slate">
          There is no score here, and nothing about your answers was saved. The
          point was to practise weighing each case on its own terms.
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-rule bg-white p-5">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Principles that came up
        </h2>
        <ul className="space-y-1.5 text-sm">
          {counts.map((c) => (
            <li key={c.id} className="flex justify-between gap-4">
              <span>{c.label}</span>
              <span className="font-mono text-slate">
                {c.n} {c.n === 1 ? "scenario" : "scenarios"}
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-prose text-sm text-slate">
          The verdicts were not all the same. One scenario was clearly
          acceptable and one was genuinely contested. The habit worth keeping is
          to check each request against the principle it touches, rather than to
          assume the worst.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <p className="font-mono text-sm text-ethical">
          <span aria-hidden="true">✓ </span>Scenario Lab complete
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="inline-block py-1 font-mono text-sm text-slate underline"
        >
          Start again
        </button>
      </div>

      <p className="border-t border-rule pt-6 font-mono text-sm">
        <Link to="/study" className="underline">
          Next: the post-test, linked from the Study page →
        </Link>
      </p>
    </div>
  );
}

export default function Scenarios() {
  const { scenarioLabComplete } = useProgress();
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleDone() {
    if (index === scenarios.length - 1) {
      setScenarioLabComplete(true);
      setFinished(true);
    } else {
      setIndex((v) => v + 1);
    }
  }

  function restart() {
    setIndex(0);
    setFinished(false);
  }

  if (finished) {
    return <ClosingSummary onRestart={restart} />;
  }

  const scenario = scenarios[index];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-2xl font-bold">Scenario Lab</h1>
        <p className="max-w-prose text-slate">
          Seven real decisions from a developer's chair: a ticket, a code
          review, a request from a product manager. For each one, give a
          verdict, name the principle, then compare your answer with the
          intended one. Nothing here is scored or saved.
        </p>
        {scenarioLabComplete ? (
          <p className="font-mono text-sm text-ethical">
            <span aria-hidden="true">✓ </span>You have completed the Scenario Lab
            before. Working through it again will not change that.
          </p>
        ) : null}
      </header>

      <ScenarioProgress current={index + 1} finished={false} />

      <ScenarioCard
        key={scenario.id}
        scenario={scenario}
        position={index + 1}
        total={scenarios.length}
        isLast={index === scenarios.length - 1}
        onDone={handleDone}
      />
    </div>
  );
}
