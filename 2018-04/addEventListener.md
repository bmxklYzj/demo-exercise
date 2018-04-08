# addEventListener 及其 passive 参数

一直以来我都以为 `addEventListener` 的函数签名是如下的：

`addEventListener(type, listener [, useCapture])`

第三个参数表示是否是在捕获阶段处理时间处理程序，默认为false，表示在冒泡阶段处理时间处理程序。


[最新的标准 mdn addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 显示第三个参数也可以是个对象（兼容性比较差，自己的 android 自带浏览器经测试不支持）

下面详细说下 第三个参数为对象的情况：

```
{
    capture: Boolean, // 是否在捕获阶段处理事件
    once: Boolean, // 只能够触发事件处理器一次
    passive: Boolean // 表示在事件处理器中不会调用 preventDefault()，如果调用了也会忽略
}
```

那么passive有什么作用呢？主要作用就是提高 scroll、touchmove 事件的顺滑度。以前如果对touchmove添加了一个事件，在开始滑动时候浏览器会执行事件处理程序（加假如耗时200ms），那么在这个事件处理程序执行完成之前屏幕不会滚动，执行过程中如果事件处理程序中有preventDefault就不会滚动，否则才会滚动。也就造成了浏览器页面真实的滚动总是慢于人的操作，如果事件处理程序中有比较耗时的操作，就会明显感觉到滑动过程慢一拍(当然如果滑动事件处理程序耗时较长，console也会给出warning提示)，参加 [未加passive参数，滑动慢一拍](https://bmxklyzj.github.io/demo-exercise/2018-04/addEventListener-default.html) [加passive参数，流畅](https://bmxklyzj.github.io/demo-exercise/2018-04/addEventListener-passive.html)


reference:

[zhihu justjavac](https://zhuanlan.zhihu.com/p/24555031)

[google passive](https://developers.google.com/web/updates/2016/06/passive-event-listeners)
