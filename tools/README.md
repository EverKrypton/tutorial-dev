# Herramientas

Scripts usados para generar `descargas/tutorial-dev.pdf` a partir del mismo
contenido que el sitio. No se ejecutan en Vercel: el PDF se versiona en el
repositorio.

## Requisitos

- Node 20+ con `playwright-core` y un Chromium instalado.
- Python 3 con `pypdf`.
- `pdftotext` y `pdfunite` (poppler-utils).

```bash
npm i playwright-core
pip install pypdf
```

## Uso

```bash
# sirve el sitio en local (el render carga las páginas por HTTP)
python3 -m http.server 8123

# en otra terminal, desde la raíz del repositorio
python3 tools/make-pdf.py
```

El script hace varias pasadas: compone el HTML de impresión, mide en qué página
cae cada capítulo, vuelve a imprimir con esos números y finalmente fusiona la
portada, añade encabezados y pies, y registra los destinos con nombre para que
el índice y los enlaces internos funcionen dentro del PDF.

Archivos:

- `build-pdf.mjs` — compone `descargas/_portada.html` y `descargas/_libro.html`.
- `render-pdf.cjs` — imprime esos HTML a PDF con Chromium.
- `make-pdf.py` — orquesta las pasadas, fusiona, numera y añade los destinos.
