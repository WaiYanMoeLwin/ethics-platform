import { NavLink, Outlet } from "react-router-dom";
import { useProgress } from "../../lib/progress";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/scenarios", label: "Scenario Lab", end: false },
  { to: "/study", label: "Study", end: false },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded px-2 py-1 font-mono text-sm",
    isActive ? "bg-rule text-ink" : "text-slate hover:text-ink",
  ].join(" ");
}

export default function Layout() {
  const { code } = useProgress();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
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
            {code ? (
              <span className="rounded border border-rule px-2 py-1 text-slate">
                code: <span className="text-ink">{code}</span>
              </span>
            ) : (
              <NavLink to="/study" className="text-slate underline">
                set participant code
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
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
