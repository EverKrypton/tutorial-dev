const AREA = "M0,66 L26,58 L52,60 L78,44 L104,48 L130,34 L156,38 L182,22 L208,26 L234,12 L260,16 L286,6 L286,92 L0,92 Z";
const LINE = "M0,66 L26,58 L52,60 L78,44 L104,48 L130,34 L156,38 L182,22 L208,26 L234,12 L260,16 L286,6";

const ROWS = [
  { name: "/precios", visits: "4.812", pct: 82 },
  { name: "/blog/como-empezar", visits: "3.204", pct: 64 },
  { name: "/docs/vercel", visits: "2.190", pct: 44 },
  { name: "/ejemplos", visits: "1.406", pct: 28 },
];

export function AnalyticsDashboard() {
  return (
    <div className="dv dv--analytics">
      <aside className="dv-ana-side">
        <div className="brandline">
          <i>m</i> metrica
        </div>
        <nav>
          <span className="on"><i /> Resumen</span>
          <span><i /> Tráfico</span>
          <span><i /> Embudo</span>
          <span><i /> Retención</span>
        </nav>
        <div className="sep" />
        <nav>
          <span><i /> Informes</span>
          <span><i /> Ajustes</span>
        </nav>
      </aside>

      <div className="dv-ana-main">
        <div className="dv-ana-head">
          <div>
            <h4>Resumen</h4>
            <p>Últimos 30 días · tutorial.dev</p>
          </div>
          <span className="range">30d ▾</span>
        </div>

        <div className="dv-kpis">
          <div className="dv-kpi">
            <span>Visitantes</span>
            <b>18.402</b>
            <em className="up">↑ 12,4%</em>
          </div>
          <div className="dv-kpi">
            <span>Sesiones</span>
            <b>24.918</b>
            <em className="up">↑ 8,1%</em>
          </div>
          <div className="dv-kpi">
            <span>Rebote</span>
            <b>38,2%</b>
            <em className="down">↓ 3,6%</em>
          </div>
        </div>

        <div className="dv-chart">
          <div className="dv-chart-head">
            <b>Visitantes por día</b>
            <span>pico 1.284 · 12 oct</span>
          </div>
          <svg viewBox="0 0 286 92" preserveAspectRatio="none" role="img" aria-label="Serie de visitantes">
            <defs>
              <linearGradient id="ana-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14140f" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#14140f" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#ana-fill)" />
            <path d={LINE} fill="none" stroke="#14140f" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="286" cy="6" r="2.4" fill="#14140f" />
          </svg>
        </div>

        <div className="dv-rows">
          <div className="r h">
            <span>Página</span>
            <span className="num">Visitas</span>
            <span className="num">%</span>
          </div>
          {ROWS.map((row) => (
            <div className="r" key={row.name}>
              <b>{row.name}</b>
              <span className="num">{row.visits}</span>
              <span className="bar">
                <i style={{ width: `${row.pct}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
