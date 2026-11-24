// Mi Dulce Bendición - Service Worker (Offline-First)
// Sube el número de versión (v3 -> v4) cada vez que cambies archivos o imágenes locales.
const PREFIJO = 'dulcebendicion-';
const CACHE = PREFIJO + 'v6';
const ASSETS = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  // Agrega aquí tus imágenes locales, por ejemplo:
  // './img/prod-1.jpg',
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Pacifico&family=Open+Sans:wght@400;600;700&display=swap'
];
const CDN_HOSTS = ['code.jquery.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(ASSETS.map((f) => c.add(f))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIJO) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Offline-first en navegación: sirve caché de inmediato y refresca en red cuando haya señal
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.match('./').then((cachedPage) => {
        const red = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put('./', copy));
            }
            return res;
          })
          .catch(() => cachedPage || caches.match('./index.html'));
        return cachedPage || red;
      })
    );
    return;
  }

  // Recursos del mismo origen (incluye ./img/...) o hosts de CDN permitidos
  if (!(url.origin === self.location.origin || CDN_HOSTS.includes(url.hostname))) return;

  e.respondWith(
    caches.match(req).then((cached) => {
      const red = fetch(req)
        .then((res) => {
          if (res && (res.status === 200 || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || red;
    })
  );
});