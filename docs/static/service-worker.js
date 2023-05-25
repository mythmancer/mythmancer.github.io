const CACHE_NAME = "mythmancer-character-sheet";

const FILES_TO_CACHE = [
  "/character-sheet-v2/",
  "/static/character-sheet-v2.js",
  "/static/character-sheet.css",
  "/static/index.css",
];

self.addEventListener("activate", e => self.clients.claim());

self.addEventListener("install", e => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches
      .match(e.request)
      .then(response => response ? response : fetch(e.request))
  );
});
