## 某人工智能公司前端

自我介绍

对比vue的双向数据流和react的单项数据流：vue除表单为是单向数据流，表单组件是双向数据流。

```js
// 文氏图
// 已知求叶子面积的函数、大圆半径、小圆半径三个参数
function getArea(distance) {
    retun distance;
}
var minCircleRadius = 1;
var maxCircleRadius = 10;

var precius = 0.01;
function getRes() {
    for (var i = minCircleRadius + maxCircleRadius; i >= 0; i = i - precius) {
        if (~~(getArea(i)) === 50) {
            return i;
        }
    }
}

getRes();

// 二分法优化（其实有问题 应该是 while (min < max) 注意死循环问题）
function getRes2() {
    var min = 0;
    var max = minCircleRadius + maxCircleRadius;
    var middle;
    const targetArea = 50;
    while (true) {
        middle = (min + max) / 2;
        var res = ~~getArea(middle);
        if (res === targetArea) {
            return middle;
        }
        else if (res > targetArea) {
            max = middle;
        }
        min = middle;
    }
}
```

## 某新闻客户端

编程题1：

给定一个数组，填充unique函数，返回name的值组成的数组

```js
arr = [
    {id: 1, name: 'a'},
    {id: 2, name: 'a'},
    {id: 3, name: 'b'},
    {id: 4, name: 'b'}
];

Array.prototype.unique = function() {
}
// 返回 ['a', 'b']
```

解答

```js
Array.prototype.unique = function() {
    let uniqueName = {};
    this.forEach(item => {
        let key = item.name;
        if (!key) {
            uniqueName[key] = 1;
        }
        else {
            uniqueName[key]++; // 为了以后扩展，比如要统计出现的次数
        }
    });
    return Object.keys(uniqueName);
}
```

编程题2:

基于proxy实现访问对象的不存在属性时报错： 'property ${property} not exist'

```js
var obj = {
    a: 1,
    b: 2
};
obj.c // property c not exist
```

解答： 不会proxy用defineProperty做了，但是有问题

```js
Object.defineProperty('obj', function () {
    set() {

    },
    get(key) {
        if (this[key] === undefined) { // 面试时没考虑到值就是undefined的情况
            throw new Error(`property ${key} not exist`)
        }
    }
});
```