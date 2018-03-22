# 滑动吸顶案例实现

1. 需求：

一个bar开始时候在页面的中部，页面向上滑动，这个bar到顶的时候就需要吸顶。 [demo效果：网易新闻移动端](http://3g.163.com/touch/news/subchannel/all?version=v_standard&dataversion=A&uversion=A)


2. 分析：

先用最简单的css position sticky 实现：

```css
.sticky {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
}
```

但 sticky 兼容性不是很好，所以应该监听 scroll 事件，如果sticky元素超过了viewport则让其添加fixed类名：

```css
.fixed {
    position: fixed;
    top: 0;
}
```

最终demo如下：

[最终demo](https://bmxklyzj.github.io/demo-exercise/2018-03/scroll-and-sticky/demo/index.html)

# postion: sticky 属性详解

如mdn所言，sticky是relative和fixed的结合，当满足 top, right, bottom 或 left 四个阈值其中之一时他就是 fexed，否则是relative。但是它这个fixed布局不是相对于浏览器窗口，而是相对于最近的scroll祖先元素。（要证明这个可以看这下一节两个demo示例）

例如：

```css
{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```

设定的阈值是 top:0 ，这个值表示当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 relative 定位表现，而当元素距离页面视口小于 0px 时，元素表现为 fixed 定位，也就会固定在顶部。

sticky的兼容性：ff和ios上的浏览器支持良好，但chome 55版本才支持，ie不支持、android 5之前不支持。所以目前还不能完全依赖这个css属性。靠谱的方法应该是首先用 css ，然后用js能力检测的方式判断如果不支持sticky就需要监听scroll，判断如果document的scrollTop大于当前元素的offsetTop，那么当前元素就需要fixed。

# postion: sticky 触发阀值之后的“粘贴性”

1. 父元素是relative布局且设置overflow: scroll;
2. 父元素是fixed布局且设置overflow: scroll;
2. 父元素是absolute布局且设置overflow: scroll;

> position: sticky 的元素是不会“超出”父元素的。当滚动时，父元素也快离开屏幕时，子元素是不会继续保持 sticky 的状态的，它会随着父元素一起“滚”出屏幕。
同时，sticky的粘贴范围是最近的scroll父元素

reference：

1. [简书](https://www.jianshu.com/p/b72f504121f5)
2. [ayqy](http://www.ayqy.net/blog/%E5%90%B8%E9%A1%B6%E6%95%88%E6%9E%9C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)

sticky:

1. [cnblog](http://www.cnblogs.com/coco1s/p/6402723.html)
3. [mdn position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)