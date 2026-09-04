#!/usr/bin/env bash
# NAVIX Campus Navigator - Node.js Bootstrap Script
# Downloads standalone official Node.js v20 (macOS ARM64) into backend/.node if not on system PATH

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "Checking Node.js availability..."

if command -v node &>/dev/null && command -v npm &>/dev/null; then
    echo "[✓] System Node.js found: $(node -v)"
    echo "[✓] System npm found: $(npm -v)"
else
    if [ -f "$DIR/.node/bin/node" ]; then
        echo "[✓] Local portable Node.js found in backend/.node: $("$DIR/.node/bin/node" -v)"
        export PATH="$DIR/.node/bin:$PATH"
    else
        echo "[i] Node.js not detected in PATH. Bootstrapping portable Node.js v20.17.0 for macOS ARM64..."
        mkdir -p "$DIR/.node_temp"
        NODE_TAR="node-v20.17.0-darwin-arm64.tar.gz"
        curl -fsSL "https://nodejs.org/dist/v20.17.0/${NODE_TAR}" -o "$DIR/.node_temp/${NODE_TAR}"
        tar -xzf "$DIR/.node_temp/${NODE_TAR}" -C "$DIR/.node_temp"
        mkdir -p "$DIR/.node"
        mv "$DIR/.node_temp/node-v20.17.0-darwin-arm64"/* "$DIR/.node/"
        rm -rf "$DIR/.node_temp"
        export PATH="$DIR/.node/bin:$PATH"
        echo "[✓] Node.js bootstrapped successfully: $("$DIR/.node/bin/node" -v)"
    fi
fi

if [ ! -d "$DIR/node_modules" ]; then
    echo "[i] Installing backend dependencies (express, cors, dotenv)..."
    npm install
fi

echo "[✓] Backend environment is ready!"
