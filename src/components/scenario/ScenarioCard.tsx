import { useEffect, useRef, useState } from "react";
import {
  PRINCIPLE_IDS,
  PRINCIPLE_LABELS,
  type PrincipleId,
  type Scenario,
  type Verdict,
} from "../../content";
import ChoiceGroup, { type Choice } from "../ui/ChoiceGroup";
import DataReceipt from "../ui/DataReceipt";
import VerdictStamp from "../ui/VerdictStamp";

const VERDICT_CHOICES: Choice[] = [
  { id: "ethical", label: "Ethical", hint: "The collection is justified as described." },
  {
    id: "borderline",
    label: "Borderline",
    hint: "It could be acceptable, but it depends on details not settled here.",
  },
  {
    id: "unethical",
    label: "Unethical",
    hint: "The collection is not justified as described.",
  },
];

const PRINCIPLE_CHOICES: Choice[] = PRINCIPLE_IDS.map((id) => ({
  id,
  label: PRINCIPLE_LABELS[id],
}));

type Stage = "verdict" | "principle" | "reveal";

export default function ScenarioCard({
  scenario,
  position,
  total,
  isLast,
  onDone,
}: {
  scenario: Scenario;
  position: number; // 1-based
  total: number;
  isLast: boolean;
  onDone: () => void;
}) {
  const [stage, setStage] = useState<Stage>("verdict");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [principle, setPrinciple] = useState<PrincipleId | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const principleHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  // Focus the scenario heading when moving to a later scenario (not on the
  // first one, so page load does not yank focus).
  useEffect(() => {
    if (position > 1) headingRef.current?.focus();
  }, [scenario.id, position]);

  useEffect(() => {
    if (stage === "principle") principleHeadingRef.current?.focus();
    if (stage === "reveal") revealRef.current?.focus();
  }, [stage]);

  const verdictMatches = verdict === scenario.correctVerdict;
  const principleMatches = principle === scenario.correctPrinciple;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Scenario {position} of {total}
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-2xl font-bold leading-snug outline-none"
        >
          {scenario.title}
        </h2>
      </header>

      <p className="max-w-prose leading-relaxed">{scenario.context}</p>

      <div>
        <p className="mb-1 font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          What is being requested
        </p>
        <DataReceipt
          fields={scenario.request}
          caption={scenario.title}
          subtitle="Requested data"
          revealed={stage === "reveal"}
        />
        <p className="mt-3 max-w-prose text-sm text-slate">
          <span className="font-mono text-[0.7rem] uppercase tracking-wider">
            Stated reason:{" "}
          </span>
          {scenario.statedJustification}
        </p>
      </div>

      {/* Stage 1 — verdict */}
      {stage === "verdict" ? (
        <section className="space-y-3 border-t border-rule pt-5">
          <h3 className="font-display text-lg font-semibold">
            Your call: is this collection ethical, borderline, or unethical?
          </h3>
          <ChoiceGroup
            label="Choose a verdict"
            choices={VERDICT_CHOICES}
            value={verdict}
            onChange={(id) => setVerdict(id as Verdict)}
          />
          <button
            type="button"
            disabled={!verdict}
            onClick={() => setStage("principle")}
            className="rounded bg-ethical px-4 py-2 font-mono text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </section>
      ) : null}

      {/* Stage 2 — principle */}
      {stage === "principle" ? (
        <section className="space-y-3 border-t border-rule pt-5">
          <p className="text-sm text-slate">
            You said:{" "}
            <span className="font-medium text-ink">
              {VERDICT_CHOICES.find((c) => c.id === verdict)?.label}
            </span>
            .{" "}
            <button
              type="button"
              onClick={() => setStage("verdict")}
              className="underline"
            >
              Change
            </button>
          </p>
          <h3
            ref={principleHeadingRef}
            tabIndex={-1}
            className="font-display text-lg font-semibold outline-none"
          >
            Which principle is most at stake here?
          </h3>
          <ChoiceGroup
            label="Choose a principle"
            choices={PRINCIPLE_CHOICES}
            value={principle}
            onChange={(id) => setPrinciple(id as PrincipleId)}
          />
          <button
            type="button"
            disabled={!principle}
            onClick={() => setStage("reveal")}
            className="rounded bg-ethical px-4 py-2 font-mono text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reveal
          </button>
        </section>
      ) : null}

      {/* Reveal */}
      {stage === "reveal" && verdict && principle ? (
        <section
          ref={revealRef}
          tabIndex={-1}
          className="space-y-6 border-t border-rule pt-5 outline-none"
        >
          <p className="sr-only" role="status">
            Answer revealed. This scenario is intended as{" "}
            {scenario.correctVerdict}. You chose {verdict}. The intended
            principle is {PRINCIPLE_LABELS[scenario.correctPrinciple]}.
          </p>

          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold">The verdict</h3>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
              <div className="space-y-1.5">
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
                  Intended
                </p>
                <VerdictStamp verdict={scenario.correctVerdict} pressIn />
              </div>
              <div className="space-y-1.5">
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
                  You chose
                </p>
                <VerdictStamp verdict={verdict} size="sm" />
              </div>
            </div>
            <p className="max-w-prose text-sm text-slate">
              {scenario.correctVerdict === "borderline"
                ? "This one is meant to be genuinely contested. There is no single right answer — what matters is the reasoning below."
                : verdictMatches
                  ? "Your verdict matches the intended one."
                  : `Your verdict differs from the intended one. Read the note on your choice below.`}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
              On your answer ({VERDICT_CHOICES.find((c) => c.id === verdict)?.label})
            </p>
            <p className="max-w-prose leading-relaxed">
              {scenario.feedback[verdict]}
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-ethical pl-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-ethical">
              Principle · intended: {PRINCIPLE_LABELS[scenario.correctPrinciple]}
              {principleMatches
                ? ""
                : ` · you chose: ${PRINCIPLE_LABELS[principle]}`}
            </p>
            <p className="max-w-prose leading-relaxed">
              {scenario.principleFeedback}
            </p>
          </div>

          <button
            type="button"
            onClick={onDone}
            className="rounded bg-ethical px-4 py-2 font-mono text-sm text-white"
          >
            {isLast ? "Finish the Scenario Lab" : "Next scenario"}
          </button>
        </section>
      ) : null}
    </article>
  );
}
