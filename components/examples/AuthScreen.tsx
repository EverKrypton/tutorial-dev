"use client";

import { useState } from "react";

export function AuthScreen() {
  const [email, setEmail] = useState("mara@estudio");
  const [error, setError] = useState("Escribe un correo completo, con dominio.");

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = email.length > 0 && !valid;

  return (
    <div className="dv dv--auth">
      <div className="dv-auth-form">
        <span className="mark">t</span>
        <h4>Entra en tu cuenta</h4>
        <p>Continúa donde lo dejaste.</p>

        <div className="dv-social">
          <button type="button">GitHub</button>
          <button type="button">Google</button>
        </div>

        <div className="dv-divider">o con correo</div>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
              ? "Escribe un correo completo, con dominio."
              : "");
          }}
          className={showError ? "err" : undefined}
          aria-invalid={showError}
          aria-describedby={showError ? "dv-auth-error" : undefined}
          placeholder="tu@correo.com"
        />
        {showError && (
          <span className="errmsg" id="dv-auth-error" role="alert">
            {error}
          </span>
        )}
        <input type="password" placeholder="Contraseña" defaultValue="••••••••••" />

        <button type="button" className="submit" disabled={!valid}>
          Continuar
        </button>
      </div>

      <aside className="dv-auth-aside">
        <blockquote>
          «Aprendí más en tres tardes con este curso que en un semestre de tutoriales sueltos.»
        </blockquote>
        <cite>Noor H., diseñadora · pasó de Figma a publicar su web</cite>
      </aside>
    </div>
  );
}
