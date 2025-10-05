'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7e373ba915f2568ffdaabff257609c87",
"assets/AssetManifest.bin.json": "819d416eec7d12732513645967e98bfb",
"assets/AssetManifest.json": "985e3b861b1f076c74aa9a14d690372c",
"assets/assets/animations/checkmark.lottie": "d1e7eed00e751bd9d53cbf877f0c5be6",
"assets/assets/animations/panda.lottie": "d55312f0cc1faf6bb05482931f0f60fb",
"assets/assets/animations/puzzle_pieces_construction.lottie": "44badf29e7c9d7f2ab69ac5bd33cc67d",
"assets/assets/animations/red-x.lottie": "2f53fcde649787dffbda18756be259b0",
"assets/assets/animations/sleepy_cat.lottie": "ae930d998f3650ab49f316d015332404",
"assets/assets/animations/sloth.lottie": "7cfd506e4e47cc78fd48c1dd0cc12083",
"assets/assets/animations/victory.lottie": "25bc8f4f2015a2e8c5e868e256bb3b10",
"assets/assets/animations/waiting_bird.lottie": "fbf1a2fbcf1245db11f953deff162fca",
"assets/assets/animations/warn-!.lottie": "3931fcbb74e0a0b6e69ad27aac6abf44",
"assets/assets/audio/sounds/Chime_Cancel.mp3": "b58a118153b6488ab2c89c7481e75e90",
"assets/assets/audio/sounds/Chime_Confirm.mp3": "f10803c898ff67f5f12fe5f3de327fe1",
"assets/assets/audio/sounds/Chime_Exit.mp3": "211d004513124b3c0a2b916355dce79e",
"assets/assets/audio/sounds/Chime_LevelUp.mp3": "ccb9660b2bed86e812fa697eac057cc2",
"assets/assets/audio/sounds/Chime_Load.mp3": "23165afe68e95e017f30d905c31112ac",
"assets/assets/audio/sounds/Chime_Save.mp3": "d1dec87a053b2c4ceb1bec149efa5619",
"assets/assets/audio/sounds/Chime_Sleep.mp3": "178d86c3c40175adcf9f505f833a3fd9",
"assets/assets/audio/sounds/click1.wav": "e8e1d00d75f2de5c6be7159282fbc7ea",
"assets/assets/audio/sounds/click3.wav": "5ac9b505cb84803f8e832fe5bd7d6ec7",
"assets/assets/audio/sounds/game_end_lost.mp3": "ec036f9fa9ef05ae60b5331e725b2949",
"assets/assets/games/lingo/allowed-guesses.txt": "656f9b39eb00c87a4a86470392a092cc",
"assets/assets/games/minesweeper/bomb.png": "8381f0c334062ac01a7004cb0815440f",
"assets/assets/games/minesweeper/flag.png": "5c5edbcf671218e37c71b4c762299cb7",
"assets/assets/games/minesweeper/unexplored.png": "17f8b1aa3ffe6863818c41b960b4ef00",
"assets/assets/games/watersort/water_sort_bottle.rev": "74ba97925768e908bc1e21e1ca179082",
"assets/assets/games/watersort/water_sort_bottle.riv": "dced37c8a9357379eb9b6b2f75e358f2",
"assets/assets/games_selection.json": "b80e5ee511f61a842271a9e0d24e0919",
"assets/assets/images/binary.png": "0f5165c28fecb35cf07287b985777ba0",
"assets/assets/images/curves.png": "7b6ced43c5e987c450fee23177d49d9f",
"assets/assets/images/default_profile_pictures/0.png": "6ffe07b071922f1703d04384e4c9ba3b",
"assets/assets/images/default_profile_pictures/1.png": "6673e0eee2cf7d22cfe8f40bfe9fc515",
"assets/assets/images/default_profile_pictures/10.png": "d30680ff3fedea258c15019a1083e9e4",
"assets/assets/images/default_profile_pictures/11.png": "649cb3e45ea99634ef95e997f1f5e7a2",
"assets/assets/images/default_profile_pictures/12.png": "a559a08a4c7b1eb54d0cce8da3c1a1f1",
"assets/assets/images/default_profile_pictures/13.png": "91cb5fa4383d8b7afb0c49a7c4bb0f07",
"assets/assets/images/default_profile_pictures/14.png": "c2068f8c6911318b0afed218360f2b4d",
"assets/assets/images/default_profile_pictures/15.png": "673bd3657534e8cfb918770cbcc16750",
"assets/assets/images/default_profile_pictures/16.png": "94fb42daf5c3863c90177a045de9fcd3",
"assets/assets/images/default_profile_pictures/17.png": "bafb6410f399b77b3fcd10cc6b9b759e",
"assets/assets/images/default_profile_pictures/18.png": "356c66ca97220924e9004cf3f180bdd8",
"assets/assets/images/default_profile_pictures/19.png": "1d11a2035c1b68a07a9cd119b14230db",
"assets/assets/images/default_profile_pictures/2.png": "5257649350b67e721ea7c66d27043caf",
"assets/assets/images/default_profile_pictures/20.png": "c25e6017f8ade4612bf54d44d7efa445",
"assets/assets/images/default_profile_pictures/21.png": "cb0996043a8c538aafaf6eec8276efa3",
"assets/assets/images/default_profile_pictures/22.png": "b7fd748eeb03c030240dbc0d6dd4025a",
"assets/assets/images/default_profile_pictures/23.png": "df1360451340eb86a13ca5a5dc46ef40",
"assets/assets/images/default_profile_pictures/24.png": "bce2c15cad9188675f31b0ba8cff8b6b",
"assets/assets/images/default_profile_pictures/25.png": "e47381905f6a59de5dc7a7920cf28c7f",
"assets/assets/images/default_profile_pictures/26.png": "a3f49a9225cd8107b6cdb504ad309944",
"assets/assets/images/default_profile_pictures/27.png": "766f8cb21dbff598412914798d4b1cdf",
"assets/assets/images/default_profile_pictures/28.png": "470f5ee338fad90b2d14d566cb6811ac",
"assets/assets/images/default_profile_pictures/29.png": "1e4dbdd8c14a4f122f2d195225153c0f",
"assets/assets/images/default_profile_pictures/3.png": "28c30adf146bcfa92929f5fa4e9baf4f",
"assets/assets/images/default_profile_pictures/30.png": "7f9454ea7cfe9edc77db6bfb10059e26",
"assets/assets/images/default_profile_pictures/31.png": "3f4c878f320d591cde622f086404de20",
"assets/assets/images/default_profile_pictures/32.png": "715e8336dad504157a23048aa9006c8a",
"assets/assets/images/default_profile_pictures/33.png": "e2a83c61ee0b5aedde34d03947b4a167",
"assets/assets/images/default_profile_pictures/34.png": "bd59aeca093f47ec10ad5455370dbf52",
"assets/assets/images/default_profile_pictures/35.png": "92018f744359a0652acdd1569afc1ab0",
"assets/assets/images/default_profile_pictures/36.png": "f2e0d88d585616fa24c524a621d792dd",
"assets/assets/images/default_profile_pictures/37.png": "2c8673fd964a5fcbba51cd23a63ae842",
"assets/assets/images/default_profile_pictures/38.png": "7978017d31ec7336fff52ed218e14035",
"assets/assets/images/default_profile_pictures/39.png": "85b38ce82a32f374e258459935d7ec9a",
"assets/assets/images/default_profile_pictures/4.png": "5a907e1555abd54745efb6ad573cde1d",
"assets/assets/images/default_profile_pictures/40.png": "64e383e527090b573c94a404840c5f4c",
"assets/assets/images/default_profile_pictures/41.png": "13557c4acba04478a8f418dc9505edf3",
"assets/assets/images/default_profile_pictures/42.png": "2e88f50b776c7e0e356a6c91f77c9031",
"assets/assets/images/default_profile_pictures/43.png": "8b2436afb8d448df8a5ec3228a866aae",
"assets/assets/images/default_profile_pictures/44.png": "ca6e548c62976f6c749a62b0320ea1b8",
"assets/assets/images/default_profile_pictures/45.png": "7de5dfb407df35c2d8b672705700120d",
"assets/assets/images/default_profile_pictures/46.png": "45c73b8c2ff93ccc6e3b2b9c66bed4ea",
"assets/assets/images/default_profile_pictures/47.png": "742b680a5134e2741d6d4ee670555bc5",
"assets/assets/images/default_profile_pictures/48.png": "93a30f981ed7f8cbc3ce3b28fc84cae0",
"assets/assets/images/default_profile_pictures/49.png": "07f327b0c14f3ab6470f685c9e41977f",
"assets/assets/images/default_profile_pictures/5.png": "845dbbf7c85412c80a2b93417b6dd995",
"assets/assets/images/default_profile_pictures/6.png": "e7f78a989bbc90714312c946fed8fc1f",
"assets/assets/images/default_profile_pictures/7.png": "d724605a68c9c8864b80d1ca71a95325",
"assets/assets/images/default_profile_pictures/8.png": "784329d60a6b360f7a6580d131f24539",
"assets/assets/images/default_profile_pictures/9.png": "e25e62a4114a240ce9d423c27d3e04c8",
"assets/assets/images/launcher-icon-2.png": "72165a03ceab67e145d074324be61588",
"assets/assets/images/launcher-icon.png": "3b775e35aedffb4a9d0618f4408c254c",
"assets/assets/images/lingo.png": "78ce0552c693056a693955d9bc1bd144",
"assets/assets/images/minesweeper.png": "7708295bf73db1b94ec14b2e00055cb8",
"assets/assets/images/sudoku.png": "df4f47c722da9adb244ac14343a56d31",
"assets/assets/images/watersort.png": "8debe2fa7c11f03984ffdebcd162ddfa",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "f2d6e844e53fdcce26eb8096c615163d",
"assets/NOTICES": "69208abe8c9d66f9badd7154995438e3",
"assets/packages/mesh_gradient/shaders/animated_mesh_gradient.frag": "1890be5ac6e1b673019ee2604c2d59c5",
"assets/packages/mesh_gradient/shaders/point_mesh_gradient.frag": "6721e3c3c3b65cb49c2709c828288ffd",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5bf85062fe0163379d06cdc7af0d3d62",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "c69061c9b9df30582771d52d5306c7bc",
"icons/Icon-192.png": "59abeb25e9e89f7eac5442888c7fdb98",
"icons/Icon-512.png": "9bde417fa35b385dfe47cd431cfdc517",
"icons/Icon-maskable-192.png": "59abeb25e9e89f7eac5442888c7fdb98",
"icons/Icon-maskable-512.png": "9bde417fa35b385dfe47cd431cfdc517",
"index.html": "a792c047f7dd85a661a5ed41d1b026ae",
"/": "a792c047f7dd85a661a5ed41d1b026ae",
"main.dart.js": "2e13f32b87d2aa546c5a25d46de3eb5f",
"manifest.json": "81d08a91c3d8e5931b6f80a465834f17",
"splash/img/light-background.png": "ceb469bff32afa8a2779cc4c416d42e1",
"version.json": "ee77c26158309f8ddbb583a1bae3389f"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
