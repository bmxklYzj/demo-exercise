# 小程序bug排查

template
```
## summary
1. 背景：
2. solution：
3. 经验&收获
```



## 'use strict' 引发的debug
1. 背景：某android rd反馈 video组件添加某些属性后页面有报错白屏

2. solution：我排查发现是使用了duration属性会报错，san代码执行时尝试给video设置duration属性`video.duration = 10`导致报错：`TypeError: Cannot assign to read only property 'duration' of object '#<HTMLVideoElement>'`。在报错的地方打断点，在控制台执行`video.duration = 10`却不报错。
  我试过的方法：google搜索错误信息无果，在san的SPA项目中写`<video duration="10"></video>`却不报错。两三个小时后没有头绪，找侯哥帮忙看。侯哥也是断点、甚至是通过`Object.defineProperty`设置`writable： false`也不报错。后来侯哥发现

  ```js
  (function() {
      'use strict';
      video.duration = 10
  })();
  ```
报错，原来是因为小程序代码中用了`'use strict'`，导致给readOnly的属性赋值是在严格模式会报错，但是控制台执行时候是非严格模式，导致诡异的“打断点控制台执行不报错，不打断点自然执行就报错“的现象。

3. 经验&收获：多角度看问题，耗费时间太长可以求助别人帮助