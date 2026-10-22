"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "./Icons";

export type SearchItem = {
  href: string;
  title: string;
  hint: string;
  kind: "Curso" | "Ejemplo" | "Sistema";
};

export function SearchPalette({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.title} ${i.hint} ${i.kind}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <>
      <button type="button" className="search-btn" onClick={() => setOpen(true)}>
        <IconSearch />
        Buscar
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en el curso"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,.6)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "start center",
            padding: "12vh 16px 16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(560px, 100%)",
              border: "1px solid var(--line-2)",
              borderRadius: "var(--r-lg)",
              background: "var(--panel)",
              boxShadow: "var(--shadow-2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 14px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <IconSearch className="search-ico" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Busca un capítulo, un ejemplo, un tema…"
                aria-label="Término de búsqueda"
                style={{
                  flex: 1,
                  height: 46,
                  border: 0,
                  background: "transparent",
                  color: "var(--ink)",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 6,
                maxHeight: "46vh",
                overflowY: "auto",
              }}
            >
              {results.length === 0 && (
                <li style={{ padding: "14px 12px", color: "var(--muted)", fontSize: 13 }}>
                  Nada coincide con «{query}».
                </li>
              )}
              {results.map((item, i) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.href)}
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      border: 0,
                      borderRadius: "var(--r-sm)",
                      background: i === active ? "var(--panel-2)" : "transparent",
                      color: "var(--ink)",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 13.5 }}>
                      {item.title}
                      <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)" }}>
                        {item.hint}
                      </span>
                    </span>
                    <span className="mono" style={{ color: "var(--faint)", fontSize: 9.5 }}>
                      {item.kind}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                gap: 14,
                padding: "8px 14px",
                borderTop: "1px solid var(--line)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "var(--faint)",
              }}
            >
              <span>↑↓ mover</span>
              <span>↵ abrir</span>
              <span>esc cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
