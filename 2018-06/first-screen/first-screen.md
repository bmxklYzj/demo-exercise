# 首屏加载时间

通常的对于首屏加载时间的定义是：第一屏内所有元素（包括图片）都加载完毕的时刻。一般来说影响首屏时间的主要是首屏的最后一张图片，如果第一屏内没有图，则是DOMContentLoaded时刻（前提是页面内容中间没有js，因为 [js会中断ui渲染](./script-block-ui/script-block-ui.md)）


## mip 的首屏打点策略

在DOMContentLoaded和图片加载完毕都会执行tryRecordFirstScreen尝试记录FirstScreen
https://github.com/mipengine/mip/blob/master/src/performance.js#L101-L120

https://github.com/mipengine/mip/blob/master/src/performance.js#L105
inViewport方法是在
https://github.com/mipengine/mip/blob/master/src/resources.js#L163
执行setInViewport -> viewportCallback 设置的布尔值

判断是否在inViewport是：
在当前窗口viewport或者prerenderAllowed（在上一屏、下一屏）
https://github.com/mipengine/mip/blob/5dbdf45e7ac452e30121b14ec5479f90c676c80b/src/resources.js#L161
https://github.com/mipengine/mip/blob/5dbdf45e7ac452e30121b14ec5479f90c676c80b/src/components/mip-img.js#L319

总结下也就是说：如果图片在当前viewport或者上一屏、下一屏，当最后一个图片加载完毕则记录MIPFirstScreen，这三屏没有图片则是在DOMContentLoaded时刻记录

![mip-first-screen](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/mip-first-screen.png)

reference:
1. [zhihu 小爝](https://www.zhihu.com/question/23212408)