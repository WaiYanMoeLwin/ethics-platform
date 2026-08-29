import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/module/tradeoff", label: "Modules", end: false },
  { to: "/scenarios", label: "Scenario Lab", end: false },
  { to: "/study", label: "Study", end: false },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "font-mono text-sm px-2 py-1 rounded",
    isActive ? "text-ink bg-rule" : "text-slate hover:text-ink",
  ].join(" ");
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-4">
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
