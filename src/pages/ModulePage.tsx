import { Link, useParams } from "react-router-dom";
import {
  modules,
  getCase,
  getModule,
  PRINCIPLE_IDS,
  type PrincipleId,
} from "../content";
import { setModuleComplete, useProgress } from "../lib/progress";
import { renderGlossaryProse } from "../components/reader/GlossaryProse";
import ModuleProgress from "../components/reader/ModuleProgress";
import CaseCard from "../components/reader/CaseCard";
import Quiz from "../components/quiz/Quiz";

function isPrincipleId(value: string | undefined): value is PrincipleId {
  return !!value && (PRINCIPLE_IDS as string[]).includes(value);
}

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const { completedModules } = useProgress();

  const mod = isPrincipleId(id) ? getModule(id) : undefined;

  if (!mod) {
    return (
      <section className="space-y-3">
        <h1 className="font-display text-2xl font-bold">Module not found</h1>
        <p className="text-slate">
          There is no module with the id <code>{String(id)}</code>.
        </p>
        <Link to="/" className="font-mono text-sm underline">
          Back to all modules
        </Link>
      </section>
    );
  }

  const index = modules.findIndex((m) => m.id === mod.id);
  const prev = modules[index - 1];
  const next = modules[index + 1];
  const done = completedModules.includes(mod.id);

  // One shared set so an inline definition appears only on a term's first use
  // anywhere in this module (sections first, then case studies).
  const seen = new Set<string>();

  return (
    <article className="space-y-10">
      <ModuleProgress current={mod.id} />

      <header className="space-y-2">
        <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Module {mod.order} · ~{mod.readingMinutes} min read
        </p>
        <h1 className="font-display text-2xl font-bold">{mod.title}</h1>
        <p className="max-w-prose text-slate">{mod.oneLiner}</p>
      </header>

      {mod.sections.map((section, si) => (
        <section key={si} className="space-y-3">
          <h2 className="font-display text-xl font-semibold">
            {section.heading}
          </h2>
          {section.body.map((paragraph, pi) => (
            <p key={pi} className="max-w-prose leading-relaxed">
              {renderGlossaryProse(paragraph, seen)}
            </p>
          ))}
        </section>
      ))}

      {mod.caseIds.length > 0 ? (
        <section className="space-y-4">
          <h2 className="font-display text-xl font-semibold">
            {mod.caseIds.length === 1 ? "Case study" : "Case studies"}
          </h2>
          {mod.caseIds.map((caseId) => {
            const study = getCase(caseId);
            return study ? (
              <CaseCard key={caseId} study={study} seen={seen} />
            ) : null;
          })}
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Takeaways</h2>
        <ul className="max-w-prose list-disc space-y-2 pl-5">
          {mod.takeaways.map((point, i) => (
            <li key={i} className="leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">
          Check your understanding
        </h2>
        <p className="max-w-prose text-sm text-slate">
          Three quick questions to help the ideas stick. Nothing here is scored
          or saved. Answer all three to complete the module.
        </p>
        {done ? (
          <p className="font-mono text-sm text-ethical">
            <span aria-hidden="true">✓ </span>Module complete
            <button
              type="button"
              onClick={() => setModuleComplete(mod.id, false)}
              className="ml-3 inline-block py-1 text-slate underline"
            >
              Undo
            </button>
          </p>
        ) : null}
        <Quiz
          key={mod.id}
          questions={mod.quiz}
          onComplete={() => setModuleComplete(mod.id, true)}
        />
      </section>

      <nav
        aria-label="Module navigation"
        className="flex items-stretch justify-between gap-3 border-t border-rule pt-6 font-mono text-sm"
      >
        {prev ? (
          <Link to={`/module/${prev.id}`} className="max-w-[45%] underline">
            ← {prev.title}
          </Link>
        ) : (
          <Link to="/" className="underline">
            ← All modules
          </Link>
        )}

        {next ? (
          <Link
            to={`/module/${next.id}`}
            className="max-w-[45%] text-right underline"
          >
            {next.title} →
          </Link>
        ) : (
          <Link to="/scenarios" className="text-right underline">
            Scenario Lab →
          </Link>
        )}
      </nav>
    </article>
  );
}
