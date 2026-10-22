"use client";

import { useState } from "react";

const TIERS = [
  {
    name: "Base",
    monthly: 0,
    yearly: 0,
    features: ["1 proyecto", "Dominio incluido", "Analítica básica"],
    cta: "Empezar gratis",
    hot: false,
  },
  {
    name: "Pro",
    monthly: 19,
    yearly: 15,
    features: ["Proyectos ilimitados", "Dominio propio", "Preview por rama", "Analítica completa"],
    cta: "Elegir Pro",
    hot: true,
  },
  {
    name: "Equipo",
    monthly: 49,
    yearly: 39,
    features: ["Todo lo de Pro", "5 asientos", "Roles y permisos", "Soporte prioritario"],
    cta: "Hablar con ventas",
    hot: false,
  },
];

export function PricingTable() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="dv dv--pricing">
      <div className="dv-price-head">
        <h4>Precios claros</h4>
        <p>Sin coste por asiento en el plan Base.</p>
        <div className="dv-cycle" role="group" aria-label="Ciclo de facturación">
          <button type="button" className={!yearly ? "on" : undefined} onClick={() => setYearly(false)}>
            Mensual
          </button>
          <button type="button" className={yearly ? "on" : undefined} onClick={() => setYearly(true)}>
            Anual · −20%
          </button>
        </div>
      </div>

      <div className="dv-tiers">
        {TIERS.map((tier) => {
          const price = yearly ? tier.yearly : tier.monthly;
          return (
            <article className={`dv-tier${tier.hot ? " hot" : ""}`} key={tier.name}>
              <div className="top">
                <span className="name">{tier.name}</span>
                {tier.hot && <span className="badge">Popular</span>}
              </div>
              <p className="amount">
                {price === 0 ? "0" : price} €<span> /mes</span>
              </p>
              <ul>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button type="button" className="pick">
                {tier.cta}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
