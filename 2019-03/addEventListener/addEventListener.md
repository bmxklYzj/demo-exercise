# addEventListener 及其 passive 参数

`addEventListener(type, listener)`

第三个参数选填，可以传入两个参数：Boolean或Object

不填则默认为false，即 `{capture: false}`，capture字段表示是否在事件捕获阶段触发。为true则在捕获阶段触发，为false则在冒泡阶段触发。

为Objtct时:

```
{
    capture: Boolean // 事件捕获阶段传播到该 EventTarget 时触发
    once: Boolean // 表示listener在添加之后最多只被调用一次，调用之后会被移除
    passive: Boolean // 表示listener中不会调用preventDefault ，如果调用浏览器会抛出警告
}
```

对passive的理解是个难点，花了好久才写对demo：

```js
var wrap = document.querySelector('.wrap');
    var touchstartTime;
    wrap.addEventListener('scroll', function (e) {
        var scrollTime = +(new Date());
        console.log(`scroll: touchstartTime:${touchstartTime}, scrollTime - touchstartTime: ${scrollTime - touchstartTime}`);
        // e.preventDefault();
    }, {passive: true});
    // passive 标志不会调用 preventDefault
    wrap.addEventListener('touchstart', function (e) {
        touchstartTime = +(new Date());

        var computeStartTime = +(new Date());
        var res = 0;
        for (var i = 0; i < 1 * 1e9; i++) {
            res = i;
        }
        var computeEndTime = +(new Date());

        console.log(`compute time spend: ${computeEndTime - computeStartTime}`);
        console.log(`touchstart : ${touchstartTime}`);
    }, {passive: true});
```

浏览器在处理滚动事件时，如果passive为false，表示在相关事件如touch系列事件可能会调用preventDefault阻止默认行为（比如有这样的需求：在touchmove中调用preventDealt，最终期望是不能滚动的），所以浏览器会执行完相关listener之后发现没有preventDefault，这时候才会去触发滚动。那就有个问题，如果listener中有较耗时的操作，那么就会明显感觉到滚动事件有延迟。

所以，如果我们明确不会阻止默认事件，可以设置passive: true告诉浏览器在listener中我不会调用preventDefalut，所以滚动事件可以立即响应，不必要等到touch事件的listener执行完毕。

效果demo：
- [scroll-passive-false 卡顿](https://bmxklyzj.github.io/demo-exercise/2019-03/addEventListener/scroll-passive-false.html)
- [scroll-passive-true 不卡顿](https://bmxklyzj.github.io/demo-exercise/2019-03/addEventListener/scroll-passive-true.html)

reference：

- mdn： https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
- google：https://developers.google.com/web/updates/2016/06/passive-event-listeners?hl=zh-cn
- cnblog： https://www.cnblogs.com/ziyunfei/p/5545439.html