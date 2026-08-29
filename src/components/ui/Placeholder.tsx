import type { ReactNode } from "react";

export default function Placeholder({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section>
      <h1 className="font-display text-2xl font-bold mb-2">{title}</h1>
      <p className="font-mono text-xs text-slate mb-6">placeholder — no content yet</p>
      {children}
    </section>
  );
}
