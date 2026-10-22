"use client";

import { useEffect, useState } from "react";
import { IconClose, IconMenu } from "./Icons";
import { SidebarNav, SidebarProgress, type NavChapter } from "./SidebarNav";

export function MobileNav({
  chapters,
  current,
  total,
}: {
  chapters: NavChapter[];
  current?: string;
  total: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 820) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <button
        type="button"
        className="burger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="drawer"
        aria-label={open ? "Cerrar temario" : "Abrir temario"}
      >
        {open ? <IconClose /> : <IconMenu />}
      </button>

      <div className="drawer" id="drawer" hidden={!open}>
        <SidebarNav chapters={chapters} current={current} onNavigate={() => setOpen(false)} />
        <SidebarProgress total={total} />
        <div className="side-foot">
          <a href="/ejemplos">Ejemplos de interfaz</a>
          <a href="/descargas/tutorial-dev.pdf">Curso completo en PDF</a>
          <a href="https://github.com/EverKrypton/tutorial-dev">Repositorio</a>
        </div>
      </div>
    </>
  );
}
