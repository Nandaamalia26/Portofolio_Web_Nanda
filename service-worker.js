// Nama cache, bisa dikustom
const CACHE_NAME = "portofolio-cache-v2";

// File-file yang akan disimpan di cache
const FILES_TO_CACHE = [
  // HTML files
  "index.html",
  "aboutme.html",
  "skills.html",
  "education.html",
  "experience.html",
  "contact.html",

  // CSS files
  "style.css",
  "assets/css/bootstrap.min.css",
  "assets/css/all.min.css",

  // Font Awesome webfonts
  "assets/webfonts/fa-brands-400.woff2",
  "assets/webfonts/fa-solid-900.woff2",
  "assets/webfonts/fa-regular-400.woff2",
  "assets/webfonts/fa-v4compatibility.woff2",

  // Gambar
  "Aku.jpeg",
  "favicon.png"
];


// 🔁 Saat service worker di-*install*, cache file-file statis
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log("✅ Service Worker: Installed & Files Cached");
});

// 🔁 Saat halaman di-*fetch*, ambil dari cache dulu
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 🔁 Saat update, hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  console.log("♻️ Service Worker: Activated & Old Cache Deleted");
});
