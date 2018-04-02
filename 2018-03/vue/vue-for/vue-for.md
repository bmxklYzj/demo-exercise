# vue中的for循环

## vue2

1. 遍历语法

遍历数组： (item [, index]) in array

也可以用 item of array

遍历对象： (item, [, key [, index]]) in obj

2. vue2中的key

vue默认是就地复用，也就是绑定的是 `:key="index"`

[demo 地址，打开控制台，切到element面板](https://bmxklyzj.github.io/demo-exercise/2018-03/vue/vue-for/vue2-for-key-default.html)

html中for循环如下：

```html
<ul>
    <!-- 默认也是 :key="index" -->
    <li v-for="(item, index) in lists" :key="index">{{item.text}}</li>
</ul>
```

初始数据为：

```js
lists: [
    {
        text: 1
    },
    {
        text: 2
    },
    {
        text: 3
    }
]
```

修改后数据：

```js
this.lists = [
    {
        text: 1
    },
    {
        text: 4
    },
    {
        text: 3
    },
    {
        text: 2
    }
];
```

可以看到默认是根据index来原地复用

index为1和3的两个节点其值没变化，所以dom不会更新，

index为2的节点其值变化了，dom更新

index为4的节点是新加入的，dom更新


解析图、效果图如下：

![解析图](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/pic-by-sketch.png)


![效果图](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/vue2-for-default.png)

-----分割线------

如果是给key绑定了唯一的id，则会根据此唯一id来标识、检索、替换对应的dom。

[demo 地址](https://bmxklyzj.github.io/demo-exercise/2018-03/vue/vue-for/vue2-for-key-special-id.html)

html中for循环如下：

```html
<ul>
    <!-- 默认也是 :key="index" -->
    <li v-for="(item, index) in lists" :key="item.id">{{item.text}}</li>
</ul>
```

初始数据为：

```js
lists: [
    {
        text: 1,
        id: 1
    },
    {
        text: 2,
        id: 2
    },
    {
        text: 3,
        id: 3
    }
]
```

修改后数据：

```js
this.lists = [
    {
        text: 44,
        id: 4
    },
    {
        text: 1,
        id: 1
    },
    {
        text: 22,
        id: 2
    },
    {
        text: 3,
        id: 3
    }
];
```

可以看到根据id来复用，index为1和3的两个节点其值没变化，尽管其在数组中的位置变化了，但是根据id来检索的，和元素顺序没有关系，所以dom不会更新，解析图、效果图如下：

![解析图](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/pic-by-sketch.png)

![效果图](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/vue2-for-special-id.png)

## vue1

[默认是全部重新渲染dom的](https://bmxklyzj.github.io/demo-exercise/2018-03/vue/vue-for/vue1-for-default.htm)

[如果使用了`track-by="$index"`，则会和vue2的 `:key="index"类似，原地复用`](https://bmxklyzj.github.io/demo-exercise/2018-03/vue/vue-for/vue1-for-track-by-$index.htm)

[如果使用了`track-by="user-define-id"`，则会根据自定义唯一id来复用`](https://bmxklyzj.github.io/demo-exercise/2018-03/vue/vue-for/vue1-for-track-by-special-id.htm)




reference:
1. [cnodejs](https://cnodejs.org/topic/5811769c1a9a7d990953119e)
2. [zhihu](https://www.zhihu.com/question/61064119)