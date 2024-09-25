// eslint-disable-next-line no-undef
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

self.addEventListener('install', function (event) {
    console.log("INstall...");
})

self.addEventListener('fetch', function (event) {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return
  }

  if (event.request.headers.get('range')) {
    event.respondWith(returnRangeRequest(event.request))
  } else {
    event.respondWith(fetch(event.request))
  }
})

function returnRangeRequest (request) {
  var myHeaders = {}
  return fetch(request, { headers: myHeaders, mode: 'cors', credentials: 'omit' })
    .then(res => {
      return res.arrayBuffer()
    })
    .then(function (arrayBuffer) {
      var bytes = /^bytes=(\d+)-(\d+)?$/g.exec(
        request.headers.get('range')
      )
      if (bytes) {
        var start = Number(bytes[1])
        var end = Number(bytes[2]) || arrayBuffer.byteLength - 1
        return new Response(arrayBuffer.slice(start, end + 1), {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Range', `bytes ${start}-${end}/${arrayBuffer.byteLength}`]
          ]
        })
      } else {
        return new Response(null, {
          status: 416,
          statusText: 'Range Not Satisfiable',
          headers: [['Content-Range', `*/${arrayBuffer.byteLength}`]]
        })
      }
    })
}

if (workbox) {
  workbox.setConfig({ debug: false })

  workbox.precaching.precacheAndRoute([
    { url: '/index.html' },
    { url: '/' }
  ])

  workbox.routing.registerRoute(
    new RegExp('.*.js'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'js-cache'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.png'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'png-cache'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.svg'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'svg-cache'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.mp4'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'mp4-cache'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.jpg'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'jpg-cache'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('.*.ico'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'ico-cache'
    })
  )
}
