# react

- 核心的库：

    - react
    - react-dom
    - babel 把jsx转换成原生js（可选，如果不用jsx）

- jsx：

```js
<LikeButton onClick={() => this.setState({liked: true})}>Like</LikeButton>
```

其实是下面的语法糖:

```js
var e = React.createElement();
_this = 
e('LikeButton', {
  onClick: () => {
    this.setState({liked: true});
  }
}, 'Like');
```

jsx属性使用camelCase

- class -> className
- tabindex -> tabIndex

```js
const element = (
  <h1 className="greeting">hello</h1>
)

// jsx是如下的语法糖
const element = React.createElement(
  'h1',
  {
    className: 'greeting',
  },
  'hello',
)

// 最终创建的如下对象（DOM树）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello',
  }
}
```

