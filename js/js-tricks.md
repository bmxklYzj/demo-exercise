# js工具&tricks收藏

有时候看到一些很棒的代码，觉得很赞，自己不容易想到的实现方式，记录一下

## 1. 判断文件名的后缀

```js
fileName.split('.').pop().toLowerCase();
```

自己之前遇到过类似情况是用正则来写的，其实很不优雅。

```js
var r = /.(\w+)$/;
console.log(r.exec(fileName)[1]);
```

## 2. 判断数据类型

```js
Object.prototype.toString.call(variable).slice(8, -1);
// 例如:
var s = 'hello';
Object.prototype.toString.call(s); // returns: [object String]
Object.prototype.toString.call(s).slice(8, -1); // returns: String
```

## 3. 判读dom元素是否在当前 viewport内

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

## 4. 判断两个dom元素是否有重叠

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

## 5. 把字符串重复n遍

```js
s = 'x';
var n = 100;
new Array(n + 1).join(s);
```

## 6. ~和~~

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



## 7. 从url获取query

   1. 正则方式：

   ```
   function getParameterByName(name, url) {
       if (!url) url = window.location.href;
       name = name.replace(/[\[\]]/g, '\\$&');
       var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
           results = regex.exec(url);
       if (!results) return null;
       if (!results[2]) return '';
       return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }
   ```

   2. split方式：

   ```
   function getQuery() {
               var urlSearch = location.search;
               var query = {};
               var queryList = (urlSearch.split('?')[1] || '').split('&').forEach(item => {
                   var temp = item.split('=');
                   query[temp[0]] = decodeURIComponent(temp[1] || '');
               });
               return query;
           }
   ```

   3. URLSearchParams：

   ```
   const urlParams = new URLSearchParams(window.location.search);
   const myParam = urlParams.get('myParam');
   ```

   [mdn](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams?a=1&b=2#Browser_compatibility) 接收 `a=b&c=d ` 这样的 `location.search` 字符串，前面`?`是可选的。ie不支持，其它浏览器都支持。

## 检查addEventListener是否支持passive
链接：https://juejin.im/post/5ad804c1f265da504547fe68

第三个参数是在近段时间才被调整为一组配置项，如果我们需要兼容旧版浏览器，我们需要写一些检测代码。

```
var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}
复制代码
```

这段代码为`passive`属性创建了一个带有getter函数的`options`对象；getter设定了一个标识，`passiveSupported`，被调用后就会把其设为`true`。那意味着如果浏览器检查`options`对象上的`passive`值时，`passiveSupported`将会被设置为`true`；否则它将保持`false`。然后我们调用`addEventListener()`去设置一个指定这些选项的空事件处理器，这样如果浏览器将第三个参数认定为对象的话，这些选项值就会被检查。


