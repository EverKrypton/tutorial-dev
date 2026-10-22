# AGENTS.md

Guía para agentes de IA que trabajen en este repositorio.

## Qué es este proyecto

`tutorial-dev` es un curso abierto en español para aprender a programar desde cero y publicar una web. El sitio es estático: HTML, CSS y JavaScript sin build step.

## Estructura

- `index.html` — portada y ruta de capítulos
- `*.html` — un archivo por capítulo
- `assets/styles.css` — sistema visual completo (variables CSS, componentes, responsive)
- `assets/app.js` — tema claro/oscuro, progreso, copiar código, TOC, menú móvil
- `assets/favicon.svg`
- `ejemplos/` — proyectos completos que acompañan los capítulos
- `.opencode/skills/` — skills del proyecto
- `.opencode/agents/` — agentes de ejemplo

## Convenciones

- Todo el contenido y la interfaz están en español.
- Mobile first: los estilos base son para teléfono; los `@media` añaden complejidad.
- Usa las variables CSS de `:root` (`--paper`, `--surface`, `--ink`, `--ink-2`, `--muted`, `--line`, `--line-2`, `--accent`). No introduzcas colores nuevos.
- El sistema es editorial y sobrio: reglas de 1px, sin sombras, sin gradientes, sin tarjetas con borde redondeado grande. Un solo acento (`--accent`).
- Los capítulos comparten cabecera, rail lateral, pie, botón de completar y paginador. Mantén esa estructura.
- Tipografías: Archivo variable (cuerpo y títulos, con `wdth` 110-112 en títulos) y JetBrains Mono (código y metadatos).
- No agregues dependencias ni frameworks sin preguntar.
- Cada bloque de código usa `.code` con `.code-head` y `data-copy`.
- Los callouts usan `.callout` con la variante `--kid`, `--warn` o `--info`; se distinguen por el borde superior y la etiqueta mono, no por cajas de color.

## Cómo comprobar

No hay tests. Abre el sitio con cualquier servidor estático:

```bash
npx serve .
# o
python3 -m http.server 8000
```

Revisa a 360px, 768px y 1280px de ancho. Comprueba:
- Sin scroll horizontal.
- El menú móvil abre y cierra con Escape.
- El botón de tema funciona y persiste.
- Los enlaces internos apuntan a archivos existentes.

## Reglas

- No cambies el contenido pedagógico sin que se pida.
- No agregues claves, tokens ni datos personales.
- Si agregas un capítulo, actualiza `index.html` (lista y progreso: `TOTAL` en `app.js`).
