[TOC]
# 数字证书

## 1、为什么需要？从https说起

假如A要B进行网络通信

### 1、远古时代：裸奔不加密

A要发数据给B，根本不用担心窃听和篡改，直接发就好了。

![](https://pic4.zhimg.com/80/v2-4efb777e3a7902c500158baa26745eff_1440w.webp)

### 2、上古时代：对称加密DES

随着时代的发展，渐渐的有了一类人---C。C不仅会监听A和B之间的网络数据，还会拦截A和B之间的数据，伪造之后再发给A或者B，进而欺骗A和B。C就是中间人攻击（Man In The Middle Attack）。

为了应对C的攻击，A和B开始对自己的数据进行加密。A和B会使用一个共享的密钥，A加密、B解密。

![](https://pic2.zhimg.com/80/v2-334f01cb9b07c3a0b90eb048d011cfd5_1440w.webp)

最大的问题是共享密钥只能A、B知道。A和B只能先见一面，私下商量好密钥，这样C就没办法获取密钥。如果因为任何原因，之前的密钥泄露了，那么AB还得再见一面，重新商量一个密钥。

只要保证密钥的安全，那么AB之间整个网络通信都是安全的。

### 3、现代：非对称加密RSA

网络通信变得十分发达，A不只与B通信，还同时还跟其他10000个人进行网络通信。A不可能每个人都跑去跟他们见个面，商量一个密钥。所以一种新的加密算法被提出，这就是非对称加密算法。非对称加密使用两个密钥，一个是public key，一个是private key。

非对称加密的好处在于，现在A可以保留private key，通过网络传递public key。这样，就算public key被C拦截了，因为没有private key，C还是没有办法完成信息的破解。既然不怕C知道public key，那现在A和B不用再见面商量密钥，直接通过网络传递public key就行。

![](https://p.ipic.vip/w9y8g8.png)

如果B的解密结果符合预期，那么至少可以证明，这个信息只有B能获取，因为B的private key参与了解密，而B的private key其他人都不知道。并且，这个信息是来自A，而不是C伪造的，因为A的public key参与了解密。一切看起来似乎很美好。

但是在一切的最开始，A和B要通过网络交换public key。如果C在中间拦截了呢？假设有这种情况，C拦截了A和B的public key，又分别用自己的public key发给A和B。A和B并不知道，他们还以为这个public key来自对方。当A给B发消息时，A先用自己的private key加密数据的hash值，之后用C传来的假的public key加密数据，再发出去。C拦截到之后，先用C自己的private key解密数据，C就获取了A的原始信息！之后，C可以篡改数据内容，再用自己的private key加密数据的hash值，用之前拦截的B的public key加密数据，再发给B。B收到以后，先用自己的private key解密数据，再用C传来的假public key解密hash值，发现匹配。这样，B收到了一条来自C的假的信息，但是B还以为信息来自于A。中间人攻击仍然可能存在！

完了，一切都崩了，加密搞的这么复杂，居然还不能保证网络数据的安全。回顾一下，问题出就出在最开始通过网络交换public key。看起来为了保证public key不被拦截，A和B似乎还是要见一面，交换一下public key。这一下就回到了上古时代。

但还有有一些区别的。在上古时代，见面是为了商量一个密钥，密钥的内容很重要，不能让别人知道密钥的内容。而在现代，见面是为了确认public key的真实性，public key的内容是可以公开的。

那如果有其他办法能保证public key的真实性，A和B是可以不用见面交换public key的。

![](https://p.ipic.vip/ymd4t5.png)

![](https://p.ipic.vip/y1r447.png)

![](https://p.ipic.vip/5jalb5.png)

### 4、CA（Certificate Authority）

现实中，通过CA（Certificate Authority）来保证public key的真实性。CA也是基于非对称加密算法来工作。有了CA，B会先把自己的public key（和一些其他信息：域名、公司名等）交给CA。CA核实真实性，并用自己的private key加密这些数据，加密完的数据称为B的**数字证书**。现在B要向A传递public key，B传递的是CA加密之后的数字证书。A收到以后，会通过CA发布的**CA证书**（包含了CA的public key），来解密B的数字证书，从而获得B的public key。

但是等等，问题：

1. A怎么确保CA证书不被劫持。B把自己的数字证书发给A的过程中，中间人C是可以得到B的数字证书的，当然也可以解密B的数字证书，得到B的public key。但C没法伪造B的数字证书（C没有CA的私钥），A拿到数字证书的第一步就是校验证书的合法性。

除非有种情况，A内置的CA证书被篡改了，例如A使用了盗版的系统，“优化”了的非官方浏览器，或者被病毒攻击了，那这个时候，A**有可能**会认可非CA认证的数字证书，C就有机会发起中间人攻击。所以，用正版至少是安全的。

实际的https传输：由于非对称加密很复杂，消耗资源和时间多，非对称加密只会用来传递一条信息，那就是用于对称加密的密钥。后续通过对称加密算法进行网络通信。

参考文档：

1. [浅谈SSL/TLS工作原理](https://zhuanlan.zhihu.com/p/36981565)

## 2、证书详细剖析

生成证书的标准流程是这样的：

1. 生成自己的私钥文件(.key)
2. 基于私钥生成证书请求文件(.csr)
3. 将证书请求文件(.csr)提交给证书颁发机构（CA），CA会对提交的证书请求中的所有信息生成一个摘要，然后使用CA根证书对应的私钥进行加密，这就是所谓的“签名”操作，完成签名后就会得到真正的签发证书(.cer或.crt)
4. 用户拿到签发后的证书，可能需要导入到自己的密钥库中，如Java的keystore，或根据需要再进行各种格式转换(.pem .p12 .jks等等)

![](https://p.ipic.vip/9jr36r.png)

![](http://image.huawei.com/tiny-lts/v1/images/7db7c46d0fedd42e8e1c654fcff34078_1909x780.png)


### 标准的CA签发流程:

```
1. 创建私钥（.key)
openssl genrsa -out my.key 2048

2. 基于私钥创建证书签名请求（.csr）
openssl req -new -key my.key -out my.csr -subj "/C=CN/ST=shanghai/L=shanghai/O=example/OU=it/CN=domain1/CN=domain2"

3. 直接同时生成私钥和证书签名请求
openssl req -new -newkey rsa:2048 -nodes -keyout my.key -out my.csr -subj "/C=CN/ST=shanghai/L=shanghai/O=example/OU=it/CN=domain1/CN=domain2"

```

### 生成自签名证书:

```
1. 创建私钥（.key)
openssl genrsa -out my.key 2048

2. 基于私钥创建证书签名请求（.csr）
openssl req -new -key my.key -out my.csr -subj "/C=CN/ST=shanghai/L=shanghai/O=example/OU=it/CN=domain1/CN=domain2"

3. 使用自己的私钥（.key）签署自己的证书签名请求（.csr），生成自签名证书（.crt）
openssl x509 -req -in my.csr -out my.crt -signkey my.key -days 3650
```

### 生成私有CA签发的证书:

自签名证书和私有CA签发的证书的区别：

如果你的规划需要创建多个证书，那么使用私有CA的方法比较合适，因为只要给所有的客户端都安装了CA的证书（根证书），那么以该证书签名过的证书，客户端都是信任的，也就是安装一次就够了。

如果你直接用自签名证书，你需要给所有的客户端安装该证书才会被信任，如果你需要第二个证书，则还的挨个给所有的客户端安装证书2才会被信任。


与生成自签名证书不同地方在于，生成自签名证书场景下只有一个参与方，请求证书和签发证书都是自己，而生成私有CA证书的场景里开始涉及两个角色了:

签发证书的一方：CA（主要牵涉的是CA私钥和根证书）
2.请求签发证书的一方：如服务器

```
1. 生成CA私钥（ca.key）和CA自签名证书（ca.crt）
openssl req -x509 -newkey rsa:2048 -nodes -keyout ca.key -out ca.crt -days 3650  -subj "/C=CN/ST=shanghai/L=shanghai/O=example/OU=it/CN=domain1/CN=domain2"
可以看到私有CA证书其实就是一个普通的自签名证书，至此环节时，还没有任何特殊之处。
2. 生成Server端私钥（server.key）和证书签名请求（server.csr）
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr -subj "/C=CN/ST=shanghai/L=shanghai/O=example/OU=it/CN=domain1/CN=domain2"
3. 使用CA证书（ca.crt）与密钥（ca.key）签署服务器的证书签名请求（server.csr），生成私有CA签名的服务器证书（server.crt）
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 3650
4. 验证server.crt是否真得是由ca签发的：
openssl verify -CAfile ca.crt server.crt

最终得到的文件：
ca.crt
ca.key
server.csr 序列号
server.key
ca.srl
server.crt

检查已创建的证书：
openssl x509 -text -noout -in certificate.pem
```

参考文档：

1. [使用OpenSSL生成/签发证书的原理、流程与示例](https://blog.csdn.net/bluishglc/article/details/123617558)
