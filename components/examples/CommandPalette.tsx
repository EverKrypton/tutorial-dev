export function CommandPaletteDemo() {
  return (
    <div className="dv dv--palette">
      <div className="dv-pal-bg" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div className="ln" key={i} />
        ))}
      </div>

      <div className="dv-pal" role="img" aria-label="Paleta de comandos abierta con resultados">
        <div className="dv-pal-input">
          <i />
          <span>desplegar</span>
          <span className="caret" />
        </div>
        <div className="dv-pal-group">Acciones</div>
        <div className="dv-pal-item on">
          <span className="ico">↑</span>
          Desplegar en producción
          <span className="k">↵</span>
        </div>
        <div className="dv-pal-item">
          <span className="ico">⎇</span>
          Desplegar esta rama en preview
          <span className="k">⇧↵</span>
        </div>
        <div className="dv-pal-group">Ir a</div>
        <div className="dv-pal-item">
          <span className="ico">#</span>
          Proyecto · tutorial-dev
          <span className="k">G P</span>
        </div>
        <div className="dv-pal-item">
          <span className="ico">#</span>
          Ajustes · dominios
          <span className="k">G D</span>
        </div>
      </div>
    </div>
  );
}
