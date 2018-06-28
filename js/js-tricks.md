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