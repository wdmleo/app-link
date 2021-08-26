var http = require('http')
var createHandler = require('node-github-webhook')
var handler = createHandler([ // multiple handlers
  { path: '/webhook1', secret: 'uoZpUlyMXonEycDveNeVwxDqxMXPhGy2Wrl6bT2ssn4CidAbt7tktMrJPUUUVEbHuVf3H8MzMpjcbuFpF1omdy2qaAPr7shI289qgGT1CqjahPdYJQ8O2fmbd7BHmEWA' },
  { path: '/webhook2', secret: 'secret2' }
])
// var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)
 
http.on("", () => {
    console.log("Response ?")
    res.end('Response');
});

handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('github/webhook/push', function (event) {
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