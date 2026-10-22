# tutorial.dev

Curso abierto, en español, para aprender a construir y publicar para la web. Sin humo y sin saltarse los porqués.

**Sitio en vivo:** https://tutorial-dev-es.vercel.app

## Qué incluye

Once entradas que van de cero a una URL publicada:

1. **Cómo piensa un programa** — variables, condiciones, bucles, funciones, errores.
2. **Tu primera página web** — HTML, CSS, JavaScript, mobile first, accesibilidad.
3. **Git y GitHub sin miedo** — commits, ramas, remotos, pull requests, deshacer.
4. **Publicar en Vercel** — deploy, previews, dominios, variables, funciones, rollback.
5. **v0: tu copiloto de interfaces** — prompting visual, iteración, código propio.
6. **La IA en tu terminal** — harness, modelos, proveedores, contexto, permisos.
7. **Skills** — cómo escribir un `SKILL.md` y reutilizar tu forma de trabajar.
8. **Tu propio agente** — instrucciones, permisos, subagentes, ejemplos completos.
9. **Curso de prompting, a fondo** — 16 módulos: contexto, estructura, ejemplos, razonamiento, JSON, agentes, evaluación, seguridad.
10. **Glosario y chuleta** — términos y comandos listos para copiar.
11. **El arsenal** — genjutsu e impeccable por dentro: dos skills de diseño reales.

Además:

- **Galería de ejemplos** (`/ejemplos`): diez patrones de interfaz construidos e interactivos — cabecera de datos en vivo, dashboard de analítica, panel de trading, tabla de administración, ajustes, entrada, precios, paleta de comandos, app móvil y estados vacío/carga/error.
- **Sistema de diseño** (`/diseno`): tokens, escala tipográfica, espaciado, radios y componentes con sus estados.
- **PDF completo** (`/descargas/tutorial-dev.pdf`): 88 páginas, portada, índice con números de página, marcadores y enlaces internos.

## Stack

- **Next.js 16** (App Router, componentes de servidor, SSG).
- **TypeScript** estricto.
- **CSS a mano** con tokens propios; sin framework de utilidades.
- **Geist** e **Instrument Serif** vía `next/font` (sin peticiones a Google en runtime).
- **Contenido en archivos**: `content/chapters.json` + `content/bodies/*.html`.

## Estructura

```
.
├── app/
│   ├── layout.tsx            # topbar, búsqueda ⌘K, pie
│   ├── page.tsx              # portada
│   ├── globals.css           # sistema visual
│   ├── demos.css             # estilos de los ejemplos
│   ├── curso/[slug]/page.tsx # capítulo
│   ├── ejemplos/             # galería y detalle de cada demo
│   ├── diseno/page.tsx       # sistema de diseño
│   └── not-found.tsx
├── components/
│   ├── site/                 # navegación, búsqueda, TOC, progreso
│   └── examples/             # las diez demos
├── content/
│   ├── chapters.json         # metadatos de cada entrada
│   └── bodies/*.html         # cuerpo de cada capítulo
├── lib/content.ts            # lectura de contenido
├── public/
│   ├── descargas/*.pdf
│   ├── proyectos/mi-tarjeta/ # proyecto del capítulo 02
│   └── skills/               # copias de lectura de genjutsu e impeccable
├── skills/                   # fuente de esas skills
├── tools/                    # build del PDF y comprobaciones
├── todo.sh                   # construir + comprobar + publicar
├── PRODUCT.md                # verdad del producto
└── DESIGN.md                 # decisiones visuales y tokens
```

## Un solo comando

```bash
./todo.sh            # build, comprobación, commit y push
./todo.sh --pdf      # además regenera el PDF completo
./todo.sh --no-push  # solo build y comprobación
```

El push dispara el despliegue automático en Vercel: no hay que esperar ni volver a tocar la máquina.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run check    # enlaces, anclas y PDF
npm run pdf      # regenera el PDF (requiere python3, pypdf y poppler)
```

## Cómo está hecho

- Un solo acento (bermellón) y una escala de superficies; nada de sombras decorativas.
- Mobile first real: los estilos base son para 360 px y los `@media` solo añaden.
- El contenido es visible sin JavaScript; las mejoras (copiar, revelado, progreso) se añaden encima.
- Accesibilidad: foco visible, contraste, `aria-pressed`/`role="switch"` en los controles, `prefers-reduced-motion` respetado.
- Sin dependencias de UI: los gráficos y las velas son SVG escrito a mano.

## Contribuir

Las correcciones son bienvenidas, sobre todo si encuentras una explicación confusa. Abre un issue o un pull request explicando qué cambiarías y por qué.

## Licencia

MIT. Usa, copia, modifica y enseña con esto.
