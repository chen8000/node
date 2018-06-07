var http = require('http');

http.createServer(function (request,response) {

    response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});

    // if(!request.url !== '')
    console.log('访问')

    response.end('666')

}).listen(8000);
console.log('server running at 127.0.0.1:8000')