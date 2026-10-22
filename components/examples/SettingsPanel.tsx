"use client";

import { useState } from "react";

const TABS = ["General", "Cuenta", "Facturación", "Equipo", "API"] as const;

const SWITCHES = [
  { id: "emails", label: "Avisos por correo", desc: "Resumen semanal y avisos de seguridad.", on: true },
  { id: "product", label: "Novedades del producto", desc: "Un correo al mes con lo que cambia.", on: false },
  { id: "2fa", label: "Doble factor", desc: "Pide un código al iniciar sesión.", on: true },
];

export function SettingsPanel() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("General");
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(SWITCHES.map((s) => [s.id, s.on]))
  );

  return (
    <div className="dv dv--settings">
      <div className="dv-set-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={tab === t ? "on" : undefined}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="dv-set-sec">
        <h5>Perfil</h5>
        <p>Así te ven los demás miembros del espacio.</p>
        <div className="dv-field">
          <label htmlFor="dv-name">Nombre</label>
          <input id="dv-name" defaultValue="Mara López" />
        </div>
        <div className="dv-field">
          <label htmlFor="dv-mail">Correo</label>
          <input id="dv-mail" type="email" defaultValue="mara@estudio.co" />
        </div>
      </div>

      <div className="dv-set-sec">
        <h5>Preferencias</h5>
        {SWITCHES.map((s) => (
          <div className="dv-toggle-row" key={s.id}>
            <span className="txt">
              <b>{s.label}</b>
              <span>{s.desc}</span>
            </span>
            <button
              type="button"
              className="dv-switch"
              role="switch"
              aria-checked={state[s.id]}
              aria-label={s.label}
              onClick={() => setState((cur) => ({ ...cur, [s.id]: !cur[s.id] }))}
            />
          </div>
        ))}
      </div>

      <div className="dv-danger">
        <b>Eliminar el espacio</b>
        <span>Se borran los proyectos y el historial. No se puede deshacer.</span>
        <button type="button">Eliminar…</button>
      </div>
    </div>
  );
}
