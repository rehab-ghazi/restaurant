const staticCacheName = 'site-static';
const assets = ['/',                 
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/data/restaurants.json',
                '/index.html',
                '/restaurant.html'];

//install the service worker
self.addEventListener('install',function(event) {
event.waitUntil(
        caches.open(staticCacheName)
         .then(cache =>{
           return cache.addAll(assets);}
         )
    );
});

//activate event
self.addEventListener('activate',function(event) {
        event.waitUntil(
       caches.keys().then(cachesName =>{
            return Promise.all(cachesName 
                 .filter(cacheName => cacheName !==staticCacheName )
                 .map(cacheName => caches.delete(cacheName))
        )
         
          
        })
        );
});

//fetch event
self.addEventListener('fetch',function(event) {
       event.respondWith(
        caches.match(event.request).then(cacheresponse => {
           return cacheresponse ||  fetch(event.request);
                                                                
                                                       
})
           );
});
