// Compone el HTML de impresión del curso completo (portada + libro).
// Lee el mismo contenido que la web: content/chapters.json + content/bodies.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TMP = path.join(ROOT, ".build");

const chapters = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "chapters.json"), "utf8"));
const printCss = fs.readFileSync(path.join(ROOT, "tools", "print.css"), "utf8");

let pageMap = {};
try {
  pageMap = JSON.parse(fs.readFileSync(path.join(TMP, "pagemap.json"), "utf8"));
} catch {
  pageMap = {};
}

const SLUGS = new Set(chapters.map((c) => c.slug));

/** /curso/slug → #cap-slug, para que los enlaces funcionen dentro del PDF. */
const internalize = (html) =>
  html.replace(/href="\/curso\/([a-z0-9-]+)(#[^"]*)?"/g, (m, slug, hash) =>
    SLUGS.has(slug) ? `href="#cap-${slug}${hash || ""}"` : m
  );

const body = (slug) =>
  internalize(fs.readFileSync(path.join(ROOT, "content", "bodies", `${slug}.html`), "utf8"));

const head = (title) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="author" content="tutorial.dev">
<style>
${printCss}
</style>`;

/* ---------------- portada ---------------- */

const cover = `${head("tutorial.dev — Curso completo")}
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
  <p class="cover-sub">Once entradas que empiezan en «no sé por dónde empezar» y terminan en una URL que puedes abrir desde el teléfono de cualquiera. Fundamentos, HTML y CSS, Git, Vercel, y después IA: modelos, terminal, skills, agentes y prompting.</p>
  <div class="cover-rule"></div>
  <dl class="cover-facts">
    <div><dt>Nivel</dt><dd>Desde cero</dd></div>
    <div><dt>Duración</dt><dd>4–6 horas</dd></div>
    <div><dt>Entradas</dt><dd>10 + 1 extra</dd></div>
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

const toc = chapters
  .map((c) => {
    const page = pageMap[c.slug] ? `<span class="p">${pageMap[c.slug]}</span>` : "";
    return `      <li><a href="#cap-${c.slug}"><span class="n">${c.number}</span><span class="t">${c.title}</span><span class="m">${c.duration}</span>${page}</a></li>`;
  })
  .join("\n");

/* ---------------- capítulos ---------------- */

const chaptersHtml = chapters
  .map((c, i) => {
    const html = body(c.slug);
    const next = chapters[i + 1];
    const prev = chapters[i - 1];

    const secIndex =
      c.sections.length > 2
        ? `<nav class="chapter-index" aria-label="En este capítulo">
    <p class="chapter-index-label">En este capítulo</p>
    <ol>${c.sections.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("")}</ol>
  </nav>`
        : "";

    const nav = `<nav class="chapter-nav">
    ${prev ? `<a class="prev" href="#cap-${prev.slug}"><span>Anterior</span><b>${prev.title}</b></a>` : "<span></span>"}
    ${next ? `<a class="next" href="#cap-${next.slug}"><span>Siguiente</span><b>${next.title}</b></a>` : "<span></span>"}
  </nav>`;

    return `<section class="chapter" id="cap-${c.slug}">
  <header class="chapter-head">
    <div class="chapter-kicker"><b>${c.extra ? "Extra" : `Capítulo ${c.number}`}</b><span>·</span><span>${c.duration}</span></div>
    <h1>${c.title}.</h1>
    <p class="chapter-deck">${c.lede}</p>
    <dl class="chapter-facts">
      <div><dt>Duración</dt><dd>${c.duration}</dd></div>
      <div><dt>Nivel</dt><dd>${c.level}</dd></div>
      <div><dt>Requisitos</dt><dd>${c.requires}</dd></div>
      <div><dt>Al terminar</dt><dd>${c.outcome}</dd></div>
    </dl>
    ${secIndex}
  </header>
  <div class="prose">
${html}
  </div>
  ${nav}
</section>`;
  })
  .join("\n\n");

/* ---------------- libro ---------------- */

const book = `${head("tutorial.dev — Curso completo")}
</head>
<body>

<div class="blank-first" aria-hidden="true"></div>

<section class="toc-page" id="indice">
  <p class="doc-label">Contenido</p>
  <h1>Índice del curso</h1>
  <ol class="toc-list">
${toc}
  </ol>
  <p class="toc-note">Cada entrada explica un mecanismo y termina en algo que puedes abrir y usar. Los números de la derecha son la página impresa: en el PDF se puede pulsar cualquier entrada. La versión web, con progreso guardado y ejemplos interactivos, está en tutorial-dev-es.vercel.app.</p>
</section>

${chaptersHtml}

<section class="doc-end" id="colofon">
  <p class="doc-label">Colofón</p>
  <h1>Sobre este documento</h1>
  <p>Este PDF se genera a partir del mismo contenido que el sitio: <code>content/chapters.json</code> y <code>content/bodies/</code>. No es una copia manual, así que las dos versiones no pueden divergir.</p>
  <p>El curso es abierto y el código está publicado con licencia MIT. Si una explicación no se entiende, se puede corregir: abre un issue o un pull request en el repositorio.</p>
  <div class="colophon-grid">
    <div>
      <h3>Contenido</h3>
      <ul>
        <li>10 entradas + 1 extra</li>
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

fs.mkdirSync(TMP, { recursive: true });
fs.writeFileSync(path.join(TMP, "_portada.html"), cover);
fs.writeFileSync(path.join(TMP, "_libro.html"), book);
console.log("✓ _portada.html");
console.log("✓ _libro.html");
