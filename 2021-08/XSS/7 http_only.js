var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': ['key1=value1; httpOnly=true', 'key2=value2']
    });

    response.end('Hello World\n');
}).listen(8888);