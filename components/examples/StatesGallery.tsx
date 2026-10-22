export function StatesGallery() {
  return (
    <div className="dv dv--states">
      <div className="dv-state">
        <div className="lab">Vacío</div>
        <div className="dv-empty">
          <div className="art" />
          <b>Todavía no hay proyectos</b>
          <span>Crea el primero y publica en menos de un minuto.</span>
          <button type="button">Crear proyecto</button>
        </div>
      </div>

      <div className="dv-state">
        <div className="lab">Cargando</div>
        <div className="dv-skel" role="status" aria-label="Cargando contenido">
          <i />
          <i />
          <i />
        </div>
        <div style={{ marginTop: 10 }} className="dv-skel">
          <i />
          <i />
        </div>
      </div>

      <div className="dv-state" style={{ gridColumn: "1 / -1" }}>
        <div className="lab">Error</div>
        <div className="dv-err">
          <span className="ic">!</span>
          <span>
            <b>No pudimos guardar los cambios</b>
            <span>La conexión se cortó a mitad. Tus datos siguen aquí.</span>
            <button type="button">Reintentar</button>
          </span>
        </div>
      </div>
    </div>
  );
}
