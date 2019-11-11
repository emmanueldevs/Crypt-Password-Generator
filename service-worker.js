self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
      console.log("cache request: " + event.request.url);
       var fetchPromise = fetch(event.request).then(function(networkResponse) {           
// if we got a response from the cache, update the cache                   
console.log("fetch completed: " + event.request.url, networkResponse);
  if (networkResponse) {
    console.debug("updated cached page: " + event.request.url, networkResponse);
      cache.put(event.request, networkResponse.clone());}
        return networkResponse;
          }, function (event) {   
// rejected promise - just ignore it, we're offline!   
          console.log("Error in fetch()", event);
          event.waitUntil(
          caches.open('cache').then(function(cache) { // our cache here is named *cache* in the caches.open()
          return cache.addAll
          ([                          
            '/', // do not remove this
            '/index.html', //default
            '/index.html?homescreen=1', //default
            '/?homescreen=1', //default
            '/about.html', //default
            '/css/font-face.css',//css files
            '/vendor/font-awesome/css/font-awesome.min.css',
            '/vendor/linearicons/css/linearicons.css',
            '/vendor/bootstrap/bootstrap.min.css',
            '/css/theme.css',
            '/css/gen-form.css',//end of css files
            '/images/crypt-pad-72x72.png',//images to keep offline
            '/images/crypt-pad-114x114.png',
            '/images/crypt-pad.png',
            '/images/crypt-phone3.png',
            '/images/crypt-phone5.png',
            '/images/crypt-phone2.png',
            '/images/crypt-phone4.png',
            '/images/icons/crypt-pad-72x72.png',
            '/images/icons/crypt-pad-96x96.png',
            '/images/icons/crypt-pad-128x128.png',
            '/images/icons/crypt-pad-144x144.png',
            '/images/icons/crypt-pad-152x152.png',
            '/images/icons/crypt-pad-192x192.png',
            '/images/icons/crypt-pad-384x384.png',
            '/images/icons/crypt-pad-512x512.png',//end of images
            '/js/manager.js',//js files
            '/vendor/jquery/jquery.min.js',
            '/vendor/bootstrap/bootstrap.min.js',
            '/vendor/validator/validator.min.js',//end of js files
            // Do not delete manifest.js path below
            '/manifest.js',
            //These are links to the extenal social media buttons that should be cached; we have used twitter's as an example
            'https://platform.twitter.com/widgets.js',       
          ]);
        })
        );
        });
// respond from the cache, or the network
  return response || fetchPromise;
});
}));
});

self.addEventListener('install', function(event) {
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();
    console.log("Latest version installed!");
});