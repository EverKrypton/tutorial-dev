import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { demos, getDemo } from "@/components/examples/registry";
import { DocsShell } from "@/components/site/DocsShell";
import { IconArrow } from "@/components/site/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};
  return { title: demo.title, description: demo.summary };
}

export default async function DemoPage({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  const index = demos.findIndex((d) => d.slug === slug);
  const prev = index > 0 ? demos[index - 1] : null;
  const next = index < demos.length - 1 ? demos[index + 1] : null;
  const Demo = demo.Component;

  return (
    <DocsShell>
      <article className="demo-page">
        <nav className="crumbs" aria-label="Migas de pan">
          <Link href="/">Curso</Link>
          <span>/</span>
          <Link href="/ejemplos">Ejemplos</Link>
          <span>/</span>
          <span>{demo.kind}</span>
        </nav>

        <div className="chapter-title">
          <h1>{demo.title}.</h1>
        </div>

        <p className="chapter-lede">{demo.summary}</p>

        <div className="hero-meta" style={{ marginTop: 16 }}>
          {demo.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>

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

        <div className="demo-note">
          <p style={{ margin: 0 }}>
            <strong>Interactúa con el ejemplo.</strong> Los controles funcionan de verdad: prueba a
            seleccionar una cuota, marcar una fila, alternar un interruptor o cambiar el ciclo de
            precios.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Datos ficticios.</strong> Nombres, importes y cuotas son de relleno y existen
            para mostrar la composición.
          </p>
        </div>

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="sec-head">
            <span className="eyebrow">Qué enseña</span>
            <h2>Tres decisiones que puedes copiar.</h2>
          </div>
          <ul className="checklist">
            {demo.teaches.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mono" style={{ marginTop: 18, color: "var(--faint)" }}>
            Código: <code>{demo.file}</code>
          </p>
        </section>

        <nav className="pager" aria-label="Ejemplos" style={{ marginTop: 32 }}>
          {prev ? (
            <Link href={`/ejemplos/${prev.slug}`}>
              <small>← Anterior</small>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <Link href="/ejemplos">
              <small>← Volver</small>
              <b>Todos los ejemplos</b>
            </Link>
          )}
          {next ? (
            <Link className="next" href={`/ejemplos/${next.slug}`}>
              <small>Siguiente →</small>
              <b>{next.title}</b>
            </Link>
          ) : (
            <Link className="next" href="/diseno">
              <small>Siguiente →</small>
              <b>El sistema de diseño</b>
            </Link>
          )}
        </nav>

        <div style={{ marginTop: 22 }}>
          <Link className="btn btn--ghost" href="/ejemplos">
            <IconArrow style={{ width: 13, height: 13, transform: "rotate(180deg)" }} />
            Ver todos
          </Link>
        </div>
      </article>
    </DocsShell>
  );
}
