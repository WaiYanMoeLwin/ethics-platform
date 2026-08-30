import type { ReactNode } from "react";
import { PRINCIPLE_LABELS, type CaseStudy } from "../../content";
import DataReceipt from "../ui/DataReceipt";
import { renderGlossaryProse } from "./GlossaryProse";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
        {label}
      </p>
      <p className="mt-1 leading-relaxed">{children}</p>
    </div>
  );
}

/**
 * A case study. The card itself is deliberately plain so the Data Receipt
 * inside it stands out. The minimal-data alternative is the point of the case,
 * so it gets the one accent on the card.
 */
export default function CaseCard({
  study,
  seen,
}: {
  study: CaseStudy;
  /** shared "first use" set for inline glossary definitions */
  seen: Set<string>;
}) {
  return (
    <article className="rounded-lg border border-rule bg-white p-5 sm:p-6">
      <header>
        <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Case study · {PRINCIPLE_LABELS[study.principle]}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold">
          {study.title}
        </h3>
      </header>

      <div className="mt-4 space-y-4">
        <Field label="Stated purpose">
          {renderGlossaryProse(study.statedPurpose, seen)}
        </Field>

        <div className="py-1">
          <DataReceipt
            fields={study.dataCollected}
            caption={study.title}
            subtitle="Data collected"
          />
        </div>

        <Field label="What happened">
          {renderGlossaryProse(study.whatHappened, seen)}
        </Field>

        <Field label="Which principle broke">
          {renderGlossaryProse(study.principleBroken, seen)}
        </Field>

        <div className="border-l-2 border-ethical pl-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-ethical">
            Minimal-data alternative
          </p>
          <p className="mt-1 leading-relaxed">
            {renderGlossaryProse(study.minimalAlternative, seen)}
          </p>
        </div>

        <p className="pt-1 text-[0.75rem] leading-snug text-slate">
          Source: {study.source.citation}
          {study.source.url ? (
            <>
              {" "}
              <a
                href={study.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-0.5 underline"
              >
                Open source
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );
}
