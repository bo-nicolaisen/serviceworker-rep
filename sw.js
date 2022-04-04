const CACHE_NAME = 'my-site-cache-2';


let urlsToCache = [

  'assets/css/site.css',
  'assets/icons/android-chrome-512x512.png',
  'assets/img/dog-1.jpg',
  'index.html',
  'info.html'

];


// alle elementer til at skabe appen skal caches


self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('installing ------------------------------------------');
  event.waitUntil(
    caches.open(CACHE_NAME)

      .then(function (cache) {
        console.log('initial cache of statics');
        return cache.addAll(urlsToCache);
      })
  );
});



// activate  delete obsolete caches

self.addEventListener("activate", function (event) {
  console.log("activate -------------------------------------------");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});



//      fetch 


//cache only   ----------------------------------------------

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request));
});


// cache then network

/* self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
}); */


// network then cache  network fetch must fail before catch triggers

/* self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
}); */




// cache first then network and cache found resource

/* self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
}); */









