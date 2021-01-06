# JS 异步

## Reference

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
[youtube video](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
[zhihu Promise & setTimeout](https://www.zhihu.com/question/36972010/answer/71338002)

## callback

Ref: 
- [js callback](https://javascript.info/callbacks)
- [http://callbackhell.com/](http://callbackhell.com/)

什么是callback，常说的callback hell是什么？

假如我们要在网页中加载一段js，

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```
```js
loadScript('a.js');
// 下面的一些代码能够不阻塞地执行，因为browser会去异步加载js
```

但如果我想要调用 a.js中的一个方法`foo`，下面的写法显然是不行的
```js
loadScript('a.js');
foo() // Error: foo is undefined
```

这时候就可以给`loadScript`添加callback函数：

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = 'src';
    script.onload = () => callback(script);
    document.head.append(script);
}

loadscript('a.js', () => {
    foo();
});
```

一个真实的example
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
```

callback in callback:
如果想要在load a.js之后再去load b.js c.js那怎么写？

```js
loadScript('a.js', scriptA => {
  funcA();
  // ... do more things use a.js
  loadScript('b.js', scriptB => {
    funcB();
    // ... do more things use b.js
    loadScript('c.js', scriptC => {
      funcC();
    // ... do more things use c.js
    })
  });
});
```

so，上面就是回调地狱(callback hell)了，因为层层嵌套太深了，会导致代码很难维护。

上面的异步任务还没有考虑出错的情况，加上nodejs的error first模式的callback看看: 用一个callback来处理成功和失败的两种情况，失败时候调用`callback(error)`，成功时候调用`callback(null, result1, result2, ...)`

```js
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = 'src';
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error('error'));
    document.head.append(script);
}

loadScript('a.js', (err, scriptA) => {
  if (err) {
    // handler error
  }
  funcA();
  // ... do more things use a.js
  loadScript('b.js', (err, scriptB) => {
    if (err) {
      // handler error
    }
    funcB();
    // ... do more things use b.js
    loadScript('c.js', (err, scriptC) => {
      if (err) {
        // handler error
      }
      funcC();
    // ... do more things use c.js
    })
  });
});
```

上面就是callback hell的典型例子了，对着嵌套层级的增多，代码的缩进更多，代码冗长，如果中间再夹杂着业务逻辑就更难维护了。

接下来看promise怎么优雅地解决。
