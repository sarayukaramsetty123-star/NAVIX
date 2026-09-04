#!/usr/bin/env python3
"""
NAVIX Campus Navigator - Local Development Server
Automatically maps MIME types, starts local HTTP server, and opens default browser.
"""

import http.server
import socketserver
import webbrowser
import mimetypes
import sys

PORT = 5173

# Ensure proper MIME types for web assets
mimetypes.add_type('text/javascript', '.js')
mimetypes.add_type('text/javascript', '.jsx')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path.startswith('/user/src/'):
            path = path.replace('/user/src/', '/src/', 1)
        elif path.startswith('/admin/src/'):
            path = path.replace('/admin/src/', '/src/', 1)
        return super().translate_path(path)

    def do_GET(self):
        if self.path.startswith('/user/src/'):
            self.path = self.path.replace('/user/src/', '/src/', 1)
        elif self.path.startswith('/admin/src/'):
            self.path = self.path.replace('/admin/src/', '/src/', 1)

        clean_path = self.path.split('?')[0].rstrip('/')
        if clean_path in ['', '/user', '/admin'] or (not '.' in clean_path.split('/')[-1] and not clean_path.startswith('/api')):
            self.path = '/index.html'
        return super().do_GET()

    def end_headers(self):
        # Prevent aggressive caching during local development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    port = PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    server_address = ("", port)
    
    # Allow port reuse immediately if restarted
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(server_address, CustomHandler) as httpd:
            url = f"http://localhost:{port}"
            print("\n" + "=" * 60)
            print("  🏫  NAVIX Campus Navigator - Frontend Web App")
            print(f"  🚀  Local Server running at: {url}")
            print("  📱  Open on your phone or laptop browser!")
            print("  💡  Press Ctrl + C to stop the server")
            print("=" * 60 + "\n")

            try:
                webbrowser.open(url)
            except Exception:
                pass

            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48: # Address already in use
            print(f"\nPort {port} is already in use. Trying port {port + 1}...")
            sys.argv[1] = str(port + 1)
            run()
        else:
            raise e
    except KeyboardInterrupt:
        print("\n[✓] Server stopped successfully. Goodbye!")

if __name__ == '__main__':
    run()
