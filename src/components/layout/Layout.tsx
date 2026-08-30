import type { MouseEvent } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useProgress } from "../../lib/progress";

// HashRouter treats "#main" as a route, so the skip link moves focus itself.
function skipToMain(e: MouseEvent) {
  e.preventDefault();
  const main = document.getElementById("main");
  if (!main) return;
  main.focus();
  main.scrollIntoView();
}

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/scenarios", label: "Scenario Lab", end: false },
  { to: "/study", label: "Study", end: false },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex min-h-[2.25rem] items-center rounded px-2 font-mono text-sm",
    isActive ? "bg-rule text-ink" : "text-slate hover:text-ink",
  ].join(" ");
}

export default function Layout() {
  const { username } = useProgress();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:ring-2 focus:ring-ink"
      >
        Skip to main content
      </a>

      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2">
          <span className="font-display font-bold text-ink">DataEthics</span>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="font-mono text-xs">
            {username ? (
              <span className="inline-flex min-h-[2rem] items-center rounded border border-rule px-2 text-slate">
                user:&nbsp;<span className="text-ink">{username}</span>
              </span>
            ) : (
              <NavLink
                to="/study"
                className="inline-flex min-h-[2rem] items-center text-slate underline"
              >
                choose a username
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-4 py-4 font-mono text-xs text-slate">
          953420 — Ethics and Professionalism for Software Engineers
        </div>
      </footer>
    </div>
  );
}
