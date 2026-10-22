(() => {
  const root = document.documentElement;
  const KEY_THEME = "tutorialdev.theme";
  const KEY_PROGRESS = "tutorialdev.progress";
  const TOTAL = 10;

  const safe = (fn, fallback) => {
    try { return fn(); } catch (e) { return fallback; }
  };

  /* ---------- tema ---------- */
  const saved = safe(() => localStorage.getItem(KEY_THEME), null);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) root.setAttribute("data-theme", "dark");

  const paintTheme = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      btn.setAttribute("aria-pressed", String(dark));
      const sun = btn.querySelector("[data-icon-sun]");
      const moon = btn.querySelector("[data-icon-moon]");
      if (sun && moon) {
        sun.style.display = dark ? "none" : "block";
        moon.style.display = dark ? "block" : "none";
      }
    });
  };
  paintTheme();

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      safe(() => localStorage.setItem(KEY_THEME, next), null);
      paintTheme();
    });
  });

  /* ---------- menú móvil ---------- */
  const menu = document.querySelector("[data-menu]");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  if (menu && menuBtn) {
    const setOpen = (open) => {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        const first = menu.querySelector("a");
        if (first) first.focus({ preventScroll: true });
      } else {
        menuBtn.focus({ preventScroll: true });
      }
    };
    menuBtn.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900 && !menu.hidden) {
        menu.hidden = true;
        document.body.style.overflow = "";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- progreso ---------- */
  const readProgress = () => {
    const raw = safe(() => localStorage.getItem(KEY_PROGRESS), null);
    if (!raw) return [];
    const arr = safe(() => JSON.parse(raw), []);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  };
  const writeProgress = (arr) => safe(() => localStorage.setItem(KEY_PROGRESS, JSON.stringify(arr)), null);

  const paintProgress = () => {
    const done = readProgress();
    document.querySelectorAll("[data-progress-text]").forEach((el) => {
      el.textContent = `${done.length}/${TOTAL}`;
    });
    document.querySelectorAll("[data-progress-pill]").forEach((el) => {
      el.dataset.done = String(done.length === TOTAL);
    });
    document.querySelectorAll(".chapter[data-slug]").forEach((el) => {
      el.classList.toggle("is-done", done.includes(el.dataset.slug));
    });
    document.querySelectorAll("[data-complete]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(done.includes(btn.dataset.complete)));
    });
  };
  paintProgress();

  document.querySelectorAll("[data-complete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.complete;
      const done = readProgress();
      const i = done.indexOf(slug);
      if (i >= 0) done.splice(i, 1);
      else done.push(slug);
      writeProgress(done);
      paintProgress();
      toast(i >= 0 ? "Capítulo desmarcado" : "¡Capítulo completado!");
    });
  });

  /* ---------- barra de lectura ---------- */
  const bar = document.querySelector("[data-reading-bar]");
  if (bar) {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- copiar código ---------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const box = btn.closest(".code");
      const code = box && box.querySelector("pre");
      if (!code) return;
      const text = code.innerText;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      }
      if (ok) {
        btn.textContent = "Copiado";
        btn.classList.add("is-copied");
        toast("Copiado al portapapeles");
        setTimeout(() => {
          btn.textContent = "Copiar";
          btn.classList.remove("is-copied");
        }, 1800);
      }
    });
  });

  /* ---------- toast ---------- */
  let toastEl = null;
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 1900);
  }

  /* ---------- reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- TOC activo ---------- */
  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) map.set(target, a);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          tocLinks.forEach((a) => a.classList.remove("is-active"));
          const link = map.get(entry.target);
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    map.forEach((_, target) => io.observe(target));
  }

  /* ---------- año ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- nav activo ---------- */
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach((a) => a.classList.add("is-here"));
  }
})();
