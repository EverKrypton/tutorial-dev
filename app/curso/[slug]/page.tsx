import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { chapters, getBody, getChapter, getNeighbours } from "@/lib/content";
import { DocsShell } from "@/components/site/DocsShell";
import { Toc } from "@/components/site/Toc";
import { ChapterMark } from "@/components/site/ChapterMark";
import { IconArrow } from "@/components/site/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: chapter.title,
    description: chapter.lede,
    openGraph: { title: chapter.title, description: chapter.lede, type: "article" },
  };
}

export default async function ChapterPage({ params }: Params) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const body = getBody(slug);
  const { prev, next } = getNeighbours(slug);

  return (
    <DocsShell current={slug} toc={<Toc sections={chapter.sections} />}>
      <article>
        <header className="chapter-head">
          <nav className="crumbs" aria-label="Migas de pan">
            <Link href="/">Curso</Link>
            <span>/</span>
            <span>{chapter.extra ? "Extra" : `Capítulo ${chapter.number}`}</span>
          </nav>

          <div className="chapter-title">
            <span className="chapter-num">{chapter.extra ? "Extra" : chapter.number}</span>
            <h1>{chapter.title}.</h1>
          </div>

          <p className="chapter-lede">{chapter.lede}</p>

          <dl className="facts">
            <div>
              <dt>Duración</dt>
              <dd>{chapter.duration}</dd>
            </div>
            <div>
              <dt>Nivel</dt>
              <dd>{chapter.level}</dd>
            </div>
            <div>
              <dt>Requisitos</dt>
              <dd>{chapter.requires}</dd>
            </div>
            <div>
              <dt>Al terminar</dt>
              <dd>{chapter.outcome}</dd>
            </div>
          </dl>
        </header>

        <div className="chapter-body">
          <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        <div className="chapter-foot">
          <ChapterMark slug={slug} />

          <nav className="pager" aria-label="Entradas">
            {prev ? (
              <Link href={`/curso/${prev.slug}`}>
                <small>← Anterior</small>
                <b>{prev.title}</b>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="next" href={`/curso/${next.slug}`}>
                <small>Siguiente →</small>
                <b>{next.title}</b>
              </Link>
            ) : (
              <Link className="next" href="/ejemplos">
                <small>Siguiente →</small>
                <b>Ver los ejemplos de interfaz</b>
              </Link>
            )}
          </nav>

          <p className="mono" style={{ marginTop: 14, color: "var(--faint)" }}>
            Atajos: <span className="kbd">←</span> <span className="kbd">→</span> para moverte entre
            entradas · <span className="kbd">⌘K</span> para buscar
          </p>
        </div>
      </article>
    </DocsShell>
  );
}
