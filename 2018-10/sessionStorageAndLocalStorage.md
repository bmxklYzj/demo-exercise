# sessinoStorage/localStorage/window.name

## sessinoStorage/localStorage

### 相同

都可存储5M数据，存储方式采用key、value的方式，value是字符串（存json数据需要stringify），api都相同，都有如下5方法和一个length属性：

|:方法或属性:|:说明:|
|-----|-----|
|getItem|sessionStorage.getItem(key) 等价于 sessionStorage[key]|
|setItem|sessionStorage.setItem(key, value) 等价于 sessionStorage[key] = value|
|removeItem||
|clear||
|key|返回当前 sessionStorage 对象的第index序号的key名称。若没有返回null|
|length 属性||


### 区别：

sessinoStorage **单个标签页**中的**同源页面**（协议、域名、端口都一致）中生效。

存在场景：
1. 刷新浏览器标签页
2. 关闭标签页后通过 command+shift+t 恢复标签页

销毁场景：
1. 关闭浏览器、关闭tab
2. 新开tab页

localStorage 则**只有同源页面的限制**，多个tab页是可以共享的

销毁场景：手动调用reveItem、clear清除，其余场景都会存在。

## window.name

window.name 同一个标签页总是不变，没有跨域限制，所有也可以作为跨域的一个方法。

存在场景：刷新、跳转到任意同源/非同源的页面
销毁场景：关闭 浏览器/tab

用window.name跨域方法：a域下有a/a.html，需要请求b域下数据。则b把数据放到b/b.html中window.name下。a/a.html通过内嵌ifram的方式引入b/b.html，然后iframe再跳转到a域的a/proxy.html(因为在a/a.html中不能访问到跨域的 iframe b/b.html中的内容)，最后a/a.html读取iframe的window.name

```html
<body>
<iframe id="proxy" src="http://b/b.html" style="display: none;" onload = "getData()">

<script>
    function getData() {
        var iframe = document.getElementById('proxy);
        iframe.onload = function() {
            // 获取b.html在window.name中设置的值
            var data = iframe.contentWindow.name;
        }
        iframe.src = 'b.html';
    }
</script>
</body>
<!-- https://blog.csdn.net/u013558749/article/details/56968333 -->
```
