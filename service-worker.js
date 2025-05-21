/**
 * Shui's Pounded Meal Generator
 * Service Worker for Offline Support
 */

const CACHE_NAME = 'shui-meal-generator-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/components.js',
  '/js/generator.js',
  '/js/ui.js',
  '/favicon.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@400;600&display=swap'
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  
  // Claim clients so the service worker is in control immediately
  self.clients.claim();
});

// Intercept fetch requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();
            
            // Open a cache and store the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch((error) => {
        // Network request failed, try to serve the offline page
        console.log('Fetch failed:', error);
        
        // If it was a navigation request, try to serve the offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
}); 