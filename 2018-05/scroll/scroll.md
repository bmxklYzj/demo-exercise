# 理解scroll事件

## 遇到的一个问题

https://m.baidu.com/mip/c/s/youyi.baidu.com/site/2C1CBE210C557C84FF596FC4E26599C8

正文内容是在iframe中，iframe的html和body应用了如下样式：

```css
html, body {
  height: 100% !important;
  overflow-y: auto;
}
```

js中监听了window事件的滑动

```js
$(window).bind('scroll', function () {
  // do something
})
```

但是在上述css和js 情况下 js监听的scroll事件不生效，由此查找问题有了下文。

## 由一个问题引发对scroll的思考

[jsfinddle demo](https://jsfiddle.net/bmxklyzj/f4bo4yxy/)

正常情况下body中的内容如果很长，高度超过屏幕高度，那么 body、html 的高度都会随着变高。这时候监听 `window` 的滚动事件是可以达到页面滚动监听效果的

```js
$(window).bind('scroll', function() {
  console.log('window');
});
```

但是当css样式为

```css
html,
body {
  height: 100%;
  overflow: auto;
}
```

此时给 window 绑定的 scroll 事件就不起作用了。

**解决**

这里的关键是要弄明白 “滚动框” 的含义。 参考
[css-tricks scroll-behavior](https://css-tricks.com/almanac/properties/s/scroll-behavior/)


>what's this scrolling box we speak of? It's an element with content that overflows its bounds.
>滚动盒子：内容超出其边界的html元素

以下三个case帮助看清 scrool box 的原理

每次在js中打印如下的值：

```js
// $(window) 和 $(document) 类似，都指的是window窗口所占的大小（如果是iframe则是iframe的大小）
$(window).bind('scroll', function() {
  console.log('window');
});

$(document).bind('scroll', function() {
  console.log('document');
});

// 这个始终不生效，待查找原因
$('html').bind('scroll', function() {
  console.log('html');
});

// $('body') 和 $(document.body) 类似，都指document文档所占大小
$('body').bind('scroll', function() {
  console.log('body');
});

$(document.body).bind('scroll', function() {
  console.log('document.body');
});
```

1. html和body不加任何限制，body内容高度超过屏幕高度（若是iframe则是window的高度）

demo: https://jsfiddle.net/bmxklyzj/f4bo4yxy/2/

代码截图：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/scroll-normal.png
)

模拟图如下：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/scroll-normal-chart.png
)

可以根据 “scroll box” 的定义看出这里html和body两个标签均**不是** 滚动盒子。因为他们里面的内容并没有超出边界，html和body的高度就是内容的高度，所以无论如何，html和body不会触发滚动事件！

但是window和document可以理解为是固定的浏览器可见窗口，他们里面的内容（其内容是html元素）高度是超过了自身高度的，所以打印出了`document window`

2. html和body高度限制，且小于屏幕高度（若是iframe则是window的高度）

demo: https://jsfiddle.net/bmxklyzj/4ng1we6e/

代码截图：只有蓝色矩形区域可以滑动
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/scroll-fixed-height.png
)

模拟图如下：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/scroll-fixed-height-chart.png
)

html和body的宽高 和矩形区域一致。但在矩形区域滑动会触发body的scroll事件，而不会触发html的scroll事件。由于整个html小于屏幕，document和window的内容没有超过其高度，二者也就永远不会触发scroll事件，所以打印的是 `body document.body`

```
todo：这里有两个问题：

1. 为什么不会触发html的scroll事件？
2. 上面代码同时设置了html和body的属性 `height: 200px;overflow: auto;` ，如果只设置其中一个都是不生效的，为什么？
```


3. html和body高度为100%，等于屏幕高度（若是iframe则是window的高度）

demo: https://jsfiddle.net/bmxklyzj/bh2s59m5/

代码截图：略

模拟图如下：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/scroll-fixed-height-chart.png
)

其实原理和2中一样，只是这个的高度变成了屏幕高度（若是iframe则是window的高度）



reference：
1. https://css-tricks.com/almanac/properties/s/scroll-behavior/