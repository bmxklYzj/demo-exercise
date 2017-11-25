# script 执行顺序总结

本文只针对外链js来说。

1. 普通 js 脚本是顺序执行，上一个脚本执行完毕才会执行下一个脚本。现代浏览器默认会并行下载js。 下载和执行 均会阻塞页面渲染。所以script标签要放在 `</body>` 前面，防止阻塞页面渲染、导致白屏。
![](https://ws1.sinaimg.cn/large/006tNc79ly1flutv41niyj30dw01tmx4.jpg)

2. defer 属性 下载是同步的，但在页面结构构造完成之后才会执行，在 `DomContentLoaded` 之前执行，且会保证按顺序执行。
![](https://ws3.sinaimg.cn/large/006tNc79ly1flutw1xayej30dw01tdfs.jpg)

3. async 属性 下载是同步的，但下载完之后会立即执行。适用于没有任何依赖的js。
![](https://ws4.sinaimg.cn/large/006tNc79ly1flutwdxyeyj30dw01tq2w.jpg)


注意：

1. defer 和 async 都只能用于外链脚本
2. 兼容性>=ie10(和flex类似)。ie9不支持async，defer不保证其在`DomContentLoaded` 之前执行


何时使用：

1. 如果脚本无任何依赖使用 async
2. 如果脚本有依赖或者是被其它脚本依赖使用 defer （但要注意<=ie9的兼容性问题）
3. 如果脚本很小且被 async脚本依赖，则将其放在async脚本前面且不加属性。


reference:

1. [async与defer的区别](http://www.jianshu.com/p/17dc82bf08f1)
2. [图解](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)