const CACHE_NAME =
    "mader-mobile-v1";

const DATEIEN = [
    "/mobile/",
    "/mobile/index.html",
    "/mobile/manifest.json"
];

self.addEventListener(
    "install",
    (event) => {

        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(
                    (cache) =>
                        cache.addAll(DATEIEN)
                )
        );
    }
);


self.addEventListener(
    "fetch",
    (event) => {

        event.respondWith(
            fetch(event.request)
                .catch(
                    () =>
                        caches.match(
                            event.request
                        )
                )
        );
    }
);