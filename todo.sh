#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# tutorial.dev — un solo comando para construir, comprobar, versionar y
# publicar. Pensado para ejecutarse una vez y cerrar la máquina: Vercel
# despliega solo cuando el push llega a GitHub.
#
#   ./todo.sh              construye, comprueba, commit y push
#   ./todo.sh --pdf        además regenera descargas/tutorial-dev.pdf
#   ./todo.sh --no-push    construye y comprueba, sin commit
#   ./todo.sh --pdf --no-push
# ---------------------------------------------------------------------------
set -Eeuo pipefail

cd "$(dirname "$0")"

BUILD_PDF=0
PUSH=1
for arg in "$@"; do
  case "$arg" in
    --pdf) BUILD_PDF=1 ;;
    --no-push) PUSH=0 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "Opción desconocida: $arg" >&2; exit 2 ;;
  esac
done

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok()  { printf '  \033[32m✓\033[0m %s\n' "$*"; }
die() { printf '\n\033[31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

say "1/5 · Comprobando entorno"
command -v node >/dev/null || die "Falta node (18 o superior)."
command -v git  >/dev/null || die "Falta git."
ok "node $(node -v)"
ok "git $(git --version | awk '{print $3}')"

say "2/5 · Construyendo el sitio"
node tools/build.mjs >/dev/null
ok "$(ls -1 ./*.html | wc -l | tr -d ' ') páginas generadas desde src/pages"

say "3/5 · Comprobando enlaces, anclas y metadatos"
node tools/check.mjs

if [[ "$BUILD_PDF" == "1" ]]; then
  say "3b/5 · Regenerando el PDF"
  command -v python3 >/dev/null || die "Falta python3 para el PDF."
  python3 -c "import pypdf" 2>/dev/null || die "Falta pypdf: pip install pypdf"
  command -v pdftotext >/dev/null || die "Falta poppler-utils (pdftotext)."
  if [[ ! -d node_modules/playwright-core ]]; then
    npm install --no-save --silent playwright-core >/dev/null 2>&1 || die "No se pudo instalar playwright-core."
  fi
  python3 tools/make-pdf.py
else
  say "3b/5 · PDF"
  ok "se conserva descargas/tutorial-dev.pdf ($(du -h descargas/tutorial-dev.pdf | cut -f1)) · usa --pdf para regenerarlo"
fi

if [[ "$PUSH" == "0" ]]; then
  say "4/5 · Sin cambios versionados (--no-push)"
  exit 0
fi

say "4/5 · Guardando en git"
if [[ -z "$(git status --porcelain)" ]]; then
  ok "nada que commitear"
else
  MSG="${*:-}"
  git add -A
  git -c user.name="$(git config user.name || echo tutorial.dev)" \
      -c user.email="$(git config user.email || echo hola@tutorial.dev)" \
      commit -q -m "chore: actualiza el curso

- reconstruido desde src/pages
- comprobación de enlaces, anclas y PDF
- $(git diff --cached --shortstat 2>/dev/null || echo 'cambios varios')"
  ok "commit creado"
fi

say "5/5 · Publicando"
if git remote get-url origin >/dev/null 2>&1; then
  git push -q origin HEAD
  ok "push a $(git remote get-url origin | sed 's#.*/##; s/\.git$//')"
  printf '\n\033[1mListo.\033[0m Vercel despliega solo en unos segundos.\n'
  printf '  https://tutorial-dev-es.vercel.app\n'
  printf '  https://github.com/EverKrypton/tutorial-dev\n\n'
  printf 'Ya puedes apagar la máquina.\n'
else
  die "No hay remoto 'origin' configurado."
fi
