"use client";

import { useEffect, useState } from "react";
import { useProgress } from "./useProgress";

export function ChapterMark({ slug }: { slug: string }) {
  const { done, toggle } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDone = mounted && done.includes(slug);

  return (
    <div className="mark-row">
      <button
        type="button"
        className="mark-btn"
        aria-pressed={isDone}
        onClick={() => toggle(slug)}
      >
        <span className="bx" aria-hidden="true">✓</span>
        {isDone ? "Completado" : "Marcar como completado"}
      </button>
      <span className="mark-note">Se guarda en este navegador</span>
    </div>
  );
}
