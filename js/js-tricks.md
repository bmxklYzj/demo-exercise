# 技术tricks收藏

有时候看到一些很棒的代码，觉得很赞，自己不容易想到的实现方式，记录一下

1. 判断文件名的后缀

```js
fileName.split('.').pop().toLowerCase();
```

自己之前遇到过类似情况是用正则来写的，其实很不优雅。

```js
var r = /.(\w+)$/;
console.log(r.exec(fileName)[1]);
```

2. 判断数据类型

```js
Object.prototype.toString.call(variable).slice(8, -1);
// 例如:
var s = 'hello';
Object.prototype.toString.call(s); // returns: [object String]
Object.prototype.toString.call(s).slice(8, -1); // returns: String
```

3. 判读dom元素是否在当前 viewport内

```js
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0
        && rect.left >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
```

4. 判断两个dom元素是否有重叠

```js
/**
 * 判断两个元素是否有重叠 ref: https://github.com/mipengine/mip/blob/master/src/dom/rect.js#L171-L174
 * @param {Object} rect1
 * @param {Object} rect2
 * @return {boolean}
 */
function overlapping(rect1, rect2) {
    return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom
        && rect1.left <= rect2.right && rect2.left <= rect1.right;
}
```

5. 把字符串重复n遍

```js
s = 'x';
var n = 100;
new Array(n + 1).join(s);
```

6. ~和~~

~是按位非：`~n === -(n+1)`

常见用法：

```js
// ~-1 === 0
if (~str.indexOf('a')) {
    // find it
}
else {
    // not find
}
```

`~~` 等价于 `Math.floor()`
