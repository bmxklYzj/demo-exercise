# react

- props: 外部传入数据

- state: 组件内部数据。
state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
如果你觉得还是搞不清 state 和 props 的使用场景，那么请记住一个简单的规则：尽量少地用 state，尽量多地用 props。

- constructor:
在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。
    ```js
    class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        value: null,
        };
    }
    }
    ```
- 状态提升：
当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。

- 函数组件和class组件(render/生命周期方法)

    class组件:
    ```js
    class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render() {
        return (
            <div>...</div>
        );
    }
    }
    ```
    当class组件中只有render方法时候可以简化成函数组件

    ```js
    function Clock(props) {
        return (
            <div>...</div>
        );
    }
    ```

- 两个特殊的属性： class/for

    ```
    注意，直接使用 class 在 React.js 的元素上添加类名如 <div class=“xxx”> 这种方式是不合法的。因为 class 是 JavaScript 的关键字，所以 React.js 中定义了一种新的方式：className 来帮助我们给元素添加类名。

    还有一个特例就是 for 属性，例如 <label for='male'>Male</label>，因为 for 也是 JavaScript 的关键字，所以在 JSX 用 htmlFor 替代，即 <label htmlFor='male'>Male</label>。而其他的 HTML 属性例如 style 、data-* 等就可以像普通的 HTML 属性那样直接添加上去。
    ```

- [state的注意点：](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)
    - 直接修改state不会触发界面变更，应该使用 setState()
    - setState可能是异步的，传入函数解决
    - setState会被合并

## 学习资源：

- [react 中文官网](https://zh-hans.reactjs.org/tutorial/tutorial.html)
- [React.js 小书，通俗易懂](http://huziketang.mangojuice.top/books/react/lesson1)