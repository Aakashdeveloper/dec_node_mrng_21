var http = require('http');

// req > what we send  to server through params, query params, body
// res > what server send in response/output

var server = http.createServer(function(req, res){
    res.write('<h1>Created Server With Node app</h1>')
    res.end()
})

server.listen(7530)