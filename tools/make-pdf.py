#!/usr/bin/env python3
"""Genera descargas/tutorial-dev.pdf a partir del contenido de src/pages.

Hace varias pasadas: compone el HTML de impresión, mide en qué página cae
cada capítulo, vuelve a imprimir con esos números y finalmente fusiona la
portada, añade encabezados y pies, y registra destinos con nombre para que
el índice y los enlaces internos funcionen dentro del PDF.
"""

import json
import os
import re
import socket
import subprocess
import sys
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, FloatObject, NameObject, NullObject

ROOT = Path(__file__).resolve().parent.parent
TOOLS = ROOT / "tools"
DL = ROOT / "descargas"
TMP = ROOT / ".build"

TITLES = {
    "fundamentos": "Cómo piensa un programa",
    "primera-web": "Tu primera página web",
    "git-github": "Git y GitHub sin miedo",
    "vercel": "Publicar en Vercel",
    "v0": "tu copiloto de interfaces",
    "ia-cli": "La IA en tu terminal",
    "skills": "enséñale trucos a tu IA",
    "agentes": "Tu propio agente",
    "prompting": "Curso de prompting, a fondo",
    "glosario": "Glosario y chuleta",
    "arsenal": "El arsenal: genjutsu e impeccable",
}

LABELS = {
    "fundamentos": "01 · Cómo piensa un programa",
    "primera-web": "02 · Tu primera página web",
    "git-github": "03 · Git y GitHub sin miedo",
    "vercel": "04 · Publicar en Vercel",
    "v0": "05 · v0: tu copiloto de interfaces",
    "ia-cli": "06 · La IA en tu terminal",
    "skills": "07 · Skills: enséñale trucos a tu IA",
    "agentes": "08 · Tu propio agente",
    "prompting": "09 · Curso de prompting, a fondo",
    "glosario": "10 · Glosario y chuleta",
    "arsenal": "11 · El arsenal: genjutsu e impeccable",
}


# ---------------------------------------------------------------- servidor


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    port = free_port()
    handler = partial(QuietHandler, directory=str(ROOT))
    httpd = ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    time.sleep(0.4)
    return httpd, f"http://127.0.0.1:{port}"


# ---------------------------------------------------------------- pasos


def build_html():
    TMP.mkdir(parents=True, exist_ok=True)
    subprocess.run(["node", str(TOOLS / "build-pdf.mjs")], check=True, cwd=ROOT)


def render(site_url):
    env = dict(os.environ)
    env.update(
        {
            "SITE_URL": site_url,
            "PDF_COVER": str(TMP / "cover.pdf"),
            "PDF_BODY": str(TMP / "body.pdf"),
            "NODE_PATH": str(ROOT / "node_modules"),
        }
    )
    subprocess.run(["node", str(TOOLS / "render-pdf.cjs")], check=True, cwd=ROOT, env=env)


def body_dest_pages():
    """Página (1-based, en body.pdf) de cada destino /cap-<slug>."""
    body = PdfReader(str(TMP / "body.pdf"))
    root = body.trailer["/Root"]
    dests = root.get("/Dests") or {}
    page_of_id = {page.indirect_reference.idnum: i + 1 for i, page in enumerate(body.pages)}

    out = {}
    for name, entry in dests.items():
        if not isinstance(entry, ArrayObject) or not entry:
            continue
        target_id = getattr(entry[0], "idnum", None)
        if target_id is None:
            continue
        out[str(name).lstrip("/")] = page_of_id.get(target_id)
    return out


def compute_pagemap():
    pages = body_dest_pages()
    return {
        slug: page
        for slug, title in TITLES.items()
        if (page := pages.get(f"cap-{slug}")) and page > 1
    }


def postprocess():
    cover = PdfReader(str(TMP / "cover.pdf"))
    body = PdfReader(str(TMP / "body.pdf"))

    dests = {}
    for name, entry in (body.trailer["/Root"].get("/Dests") or {}).items():
        if not isinstance(entry, ArrayObject) or not entry:
            continue
        target_id = getattr(entry[0], "idnum", None)
        for idx, page in enumerate(body.pages):
            if page.indirect_reference.idnum == target_id:
                dests[str(name).lstrip("/")] = (idx, entry)
                break

    writer = PdfWriter()
    writer.add_page(cover.pages[0])

    offset = 1
    for idx, page in enumerate(body.pages):
        if idx == 0:  # página en blanco de calibración
            continue
        writer.add_page(page)

    for name, (idx, entry) in dests.items():
        if idx == 0:
            continue
        final = idx - 1 + offset
        if final >= len(writer.pages):
            continue
        top = float(entry[3]) if len(entry) > 3 else 842.88
        writer.add_named_destination_array(
            name,
            ArrayObject(
                [
                    writer.pages[final].indirect_reference,
                    NameObject("/XYZ"),
                    FloatObject(0),
                    FloatObject(top),
                    NullObject(),
                ]
            ),
        )

    writer.add_outline_item("Índice del curso", 1)
    for slug in TITLES:
        key = f"cap-{slug}"
        if key not in dests:
            continue
        idx = dests[key][0]
        if idx <= 1:
            continue
        writer.add_outline_item(LABELS[slug], idx - 1 + offset)

    last = len(writer.pages) - 1
    writer.add_named_destination_array(
        "colofon",
        ArrayObject(
            [
                writer.pages[last].indirect_reference,
                NameObject("/XYZ"),
                FloatObject(0),
                FloatObject(842.88),
                NullObject(),
            ]
        ),
    )
    writer.add_outline_item("Colofón", last)

    writer.add_metadata(
        {
            "/Title": "tutorial.dev — Curso completo",
            "/Author": "tutorial.dev",
            "/Subject": "De la primera etiqueta al primer deploy",
            "/Keywords": "curso, programación, web, vercel, IA, prompting, español",
            "/Creator": "tutorial.dev",
        }
    )

    out = DL / "tutorial-dev.pdf"
    with open(out, "wb") as fh:
        writer.write(fh)

    reader = PdfReader(str(out))
    annots = sum(len(p.get("/Annots") or []) for p in reader.pages)
    marks = len([o for o in reader.outline if not isinstance(o, list)])
    print(
        f"  PDF: {len(reader.pages)} páginas · {annots} enlaces · "
        f"{len(reader.named_destinations)} destinos · {marks} marcadores · "
        f"{out.stat().st_size / 1024 / 1024:.2f} MB"
    )


def main():
    DL.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)

    httpd, url = serve()
    try:
        mapping_path = TMP / "pagemap.json"
        prev = json.loads(mapping_path.read_text()) if mapping_path.exists() else {}

        mapping = prev
        for attempt in range(1, 5):
            print(f"  pasada {attempt}: midiendo páginas")
            build_html()
            render(url)
            mapping = compute_pagemap()
            mapping_path.write_text(json.dumps(mapping, indent=1))
            if mapping and mapping == prev:
                break
            prev = mapping

        print("  pasada final: numerando e indexando")
        build_html()
        render(url)
        postprocess()
    finally:
        httpd.shutdown()

    for tmp in (DL / "_portada.html", DL / "_libro.html"):
        tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    sys.exit(main())
