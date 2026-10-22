import Link from "next/link";
import { chapters } from "@/lib/content";
import { SidebarNav, SidebarProgress } from "./SidebarNav";
import { IconDownload, IconGitHub } from "./Icons";

const navChapters = chapters.map(({ slug, number, title, group, extra }) => ({
  slug,
  number,
  title,
  group,
  extra,
}));

export function DocsShell({
  current,
  toc,
  children,
}: {
  current?: string;
  toc?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="shell">
      <aside className="sidebar" aria-label="Temario del curso">
        <div className="sidebar-inner">
          <SidebarNav chapters={navChapters} current={current} />
          <SidebarProgress total={10} />
          <div className="side-foot">
            <Link href="/ejemplos">
              <span aria-hidden="true">◫</span>
              Ejemplos de interfaz
            </Link>
            <Link href="/diseno">
              <span aria-hidden="true">◐</span>
              Sistema de diseño
            </Link>
            <a href="/descargas/tutorial-dev.pdf">
              <IconDownload />
              Curso en PDF
            </a>
            <a href="https://github.com/EverKrypton/tutorial-dev" target="_blank" rel="noopener noreferrer">
              <IconGitHub />
              Repositorio
            </a>
          </div>
        </div>
      </aside>

      <div className="main">{children}</div>

      {toc}
    </div>
  );
}
