const cacheData = "cacheData";
const urlsToCache = [
  "index.html",
  "offline.html",
  "static/js/main.chunk.js",
  "static/js/0.chunk.js",
  "static/js/bundle.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// ** an uparxei sto catch kanto fetch me to response an den yparxei kanto
// **  fetch(event.request) dld apo to diktyo kai an ayto apotyxei eimai offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log(response);
      return (
        response ||
        fetch(event.request).catch(() => caches.match("offline.html"))
      );
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(cacheData);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
