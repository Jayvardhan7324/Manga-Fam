const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1")
  await cache.addAll(resources)
}

const putInCache = async (request, response) => {
  const cache = await caches.open("v1")
  await cache.put(request, response)
}

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request)

  if (responseFromCache) return responseFromCache

  const responseFromNetwork = await fetch(request)

  await putInCache(request, responseFromNetwork)

  return responseFromCache
}

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["*"]))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request))
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.registration.navigationPreload.enable())
})
