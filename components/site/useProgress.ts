"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "tutorialdev.progress";
const EVENT = "tutorialdev:progress";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(next: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* modo privado */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useProgress() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(read());
    const sync = () => setDone(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    write(next);
    return next.includes(slug);
  }, []);

  return { done, toggle };
}
