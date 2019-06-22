# 循环性能比较

for和forEach中谁更快？

答案是for，因为forEach每次循环都会创建一个局部函数及环境，会有额外的消耗。

for循环的速度大概是forEach的1.5倍。

benchmark：https://jsbench.me/dnjx2zzmri/2

由于while比for少一个变量，会稍快。
![效果图](http://ww1.sinaimg.cn/large/006tNc79gy1g4abbwiu8aj311c0p642b.jpg)
