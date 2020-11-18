# iframe 通信问题

## 同域iframe

最简单，不通的iframe之间可以互相访问修改 变量、dom、调用函数，总之具有完全的权限。

例子见 [同域iframe](./sameOrigin)

![同域iframe-互相访问](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2017-07/iframe-sameOrigin.png)


## 不同域iframe

不同域 不能相互访问。

模拟不同域时候我是用python创建了两个端口不一样的web服务器，目录结构如下，然后分别进入到两个文件夹中去启动web服务器，启动命令如 `python -m SimpleHTTPServer 8080`

```
.
├── test
│   └── index.html
└── test01
    └── iframe.html
```

![不同域iframe-报错](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2017-07/iframe-differOrigin.png)

### 不同域时的解决方案

1. postMessage()

语法：

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

message可以是字符串或者是任意js数据类型。但是低版本ie只支持字符串
targetOrigin指定给谁发送消息。格式为`protocal://hostName[:port]`

在接收端则需要监听 `message` 事件。事件参数中有重要的三个值：

1. data 表示传递过来的数据
2. source 表示是谁给我发的,是一个window的引用
3. origin 表示是谁给我发的：格式为`protocal://hostName[:port]`

**接收端在接收数据的时候一定要判断 origin或source ，因为任何其他窗口可以给你发送数据，需要判断数据的来源是否是自己想要的，否则会引起安全问题**
