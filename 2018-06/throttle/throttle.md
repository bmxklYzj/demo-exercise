# 节流函数util

在 scroll、mouseenter、mouseleave等如果频繁触发且包含较重的逻辑就会导致浏览器卡顿，

```js
window.addEventListener('scroll', function () {
    console.log('scroll');
}, false);
```
[查看demo](https://bmxklyzj.github.io/demo-exercise/2018-06/throttle/demo/scroll.html)

这时候就需要进行节流提高性能：

## 在滚动结束之后执行一次 事件处理程序

```js
window.addEventListener('scroll', debounce(eventHandler, this, 100), false);

function eventHandler() {
    console.log('event handler');
}

function debounce(method, context, delay) {
    var timeId = null;
    return function () {
        console.log('event');
        clearTimeout(timeId);
        timeId = setTimeout(function () {
            method.call(context);
        }, delay);
    };
}
```
[查看demo](https://bmxklyzj.github.io/demo-exercise/2018-06/throttle/demo/scroll-exec-when-end.html)

## 在滚动过程中设置执行的最小间隔时间 事件处理程序

比如下拉刷新的操作，并不是要滚动完成才加载，而是在滚动过程中就要不断加载

```js
window.addEventListener('scroll', throttle(eventHandler, this, 100, 1000), false);

function eventHandler() {
    console.log('event handler');
}

function throttle(method, context, delay, mustRun) {
    var timeId = null;
    var previous = new Date();
    return function () {
        console.log('event');
        var current = new Date();
        if (current - previous > mustRun) {
            method.call(context);
            previous = current;
        }
        else {
            clearTimeout(timeId);
            timeId = setTimeout(function () {
                method.call(context);
                previous = current;
            }, delay);
        }
    };
}
```
[查看demo](https://bmxklyzj.github.io/demo-exercise/2018-06/throttle/demo/scroll-exec-interval.html)


reference：

1. [imweb.io javaScript 函数节流](http://imweb.io/topic/577aa790ea7bb9b760c7adc3)
1. [cnblog 【前端性能】高性能滚动 scroll 及页面渲染优化](http://www.cnblogs.com/coco1s/p/5499469.html)