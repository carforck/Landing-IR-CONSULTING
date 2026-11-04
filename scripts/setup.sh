#!/usr/bin/env bash
# Idempotente: se puede correr N veces; solo instala si faltan dependencias o cambió package.json/lockfile.
set -euo pipefail
cd "$(dirname "$0")/.."
STAMP=node_modules/.setup-stamp
hash_deps() { cat package.json package-lock.json 2>/dev/null | sha256sum | cut -d' ' -f1; }
if [ -f "$STAMP" ] && [ "$(cat "$STAMP")" = "$(hash_deps)" ]; then
  echo "setup: dependencias al día (sin cambios)"
  exit 0
fi
if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
hash_deps > "$STAMP"
echo "setup: dependencias instaladas"
