import type { Metadata } from "next";
import Link from "next/link";

import { DocsShell } from "@/components/site/DocsShell";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  description:
    "Los tokens, la escala tipográfica, el espaciado y los componentes con los que está construido tutorial.dev.",
};

const COLORS = [
  { name: "bg", label: "Canvas", note: "Fondo de la página" },
  { name: "panel", label: "Panel", note: "Tarjetas y bloques" },
  { name: "panel-2", label: "Panel 2", note: "Hover y cabeceras" },
  { name: "line", label: "Hairline", note: "Bordes de 1 px" },
  { name: "line-2", label: "Hairline 2", note: "Bordes fuertes" },
  { name: "ink", label: "Tinta", note: "Texto principal" },
  { name: "ink-2", label: "Tinta 2", note: "Cuerpo de texto" },
  { name: "muted", label: "Apagado", note: "Secundario" },
  { name: "faint", label: "Tenue", note: "Metadatos" },
  { name: "accent", label: "Acento", note: "Una sola vez por vista" },
  { name: "ok", label: "Éxito", note: "Completado" },
  { name: "danger", label: "Peligro", note: "Errores" },
];

const TYPE = [
  { token: "--text-hero", size: "clamp(2.6rem, 9.6vw, 4.6rem)", sample: "Publicarlo", font: "serif" },
  { token: "--text-h1", size: "clamp(1.9rem, 7vw, 2.9rem)", sample: "Tu primera página", font: "sans" },
  { token: "--text-h2", size: "clamp(1.55rem, 5.2vw, 2.15rem)", sample: "Cómo piensa un programa", font: "sans" },
  { token: "--text-h3", size: "1.06rem", sample: "Tomar decisiones", font: "sans" },
  { token: "--text-body", size: "15.5–16px", sample: "El navegador lee el HTML y construye un árbol.", font: "sans" },
  { token: "--text-mono", size: "10–12.3px", sample: "npm run build", font: "mono" },
];

const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96];

export default function DesignPage() {
  return (
    <DocsShell>
      <article>
        <header className="chapter-head">
          <nav className="crumbs" aria-label="Migas de pan">
            <Link href="/">Curso</Link>
            <span>/</span>
            <span>Sistema</span>
          </nav>
          <div className="chapter-title">
            <h1>Sistema de diseño.</h1>
          </div>
          <p className="chapter-lede">
            Todo lo que ves en este sitio sale de estos tokens. No hay colores sueltos ni tamaños
            inventados: si algo no encaja, se cambia aquí y se propaga.
          </p>
        </header>

        <div className="chapter-body prose">
          <h2 id="principios">Principios</h2>
          <p>
            Cuatro reglas que resuelven la mayoría de las decisiones antes de tomarlas.
          </p>
          <ol className="steps">
            <li>
              <h4>Un acento, no una paleta</h4>
              <p>
                El bermellón marca lo accionable y lo activo. Si aparece en tres sitios de la misma
                pantalla, deja de significar algo.
              </p>
            </li>
            <li>
              <h4>La jerarquía la hace el espacio</h4>
              <p>
                Más aire arriba de un título que debajo. Los grupos se separan con espacio, no con
                cajas dentro de cajas.
              </p>
            </li>
            <li>
              <h4>Bordes de un píxel, sin sombras de adorno</h4>
              <p>
                La profundidad viene de la escala de superficies. La sombra solo aparece en lo que
                de verdad flota.
              </p>
            </li>
            <li>
              <h4>Todo estado tiene nombre</h4>
              <p>
                Hover, foco, activo, deshabilitado, vacío, carga y error. Un componente sin estados
                no está terminado.
              </p>
            </li>
          </ol>

          <h2 id="color">Color</h2>
          <p>
            Dos escalas: superficies y tinta. Los semánticos existen solo para estados, nunca para
            decorar.
          </p>

          <div className="grid-3" style={{ margin: "18px 0 8px" }}>
            {COLORS.map((c) => (
              <div className="card" key={c.name} style={{ padding: 12 }}>
                <span
                  style={{
                    display: "block",
                    height: 42,
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--line)",
                    background: `var(--${c.name})`,
                    marginBottom: 8,
                  }}
                />
                <code style={{ fontSize: 11 }}>--{c.name}</code>
                <p style={{ marginTop: 4 }}>
                  {c.label} · {c.note}
                </p>
              </div>
            ))}
          </div>

          <h2 id="tipografia">Tipografía</h2>
          <p>
            Geist para la interfaz, Instrument Serif para los momentos editoriales y Geist Mono para
            cifras y código. Los títulos llevan tracking negativo; el cuerpo no.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Tamaño</th>
                  <th>Muestra</th>
                </tr>
              </thead>
              <tbody>
                {TYPE.map((t) => (
                  <tr key={t.token}>
                    <td>
                      <code>{t.token}</code>
                    </td>
                    <td className="mono" style={{ whiteSpace: "nowrap" }}>
                      {t.size}
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily:
                            t.font === "serif"
                              ? "var(--font-serif), Georgia, serif"
                              : t.font === "mono"
                                ? "var(--font-mono), monospace"
                                : "var(--font-sans), sans-serif",
                          fontSize: t.font === "mono" ? 12 : undefined,
                          fontWeight: t.font === "sans" && t.token === "--text-h3" ? 600 : 400,
                          letterSpacing: t.font === "serif" ? "-0.02em" : undefined,
                        }}
                      >
                        {t.sample}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="espaciado">Espaciado y radios</h2>
          <p>La escala es de cuatro en cuatro. Los radios también: nada de valores intermedios.</p>

          <div style={{ display: "grid", gap: 6, margin: "16px 0 20px" }}>
            {SPACE.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="mono" style={{ width: 34, color: "var(--faint)" }}>
                  {s}
                </span>
                <span
                  style={{
                    height: 8,
                    width: s,
                    background: "var(--accent)",
                    borderRadius: 2,
                    opacity: 0.75,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="grid-3">
            {[
              ["xs", "5px"],
              ["sm", "8px"],
              ["md", "11px"],
              ["lg", "16px"],
              ["xl", "22px"],
            ].map(([name, value]) => (
              <div className="card" key={name} style={{ padding: 12 }}>
                <div
                  style={{
                    height: 46,
                    borderRadius: value,
                    border: "1px solid var(--line-2)",
                    background: "var(--panel-2)",
                    marginBottom: 8,
                  }}
                />
                <code style={{ fontSize: 11 }}>--r-{name}</code>
                <p style={{ marginTop: 4 }}>{value}</p>
              </div>
            ))}
          </div>

          <h2 id="componentes">Componentes</h2>
          <p>
            Los mismos que usa el sitio. Cada uno con sus estados reales, no con una captura.
          </p>

          <h3>Botones</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: 16,
              border: "1px solid var(--line)",
              borderRadius: "var(--r-md)",
              background: "var(--panel)",
            }}
          >
            <button className="btn btn--accent" type="button">
              Acción principal
            </button>
            <button className="btn btn--ghost" type="button">
              Secundario
            </button>
            <button className="btn btn--quiet" type="button">
              Terciario
            </button>
            <button className="btn btn--ghost" type="button" disabled style={{ opacity: 0.45 }}>
              Deshabilitado
            </button>
          </div>

          <h3>Etiquetas y estados</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: 16,
              border: "1px solid var(--line)",
              borderRadius: "var(--r-md)",
              background: "var(--panel)",
            }}
          >
            <span className="chip">neutral</span>
            <span className="chip chip--accent">acento</span>
            <span className="chip chip--ok">completado</span>
            <span className="chip">25 min</span>
            <span className="kbd">⌘K</span>
          </div>

          <h3>Formulario</h3>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 16,
              border: "1px solid var(--line)",
              borderRadius: "var(--r-md)",
              background: "var(--panel)",
            }}
          >
            <label htmlFor="ds-email" style={{ fontSize: 12.5, color: "var(--muted)" }}>
              Correo
            </label>
            <input
              id="ds-email"
              type="email"
              placeholder="tu@correo.com"
              style={{
                height: 38,
                padding: "0 11px",
                border: "1px solid var(--line-2)",
                borderRadius: "var(--r-sm)",
                background: "var(--bg)",
                color: "var(--ink)",
                fontSize: 13.5,
              }}
            />
            <span className="mono" style={{ color: "var(--faint)" }}>
              Etiqueta visible, foco con anillo de 2 px, sin placeholder como sustituto.
            </span>
          </div>

          <h2 id="movimiento">Movimiento</h2>
          <p>
            Un solo gesto por vista: la entrada del titular y el revelado escalonado de bloques.
            Duraciones de 200 a 800 ms con una curva de salida. Todo se apaga con{" "}
            <code>prefers-reduced-motion</code>.
          </p>

          <div className="callout callout--info">
            <span className="callout-label">Cómo se usa</span>
            <p>
              Si vas a tocar el sitio, lee <code>app/globals.css</code>. Los tokens están arriba del
              archivo y cada componente consume variables; cambiar un valor ahí actualiza todas las
              páginas.
            </p>
          </div>
        </div>
      </article>
    </DocsShell>
  );
}
