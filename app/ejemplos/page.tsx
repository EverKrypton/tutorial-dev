import type { Metadata } from "next";
import Link from "next/link";

import { demos } from "@/components/examples/registry";
import { DocsShell } from "@/components/site/DocsShell";
import { IconArrow } from "@/components/site/Icons";

export const metadata: Metadata = {
  title: "Ejemplos de interfaz",
  description:
    "Diez patrones de interfaz construidos a tamaño real e interactivos: dashboards, tablas, cabeceras de datos en vivo, formularios, precios, estados y navegación móvil.",
};

const GROUPS = ["Navegación", "Dashboard", "Formularios", "Comercio", "Móvil", "Estados"] as const;

export default function ExamplesPage() {
  return (
    <DocsShell>
      <header className="chapter-head">
        <nav className="crumbs" aria-label="Migas de pan">
          <Link href="/">Curso</Link>
          <span>/</span>
          <span>Ejemplos</span>
        </nav>
        <div className="chapter-title">
          <h1>Ejemplos de interfaz.</h1>
        </div>
        <p className="chapter-lede">
          Diez patrones construidos con el mismo CSS del sitio y mostrados a tamaño real. No son
          capturas: los controles funcionan. Prueba a seleccionar una cuota, marcar una fila,
          alternar un interruptor o cambiar el ciclo de precios.
        </p>
        <div className="hero-meta" style={{ marginTop: 18 }}>
          {GROUPS.map((g) => (
            <span className="chip" key={g}>
              {g}
            </span>
          ))}
          <span className="chip chip--accent">Datos ficticios</span>
        </div>
      </header>

      <div className="chapter-body">
        {demos.map((demo, i) => {
          const Demo = demo.Component;
          return (
            <section className="demo-block" key={demo.slug} id={demo.slug}>
              <header className="demo-block-head">
                <span className="demo-block-n mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2>
                    <Link href={`/ejemplos/${demo.slug}`}>{demo.title}</Link>
                  </h2>
                  <p>{demo.summary}</p>
                  <div className="demo-block-tags">
                    <span className="chip chip--accent">{demo.kind}</span>
                    {demo.tags.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              <div className="demo-stage">
                <div className="demo-chrome">
                  <span className="dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="url">tutorial.dev / ejemplos / {demo.slug}</span>
                  <span className="live">en vivo</span>
                </div>
                <div className="demo-canvas">
                  <Demo />
                </div>
              </div>

              <div className="demo-block-foot">
                <Link className="btn btn--ghost btn--sm" href={`/ejemplos/${demo.slug}`}>
                  Qué enseña este patrón
                  <IconArrow style={{ width: 12, height: 12 }} />
                </Link>
                <span className="mono">código: {demo.file}</span>
              </div>
            </section>
          );
        })}

        <div className="demo-note" style={{ marginTop: 28 }}>
          <p style={{ margin: 0 }}>
            <strong>Todos los datos son ficticios.</strong> Nombres, importes, cuotas y testimonios
            existen para mostrar la composición. No son métricas del curso ni de ningún producto
            real.
          </p>
        </div>
      </div>
    </DocsShell>
  );
}
