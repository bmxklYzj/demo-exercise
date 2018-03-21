# 滑动吸顶案例实现

1. 需求：

一个bar开始时候在页面的中部，页面向上滑动，这个bar到顶的时候就需要吸顶。 [demo效果：网易新闻移动端](http://3g.163.com/touch/news/subchannel/all?version=v_standard&dataversion=A&uversion=A)


2. 分析：


# postion: sticky 属性详解

如mdn所言，sticky是relative和fixed的结合，当满足 top, right, bottom 或 left 四个阈值其中之一时他就是 fexed，否则是relative。但是它这个fixed布局不是相对于浏览器窗口，而是相对于最近的非static祖先元素。（要证明这个可以看这两个demo：）

例如：

```css`
{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```

设定的阈值是 top:0 ，这个值表示当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 relative 定位表现，而当元素距离页面视口小于 0px 时，元素表现为 fixed 定位，也就会固定在顶部。

sticky的兼容性：ff和ios上的浏览器支持良好，但chome 55版本才支持，ie不支持、android 5之前不支持。所以目前还不能完全依赖这个css属性。靠谱的方法应该是首先用 css ，然后用js能力检测的方式判断如果不支持sticky就需要监听scroll，判断如果document的scrollTop大于当前元素的offsetTop，那么当前元素就需要fixed。

reference：

1. [简书](https://www.jianshu.com/p/b72f504121f5)
2. [ayqy](http://www.ayqy.net/blog/%E5%90%B8%E9%A1%B6%E6%95%88%E6%9E%9C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/)

sticky:

1. [cnblog](http://www.cnblogs.com/coco1s/p/6402723.html)
3. [mdn position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)