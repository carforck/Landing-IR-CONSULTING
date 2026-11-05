#!/usr/bin/env bash
# Compila y publica dist/ en la rama gh-pages de origin (GitHub Pages, cuenta carforck).
# Idempotente: cada corrida reemplaza la rama gh-pages con el build actual.
set -euo pipefail
cd "$(dirname "$0")/.."
bash scripts/setup.sh
npm run build
touch dist/.nojekyll
cp dist/index.html dist/404.html
REMOTE=$(git remote get-url origin)
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git push -f "$REMOTE" gh-pages
rm -rf .git
echo "Publicado en https://carforck.github.io/Landing-IR-CONSULTING/"
