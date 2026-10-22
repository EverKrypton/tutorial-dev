"use client";

import { useState } from "react";

type Row = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Lector";
  status: "Activo" | "Invitado" | "Suspendido";
  spend: string;
};

const ROWS: Row[] = [
  { id: "1", name: "Mara López", email: "mara@estudio.co", role: "Admin", status: "Activo", spend: "1.240 €" },
  { id: "2", name: "Iván Ferrer", email: "ivan@estudio.co", role: "Editor", status: "Activo", spend: "840 €" },
  { id: "3", name: "Noor Haddad", email: "noor@agencia.io", role: "Editor", status: "Invitado", spend: "—" },
  { id: "4", name: "Diego Sarmiento", email: "diego@freelance.dev", role: "Lector", status: "Suspendido", spend: "120 €" },
];

const STATUS_CLASS = { Activo: "ok", Invitado: "warn", Suspendido: "off" } as const;

export function AdminTable() {
  const [selected, setSelected] = useState<string[]>(["1"]);

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="dv dv--admin">
      <div className="dv-adm-head">
        <h4>Usuarios</h4>
        <span className="count">{ROWS.length}</span>
        <span className="new">Invitar</span>
      </div>

      <div className="dv-adm-bar">
        <span className="search">
          <i />
          Buscar por nombre o correo
        </span>
        <span className="filter">Rol ▾</span>
        <span className="filter">Estado ▾</span>
      </div>

      <div className="dv-table">
        <div className="tr h">
          <span />
          <span>Usuario</span>
          <span>Rol</span>
          <span>Estado</span>
          <span />
        </div>
        {ROWS.map((row) => (
          <div className="tr" key={row.id}>
            <button
              type="button"
              className={`cb${selected.includes(row.id) ? " on" : ""}`}
              aria-pressed={selected.includes(row.id)}
              aria-label={`Seleccionar ${row.name}`}
              onClick={() => toggle(row.id)}
            />
            <span className="who">
              <i />
              <span>
                <b>{row.name}</b>
                <span>{row.email}</span>
              </span>
            </span>
            <span>{row.role}</span>
            <span className={`dv-pill ${STATUS_CLASS[row.status]}`}>{row.status}</span>
            <span className="dots">⋯</span>
          </div>
        ))}
      </div>

      <div className="dv-bulk">
        <span>{selected.length} seleccionados</span>
        <span style={{ marginLeft: "auto" }}>Cambiar rol</span>
        <span>·</span>
        <span>Exportar</span>
      </div>
    </div>
  );
}
