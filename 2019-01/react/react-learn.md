# 从零学习react

资料： [react 小书（可能真的是世界上最好的react入门教程）](http://huziketang.mangojuice.top/books/react/lesson2)

## [普通的点赞实现](./react-1.html)

```html
<body>
  <div class='wrapper'>
    <button class='like-btn'>
      <span class='like-text'>点赞</span>
      <span>👍</span>
    </button>
  </div>
</body>
```

```js
const button = document.querySelector('.like-btn')
const buttonText = button.querySelector('.like-text')
let isLiked = false
button.addEventListener('click', () => {
  isLiked = !isLiked
  if (isLiked) {
      buttonText.innerHTML = '取消'
  } else {
      buttonText.innerHTML = '点赞'
  }
}, false)
```

## [普通的点赞：组件化](./react-2.html)

```html
<body>
  <div class='wrapper'>
    <button class='like-btn'>
      <span class='like-text'>点赞</span>
      <span>👍</span>
    </button>
  </div>
</body>
```

```js
class LikeButton {
  render () {
    return `
      <button id='like-btn'>
        <span class='like-text'>赞</span>
        <span>👍</span>
      </button>
    `
  }
}

const wrapper = document.querySelector('.wrapper')
const likeButton1 = new LikeButton()
wrapper.innerHTML = likeButton1.render()

const likeButton2 = new LikeButton()
wrapper.innerHTML += likeButton2.render()
```

## [点赞：组件化可交互](./react-3.html)


```html
<body>
  <div class='wrapper'>
    <button class='like-btn'>
      <span class='like-text'>点赞</span>
      <span>👍</span>
    </button>
  </div>
</body>
```

```js
class LikeButton {
  render() {
      this.el = createDOMFromString(`
          <button class="like-btn">
              <span class="like-text">点赞</span>
              <span>👍</span>
          </button>
      `);
      this.el.addEventListener('click', () => {
          console.log('click');
      }, false);
      return this.el;
  }
}

const createDOMFromString = (domString) => {
  let div = document.createElement('div');
  div.innerHTML = domString;
  return div;
};

const wrapper = document.querySelector('.wrapper');
const likeButton1 = new LikeButton();
wrapper.appendChild(likeButton1.render());

const likeButton2 = new LikeButton();
wrapper.appendChild(likeButton2.render());
```


## [点赞：避免操作dom](./react-4.html)


```html
<body>
  <div class='wrapper'>
    <button class='like-btn'>
      <span class='like-text'>点赞</span>
      <span>👍</span>
    </button>
  </div>
</body>
```

```js
class LikeButton {
  constructor () {
    this.state = { isLiked: false }
  }

  setState (state) {
    this.state = state
    this.el = this.render()
  }

  changeLikeText () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    this.el = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `)
    this.el.addEventListener('click', this.changeLikeText.bind(this), false)
    return this.el
  }
}
```


## [点赞：抽象公共组件](./react-5.html)

```js
class Component {
  setState (state) {
    const oldEl = this.el
    this.state = state
    this._renderDOM()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  _renderDOM () {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}
```