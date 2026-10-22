// Comprobaciones del contenido y del build: enlaces, anclas y metadatos.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chapters = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "chapters.json"), "utf8"));
const slugs = new Set(chapters.map((c) => c.slug));
const problems = [];

for (const chapter of chapters) {
  const file = path.join(ROOT, "content", "bodies", `${chapter.slug}.html`);
  if (!fs.existsSync(file)) {
    problems.push(`${chapter.slug}: falta el cuerpo`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const [id] of chapter.sections) {
    if (!ids.has(id)) problems.push(`${chapter.slug}: la sección #${id} no existe en el cuerpo`);
  }

  const scannable = html.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<code[\s\S]*?<\/code>/g, "");
  for (const [, href] of scannable.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith("#")) {
      if (href.length > 1 && !ids.has(href.slice(1))) {
        problems.push(`${chapter.slug}: ancla rota ${href}`);
      }
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith("/curso/")) {
      const slug = href.split("#")[0].replace("/curso/", "");
      if (!slugs.has(slug)) problems.push(`${chapter.slug}: enlace a un capítulo inexistente ${href}`);
      continue;
    }
    if (href.startsWith("/")) {
      const target = path.join(ROOT, "public", href);
      const routeDir = path.join(ROOT, "app", href.slice(1));
      if (!fs.existsSync(target) && !fs.existsSync(routeDir)) {
        problems.push(`${chapter.slug}: enlace interno sin destino ${href}`);
      }
      continue;
    }
    problems.push(`${chapter.slug}: enlace relativo suelto ${href}`);
  }
}

const pdf = path.join(ROOT, "public", "descargas", "tutorial-dev.pdf");
if (!fs.existsSync(pdf)) problems.push("falta public/descargas/tutorial-dev.pdf");

if (problems.length) {
  console.error(`✗ ${problems.length} problemas:`);
  for (const p of problems) console.error("  · " + p);
  process.exit(1);
}

console.log(`✓ ${chapters.length} entradas, enlaces y anclas correctos`);
