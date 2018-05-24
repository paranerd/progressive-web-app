// Cache for app shell
var cacheName = 'rest-1';

// Cache for dynamic data
var dataCacheName = 'restData-v1';

// List of files to cache
var filesToCache = [
	'/rest/',
	//'index.php',
	'assets/js/jquery.min.js',
	'assets/js/app.js',
	//'templates/first.html',
	//'templates/second.html'
	'first',
	'second',
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log('[Service Worker] Fetch', e.request.url);
	console.log(e);
	var dataUrl = 'api/';
	if (e.request.url.indexOf(dataUrl) > -1) {
		/*
		* When the request URL contains dataUrl, the app is asking for fresh
		* weather data. In this case, the service worker always goes to the
		* network and then caches the response. This is called the "Cache then
		* network" strategy:
		* https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
		*/
		e.respondWith(
			caches.open(dataCacheName).then(function(cache) {
				return fetch(e.request).then(function(response) {
					console.log("fetch ok");
					console.log(response);
					cache.put(e.request.url, response.clone());
					return response;
				}).catch(function(err) {
					console.log("fetch catch");
					console.log(err);
					cache.match(e.request).then(function(response) {
						console.log("cache match");
						console.log(response);
						return response;
					})
				});
			})
		);
	}
	else {
		/*
		* The app is asking for app shell files. In this scenario the app uses the
		* "Cache, falling back to the network" offline strategy:
		* https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
		*/
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			})
		);
	}
});

/*self.addEventListener('fetch', function(e) {
	
	if (e.request.url.indexOf('
});*/

self.addEventListener('fetch2', function(event) {
	console.log("fetch");
	console.log(event.request);
	event.respondWith(
	fetch(event.request).catch(function() {
		console.log("CATCH");
		console.log(event.request);
		console.log(caches.match(event.request));
		caches.match(event.request).then(function(response) {
			console.log("Cache then response");
			console.log(response);
			return response;
		})
		})
	);
});

this.addEventListener('fetch3', function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});
