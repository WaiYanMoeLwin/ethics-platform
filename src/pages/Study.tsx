import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { modules } from "../content";
import { setUsername, useProgress } from "../lib/progress";
import {
  cleanUsername,
  linkReady,
  SESSION_ESTIMATE,
  STUDY_LINKS,
  USERNAME_RULE,
} from "../config/study";

type StepStatus = "done" | "current" | "locked" | "todo";

function StatusPill({ status }: { status: StepStatus }) {
  const map: Record<StepStatus, { label: string; className: string }> = {
    done: { label: "✓ Done", className: "text-ethical" },
    current: { label: "Now", className: "text-ink" },
    locked: { label: "Locked", className: "text-slate" },
    todo: { label: "To do", className: "text-slate" },
  };
  const { label, className } = map[status];
  return (
    <span className={`font-mono text-[0.7rem] uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
}

function Step({
  n,
  title,
  status,
  children,
}: {
  n: number;
  title: string;
  status: StepStatus;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-rule bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Step {n} · {title}
        </h2>
        <StatusPill status={status} />
      </div>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function ExternalLink({
  url,
  children,
  disabled,
}: {
  url: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  if (disabled || !linkReady(url)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        className="inline-block cursor-not-allowed rounded bg-rule px-4 py-2 font-mono text-sm text-slate"
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-block rounded bg-ethical px-4 py-2 font-mono text-sm text-white"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function SubmittedToggle({
  name,
  done,
  onDone,
}: {
  name: string;
  done: boolean;
  onDone: () => void;
}) {
  if (done) {
    return (
      <p className="font-mono text-sm text-ethical">
        <span aria-hidden="true">✓ </span>Marked as submitted.
      </p>
    );
  }
  return (
    <button
      type="button"
      onClick={onDone}
      className="inline-block py-1 font-mono text-sm text-slate underline"
    >
      I have submitted the {name}
    </button>
  );
}

function UsernameCreator() {
  const { username } = useProgress();
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [editing, setEditing] = useState(false);

  const cleaned = cleanUsername(value);
  const showForm = editing || !username;

  if (!showForm) {
    return (
      <div className="space-y-2">
        <p>
          Your username is{" "}
          <strong className="font-mono text-base">{username}</strong>. It appears
          in the header on every page.
        </p>
        <p className="text-sm text-slate">
          Type it the same way into all three forms. A username typed
          differently cannot be joined up later, and that loses your data for
          the study.
        </p>
        <button
          type="button"
          onClick={() => {
            setEditing(true);
            setValue("");
            setTouched(false);
          }}
          className="inline-block py-1 font-mono text-sm text-slate underline"
        >
          Change username
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p>
        Choose a username. You will type this same username into all three
        forms.
      </p>
      <p className="text-sm text-slate">
        Pick something you will remember. Please do not use your real name.{" "}
        {USERNAME_RULE}.
      </p>

      <label className="block max-w-xs text-sm">
        Username
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          autoComplete="off"
          maxLength={24}
          className="mt-1 block w-full rounded border border-rule px-3 py-2 font-mono"
        />
      </label>

      <p aria-live="polite" className="text-sm">
        {cleaned ? (
          <span className="text-slate">That works.</span>
        ) : touched && value.trim().length > 0 ? (
          <span className="text-unethical">Please use {USERNAME_RULE}.</span>
        ) : (
          <span className="text-slate">Enter a username to continue.</span>
        )}
      </p>

      <button
        type="button"
        disabled={!cleaned}
        onClick={() => {
          if (cleaned) {
            setUsername(cleaned);
            setEditing(false);
          }
        }}
        className="rounded bg-ethical px-4 py-2 font-mono text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save username
      </button>
    </div>
  );
}

export default function Study() {
  const { username, completedModules, scenarioLabComplete } = useProgress();
  const [preTestDone, setPreTestDone] = useState(false);
  const [postTestDone, setPostTestDone] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);

  const modulesDone = modules.filter((m) =>
    completedModules.includes(m.id),
  ).length;
  const allModulesDone = modulesDone === modules.length;
  const learnDone = allModulesDone && scenarioLabComplete;

  const usernameStatus: StepStatus = username ? "done" : "current";
  const preTestStatus: StepStatus = !username
    ? "locked"
    : preTestDone
      ? "done"
      : "current";
  const learnStatus: StepStatus = learnDone
    ? "done"
    : preTestDone
      ? "current"
      : "todo";
  const postTestStatus: StepStatus = !learnDone
    ? "locked"
    : postTestDone
      ? "done"
      : "current";
  const feedbackStatus: StepStatus = !postTestDone
    ? "locked"
    : feedbackDone
      ? "done"
      : "current";

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-2xl font-bold">Study session</h1>
        <p className="max-w-prose text-slate">
          Thank you for taking part. The session takes {SESSION_ESTIMATE} and
          has four parts: a pre-test, the learning platform, a post-test, and a
          feedback survey. Work at your own pace. There is a facilitator in the
          room for any practical problems.
        </p>
        <p className="max-w-prose text-sm text-slate">
          Your answers are anonymous. You choose a username, and no one records
          which username is yours. You can stop at any time.
        </p>
      </header>

      <Step n={1} title="Choose your username" status={usernameStatus}>
        <UsernameCreator />
      </Step>

      <Step n={2} title="Pre-test" status={preTestStatus}>
        <p className="text-sm text-slate">
          About 10 minutes. Twelve short questions and a few questions about your
          background. Answer from what you know now. It is fine to be unsure.
        </p>
        {username ? null : (
          <p className="text-sm text-unethical">
            Choose your username first, then open the pre-test.
          </p>
        )}
        <ExternalLink url={STUDY_LINKS.preTest} disabled={!username}>
          Open the pre-test →
        </ExternalLink>
        {!linkReady(STUDY_LINKS.preTest) ? (
          <p className="text-xs text-slate">
            The facilitator will add this link before the session.
          </p>
        ) : null}
        {username ? (
          <SubmittedToggle
            name="pre-test"
            done={preTestDone}
            onDone={() => setPreTestDone(true)}
          />
        ) : null}
      </Step>

      <Step n={3} title="Learn" status={learnStatus}>
        <p className="text-sm text-slate">
          Read the five modules, then work through the Scenario Lab. This is the
          main part of the session.
        </p>
        {username && !preTestDone ? (
          <p className="text-sm text-unethical">
            Do the pre-test first, then come back to this step.
          </p>
        ) : null}
        <ul className="text-sm">
          {modules.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between gap-3 py-1"
            >
              <Link to={`/module/${m.id}`} className="py-0.5 underline">
                Module {m.order}: {m.title}
              </Link>
              <span
                className={`shrink-0 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-wider ${
                  completedModules.includes(m.id)
                    ? "text-ethical"
                    : "text-slate"
                }`}
              >
                {completedModules.includes(m.id) ? "✓ Done" : "Not done"}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 py-1">
            <Link to="/scenarios" className="py-0.5 underline">
              Scenario Lab
            </Link>
            <span
              className={`shrink-0 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-wider ${
                scenarioLabComplete ? "text-ethical" : "text-slate"
              }`}
            >
              {scenarioLabComplete ? "✓ Done" : "Not done"}
            </span>
          </li>
        </ul>
        <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          {modulesDone} of {modules.length} modules · Scenario Lab{" "}
          {scenarioLabComplete ? "complete" : "not complete"}
        </p>
      </Step>

      <Step n={4} title="Post-test" status={postTestStatus}>
        {!learnDone ? (
          <div className="space-y-2">
            <p className="text-sm">
              The post-test link opens once the learning part is complete. This
              keeps the two tests comparable.
            </p>
            <p className="text-sm text-slate">Still to do:</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate">
              {!allModulesDone ? (
                <li>
                  Finish {modules.length - modulesDone} more module
                  {modules.length - modulesDone === 1 ? "" : "s"}.
                </li>
              ) : null}
              {!scenarioLabComplete ? <li>Finish the Scenario Lab.</li> : null}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-slate">
            About 10 minutes. Twelve short questions, in the same shape as the
            pre-test. Use the same username.
          </p>
        )}
        <ExternalLink url={STUDY_LINKS.postTest} disabled={!learnDone}>
          Open the post-test →
        </ExternalLink>
        {learnDone && !linkReady(STUDY_LINKS.postTest) ? (
          <p className="text-xs text-slate">
            The facilitator will add this link before the session.
          </p>
        ) : null}
        {learnDone ? (
          <SubmittedToggle
            name="post-test"
            done={postTestDone}
            onDone={() => setPostTestDone(true)}
          />
        ) : null}
      </Step>

      <Step n={5} title="Feedback survey" status={feedbackStatus}>
        {!postTestDone ? (
          <p className="text-sm text-slate">
            The feedback survey opens after you submit the post-test.
          </p>
        ) : feedbackDone ? (
          <p className="font-mono text-sm text-ethical">
            <span aria-hidden="true">✓ </span>That is the whole session. Thank
            you for taking part.
          </p>
        ) : (
          <>
            <p className="text-sm text-slate">
              About 5 minutes. Five ratings and three short written answers. This
              is the last part.
            </p>
            <ExternalLink url={STUDY_LINKS.feedback}>
              Open the feedback survey →
            </ExternalLink>
            {!linkReady(STUDY_LINKS.feedback) ? (
              <p className="text-xs text-slate">
                The facilitator will add this link before the session.
              </p>
            ) : null}
            <SubmittedToggle
              name="feedback survey"
              done={false}
              onDone={() => setFeedbackDone(true)}
            />
          </>
        )}
      </Step>
    </div>
  );
}
