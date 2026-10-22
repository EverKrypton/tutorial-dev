export function MobileAppDemo() {
  return (
    <div className="dv dv--mobile">
      <div className="dv-phone">
        <div className="dv-app">
          <div className="ah">
            <b>Cartera</b>
            <span>Hoy</span>
          </div>
          <div className="dv-card">
            <b>Saldo total</b>
            <span>Actualizado hace 2 min</span>
            <div className="v">
              1.240,50 € <em>+4,2%</em>
            </div>
          </div>
          <div className="dv-card">
            <b>Betis – Athletic</b>
            <span>En vivo · 67&apos;</span>
            <div className="v" style={{ fontSize: 10 }}>
              1 · 1
            </div>
          </div>
          <div className="dv-card">
            <b>Último movimiento</b>
            <span>Ayer · 21:04</span>
            <div className="v" style={{ fontSize: 10 }}>
              −50,00 €
            </div>
          </div>
        </div>

        <nav className="dv-tabbar" aria-label="Demo de barra inferior">
          <span className="on">
            <i />
            Inicio
          </span>
          <span>
            <i />
            Buscar
          </span>
          <span>
            <i />
            Apuestas
          </span>
          <span>
            <i />
            Perfil
          </span>
        </nav>

        <div className="dv-sheet">
          <div className="grab" />
          <b>Filtros</b>
          <div className="row">
            <span>Cuota mínima 1.80</span>
            <i />
          </div>
          <div className="row">
            <span>Solo en vivo</span>
            <i />
          </div>
          <div className="row">
            <span>Liga española</span>
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}
