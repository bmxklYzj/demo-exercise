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

参考文档：

1. [浅谈SSL/TLS工作原理](https://zhuanlan.zhihu.com/p/36981565)

