// InvoicePilot — service worker (cache-first sur les assets statiques uniquement)
var CACHE = "invoicepilot-v2";
var ASSETS = [
    "/app.html",
    "/index.html",
    "/css/app.css",
    "/css/landing.css",
    "/js/app.js",
    "/js/config.js",
    "/manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS).catch(function () { /* ignore missing */ }); }));
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    var url = new URL(event.request.url);
    // Ne jamais cacher les appels Supabase / API tierces.
    if (url.origin !== self.location.origin) return;
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then(function (cached) {
            if (cached) return cached;
            return fetch(event.request).then(function (resp) {
                if (resp && resp.status === 200 && resp.type === "basic") {
                    var clone = resp.clone();
                    caches.open(CACHE).then(function (c) { c.put(event.request, clone); });
                }
                return resp;
            }).catch(function () { return cached; });
        })
    );
});
