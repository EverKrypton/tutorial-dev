"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/lib/content";

export function Toc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!sections.length) return;
    const targets = sections
      .map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  const list = (
    <ol className="toc-list">
      {sections.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`} className={active === id ? "is-active" : undefined}>
            {label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="toc-m">
        <summary>En esta entrada · {sections.length} secciones</summary>
        {list}
      </details>

      <aside className="toc" aria-label="En esta entrada">
        <div className="toc-inner">
          <p className="toc-label">En esta entrada</p>
          {list}
        </div>
      </aside>
    </>
  );
}
