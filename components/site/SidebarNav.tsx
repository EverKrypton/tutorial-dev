"use client";

import Link from "next/link";
import { useProgress } from "./useProgress";

export type NavChapter = {
  slug: string;
  number: string;
  title: string;
  group: string;
  extra: boolean;
};

export function SidebarNav({
  chapters,
  current,
  onNavigate,
}: {
  chapters: NavChapter[];
  current?: string;
  onNavigate?: () => void;
}) {
  const { done } = useProgress();
  const groups = [...new Set(chapters.map((c) => c.group))];

  return (
    <>
      {groups.map((group) => (
        <div className="side-group" key={group}>
          <p className="side-label">{group}</p>
          <ul className="side-list">
            {chapters
              .filter((c) => c.group === group)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/curso/${c.slug}`}
                    className={`side-link${done.includes(c.slug) ? " is-done" : ""}`}
                    aria-current={current === c.slug ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    <span className="n">{c.number}</span>
                    <span>{c.title}</span>
                    <span className="done" aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function SidebarProgress({ total }: { total: number }) {
  const { done } = useProgress();
  const pct = Math.round((done.length / total) * 100);
  return (
    <div className="side-foot">
      <p className="side-label" style={{ padding: 0, marginBottom: 6 }}>
        Progreso · {done.length}/{total}
      </p>
      <div
        style={{
          height: 3,
          borderRadius: 99,
          background: "var(--line)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--accent)",
            transition: "width .4s var(--ease)",
          }}
        />
      </div>
    </div>
  );
}
