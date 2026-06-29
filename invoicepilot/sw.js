// InvoicePilot — service worker (cache-first sur les assets statiques uniquement)
var CACHE = "invoicepilot-v22";
var ASSETS = [
    "/app.html",
    "/index.html",
    "/sign.html",
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

self.addEventListener("message", function (event) {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});

// Network-first for HTML and JS so code changes propagate immediately.
// Cache-first as fallback (and for CSS / images / manifest).
self.addEventListener("fetch", function (event) {
    var url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;
    if (event.request.method !== "GET") return;
    var isCode = /\.(html|js)$/.test(url.pathname) || url.pathname === "/" || url.pathname === "/app.html";
    if (isCode) {
        event.respondWith(
            fetch(event.request).then(function (resp) {
                if (resp && resp.status === 200 && resp.type === "basic") {
                    var clone = resp.clone();
                    caches.open(CACHE).then(function (c) { c.put(event.request, clone); });
                }
                return resp;
            }).catch(function () { return caches.match(event.request); })
        );
        return;
    }
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
