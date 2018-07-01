# lazyMan 面试题目：

实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper~

以此类推。

## 思路

先读取到整个链的表达式，放到队列中，头部执行完之后调用next执行下一个任务。

注意在构造函数中使用了 `setTimeout 0`，就是做上述事情的

reference: http://web.jobbole.com/89626/
