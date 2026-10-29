const CACHE_NAME = 'rainbow-hanzi-island-v2';
const APP_FILES = [
  './', './index.html', './styles.css', './src/app.js', './src/learning.js', './manifest.webmanifest',
  './assets/animals/rabbit.svg', './assets/animals/fox.svg', './assets/animals/panda.svg',
  './assets/animals/cat.svg', './assets/animals/owl.svg', './assets/animals/bear.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
