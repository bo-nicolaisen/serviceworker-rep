
// array med cache names vi gerne vil bruge. opdater disse for at triggere en install

const cacheAllowList = ['staticCache-v1', 'recipies-v1'];


// her kan der evt scannes et directory på serveren ... og bygge et array til cache

// static elements til cache
let staticUrlsToCache = [

  'assets/css/site.css',
  'assets/icons/android-chrome-512x512.png',
  'assets/icons/android-chrome-192x192.png',
  'assets/img/dog-1.jpg',
  'index.html',
  'info.html',
  'manifest.json',
  'index.js',
  'favicon.ico'


];
// alle elementer til at skabe appen  caches her 


self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('installing ------------------------------------------');

  event.waitUntil(

    /*  opret cache til static elements.hvis man bruger caches.open på en cache navn der ikke 
     eksisterer, så oprettes cachen automatisk */

    caches.open(cacheAllowList[0])

      .then(function (cache) {
        console.log('initial cache of statics');
        return cache.addAll(staticUrlsToCache);
      })
  );
});



// activate  sletter obsolete caches  virker udfra  cacheAllowList

self.addEventListener('activate', (event) => {


  // find alle cache keys (cache navne) og fortsæt med en array med cache navne
  event.waitUntil(caches.keys().then((keys) => {

    // Slet caches der ikke findes i cacheAllowList:
    return Promise.all(keys.map((key) => {

      if (!cacheAllowList.includes(key)) {
        // her slettes den enklte cache der ikke er i arrayet
        return caches.delete(key);
      }
    }));

  }));
});



//      fetch routines ----------------------------------------------


//cache only  alle fetch calls returneres fra cache, hvis ikke resourcen er i cache så får man en netværksfejl

/* self.addEventListener('fetch', function (event) {

  event.respondWith(

    caches.match(event.request.url)

  );

});
 */



// cache then network eller cache fallback to network.
// alt hvad der ikke findes i caches hentes på nettet

self.addEventListener('fetch', function (event) {
  event.respondWith(
    // her søges der i alle caches, dvs. har man flere caches kan man finde matches i alle caches
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);

    })
  );
});



// network then cache  network fetch skal faile før catch trigger og henter request i cache
// langsom strategi, da netværks fetch skal faile før der hentes i cache


/* self.addEventListener('fetch', function (event) {
  event.respondWith(

    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })

  );
}); */





// cache first then network og cache det fundne element


/* self.addEventListener('fetch', function (event) {

  event.respondWith(
    // søg på match i caches  
    caches.match(event.request).then(function (response) {

      return response || fetch(event.request).then(function (response) {

        // ellers fetch og gem i cache 
        caches.open(cacheAllowList[1]).then(function (cache) {
          // husk at clone response da response bliver consumed ved brug.
          cache.put(event.request, response.clone());
          return response;

        });
      });
    })
  );
}); */









