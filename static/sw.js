let cacheName = 'Unimensa_cache';
let filesToCache = [
    'templates/index.html',
    'templates/Home.html',
    'templates/Order.html',
    'templates/home_00.html',
    'templates/signin.html',
    'static/bootstrap/css/bootstrap.css',
    'static/css/homeCSS/contentHome.css',
    'static/css/homeCSS/home.css',
    'static/css/homeCSS/home_00.css',
    'static/css/loginCSS/login.css',
    'static/css/orderCSS/order.css',
    'static/css/signinCSS/signin.css',
    'static/images/body_home/cart.png',
    'static/images/body_home/cestino.png',
    'static/images/header/icon.png',
    'static/images/header/imgProfile.png',
    'static/images/header/imgProfileclicked.png',
    'static/images/logo/icon.png',
    'static/images/mensa/acqua.jpg',
    'static/images/mensa/arancia.jpg',
    'static/images/mensa/carbonara.jpg',
    'static/images/mensa/cocacola.jpg',
    'static/images/mensa/insalata.jpg',
    'static/images/mensa/mela.jpg',
    'static/images/mensa/pesto.jpg',
    'static/images/mensa/pizza.jpg',
    'static/images/mensa/polpette.jpg',
    'static/images/mensa/salmone.jpg',
    'static/images/mensa/tiramisu.jpg',
    'static/images/menu_ristoratore/close.png',
    'static/images/menu_ristoratore/icon_add.png',
    'static/js/Home.js',
    'static/js/home_00.js',
    'static/js/JQuery.js',
    "static/main.js",
    'static/images/favicons/android-icon-192x192.png',
    'static/images/favicons/apple-icon-180x180.png',
    'static/images/favicons/favicon.ico',
    'static/images/favicons/favicon-16x16.png',
    'static/images/favicons/favicon-32x32.png',
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});