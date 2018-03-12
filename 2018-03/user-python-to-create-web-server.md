# 使用python创建web服务器 http、https

python2/3 创建http服务器非常简单，一行命令搞定

python2:

```bash
python -m SimpleHTTPServer [port:8000]
```

python3:

```bash
python3 -m http.server [port:8000]
```

创建https服务器稍复杂，需要先生成证书

1. 生成证书，会在当前目录创建一个叫做server.pem的证书

```bash
openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
```

2. 将如下代码保存为 server.py ，并注意将代码中证书的路径设置对， 然后运行 `sudo python3 server.py` 即可

```python
'''
SimpleHTTPServerSSL.py - simple HTTP server supporting SSL/TLS. I.e. HTTPS. For python 3.3
- replace CERT and KEY with the location of your .pem server file.
- the default port is 443.
usage: python SimpleHTTPServerSSL.py
based on http://code.activestate.com/recipes/442473-simple-http-server-supporting-ssl-secure-communica/
'''
import socket, os
from socketserver import BaseServer
from http.server import HTTPServer
from http.server import SimpleHTTPRequestHandler
import ssl

CERT = 'server.pem'
KEY = 'server.pem'

class SecureHTTPServer(HTTPServer):
    def __init__(self, server_address, HandlerClass):
        BaseServer.__init__(self, server_address, HandlerClass)
        ctx = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
        ctx.load_cert_chain(certfile=CERT, keyfile=KEY)
        self.socket = ctx.wrap_socket(socket.socket(self.address_family, self.socket_type), server_side=True)
        self.server_bind()
        self.server_activate()

def test(HandlerClass = SimpleHTTPRequestHandler,
         ServerClass = SecureHTTPServer):
    server_address = ('', 443) # (address, port)
    httpd = ServerClass(server_address, HandlerClass)
    sa = httpd.socket.getsockname()
    print("Serving HTTPS on", sa[0], "port", sa[1], "...")
    httpd.serve_forever()

if __name__ == '__main__':
    test()
```

reference

1. [生成证书](http://code.activestate.com/recipes/442473-simple-http-server-supporting-ssl-secure-communica/)  此链接中的python2创建https服务器我的运行有报错，遂用python3的方法： [python3 create https server](https://gist.github.com/ubershmekel/6194556)