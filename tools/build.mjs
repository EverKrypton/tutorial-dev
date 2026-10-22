import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = path.join(ROOT, "src", "pages");
const OUT = ROOT;

const CHAPTERS = [
  ["fundamentos.html", "01", "Cómo piensa un programa", "25 min", "Un conversor de temperaturas y una lista de compras."],
  ["primera-web.html", "02", "Tu primera página web", "45 min", "Una tarjeta de presentación con modo oscuro."],
  ["git-github.html", "03", "Git y GitHub sin miedo", "30 min", "El historial de tu proyecto, con ramas y un PR."],
  ["vercel.html", "04", "Publicar en Vercel", "35 min", "Tu sitio en una URL real, con HTTPS y previews."],
  ["v0.html", "05", "v0: tu copiloto de interfaces", "30 min", "Una landing para un negocio real, iterada."],
  ["ia-cli.html", "06", "La IA en tu terminal", "40 min", "Una sesión con un agente que lee, edita y verifica."],
  ["skills.html", "07", "Skills: enséñale trucos a tu IA", "25 min", "Una skill con tu sistema visual, reutilizable."],
  ["agentes.html", "08", "Tu propio agente", "30 min", "Tres agentes: uno explica, uno revisa, uno escribe."],
  ["prompting.html", "09", "Curso de prompting, a fondo", "90 min", "Un método propio: plantillas, rúbrica y pruebas."],
  ["glosario.html", "10", "Glosario y chuleta", "10 min", "La referencia que vas a tener abierta."],
];

const EXTRA = ["arsenal.html", "★", "El arsenal: genjutsu e impeccable", "extra", "Dos skills de diseño reales, abiertas."];

const FACTS = {
  fundamentos: ["Cero", "Ninguno", "Pensar en pasos", "JavaScript"],
  "primera-web": ["Cero", "Ninguno", "Una página propia", "HTML · CSS · JS"],
  "git-github": ["Cero", "Un editor", "Código versionado", "Git"],
  vercel: ["Inicial", "Cuenta de GitHub", "Una URL pública", "CLI + panel"],
  v0: ["Inicial", "Cuenta de Vercel", "Una interfaz real", "Next.js"],
  "ia-cli": ["Inicial", "Terminal", "Un agente en marcha", "opencode"],
  skills: ["Medio", "opencode instalado", "Instrucciones propias", "SKILL.md"],
  agentes: ["Medio", "opencode instalado", "Un agente propio", "Permisos"],
  prompting: ["Medio", "Ninguno", "Un método", "16 módulos"],
  glosario: ["Consulta", "Ninguno", "Vocabulario", "Referencia"],
  arsenal: ["Medio", "Skills leídas", "Criterio de diseño", "Diseño"],
};

const icon = {
  sun: `<svg data-icon-sun viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>`,
  moon: `<svg data-icon-moon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="display:none" aria-hidden="true"><path d="M20.4 14.4A8.5 8.5 0 0 1 9.6 3.6a8.5 8.5 0 1 0 10.8 10.8Z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
};

const drawer = (meta) => `<div class="drawer" id="drawer" data-drawer hidden>
  <div class="wrap">
    <p class="drawer-label">Curso · 10 capítulos</p>
${CHAPTERS.map(([file, num, title, dur]) => `    <a class="dl" href="${file}"${meta.page === file.replace(".html", "") ? ' aria-current="page"' : ""}><i>${num}</i>${title}</a>`).join("\n")}
    <p class="drawer-label">Extra</p>
    <a class="dl" href="${EXTRA[0]}"${meta.page === "arsenal" ? ' aria-current="page"' : ""}><i>★</i>${EXTRA[2]}</a>
    <p class="drawer-label">Recursos</p>
    <a class="dl" href="descargas/tutorial-dev.pdf"><i>↓</i>Curso completo en PDF</a>
    <a class="dl" href="https://github.com/EverKrypton/tutorial-dev"><i>↗</i>Repositorio en GitHub</a>
  </div>
</div>`;

const header = (meta) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.desc}">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#08090b">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.desc}">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_ES">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,300..800&family=Public+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
<script>document.documentElement.classList.add("js");</script>
</head>
<body data-page="${meta.page}">

<a class="skip" href="#main">Saltar al contenido</a>
<div class="reading-bar" data-reading-bar></div>

<header class="nav-wrap" data-nav>
  <div class="wrap nav">
    <a class="logo" href="index.html"><span class="logo-mark">t</span>tutorial<span>.dev</span></a>
    <nav class="nav-links" aria-label="Principal">
      <a href="index.html#temario">Temario</a>
      <a href="fundamentos.html"${meta.page === "fundamentos" ? ' aria-current="page"' : ""}>Empezar</a>
      <a href="prompting.html"${meta.page === "prompting" ? ' aria-current="page"' : ""}>Prompting</a>
      <a href="arsenal.html"${meta.page === "arsenal" ? ' aria-current="page"' : ""}>Arsenal</a>
      <a href="descargas/tutorial-dev.pdf">PDF</a>
      <a href="https://github.com/EverKrypton/tutorial-dev" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <div class="nav-actions">
      <a class="progress-mini" href="index.html#temario" data-progress-pill aria-label="Progreso del curso">
        <span class="progress-ring" data-progress-ring></span>
        <b data-progress-text>0/10</b>
      </a>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="Cambiar tema" aria-pressed="false">
        ${icon.sun}
        ${icon.moon}
      </button>
      <a class="btn btn--sm" href="fundamentos.html">Empezar</a>
      <button class="burger" type="button" data-drawer-toggle aria-expanded="false" aria-controls="drawer" aria-label="Abrir temario">
        ${icon.menu}
      </button>
    </div>
  </div>
</header>

${drawer(meta)}

<main id="main">`;

const rail = (meta) => `      <aside class="rail" aria-label="Navegación del curso">
        <div class="rail-in">
          <p class="rail-label">Curso</p>
          <ol class="rail-list">
${CHAPTERS.map(([file, num, title]) => `            <li><a href="${file}" data-slug="${file.replace(".html", "")}"${meta.page === file.replace(".html", "") ? ' aria-current="page"' : ""}><span>${num}</span>${title}</a></li>`).join("\n")}
          </ol>
          <p class="rail-label">Extra</p>
          <ol class="rail-list">
            <li><a href="${EXTRA[0]}" data-slug="arsenal"${meta.page === "arsenal" ? ' aria-current="page"' : ""}><span>★</span>${EXTRA[2]}</a></li>
          </ol>
${(meta.toc && meta.toc.length) ? `          <p class="rail-label">En esta entrada</p>
          <ol class="rail-toc">
${meta.toc.map(([href, label]) => `            <li><a href="${href}">${label}</a></li>`).join("\n")}
          </ol>` : ""}
        </div>
      </aside>`;

const tocMobile = (meta) => (meta.toc && meta.toc.length) ? `        <details class="toc-m">
          <summary>En esta entrada · ${meta.toc.length} secciones</summary>
          <ol>
${meta.toc.map(([href, label]) => `            <li><a href="${href}">${label}</a></li>`).join("\n")}
          </ol>
        </details>
` : "";

const footer = `
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <a class="foot-brand" href="index.html"><span class="logo-mark">t</span>tutorial<span style="color:var(--ink-subtle)">.dev</span></a>
        <p class="foot-note">Curso abierto para aprender a construir y publicar para la web. Escrito para quien empieza de cero, sin saltarse los porqués.</p>
      </div>
      <div class="foot-cols">
        <div>
          <h3>Curso</h3>
          <a href="fundamentos.html">Fundamentos</a>
          <a href="primera-web.html">Primera web</a>
          <a href="git-github.html">Git y GitHub</a>
          <a href="vercel.html">Vercel</a>
        </div>
        <div>
          <h3>Construir con IA</h3>
          <a href="v0.html">v0</a>
          <a href="ia-cli.html">IA en la terminal</a>
          <a href="skills.html">Skills</a>
          <a href="agentes.html">Agentes</a>
        </div>
        <div>
          <h3>Más</h3>
          <a href="prompting.html">Curso de prompting</a>
          <a href="glosario.html">Glosario</a>
          <a href="arsenal.html">El arsenal</a>
          <a href="descargas/tutorial-dev.pdf">PDF completo</a>
        </div>
      </div>
    </div>
    <div class="colophon">
      <span>© <span data-year>2026</span> tutorial.dev · Licencia MIT</span>
      <span><a href="https://github.com/EverKrypton/tutorial-dev">Código abierto</a> · Deploy automático en Vercel</span>
    </div>
  </div>
</footer>

<script src="assets/app.js" defer></script>
</body>
</html>
`;

const anchors = (html) =>
  html.replace(/<(h2|h3) id="([^"]+)">([\s\S]*?)<\/\1>/g,
    (m, tag, id, inner) => `<${tag} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Enlace a esta sección">#</a></${tag}>`);

const files = fs.readdirSync(PAGES).filter((f) => f.endsWith(".json")).sort();

for (const file of files) {
  const meta = JSON.parse(fs.readFileSync(path.join(PAGES, file), "utf8"));
  const body = anchors(fs.readFileSync(path.join(PAGES, meta.body), "utf8"));
  const facts = FACTS[meta.page] || ["—", "—", "—", "—"];
  const dur = (meta.tags && meta.tags[0]) || "—";
  const chips = (meta.tags || []).slice(1).map((t) => `<span class="chip">${t}</span>`).join("\n        ");

  const html = `${header(meta)}
  <div class="entry">
    <div class="wrap">
      <nav class="crumbs" aria-label="Migas de pan">
        <a href="index.html">Curso</a> <span>/</span> <span>${meta.crumb || "Capítulo " + meta.chapter}</span>
      </nav>
      <div class="entry-head">
        <div class="entry-meta-top">
          <span class="chip chip--accent">${meta.chapter === "★" ? "Extra" : "Capítulo " + meta.chapter}</span>
          <span class="chip">${dur}</span>
          ${chips}
        </div>
        <h1>${meta.h1}</h1>
        <p class="entry-deck">${meta.lede}</p>
        <dl class="entry-facts">
          <div><dt>Duración</dt><dd>${dur}</dd></div>
          <div><dt>Nivel</dt><dd>${facts[0]}</dd></div>
          <div><dt>Requisitos</dt><dd>${facts[1]}</dd></div>
          <div><dt>Al terminar</dt><dd>${facts[2]}</dd></div>
        </dl>
      </div>
      <div class="entry-foot-space"></div>
    </div>
  </div>

  <div class="wrap article">
    <div class="article-grid">
${rail(meta)}
      <div>
${tocMobile(meta)}        <article class="prose">
${body}
        </article>

        <div class="entry-foot">
          <div class="stamp-row">
            <button class="stamp" type="button" data-complete="${meta.page}" aria-pressed="false">
              <span class="bx" aria-hidden="true">✓</span>
              Marcar como completado
            </button>
            <span class="stamp-note">Se guarda en este navegador</span>
          </div>
          ${pager(meta)}
          <p class="keys">Atajos: <span class="kbd">←</span> <span class="kbd">→</span> para moverte entre entradas</p>
        </div>
      </div>
    </div>
  </div>
${footer}`;

  fs.writeFileSync(path.join(OUT, meta.file), html);
  console.log("✓", meta.file);
}

function pager(meta) {
  const parts = [];
  if (meta.prev) parts.push(`<a href="${meta.prev[0]}"><small>← Anterior</small><b>${meta.prev[1]}</b></a>`);
  if (meta.next) parts.push(`<a class="next" href="${meta.next[0]}"><small>Siguiente →</small><b>${meta.next[1]}</b></a>`);
  return `<nav class="pager" aria-label="Entradas">${parts.join("")}</nav>`;
}
