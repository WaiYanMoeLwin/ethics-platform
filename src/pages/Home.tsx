import { Link } from "react-router-dom";
import { modules } from "../content";
import { useProgress } from "../lib/progress";
import ModuleProgress from "../components/reader/ModuleProgress";

function ModuleCard({
  order,
  id,
  title,
  oneLiner,
  readingMinutes,
  done,
}: {
  order: number;
  id: string;
  title: string;
  oneLiner: string;
  readingMinutes: number;
  done: boolean;
}) {
  return (
    <Link
      to={`/module/${id}`}
      className="block rounded-lg border border-rule bg-white p-5 transition-colors hover:border-ink"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          Module {order}
        </span>
        <span
          className={`font-mono text-[0.7rem] uppercase tracking-wider ${
            done ? "text-ethical" : "text-slate"
          }`}
        >
          {done ? "✓ Done" : "Not started"}
        </span>
      </div>
      <h2 className="mt-2 font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate">{oneLiner}</p>
      <p className="mt-3 font-mono text-[0.7rem] text-slate">
        ~{readingMinutes} min read
      </p>
    </Link>
  );
}

export default function Home() {
  const { completedModules } = useProgress();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-2xl font-bold">
          Ethical Data Collection in Personalized Software
        </h1>
        <p className="max-w-prose text-slate">
          A short course for software engineers. It looks at the choices we make
          when we decide what user data to collect, and how to make them well.
        </p>
      </header>

      <section className="rounded-lg border border-rule bg-white p-5">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
          How this works
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          <li>Read the five modules. Each takes about five minutes.</li>
          <li>
            Try the{" "}
            <Link to="/scenarios" className="underline">
              Scenario Lab
            </Link>
            : seven real decisions from a developer's chair.
          </li>
          <li>
            Take the pre-test and post-test, linked from the{" "}
            <Link to="/study" className="underline">
              Study
            </Link>{" "}
            page.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <ModuleProgress />
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <ModuleCard
              key={m.id}
              order={m.order}
              id={m.id}
              title={m.title}
              oneLiner={m.oneLiner}
              readingMinutes={m.readingMinutes}
              done={completedModules.includes(m.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
