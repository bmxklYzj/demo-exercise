# background on body and html

对于一个普通的div标签，我们都了解`background-color`会应用在`content + padding`上，border的颜色是用border属性控制的，margin始终是transparent的，如demo： https://jsfiddle.net/bmxklyzj/wL3rjhhr/

截图：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/background_on_div.png
)

但是！浏览器背景色填充是一个特殊的点。

demo: https://jsfiddle.net/bmxklyzj/sc50m58b/

截图：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/body-background-color.png
)

body的高度明明很窄，为什么整个文档的背景色是红色的？

在 [css-tricks background on body](https://css-tricks.com/just-one-of-those-weird-things-about-css-background-on-body/) 一文中说到：

>In the absence of a background on the html element, the body background will cover the page. If there is a background on the html element, the body background behaves just like any other element.

document的background-color会先从html元素上取，如果html中该属性是 `transparent` （没有设置默认是transparent），则会取body的属性。

demo： [同时在body和html上设置background-color](https://jsfiddle.net/bmxklyzj/sc50m58b/)

>当`<html>`标签无背景样式时，`<body>`的背景色其实不是`<body>`标签的背景色，而是浏览器的。一旦html标签含有背景色，则`<body>`的背景色变成了正常的`<body>`标签（一个实实在在，普普通通标签）的背景色，而此时的`<html>`标签最顶级，背景色被浏览器获取，成为浏览器的背景色。

最佳实践：把background-color加在body上。


[css-tricks html vs body in css](https://css-tricks.com/html-vs-body-in-css/)

>总结下上面的css-tricks文章：
>1. html 是文档的根元素，body 和 head 是其直接子元素。css中有个伪元素选择器`:root`也表示根元素，但是其权重比html要高。 [jsfinddle :root selector](https://jsfiddle.net/bmxklyzj/hmmy9n7s/)
>![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/root-selector.png
)
>2. html是根元素，那是否是我们希望继承的属性值都设置在html上？其实不是，如果是使用rem那么其字体是相对于html的，这时候font-size应该设置在html上，但其它的属性按照约定应该放到body上，比如我们孰知的默认body有个`margin: 8px;`
>3. background-color属性比较特殊，浏览器背景会优先从html取，再从body取，即html优于body




reference:

https://css-tricks.com/html-vs-body-in-css/

http://www.zhangxinxu.com/wordpress/2009/09/%E5%AF%B9html%E4%B8%8Ebody%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6%E4%B8%8E%E7%90%86%E8%A7%A3/

https://stackoverflow.com/questions/34698257/why-doesnt-background-color-on-body-work