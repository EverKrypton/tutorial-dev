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
- Usa las variables CSS de `:root` (`--ink`, `--paper`, `--blue`, `--acid`, `--line`, `--muted`). No introduzcas colores nuevos sin motivo.
- Los capítulos comparten la misma cabecera, pie, botón de completar y paginador. Mantén esa estructura.
- Tipografías: Bricolage Grotesque (títulos), Archivo (cuerpo), JetBrains Mono (código).
- No agregues dependencias ni frameworks sin preguntar.
- Cada bloque de código usa `.code` con `.code-head` y `data-copy`.
- Los callouts usan `.callout` con la variante `--kid`, `--warn` o `--info`.

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
