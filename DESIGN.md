# Design

<!-- impeccable:design-schema 1 -->

## World

Un laboratorio de noche: canvas azul-tinta casi negro, superficies en escalera, hairlines de un píxel y un único menta eléctrico que marca lo accionable. Los titulares son editoriales (Instrument Serif) y la interfaz es precisa (Geist). Los datos —cifras, cuotas, duraciones— van en monoespaciada con numeración tabular.

Anti-referencia: la versión anterior del sitio (papel prensa, rojo óxido, todo en serif condensada) y la anterior a esa (tarjetas redondeadas con sombra y amarillo ácido). Ninguna de las dos tenía jerarquía real.

## Palette

Muestreada del CSS construido.

| Rol | Oscuro | Claro |
|---|---|---|
| Canvas `--bg` | `#060a0e` | `#f6faf8` |
| Canvas 2 `--bg-2` | `#0a1015` | `#eef4f1` |
| Panel `--panel` | `#0d141a` | `#ffffff` |
| Panel 2 `--panel-2` | `#131c24` | `#f2f7f5` |
| Hairline `--line` | `#1b2833` | `#dde7e3` |
| Hairline 2 `--line-2` | `#293a48` | `#c4d3ce` |
| Tinta `--ink` | `#e9f4f2` | `#08110f` |
| Tinta 2 `--ink-2` | `#b7cac7` | `#2b3a37` |
| Apagado `--muted` | `#7b9491` | `#5f736f` |
| Acento `--accent` | `#2fe0b8` | `#0f9e7d` |
| Acento tinta `--accent-ink` | `#6df2d4` | `#0a7a60` |
| Éxito `--ok` | `#7fe08a` | `#17824a` |
| Peligro `--danger` | `#ff6b6b` | — |

El acento nunca rellena superficies grandes: aparece en el botón principal, el número de capítulo activo, la barra de progreso y los estados activos.

## Type

- **Geist Sans** (`--font-sans`): interfaz y cuerpo. 15.5 px base, 16 px desde 820 px, line-height 1.65, tracking −0.006em.
- **Instrument Serif** (`--font-serif`): solo el `h1` de portada, el `h2` del CTA y el 404. Peso 400, tracking −0.03em.
- **Geist Mono** (`--font-mono`): metadatos, etiquetas, cifras, código. 9–12.3 px, tracking 0.02–0.13em, `tabular-nums` siempre que alinee.

Escala: hero `clamp(2.6rem, 9.6vw, 4.6rem)`, h1 de capítulo `clamp(1.9rem, 7vw, 2.9rem)`, h2 `clamp(1.55rem, 5.2vw, 2.15rem)`, cuerpo 15.5–16 px.

## Grid and spacing

- Contenedor `min(100% - 2×pad, 1280px)`; pad 18 → 24 → 32 px.
- Shell de tres columnas desde 1100 px: rail 264 px, contenido, TOC 216 px.
- Escala de espaciado: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Separación por espacio y hairlines, nunca por cajas anidadas.

## Components

- **Botones**: 36 px de alto (44 en `--lg`), radio 8 px. Principal en tinta sólida que pasa a bermellón; secundario con borde; terciario sin fondo.
- **Chips**: píldora de 10.5 px mono con borde de 1 px; `--accent` y `--ok` para estados.
- **Código**: bloque con cabecera mono y botón de copiar; resaltado propio (comentario apagado, palabra clave menta, cadena verde, número azul, función violeta).
- **Callouts**: caja con borde de 1 px y etiqueta mono; `--kid` usa tinte de acento, `--warn` borde de peligro.
- **Pasos**: tarjetas con numeral circular y separación de 8 px.
- **Tablas**: contenedor con borde, cabecera mono en mayúsculas sobre `--panel-2`.
- **Ejemplos**: cada demo trae su propio lenguaje visual bajo `.dv`, aislado del sitio. La cabecera de apuestas usa oro sobre negro cálido; el dashboard SaaS, papel claro; el trading, negro azulado; el admin, blanco con tinta.
- **Estados**: vacío con acción, esqueleto con la forma del contenido, error con causa y reintento.

## Motion

- Entrada del hero: 800 ms, `translateY(14px)` + blur de 5 px a 0, escalonado en 60 ms.
- Revelado de bloques: 600 ms con retardo de 55 ms por índice, una sola vez.
- Transiciones de hover: 150–250 ms. Sin parallax, sin scroll-jacking.
- Todo se apaga con `prefers-reduced-motion: reduce`.

## Browser surfaces

Selección en menta sobre tinta oscura. Foco con anillo de 2 px y offset 2 px. Scrollbar fina tematizada. `caret-color` en acento. `::marker` en acento dentro de la prosa. Enlaces con subrayado de 1 px que se intensifica al pasar.

## Responsive

360 px es el ancho de diseño. A 560 px aparecen las rejillas de dos columnas. A 820 px entra la navegación superior, la búsqueda y el rail lateral. A 1100 px aparece el TOC de la derecha. El drawer móvil se cierra con Escape y al navegar.
