const CACHE_NAME = "mader-mobile-v3";

const APP_SHELL = [
    "/mader-dispo-mobile/",
    "/mader-dispo-mobile/index.html",
    "/mader-dispo-mobile/manifest.json"
];


self.addEventListener(
    "install",
    (event) => {

        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(
                    (cache) =>
                        cache.addAll(APP_SHELL)
                )
        );

        self.skipWaiting();
    }
);


self.addEventListener(
    "activate",
    (event) => {

        event.waitUntil(
            caches
                .keys()
                .then(
                    (namen) =>
                        Promise.all(
                            namen
                                .filter(
                                    (name) =>
                                        name !== CACHE_NAME
                                )
                                .map(
                                    (name) =>
                                        caches.delete(name)
                                )
                        )
                )
        );

        self.clients.claim();
    }
);


self.addEventListener(
    "fetch",
    (event) => {

        if (event.request.mode === "navigate") {

            event.respondWith(
                fetch(event.request)
                    .catch(
                        () =>
                            caches.match(
                                "/mader-dispo-mobile/index.html"
                            )
                    )
            );

            return;
        }


        event.respondWith(
            caches
                .match(event.request)
                .then(
                    (cacheAntwort) => {

                        if (cacheAntwort) {
                            return cacheAntwort;
                        }

                        return fetch(event.request);
                    }
                )
        );
    }
);
