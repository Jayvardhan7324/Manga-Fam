const addResourcesToCache = async (resources: any) => {
  const cache = await caches.open("v1")
  await cache.addAll(resources)
}

const putInCache = async (request: Request, response: Response) => {
  const cache = await caches.open("v1")
  await cache.put(request, response)
}

const cacheFirst = async (request: Request) => {
  const responseFromCache = await caches.match(request)

  if (responseFromCache) return responseFromCache

  const responseFromNetwork = await fetch(request)

  await putInCache(request, responseFromNetwork)

  return responseFromCache
}

self.addEventListener("install", (event: any) => {
  event.waitUntil(addResourcesToCache(["*"]))
})

self.addEventListener("fetch", (event: any) => {
  event.respondWith(cacheFirst(event.request))
})

self.addEventListener("activate", (event: any) => {
  event.waitUntil(( self as any).registration?.navigationPreload.enable())
})
