# tutorial.dev

Curso abierto, en español, para aprender a construir y publicar tu primera web. Sin humo y sin saltarse los porqués.

**Sitio en vivo:** https://tutorial-dev-es.vercel.app

## Qué incluye

10 capítulos que van de cero a una URL publicada:

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

**Extra:** **El arsenal: genjutsu e impeccable** — dos skills de diseño reales explicadas por dentro: sus reglas, su pipeline, sus comandos y cómo escribir la tuya.

## Estructura

```
.
├── index.html              # portada y ruta
├── fundamentos.html        # capítulo 01
├── primera-web.html        # capítulo 02
├── git-github.html         # capítulo 03
├── vercel.html             # capítulo 04
├── v0.html                 # capítulo 05
├── ia-cli.html             # capítulo 06
├── skills.html             # capítulo 07
├── agentes.html            # capítulo 08
├── prompting.html          # capítulo 09
├── glosario.html           # capítulo 10
├── arsenal.html            # extra: genjutsu e impeccable
├── src/pages/              # contenido fuente de cada capítulo
├── tools/                  # build, comprobación y generación del PDF
├── descargas/
│   └── tutorial-dev.pdf    # curso completo, generado
├── todo.sh                 # construir + comprobar + publicar
├── assets/
│   ├── styles.css
│   ├── print.css
│   ├── app.js
│   └── favicon.svg
├── ejemplos/
│   └── mi-tarjeta/         # proyecto del capítulo 02
├── skills/                 # copias de lectura de skills reales
│   ├── genjutsu-cast/SKILL.md
│   ├── genjutsu-paint/SKILL.md
│   └── impeccable/SKILL.md
├── .opencode/
│   ├── skills/explicar-simple/SKILL.md
│   └── agents/profesor.md
├── AGENTS.md
└── vercel.json
```

## Un solo comando

```bash
./todo.sh            # construye, comprueba, commit y push
./todo.sh --pdf      # además regenera el PDF completo
./todo.sh --no-push  # solo construye y comprueba
```

El push dispara el despliegue automático en Vercel: no hay que esperar ni
volver a tocar la máquina.

## El PDF

`descargas/tutorial-dev.pdf` — 88 páginas, portada, índice con números de
página, marcadores de PDF y enlaces internos entre capítulos. Se genera desde
el mismo contenido que la web (`src/pages`), así que ambos no pueden divergir.

## Cómo verlo en local

Es HTML estático. No hay build ni dependencias.

```bash
git clone https://github.com/EverKrypton/tutorial-dev.git
cd tutorial-dev
python3 -m http.server 8000
```

Abre http://localhost:8000. También puedes abrir `index.html` con doble clic.

## Cómo está hecho

- HTML semántico y CSS a mano, con un sistema visual de catálogo impreso: papel prensa, un solo rojo de señal, reglas de 1px, cero sombras.
- Mobile first real: los estilos base son para 360 px y los `@media` solo añaden.
- JavaScript sin librerías: tema, progreso en `localStorage`, copiar código, índice lateral, atajos de teclado y menú móvil.
- Tipografía Archivo variable (con eje de ancho) y JetBrains Mono para código y metadatos.
- Sin frameworks, sin build, sin dependencias.

Las decisiones de diseño están documentadas en `DESIGN.md`; el contexto del producto, en `PRODUCT.md`.

## Deploy

El proyecto está desplegado en Vercel y conectado a este repositorio: cada push a `main` publica automáticamente.

Para desplegar tu propia copia:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Skills y agentes incluidos

El repositorio trae ejemplos listos para usar con [opencode](https://opencode.ai):

- `.opencode/skills/explicar-simple/SKILL.md` — explica conceptos como a un principiante.
- `.opencode/agents/profesor.md` — subagente que enseña sin tocar archivos.
- `skills/` — copias completas de genjutsu (cast y paint) e impeccable, para leer cómo se escribe una skill de nivel profesional.

Ábrelo con `opencode` en la raíz del proyecto y pruébalos con `@profesor`.

## Contribuir

Las correcciones son bienvenidas, sobre todo si encuentras una explicación confusa. Abre un issue o un pull request explicando qué cambiarías y por qué.

## Licencia

MIT. Usa, copia, modifica y enseña con esto.
