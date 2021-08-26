var http = require('http')
var createHandler = require('node-github-webhook')
var handler = createHandler([ // multiple handlers
  { path: '/github/webhook/actions', secret: 'uoZpUlyMXonEycDveNeVwxDqxMXPhGy2Wrl6bT2ssn4CidAbt7tktMrJPUUUVEbHuVf3H8MzMpjcbuFpF1omdy2qaAPr7shI289qgGT1CqjahPdYJQ8O2fmbd7BHmEWA' }
])
// var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref,
    event.path
  );
  switch(event.path) {
    case '/webhook1':
      // do sth about webhook1
      break
    case '/webhook2':
      // do sth about webhook2
      break
    default:
      // do sth else or nothing
      break
  }
})