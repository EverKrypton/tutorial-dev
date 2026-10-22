# AGENTS.md

Guía para agentes de IA que trabajen en este repositorio.

## Qué es este proyecto

`tutorial-dev` es un curso abierto en español para aprender a programar desde cero y publicar una web. El sitio está hecho con **Next.js 16 (App Router)** y CSS escrito a mano. El contenido vive en archivos, no en una base de datos.

## Estructura

- `app/` — rutas: portada, `curso/[slug]`, `ejemplos`, `ejemplos/[slug]`, `diseno`.
- `app/globals.css` — sistema visual completo (tokens, componentes, responsive).
- `app/demos.css` — estilos de las demos, todos bajo el prefijo `.dv`.
- `components/site/` — topbar, navegación, búsqueda ⌘K, TOC, progreso, tema.
- `components/examples/` — las diez demos interactivas y su registro.
- `content/chapters.json` — metadatos de cada entrada (título, resumen, duración, nivel, secciones).
- `content/bodies/*.html` — cuerpo de cada capítulo, en HTML semántico.
- `lib/content.ts` — lectura del contenido.
- `public/` — PDF, favicon, proyecto de ejemplo y copias de las skills.
- `tools/` — `build-print.mjs`, `render-pdf.cjs`, `make-pdf.py`, `check.mjs`.
- `todo.sh` — build + comprobación + commit + push.

## Convenciones

- Todo el contenido y la interfaz están en español.
- Mobile first: los estilos base son para 360 px; los `@media` solo añaden.
- Usa los tokens de `:root` (`--bg`, `--panel`, `--line`, `--ink`, `--muted`, `--accent`, `--ok`, `--danger`). No introduzcas colores nuevos.
- Un solo acento. Si aparece tres veces en la misma vista, deja de significar algo.
- Reglas de 1 px y escala de superficies; nada de sombras decorativas ni degradados de texto.
- Tipografías: `--font-sans` (Geist), `--font-serif` (Instrument Serif, solo en titulares editoriales) y `--font-mono` (Geist Mono).
- El contenido debe leerse sin JavaScript. Las mejoras van en `components/site/Enhance.tsx`.
- Todo control interactivo es `button` o `Link`, con `aria-pressed`, `role="switch"` o `aria-current` cuando corresponde.
- Las demos usan datos ficticios; no inventes métricas, testimonios ni precios reales.

## Cómo comprobar

```bash
npm run build     # debe compilar sin errores ni avisos de hidratación
npm run check     # enlaces, anclas y PDF
```

Antes de dar algo por terminado, revisa a 360 px, 768 px y 1440 px: sin scroll horizontal, foco visible y sin errores de consola.

## Reglas

- No cambies el contenido pedagógico sin que se pida.
- No agregues claves, tokens ni datos personales.
- Si agregas una entrada: añade `content/bodies/<slug>.html`, actualiza `content/chapters.json` (con `sections` extraídas de los `<h2 id>`) y regenera el PDF con `./todo.sh --pdf`.
- Los ejemplos viven en `components/examples/` y se registran en `registry.tsx`; el índice los muestra a tamaño real, no en miniatura.
- El PDF se sirve desde `public/descargas/tutorial-dev.pdf` con `Content-Disposition: attachment` (descarga directa, no se abre en el navegador).
