import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

import "./globals.css";
import "./demos.css";

import { chapters } from "@/lib/content";
import { demos } from "@/components/examples/registry";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { MobileNav } from "@/components/site/MobileNav";
import { SearchPalette, type SearchItem } from "@/components/site/SearchPalette";
import { Enhance } from "@/components/site/Enhance";
import { IconGitHub, IconLayers } from "@/components/site/Icons";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tutorial-dev-es.vercel.app"),
  title: {
    default: "tutorial.dev — De la primera etiqueta al primer deploy",
    template: "%s · tutorial.dev",
  },
  description:
    "Curso abierto en español para construir y publicar para la web desde cero: fundamentos, HTML y CSS, Git, Vercel, IA en la terminal, skills, agentes y prompting.",
  applicationName: "tutorial.dev",
  authors: [{ name: "tutorial.dev" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "tutorial.dev — De la primera etiqueta al primer deploy",
    description:
      "Curso abierto en español, desde cero. Once entradas, de la primera etiqueta al primer deploy.",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
  ],
  width: "device-width",
  initialScale: 1,
};

const navChapters = chapters.map(({ slug, number, title, group, extra }) => ({
  slug,
  number,
  title,
  group,
  extra,
}));

const searchItems: SearchItem[] = [
  ...chapters.map((c) => ({
    href: `/curso/${c.slug}`,
    title: c.title,
    hint: `${c.number} · ${c.duration} · ${c.level}`,
    kind: "Curso" as const,
  })),
  ...demos.map((d) => ({
    href: `/ejemplos/${d.slug}`,
    title: d.title,
    hint: `${d.kind} · ${d.tags[0]}`,
    kind: "Ejemplo" as const,
  })),
  { href: "/diseno", title: "Sistema de diseño", hint: "Tokens, tipografía, componentes", kind: "Sistema" },
];

const themeScript = `(function(){try{var t=localStorage.getItem("tutorialdev.theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light")}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>

        <header className="topbar">
          <Link className="brand" href="/" aria-label="tutorial.dev, inicio">
            <span className="brand-mark" aria-hidden="true">
              t
            </span>
            tutorial<em>.dev</em>
          </Link>

          <nav className="top-links" aria-label="Principal">
            <Link href="/curso/fundamentos">Curso</Link>
            <Link href="/ejemplos">Ejemplos</Link>
            <Link href="/diseno">Sistema</Link>
            <a href="/descargas/tutorial-dev.pdf">PDF</a>
          </nav>

          <div className="top-actions">
            <SearchPalette items={searchItems} />
            <ThemeToggle />
            <Link className="btn btn--accent btn--sm" href="/curso/fundamentos">
              Empezar
            </Link>
            <a
              className="icon-btn"
              href="https://github.com/EverKrypton/tutorial-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repositorio en GitHub"
            >
              <IconGitHub />
            </a>
            <MobileNav chapters={navChapters} total={10} />
          </div>
        </header>

        <main id="contenido">{children}</main>

        <footer className="footer">
          <div className="shell" style={{ display: "block" }}>
            <div className="footer-top">
              <div>
                <Link className="footer-brand" href="/">
                  <span className="brand-mark" aria-hidden="true">
                    t
                  </span>
                  tutorial<em style={{ fontStyle: "normal", color: "var(--muted)" }}>.dev</em>
                </Link>
                <p className="footer-note">
                  Curso abierto para aprender a construir y publicar para la web. Escrito para
                  quien empieza de cero, sin saltarse los porqués.
                </p>
              </div>

              <div className="footer-cols">
                <div>
                  <h3>Curso</h3>
                  <Link href="/curso/fundamentos">Fundamentos</Link>
                  <Link href="/curso/primera-web">Primera web</Link>
                  <Link href="/curso/git-github">Git y GitHub</Link>
                  <Link href="/curso/vercel">Vercel</Link>
                </div>
                <div>
                  <h3>Construir con IA</h3>
                  <Link href="/curso/v0">v0</Link>
                  <Link href="/curso/ia-cli">IA en la terminal</Link>
                  <Link href="/curso/skills">Skills</Link>
                  <Link href="/curso/agentes">Agentes</Link>
                </div>
                <div>
                  <h3>Más</h3>
                  <Link href="/ejemplos">Ejemplos</Link>
                  <Link href="/diseno">Sistema</Link>
                  <Link href="/curso/prompting">Prompting</Link>
                  <a href="/descargas/tutorial-dev.pdf">PDF completo</a>
                </div>
              </div>
            </div>

            <div className="colophon">
              <span>© {new Date().getFullYear()} tutorial.dev · Licencia MIT</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <IconLayers style={{ width: 12, height: 12 }} />
                Next.js · HTML y CSS a mano · Deploy en Vercel
              </span>
            </div>
          </div>
        </footer>

        <Enhance />
      </body>
    </html>
  );
}
