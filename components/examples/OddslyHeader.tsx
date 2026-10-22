"use client";

import { useState } from "react";

type Market = {
  league: string;
  time: string;
  home: string;
  away: string;
  odds: [string, string, string];
  trend: ["up" | "down" | "flat", "up" | "down" | "flat", "up" | "down" | "flat"];
};

const MARKETS: Market[] = [
  {
    league: "LaLiga · Jornada 12",
    time: "20:45",
    home: "Real Betis",
    away: "Athletic Club",
    odds: ["2.05", "3.40", "3.75"],
    trend: ["up", "flat", "down"],
  },
  {
    league: "Premier League · Jornada 11",
    time: "18:30",
    home: "Newcastle",
    away: "Brighton",
    odds: ["1.88", "3.65", "4.10"],
    trend: ["down", "flat", "up"],
  },
];

const LABELS = ["1", "X", "2"] as const;

export function OddslyHeader() {
  const [picked, setPicked] = useState<string | null>("0-0");

  return (
    <div className="dv dv--oddsly">
      <div className="dv-top">
        <span className="dv-logo">
          <i>O</i>
          odds<b>ly</b>
        </span>
        <nav className="dv-nav" aria-label="Demo">
          <span className="on">Deportes</span>
          <span>En vivo</span>
          <span>Mis apuestas</span>
          <span>Promos</span>
        </nav>
        <span className="dv-wallet">
          <span>Saldo</span> 1.240,50 €
        </span>
        <span className="dv-avatar" />
      </div>

      <div className="dv-ticker">
        <span className="live">En vivo</span>
        <span className="num">Betis 1 – 1 Athletic · 67&apos;</span>
        <span className="num" style={{ color: "var(--dv-gold-2)" }}>+2.4%</span>
        <span className="num">Nueva apuesta combinada disponible</span>
      </div>

      <div className="dv-body">
        <div className="dv-league">
          <h4>Destacados de hoy</h4>
          <span className="mono">12 eventos</span>
        </div>

        {MARKETS.map((market, mi) => (
          <article className="dv-market" key={market.home}>
            <div className="dv-market-top">
              <b>{market.home}</b>
              <span>vs</span>
              <b>{market.away}</b>
              <span className="mono">{market.time}</span>
            </div>
            <div className="dv-odds">
              {market.odds.map((odd, oi) => {
                const id = `${mi}-${oi}`;
                return (
                  <button
                    key={LABELS[oi]}
                    type="button"
                    className={`${market.trend[oi]}${picked === id ? " sel" : ""}`}
                    onClick={() => setPicked(id)}
                    aria-pressed={picked === id}
                  >
                    <small>{LABELS[oi]}</small>
                    <b>{odd}</b>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
