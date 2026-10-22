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
  if (saved === "light") root.setAttribute("data-theme", "light");

  const paintTheme = () => {
    const light = root.getAttribute("data-theme") === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-label", light ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
      btn.setAttribute("aria-pressed", String(light));
      const sun = btn.querySelector("[data-icon-sun]");
      const moon = btn.querySelector("[data-icon-moon]");
      if (sun && moon) {
        sun.style.display = light ? "none" : "block";
        moon.style.display = light ? "block" : "none";
      }
    });
  };
  paintTheme();

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      if (next === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      safe(() => localStorage.setItem(KEY_THEME, next), null);
      paintTheme();
    });
  });

  /* ---------- navbar al hacer scroll ---------- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- foco del hero ---------- */
  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let raf = 0;
    hero.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--my", `${e.clientY - r.top}px`);
        hero.classList.add("is-lit");
        raf = 0;
      });
    });
    hero.addEventListener("pointerleave", () => hero.classList.remove("is-lit"));
  }

  /* ---------- drawer ---------- */
  const drawer = document.querySelector("[data-drawer]");
  const drawerBtn = document.querySelector("[data-drawer-toggle]");
  if (drawer && drawerBtn) {
    const setOpen = (open) => {
      drawer.hidden = !open;
      drawerBtn.setAttribute("aria-expanded", String(open));
      drawerBtn.setAttribute("aria-label", open ? "Cerrar temario" : "Abrir temario");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        const first = drawer.querySelector("a");
        if (first) first.focus({ preventScroll: true });
      } else {
        drawerBtn.focus({ preventScroll: true });
      }
    };
    drawerBtn.addEventListener("click", () => setOpen(drawer.hidden));
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.hidden) setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 720 && !drawer.hidden) {
        drawer.hidden = true;
        document.body.style.overflow = "";
        drawerBtn.setAttribute("aria-expanded", "false");
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
    document.querySelectorAll("[data-progress-ring]").forEach((el) => {
      el.style.setProperty("--p", String((done.length / TOTAL) * 100));
    });
    document.querySelectorAll(".lesson[data-slug], .rail-list a[data-slug]").forEach((el) => {
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
      toast(i >= 0 ? "Capítulo desmarcado" : "Capítulo completado", i < 0);
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

  /* ---------- copiar ---------- */
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
        toast("Copiado al portapapeles", true);
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
  function toast(msg, ok) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML =
      (ok === false ? "" : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>') +
      `<span>${msg}</span>`;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2000);
  }

  /* ---------- revelado con escalonado ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const group = entry.target.parentElement;
            const sibs = group ? Array.from(group.querySelectorAll(":scope > .reveal")) : [];
            const i = Math.max(0, sibs.indexOf(entry.target));
            entry.target.style.setProperty("--d", `${Math.min(i, 5) * 55}ms`);
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- índice activo ---------- */
  const tocLinks = Array.from(document.querySelectorAll(".rail-toc a[href^='#']"));
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
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );
    map.forEach((_, target) => io.observe(target));
  }

  /* ---------- atajos ---------- */
  const pager = document.querySelector(".pager");
  if (pager) {
    const prev = pager.querySelector("a:not(.next)");
    const next = pager.querySelector("a.next");
    document.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const el = document.activeElement;
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        window.location.href = prev.getAttribute("href");
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        window.location.href = next.getAttribute("href");
      }
    });
  }

  /* ---------- año ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
