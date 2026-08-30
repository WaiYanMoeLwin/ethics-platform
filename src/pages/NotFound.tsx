import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="space-y-3">
      <h1 className="font-display text-2xl font-bold">Page not found</h1>
      <p className="max-w-prose text-slate">
        That address does not match a page on this site.
      </p>
      <nav className="flex flex-col gap-1 font-mono text-sm">
        <Link to="/" className="underline">
          Home
        </Link>
        <Link to="/scenarios" className="underline">
          Scenario Lab
        </Link>
        <Link to="/study" className="underline">
          Study
        </Link>
      </nav>
    </section>
  );
}
