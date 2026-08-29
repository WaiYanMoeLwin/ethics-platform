import type { DataField } from "../../content";
import NecessityStamp from "./NecessityStamp";

/**
 * The signature element (CLAUDE.md §8). A monospace ledger, one data field per
 * line, each stamped NEEDED / NOT NEEDED / INFERRED. It should read like a till
 * receipt for personal data. Everything around it stays quiet, so this can be
 * the loudest thing on the page.
 *
 * In the Scenario Lab the receipt is shown with `revealed={false}` first: the
 * field names are visible, but the stamps and the notes that would give the
 * answer away stay hidden until the participant has answered.
 */
export default function DataReceipt({
  fields,
  caption,
  subtitle,
  revealed = true,
}: {
  fields: DataField[];
  /** e.g. the case or scenario title */
  caption?: string;
  /** small line under the caption, e.g. "Data collected" */
  subtitle?: string;
  revealed?: boolean;
}) {
  const counts = {
    needed: fields.filter((f) => f.necessity === "needed").length,
    "not-needed": fields.filter((f) => f.necessity === "not-needed").length,
    inferred: fields.filter((f) => f.necessity === "inferred").length,
  };

  return (
    <div className="max-w-sm bg-white font-mono text-[0.8rem] text-ink shadow-sm ring-1 ring-rule">
      <div className="border-b border-dashed border-rule px-4 pt-4 pb-3">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate">
          Data Receipt
        </p>
        {caption ? <p className="mt-1 leading-snug">{caption}</p> : null}
        {subtitle ? (
          <p className="mt-0.5 text-[0.7rem] text-slate">{subtitle}</p>
        ) : null}
        {!revealed ? (
          <p className="mt-0.5 text-[0.7rem] text-slate">
            Necessity is shown after you answer.
          </p>
        ) : null}
      </div>

      <ul className="divide-y divide-dashed divide-rule">
        {fields.map((field, i) => (
          <li key={i} className="px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <span className="leading-snug">{field.name}</span>
              {revealed ? (
                <NecessityStamp necessity={field.necessity} />
              ) : (
                <span
                  className="inline-flex shrink-0 items-center rounded-sm border border-dashed border-rule px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-slate"
                  aria-label="necessity hidden"
                >
                  <span aria-hidden="true">? </span>hidden
                </span>
              )}
            </div>
            {revealed && field.note ? (
              <p className="mt-1 text-[0.7rem] leading-snug text-slate">
                {field.note}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="border-t border-dashed border-rule px-4 py-3 text-[0.7rem] text-slate">
        {fields.length} {fields.length === 1 ? "item" : "items"}
        {revealed ? (
          <>
            {"  ·  "}
            {counts.needed} needed{"  ·  "}
            {counts["not-needed"]} not needed{"  ·  "}
            {counts.inferred} inferred
          </>
        ) : null}
      </div>
    </div>
  );
}
