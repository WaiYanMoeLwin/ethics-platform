import { modules, type PrincipleId } from "../../content";
import { useProgress } from "../../lib/progress";

/**
 * A thin five-segment bar. Filled = complete, outlined = current, faint = not
 * started. Used at the top of every module page and on the home page.
 */
export default function ModuleProgress({
  current,
}: {
  current?: PrincipleId;
}) {
  const { completedModules } = useProgress();
  const doneCount = modules.filter((m) =>
    completedModules.includes(m.id),
  ).length;

  const currentModule = current
    ? modules.find((m) => m.id === current)
    : undefined;

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-slate">
        {currentModule
          ? `Module ${currentModule.order} of ${modules.length}`
          : "Modules"}
        {"  ·  "}
        {doneCount} of {modules.length} complete
      </p>
      <ol className="mt-2 flex gap-1.5" aria-hidden="true">
        {modules.map((m) => {
          const done = completedModules.includes(m.id);
          const isCurrent = m.id === current;
          return (
            <li
              key={m.id}
              className={[
                "h-1.5 flex-1 rounded-full",
                done
                  ? "bg-ethical"
                  : isCurrent
                    ? "bg-ink"
                    : "bg-rule",
              ].join(" ")}
            />
          );
        })}
      </ol>
    </div>
  );
}
