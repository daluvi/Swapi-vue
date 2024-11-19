/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import {REGEX_MATCH_URL} from "./utils/constants";

const CACHE_NAME = "starsWarCache";
declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

const fromNetwork = async(request: Request, matchURL: RequestInfo) => await fetch(request).then(async(networkResponse) => {
  const cache = await caches.open(CACHE_NAME);

  cache.put(matchURL, networkResponse.clone());
  return networkResponse;
}).catch(e => {
  console.log('network Error: ', e);
});

self.addEventListener("fetch", (event: FetchEvent) => {
  async function navigateOrDisplayOfflinePage() {
    const cache = await caches.open(CACHE_NAME);
    const matchURL: RequestInfo = event.request.url.match(REGEX_MATCH_URL) as unknown as RequestInfo;
    return await cache.match(matchURL).then(async (matched) => {
      return matched || await fromNetwork(event.request, matchURL) as unknown as Promise<Response>;
    });
  }
  event.respondWith(navigateOrDisplayOfflinePage());
});

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
