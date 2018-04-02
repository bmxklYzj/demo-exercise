# vue小结

## computed、watch、method

1. computed和watch：

watch是更为通用的监听变量变化的方法，但通常情况下如果是两个变量之间有依赖关系时使用computed更合适，比如 `fullName = firstName + lastName`。如果是要在数据变化时执行一些其它操作（例如请求ajax）这时候应该用watch

```js
var vm = new Vue({
    el: '#app',
    data: {
        firstName: 'zongjun',
        lastName: 'yang',
        fullName: ''
    },
    computed: {
        fullName: function () {
            return this.firstName + this.lastName;
        }
    },
    // bad way
    // watch: {
    //     firstName: function (val) {
    //         this.fullName = val + this.lastName;
    //     },
    //     lastName: function (val) {
    //         this.fullName = this.firstName + val;
    //     }
    // }
});
```

computed默认只有get方法，也可以为其提供set方法：

```js
computed: {
    fullName: {
        set: function (value) {
            var names = value.split(' ');
            this.firstName= names[0];
            this.lastName= names[1];
        },
        get: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
}
```

2. computed和method：

计算属性会基于依赖进行缓存，如果依赖没变那么不需要重新计算，而方法则会每次重新计算。

```js
computed: {
    reversedMsg: function () {
        return this.message.split('').reverse().join('');
    }
},
methods: {
    reverseMsg: function () {
        return this.message.split('').reverse().join('');
    }
}
```

## 用key管理可复用的元素

常见的是在v-for循环中渲染表单元素，如果每个input框没有唯一的key，那么vue会最大程度的复用现有已渲染dom，输入的值会保留。一旦加入唯一的key，就不会被复用

```html
<div id="app">
    <template v-if="loginType === 'username'">
        <label>username</label>
        <input type="text" placeholder="username" key="1">
    </template>
    <template v-else="loginType === 'email'">
        <label>username</label>
        <input type="text" placeholder="email" key="2">
    </template>
    <button @click="toggleLoginType">toggle</button>
</div>
```

reference：[vue offical website](https://cn.vuejs.org/v2/guide/conditional.html)

## v-if 和 v-show

v-show会在初始时候就渲染并始终保留在dom中，只是简单的切换display属性。
v-if如果初次为false则什么也不做，在第一次为true时才渲染。每次切换都会 销毁/创建 对应的事件监听器和子组件

v-show有更大的初始渲染开销，v-if有更大的切换开销。
因此如果元素切换频繁使用v-show，如果运行时条件很少改变使用v-if

**需要注意：** v-show 不能用于template，其后面也不能接v-else

## v-for

[v-for](https://github.com/bmxklYzj/demo-exercise/blob/master/2018-03/vue/vue-for/vue-for.md)

