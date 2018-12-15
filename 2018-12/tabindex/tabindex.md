# tabindex 控制键盘访问顺序

在网站易用性方面要注意的其中一点就是使用tab按键移动当前focus元素(document.activeElement)，默认带href的a标签、表单元素在tab列表中，而像div、span这样的标签则不在tab列表中。tabindex如果用的不好会降低使用易用性

tabindex有三种值：

1. 1+ :可通过tab元访问，遍历顺序为大于0的最小tabindex开始，继续递增遍历（不推荐，大部分情况会引起歧义，可通过调整dom结构解决）
2. 0 :把不可tab的元素如div、span、p等元素加入tab列表，使他们可以通过tab访问
3. -1 :把元素从tab列表中移除（譬如input设置之后就不能通过tab访问了），但元素拥有了可以通过js focus的特性（input默认可以focus，这里针对p、span等默认不能用tab访问的标签）。一句话概括它的作用：不能通过tab访问，但可以通过js 来focus。 foucus之后下一次tab就会从当前focus元素开始往后找。常见的场景是模态框，比如针对模态框设置tabindex="-1"并focus，下一次tab就是在模态框中找可tab的元素。[example](./index.html)


## reference:

- [google 介绍 tabindex](https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex)
- [stackoverflow](https://stackoverflow.com/questions/32911355/whats-the-tabindex-1-in-bootstrap-for)
- [tabindex](https://developer.paciellogroup.com/blog/2014/08/using-the-tabindex-attribute/)
- [webaim (web accessibility in mind)](https://webaim.org/techniques/keyboard/tabindex)

如何实现 'trap focus in model':

- [css tricks: 用:focus-within伪类纯css实现，不过没能实现shift+tab](https://css-tricks.com/a-css-approach-to-trap-focus-inside-of-an-element/)
- [js 版本 （按下tab或shift+tab时对模态框中的第一个和最后一个可tab元素做特殊判断）](https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element)
- [js 版本2](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js)

## 疑问：
bootstrap的模态框怎么实现的：其实也是把模态框的顶级div设置tabindex="-1"并用js来focus。

[例子](https://getbootstrap.com/docs/4.1/components/modal/#modal-components)

[对应源码](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/modal.js)