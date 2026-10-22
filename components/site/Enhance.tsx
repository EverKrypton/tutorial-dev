"use client";

import { useEffect } from "react";

/**
 * Mejoras progresivas que no pueden vivir en el HTML del contenido:
 * copiar bloques de código, revelado al hacer scroll y barra de lectura.
 * El contenido es visible sin esto: si no corre, la página sigue completa.
 */
export function Enhance() {
  useEffect(() => {
    /* copiar */
    const onClick = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>("[data-copy]");
      if (!btn) return;
      const box = btn.closest(".code");
      const pre = box?.querySelector("pre");
      if (!pre) return;
      const text = pre.innerText;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      }
      if (!ok) return;
      btn.textContent = "Copiado";
      btn.classList.add("is-copied");
      setTimeout(() => {
        btn.textContent = "Copiar";
        btn.classList.remove("is-copied");
      }, 1800);
    };
    document.addEventListener("click", onClick);

    /* revelado */
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;

    if (!items.length) {
      /* nada */
    } else if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const parent = el.parentElement;
            const siblings = parent
              ? Array.from(parent.querySelectorAll<HTMLElement>(":scope > .reveal"))
              : [];
            const i = Math.max(0, siblings.indexOf(el));
            el.style.setProperty("--d", `${Math.min(i, 5) * 55}ms`);
            el.classList.add("is-in");
            io?.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
      );
      items.forEach((el) => io?.observe(el));
    }

    return () => {
      document.removeEventListener("click", onClick);
      io?.disconnect();
    };
  }, []);

  return null;
}
