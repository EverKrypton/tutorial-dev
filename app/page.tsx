import Link from "next/link";
import type { Metadata } from "next";

import { chapters, totalMinutes } from "@/lib/content";
import { demos } from "@/components/examples/registry";
import { IconArrow, IconDownload } from "@/components/site/Icons";

export const metadata: Metadata = {
  title: "De la primera etiqueta al primer deploy",
  description:
    "Once entradas que empiezan en «no sé por dónde empezar» y terminan en una URL pública. Fundamentos, HTML y CSS, Git, Vercel, IA, skills, agentes y prompting.",
};

const PREVIEWS = [
  { slug: "oddsly", label: "Navegación" },
  { slug: "analytics", label: "Dashboard" },
  { slug: "admin", label: "Tablas" },
  { slug: "estados", label: "Estados" },
];

export default function Home() {
  const preview = PREVIEWS.map((p) => ({
    ...p,
    demo: demos.find((d) => d.slug === p.slug)!,
  }));

  return (
    <>
      <section className="hero">
        <div className="shell" style={{ display: "block" }}>
          <div className="hero-inner">
            <span className="eyebrow">Curso abierto · Edición 2026</span>
            <h1>
              Aprende a construir para la web. Y a <em>publicarlo</em>.
            </h1>
            <p className="hero-lede">
              Once entradas que empiezan en «no sé por dónde empezar» y terminan en una URL
              que puedes abrir desde el teléfono de cualquiera. Fundamentos, HTML y CSS, Git,
              Vercel, y después IA: modelos, terminal, skills, agentes y prompting.
            </p>
            <div className="hero-actions">
              <Link className="btn btn--accent btn--lg" href="/curso/fundamentos">
                Empezar el capítulo 01
                <IconArrow />
              </Link>
              <a className="btn btn--ghost btn--lg" href="/descargas/tutorial-dev.pdf">
                <IconDownload />
                Descargar PDF
              </a>
            </div>
            <div className="hero-meta">
              <span className="chip">Sin requisitos</span>
              <span className="chip">11 entradas</span>
              <span className="chip">4–6 horas</span>
              <span className="chip">Mobile first</span>
              <span className="chip">MIT</span>
            </div>
          </div>
        </div>
      </section>

      <div className="shell" style={{ display: "block" }}>
        <section className="section">
          <div className="sec-head reveal">
            <span className="eyebrow">Qué vas a construir</span>
            <h2>Interfaces reales, no maquetas.</h2>
            <p>
              El curso no se queda en la teoría: cada patrón que explico está construido y se
              puede abrir. Estos cuatro son parte de la galería de ejemplos.
            </p>
          </div>

          <div className="previews">
            {preview.map(({ demo, label }) => {
              const Demo = demo.Component;
              return (
                <article className="preview-card reveal" key={demo.slug}>
                  <div className="preview-frame" aria-hidden="true">
                    <Demo />
                  </div>
                  <div className="preview-body">
                    <h3>
                      <Link className="stretch" href={`/ejemplos/${demo.slug}`}>
                        {demo.title}
                      </Link>
                    </h3>
                    <p>{demo.summary}</p>
                    <span className="preview-tag">
                      <span>{label}</span>
                      <span>{demo.tags[0]}</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ marginTop: 16 }}>
            <Link className="btn btn--ghost" href="/ejemplos">
              Ver los {demos.length} ejemplos
              <IconArrow />
            </Link>
          </div>
        </section>
      </div>

      <div className="shell" style={{ display: "block" }}>
        <section className="section" id="temario">
          <div className="sec-head reveal">
            <span className="eyebrow">Temario</span>
            <h2>Once entradas, en el orden en que se aprenden.</h2>
            <p>
              Cada entrada explica un mecanismo y termina en algo que puedes abrir y usar. No hay
              examen: hay un entregable por capítulo.
            </p>
          </div>

          <div className="syllabus">
            {chapters.map((chapter) => (
              <Link
                className="lesson reveal"
                href={`/curso/${chapter.slug}`}
                key={chapter.slug}
                data-slug={chapter.slug}
              >
                <span className="lesson-n">{chapter.number}</span>
                <span>
                  <span className="lesson-title">{chapter.title}</span>
                  <span className="lesson-sum">{chapter.summary}</span>
                  <span className="lesson-meta">
                    <span className="chip">{chapter.duration}</span>
                    <span className="chip">{chapter.level}</span>
                    <span className="chip">{chapter.stack}</span>
                  </span>
                </span>
                <span className="lesson-arrow" aria-hidden="true">
                  <IconArrow />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="shell" style={{ display: "block" }}>
        <section className="section">
          <div className="sec-head reveal">
            <span className="eyebrow">Cómo está hecho</span>
            <h2>El sitio es parte del curso.</h2>
            <p>
              Si vas a aprender a construir para la web, tiene sentido que puedas mirar debajo de
              la que estás leyendo.
            </p>
          </div>

          <div className="grid-3">
            <article className="card reveal">
              <span className="card-k">01</span>
              <h3>Next.js, sin ruido</h3>
              <p>
                App Router y componentes de servidor. El contenido se lee de archivos, no de una
                base de datos que nadie puede inspeccionar.
              </p>
            </article>
            <article className="card reveal">
              <span className="card-k">02</span>
              <h3>CSS a mano</h3>
              <p>
                Un sistema de tokens propio: color, tipografía, espaciado y radios. Sin framework
                de utilidades que tape las decisiones.
              </p>
            </article>
            <article className="card reveal">
              <span className="card-k">03</span>
              <h3>Mobile first</h3>
              <p>
                Los estilos base son para 360 px. Lo que viene después son mejoras para pantallas
                grandes, no parches.
              </p>
            </article>
          </div>
        </section>
      </div>

      <div className="shell" style={{ display: "block" }}>
        <section className="section">
          <div className="sec-head reveal">
            <span className="eyebrow">Preguntas</span>
            <h2>Lo que suele preguntarse antes de empezar.</h2>
          </div>

          <div className="faq reveal">
            <details>
              <summary>¿Necesito saber programar?</summary>
              <div className="faq-body">
                <p>
                  No. El capítulo 01 asume cero experiencia y no requiere instalar nada: solo un
                  navegador y la consola. Si ya sabes HTML, puedes saltar al 03 sin perderte.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Cuánto cuesta?</summary>
              <div className="faq-body">
                <p>
                  El curso es gratis y el código es abierto con licencia MIT. Vercel y GitHub
                  tienen planes gratuitos suficientes. Un dominio propio es opcional.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Hace falta instalar algo?</summary>
              <div className="faq-body">
                <p>
                  Para los dos primeros capítulos, no. Después necesitarás un editor, Git y
                  Node.js. El capítulo 03 explica cómo comprobar si ya los tienes.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Y si solo quiero usar IA para programar?</summary>
              <div className="faq-body">
                <p>
                  Los capítulos 05 a 09 cubren v0, los harness de terminal, las skills, los agentes
                  y el prompting. Antes conviene entender qué hace el código: sin criterio no
                  puedes revisar lo que la IA produce.
                </p>
              </div>
            </details>
            <details>
              <summary>¿Puedo leerlo sin conexión?</summary>
              <div className="faq-body">
                <p>
                  Sí. Hay una versión completa en PDF con todos los capítulos, con índice, enlaces
                  internos y marcadores. Está en la cabecera y en el pie de cada página.
                </p>
              </div>
            </details>
          </div>
        </section>

        <section className="cta reveal">
          <h2>Empieza por el capítulo 01.</h2>
          <p>
            No hace falta instalar nada: veinte minutos y un navegador alcanzan para entender cómo
            funciona la máquina.
          </p>
          <div className="cta-actions">
            <Link className="btn btn--accent btn--lg" href="/curso/fundamentos">
              Empezar ahora
              <IconArrow />
            </Link>
            <a className="btn btn--ghost btn--lg" href="/descargas/tutorial-dev.pdf">
              Descargar PDF
            </a>
          </div>
        </section>
      </div>

      <p className="mono" style={{ textAlign: "center", color: "var(--faint)", padding: "0 0 8px" }}>
        {chapters.length} entradas · {totalMinutes} min de lectura · Next.js + CSS a mano
      </p>
    </>
  );
}
