import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="shell" style={{ display: "block" }}>
      <div className="section" style={{ minHeight: "56vh", display: "grid", alignContent: "center" }}>
        <span className="eyebrow">Error 404</span>
        <h1
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 8vw, 3.6rem)",
            letterSpacing: "-0.03em",
            margin: "14px 0 0",
            maxWidth: "18ch",
          }}
        >
          Esta página no existe. El resto sí.
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "46ch", marginTop: 14 }}>
          Puede que el enlace esté mal escrito o que el capítulo haya cambiado de sitio. El temario
          completo está a un clic.
        </p>
        <div className="hero-actions" style={{ marginTop: 22 }}>
          <Link className="btn btn--accent" href="/">
            Volver al inicio
          </Link>
          <Link className="btn btn--ghost" href="/curso/fundamentos">
            Empezar el capítulo 01
          </Link>
          <Link className="btn btn--ghost" href="/ejemplos">
            Ver los ejemplos
          </Link>
        </div>
      </div>
    </div>
  );
}
