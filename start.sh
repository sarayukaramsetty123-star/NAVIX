#!/bin/bash
# NAVIX Campus Navigator Launch Script

cd "$(dirname "$0")"

echo "=================================================="
echo "  NAVIX Campus Navigator - Starting Frontend"
echo "=================================================="

if command -v python3 &>/dev/null; then
    python3 server.py
elif command -v python &>/dev/null; then
    python server.py
else
    echo "Python is not found. Opening index.html in your default web browser..."
    open index.html 2>/dev/null || xdg-open index.html 2>/dev/null || sensible-browser index.html
fi
