[css-tricks html vs body in css](https://css-tricks.com/html-vs-body-in-css/)

>总结下上面的css-tricks文章：
>1. html 是文档的根元素，body 和 head 是其直接子元素。css中有个伪元素选择器`:root`也表示根元素，但是其权重比html要高。 [jsfinddle :root selector](https://jsfiddle.net/bmxklyzj/hmmy9n7s/)
>![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/root-selector.png
)
>2. html是根元素，那是否是我们希望继承的属性值都设置在html上？其实不是，如果是使用rem那么其字体是相对于html的，这时候font-size应该设置在html上，但其它的属性按照约定应该放到body上，比如我们孰知的默认body有个`margin: 8px;`
>3. background-color属性比较特殊，浏览器背景会优先从html取，再从body取，即html优于body
