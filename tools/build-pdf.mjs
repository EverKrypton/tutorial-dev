import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = path.join(ROOT, "src", "pages");
const OUT = ROOT;
const DL = path.join(OUT, "descargas");
const TMP = path.join(ROOT, ".build");

const ORDER = [
  ["fundamentos", "01", "Cómo piensa un programa", "25 min", ["Cero", "Ninguno", "Pensar en pasos"]],
  ["primera-web", "02", "Tu primera página web", "45 min", ["Cero", "Ninguno", "Una página propia"]],
  ["git-github", "03", "Git y GitHub sin miedo", "30 min", ["Cero", "Un editor", "Código versionado"]],
  ["vercel", "04", "Publicar en Vercel", "35 min", ["Inicial", "Cuenta de GitHub", "Una URL pública"]],
  ["v0", "05", "v0: tu copiloto de interfaces", "30 min", ["Inicial", "Cuenta de Vercel", "Una interfaz real"]],
  ["ia-cli", "06", "La IA en tu terminal", "40 min", ["Inicial", "Terminal", "Un agente en marcha"]],
  ["skills", "07", "Skills: enséñale trucos a tu IA", "25 min", ["Medio", "opencode instalado", "Instrucciones propias"]],
  ["agentes", "08", "Tu propio agente", "30 min", ["Medio", "opencode instalado", "Un agente propio"]],
  ["prompting", "09", "Curso de prompting, a fondo", "90 min", ["Medio", "Ninguno", "Un método"]],
  ["glosario", "10", "Glosario y chuleta", "10 min", ["Consulta", "Ninguno", "Vocabulario"]],
  ["arsenal", "11", "El arsenal: genjutsu e impeccable", "Extra", ["Medio", "Skills leídas", "Criterio de diseño"]],
];

const meta = (slug) => JSON.parse(fs.readFileSync(path.join(PAGES, `${slug}.json`), "utf8"));
const rawBody = (slug) => fs.readFileSync(path.join(PAGES, meta(slug).body), "utf8");

const SLUGS = new Set(ORDER.map(([s]) => s));

/** Reescribe enlaces internos .html a anclas del documento. */
const internalize = (html) =>
  html.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, (m, slug, hash) => {
    if (!SLUGS.has(slug)) return m;
    return `href="#cap-${slug}${hash || ""}"`;
  });

/** Extrae los h2 con id para el índice de cada capítulo. */
const sections = (html) => {
  const out = [];
  const re = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g;
  let m;
  while ((m = re.exec(html))) {
    const label = m[2].replace(/<[^>]+>/g, "").trim();
    out.push([m[1], label]);
  }
  return out;
};

const HEAD = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>tutorial.dev — Curso completo</title>
<meta name="author" content="tutorial.dev">
<link rel="stylesheet" href="../assets/print.css">`;

/* ---------------- portada ---------------- */

const cover = `${HEAD}
<style>
  @page { size: A4; margin: 0; }
  body { margin: 0; }
</style>
</head>
<body>
<section class="cover">
  <span class="cover-mark">t</span>
  <span class="cover-eyebrow">Curso abierto · Edición 2026</span>
  <h1>Aprende a construir para la web. Y a <em>publicarlo</em>.</h1>
  <p class="cover-sub">Diez capítulos que empiezan en «no sé por dónde empezar» y terminan en una URL que puedes abrir desde el teléfono de cualquiera. Fundamentos, HTML y CSS, Git, Vercel, y después IA: modelos, terminal, skills, agentes y prompting.</p>
  <div class="cover-rule"></div>
  <dl class="cover-facts">
    <div><dt>Nivel</dt><dd>Desde cero</dd></div>
    <div><dt>Duración</dt><dd>4–6 horas</dd></div>
    <div><dt>Capítulos</dt><dd>10 + 1 extra</dd></div>
    <div><dt>Requisitos</dt><dd>Ninguno</dd></div>
    <div><dt>Idioma</dt><dd>Español</dd></div>
    <div><dt>Licencia</dt><dd>MIT</dd></div>
  </dl>
  <div class="cover-foot">
    <span>tutorial.dev</span>
    <span>tutorial-dev-es.vercel.app</span>
  </div>
</section>
</body>
</html>
`;

/* ---------------- índice ---------------- */

let pageMap = {};
try { pageMap = JSON.parse(fs.readFileSync(path.join(TMP, "pagemap.json"), "utf8")); } catch (e) { pageMap = {}; }

const toc = ORDER.map(([slug, n, title, dur]) => {
  const page = pageMap[slug] ? `<span class="p">${pageMap[slug]}</span>` : "";
  return `      <li><a href="#cap-${slug}"><span class="n">${n}</span><span class="t">${title}</span><span class="m">${dur}</span>${page}</a></li>`;
}).join("\n");

/* ---------------- capítulos ---------------- */

const chapters = ORDER.map(([slug, n, title, dur, facts], i) => {
  const m = meta(slug);
  const body = internalize(rawBody(slug));
  const secs = sections(body);
  const next = ORDER[i + 1];
  const prev = ORDER[i - 1];

  const secIndex = secs.length > 2
    ? `<nav class="chapter-index" aria-label="En este capítulo">
    <p class="chapter-index-label">En este capítulo</p>
    <ol>${secs.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("")}</ol>
  </nav>`
    : "";

  const nav = `<nav class="chapter-nav">
    ${prev ? `<a class="prev" href="#cap-${prev[0]}"><span>Anterior</span><b>${prev[2]}</b></a>` : "<span></span>"}
    ${next ? `<a class="next" href="#cap-${next[0]}"><span>Siguiente</span><b>${next[2]}</b></a>` : "<span></span>"}
  </nav>`;

  return `<section class="chapter" id="cap-${slug}">
  <header class="chapter-head">
    <div class="chapter-kicker"><b>${n === "11" ? "Extra" : `Capítulo ${n}`}</b><span>·</span><span>${dur}</span></div>
    <h1>${m.h1}</h1>
    <p class="chapter-deck">${m.lede}</p>
    <dl class="chapter-facts">
      <div><dt>Duración</dt><dd>${dur}</dd></div>
      <div><dt>Nivel</dt><dd>${facts[0]}</dd></div>
      <div><dt>Requisitos</dt><dd>${facts[1]}</dd></div>
      <div><dt>Al terminar</dt><dd>${facts[2]}</dd></div>
    </dl>
    ${secIndex}
  </header>
  <div class="prose">
${body}
  </div>
  ${nav}
</section>`;
}).join("\n\n");

/* ---------------- cuerpo ---------------- */

const book = `${HEAD}
</head>
<body>

<div class="blank-first" aria-hidden="true"></div>

<section class="toc-page" id="indice">
  <p class="doc-label">Contenido</p>
  <h1>Índice del curso</h1>
  <ol class="toc-list">
${toc}
  </ol>
  <p class="toc-note">Cada capítulo explica un mecanismo y termina en algo que puedes abrir y usar. Los números de la derecha son la página impresa: en el PDF se puede pulsar cualquier entrada. La versión web, con progreso guardado, está en tutorial-dev-es.vercel.app.</p>
</section>

${chapters}

<section class="doc-end" id="colofon">
  <p class="doc-label">Colofón</p>
  <h1>Sobre este documento</h1>
  <p>Este PDF se genera a partir del mismo contenido que el sitio. No es una copia manual: el HTML de cada capítulo se toma tal cual y se compone para impresión, así que las dos versiones no pueden divergir.</p>
  <p>El curso es abierto y el código está publicado con licencia MIT. Si una explicación no se entiende, se puede corregir: abre un issue o un pull request en el repositorio.</p>
  <div class="colophon-grid">
    <div>
      <h3>Contenido</h3>
      <ul>
        <li>10 capítulos + 1 extra</li>
        <li>16 módulos de prompting</li>
        <li>Glosario y chuletas de comandos</li>
      </ul>
    </div>
    <div>
      <h3>Enlaces</h3>
      <ul>
        <li>tutorial-dev-es.vercel.app</li>
        <li>github.com/EverKrypton/tutorial-dev</li>
      </ul>
    </div>
    <div>
      <h3>Herramientas del curso</h3>
      <ul>
        <li>Git y GitHub</li>
        <li>Vercel y v0</li>
        <li>opencode, skills y agentes</li>
      </ul>
    </div>
    <div>
      <h3>Licencia</h3>
      <ul>
        <li>MIT · uso libre</li>
        <li>Edición 2026</li>
      </ul>
    </div>
  </div>
  <p class="doc-end-nav"><a href="#indice">Volver al índice</a></p>
</section>

</body>
</html>
`;

fs.mkdirSync(DL, { recursive: true });
fs.writeFileSync(path.join(DL, "_portada.html"), cover);
fs.writeFileSync(path.join(DL, "_libro.html"), book);
console.log("✓ _portada.html");
console.log("✓ _libro.html");
