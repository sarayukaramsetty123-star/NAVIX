#!/usr/bin/env bash
# NAVIX Campus Navigator - Backend Launch Script

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Ensure Node environment
if [ -f "$DIR/.node/bin/node" ]; then
    export PATH="$DIR/.node/bin:$PATH"
fi

if ! command -v node &>/dev/null; then
    echo "[!] Node.js not found in PATH. Running setup..."
    bash "$DIR/setup-node.sh"
    if [ -f "$DIR/.node/bin/node" ]; then
        export PATH="$DIR/.node/bin:$PATH"
    fi
fi

if [ ! -d "$DIR/node_modules" ]; then
    echo "[i] Installing node_modules..."
    npm install
fi

echo "=================================================="
echo "  Starting NAVIX Campus Navigator Backend (API)   "
echo "=================================================="

exec node src/server.js
