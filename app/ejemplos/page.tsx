import type { Metadata } from "next";
import Link from "next/link";

import { demos } from "@/components/examples/registry";
import { DocsShell } from "@/components/site/DocsShell";
import { IconArrow } from "@/components/site/Icons";

export const metadata: Metadata = {
  title: "Ejemplos de interfaz",
  description:
    "Diez patrones de interfaz construidos y explicados: dashboards, tablas, cabeceras de datos en vivo, formularios, precios, estados y navegación móvil.",
};

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
          Diez patrones construidos con el mismo CSS del sitio: dashboards, tablas, cabeceras con
          datos en vivo, formularios, precios, estados y navegación móvil. Son interactivos y el
          código está en el repositorio.
        </p>
      </header>

      <div className="chapter-body">
        <div className="demo-grid">
          {demos.map((demo) => {
            const Demo = demo.Component;
            return (
              <article className="demo-card reveal" key={demo.slug}>
                <div className="demo-thumb" aria-hidden="true">
                  <Demo />
                </div>
                <div className="demo-card-body">
                  <h3>
                    <Link className="stretch" href={`/ejemplos/${demo.slug}`}>
                      {demo.title}
                    </Link>
                  </h3>
                  <p>{demo.summary}</p>
                  <span className="demo-card-foot">
                    <span>{demo.kind}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      Abrir
                      <IconArrow style={{ width: 12, height: 12 }} />
                    </span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="demo-note" style={{ marginTop: 20 }}>
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
