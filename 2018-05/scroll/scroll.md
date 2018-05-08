# 理解scroll事件

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

这里的关键是要弄明白 “滚动框” 的含义。 参考 [css-tricks html vs body in css](https://css-tricks.com/html-vs-body-in-css/)

>

html 是文档的根元素，body 和 head 是其直接子元素。css中有个伪元素选择器`:root`也表示根元素，但是其权重比html要高。 [jsfinddle :root selector](https://jsfiddle.net/bmxklyzj/hmmy9n7s/)

![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/root-selector.png
)