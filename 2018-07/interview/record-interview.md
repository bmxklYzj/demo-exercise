# 面试历程

2018-07-09 早上10:30约了链家，下午3点约了头条。。

## 链家

先是链家的二面面试官面我（可能一面面试官当时没空，我就说最后面试结束时候我问咋没问我基础的js，他回答自己是二面面试官。）。

### 没有自我介绍，直接问我vue绑定对象的原理：

```js
Object.defineProperty(obj, 'a', {
    get: function () {

    },
    set: function () {

    }
})
```

### defineProperty 有没有delete方法？

- 没有，
- 问：那为什么？
- 答：可以通过set方法设置，比如设置为null
- 问：不对
- 答：我思考了两种可能：1. 没法实现； 2. 有副作用
- 问：之前firefox实现了一个基于proxy，后来有性能问题又删掉了

### CORS

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Origin`
- `Access-Control-Request-Headers`
- 默认并不会携带cookie，这时需要服务端设置`Access-Control-Allow-Credentials`，前端ajax设置xhr.withCredential

### post 提交数据格式：

- application/x-www-form-urlencoded 原生form表单
- multipart/form-data input file类型上传二进制、Boundary分隔
- application/json ajax提交

### 函数的防抖和节流

防抖和节流都是尽量避免频繁触发事件，导致卡顿。以下均以向下滚动刷新为例

防抖（debounce）在滚动时清除之前的setTimeout，并重新设置setTimeout。但是有个问题，我一直向下滚动不停，是不会加载的，如果希望下滚的过程中不断加载，就需要设置一个最小执行时间。

节流（throttle）：即使页面不停滚动，也可以以一定频率触发事件

### v-for的更新时的复用策略

### CSRF/XSS

### vue-router的路由模式

hash和history 各自优缺点，hash代码片段会丢失，常见于单点登录系统，用localStorage解决。history的问题再于后端需要监听路由地址并区分ajax，是路由则返回html，是ajax返回数据。

- 问：history实现的原理？
- 答：pushState、popState、replaceState

这里不明白，是面试官一步步引导我的，面试真的也是查漏补缺的过程。

### 尽可能多的css垂直居中

- 设置上下padding
- `flex`
- `display: table-cell;`
- translateY:
    ```css
    父元素position: relative;
    本身position:absolute;
    top: 50%;
    transform: translateY(-50%);
    ```
- margin平分剩余空间
    ```css
    父元素position: relative;
    本身position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 200px; // 假设父元素高度高于200
    margin: auto;
    ```

面试官补充：还有其它一些trick方法比如：设置字体渲染方式为从上到下（默认为从左到右），然后设置`margin: 0 auto;`

### 平时从哪里学习技术

团队博客，个人博客和issue博客

### 有什么要问的？

部门业务，组织结构

## 链家第二次面试（一面）

### 自我介绍

### 用less写个pxtorem的函数

写错了。正解为：

```
// 例如输入20输出1rem
.pxtorem(@name, @val) {
    @{name}: @val / 20rem;
}

// 用法
.class {
    .pxtorem(width, 20);
}
```

### `s = 'abcdefabcab';` 找出出现最多的字母（可能有多个）

easy题，先循环一下转成对象：

```js
obj = {
    a: 3,
    b: 3,
    ...
}
```

然后根据value找出出现次数最多的count，再遍历obj输出value为count的key。

```js
// 打印出现最多的字母
let s = 'abcdefabcdefab';
let obj = {};
for (let i = 0, len = s.length; i < len; i++) {
    if (obj[s[i]]) {
        obj[s[i]]++;
    }
    else {
        obj[s[i]] = 1;
    }
}

let vals = Object.values(obj);
// let max = Math.max.apply(null, vals); // the same as the following
let max = Math.max(...vals);

let keys = Object.keys(obj);
let res = [];
keys.forEach(item => {
    if (obj[item] === max) {
        res.push(item);
    }
});

console.log(res);
```

### css实现三角形

当时自信满满，回来一试才发现写错了，正解：

```css
border-left: 5px solid transparent;
border-right: 5px solid transparent;
border-bottom: 10px solid #000;
```

### js 作用域链和原型

每个函数都有显式原型原型 `prototype` ，显式原型指向函数的原型对象

每个对象都有隐式原型 `__proto__` ，隐式原型执行 构造此对象的构造函数的显式原型

例如：`var arr = new Array(1, 2);` 则 `arr.__proto__ === Array.prototype`

arr之所以有push方法，是因为它沿着原型链`__proto__`向上找到了`Array.prototype`


### 薪资：套路。。

## 头条面试总结：一面

做一套前端题目，然后根据这个题目来分散问。比如有一道题是问。react中父子组件更新setState的原理。自己对于react不了解，然后面试官就开始问我vue相关的原理

### vue的生命周期
子组件如何修改父组件的变量：
答：子组件emit一个自定义事件，父组件接收事件并做处理。

### 父子组件生命周期
computed怎么实现的：a=b+c 怎么知道a依赖b和c。答案：会调用b和c的get

### 尾递归
### 深拷贝
### csrf：post会有问题吗？

## 二面

cors
csrf
xss及其白名单
移动营销页：怎么设计组件

## 三面

介绍下做过的项目及你认为的难点，解决过的问题

某个项目你觉得流程需要优化，怎么说服老板挺你的情，给你时间和资源来优化

之前做过的open2项目的背景，效果，收益 是什么，你有主动去了解过吗？比如一次改版需求有调研统计过改版的效果和收益吗

移动营销页 怎么提高转化率，我说主要靠表单提高线索。那不同的表单有多个样式，调研统计过哪个效果更好，使用的更多，转化率更高呢。


## 四面

不使用`querySelectorAll`写个类似的选择器，比如 `.a ul .b` 选择`.a`下面的所有`.b`且他们之间有`ul`

## 五面

一个函数两个参数：n和数组a。代表一个骰子有n面，每个面出现的概率存在数组a中，下标从1到n。函数返回某一次掷骰子后返回的点数，既模拟一次掷骰子

## 六面：hr面

头条是中间换了一个小组，所以面试了很多次
