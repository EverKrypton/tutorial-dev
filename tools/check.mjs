// Comprobaciones rápidas del sitio: enlaces internos, anclas y metadatos.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));

const problems = [];
const ids = new Map();

for (const file of html) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  ids.set(file, new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));

  if (!/<title>[^<]{10,}<\/title>/.test(src)) problems.push(`${file}: falta <title>`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(src))
    problems.push(`${file}: falta meta description`);
  if (!/<h1[ >]/.test(src)) problems.push(`${file}: falta <h1>`);
  if (/[“”]/.test(src)) problems.push(`${file}: comillas tipográficas en HTML`);

  const scannable = src.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<code[\s\S]*?<\/code>/g, "");
  for (const [, href] of scannable.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|tel:)/.test(href)) {
      if (href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        if (!ids.get(file).has(id)) problems.push(`${file}: ancla rota #${id}`);
      }
      continue;
    }
    const [target, hash] = href.split("#");
    if (!target) continue;
    const full = path.join(ROOT, target);
    if (!fs.existsSync(full)) {
      problems.push(`${file}: enlace roto ${target}`);
      continue;
    }
    if (hash && target.endsWith(".html")) {
      const dest = fs.readFileSync(full, "utf8");
      if (!dest.includes(`id="${hash}"`)) problems.push(`${file}: ${target}#${hash} no existe`);
    }
  }
}

// anclas internas del propio documento
for (const file of html) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const local = ids.get(file);
  for (const [, id] of src.matchAll(/<a class="anchor" href="#([^"]+)"/g)) {
    if (!local.has(id)) problems.push(`${file}: ancla de sección #${id} sin destino`);
  }
}

const pdf = path.join(ROOT, "descargas", "tutorial-dev.pdf");
if (!fs.existsSync(pdf)) problems.push("descargas/tutorial-dev.pdf no existe");

if (problems.length) {
  console.error("✗ " + problems.length + " problemas:");
  for (const p of problems) console.error("  · " + p);
  process.exit(1);
}

console.log(`✓ ${html.length} páginas, enlaces y anclas correctos`);
