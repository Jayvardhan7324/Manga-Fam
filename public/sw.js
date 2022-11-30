const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable()
  }
}

const addResoucesToCache = async (resources) => {
  const cache = await caches.open("v1")
  await cache.addAll(resources)
}

const putInCache = async (request, response) => {
  const cache = await caches.open("v1")
  await cache.put(request, response)
}

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    console.log("Response from the cache: ", responseFromCache)
    return responseFromCache
  }

  try {
    const responseFromNetwork = fetch(request)

    if (responseFromNetwork.status === 200) putInCache(request, response.clone())

    return responseFromNetwork

  } catch(error) {
    console.log(error)

    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" }
    })
  }
}

self.addEventListener("install", (event) => {
  console.log("Service worker is successfully insalled")
})

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload())
})


self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request))
})



