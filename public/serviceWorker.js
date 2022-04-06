const cacheData = "cacheData";
const dynamicCahe = "dynamicCache";
const urlsToCache = ["index.html", "offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      console.log("Serviceworker has been installed and cache is open.");
      return cache.addAll(urlsToCache);
    })
  );
});

// ** If the fetch request matches the urls we cached, fetch it from catch.
// ** If it doesn't do the request.
self.addEventListener("fetch", (event) => {
  console.log("Fetch is happening");
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response || fetch(event.request)
        // .then((fetchRes) => {
        //   return caches.open();
        // })
        // .catch(() => caches.match("offline.html"))
      );
    })
  );
});

// * Activate the SW
// * Maybe in the future will have more caches so the old ones must be deleted.
// * Delete all the old caches with name different
// *  of the name we declare at the top of the file
self.addEventListener("activate", (event) => {
  console.log("Serviceworker is active");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== cacheData)
          .map((cacheName) => caches.delete())
      );
    })
  );
});
