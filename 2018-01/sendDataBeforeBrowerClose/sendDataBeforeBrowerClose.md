# 浏览器卸载那些事

# 退出前弹窗或提示

# 退出前执行非发送请求代码

# 退出前发送请求

记录实验结果

chrome

onbeforeunload事件
|浏览器事件|动作|发送异步ajax|发送同步ajax|图片src|
|-------|-------|-------|------|------|
|onbeforeunload|强制刷新|yes|yes|yes|
|onbeforeunload|前进后退按钮|yes|yes|yes|
|onbeforeunload|关闭标签页|yes|yes|yes|
|onbeforeunload|关闭浏览器|yes|yes|yes|

总结：需要关注的是
1. 如果是异步ajax chrome控制台会显示canceled然后立即跳走或者关闭，它不会等待请求返回，通过抓包看到请求是发送了，但是这种情况没法保证请求一定每次都能成功发出。
2. 如果是同步ajax chrome在前进、后退、关闭浏览器 时都会等待请求返回


unload事件
|浏览器事件|动作|发送异步ajax|发送同步ajax|图片src|
|-------|-------|-------|------|------|
|unload|强制刷新|yes|**no**|yes|
|unload|前进后退按钮|yes|**no**|yes|
|unload|关闭标签页|yes|yes|yes|
|unload|关闭浏览器|yes|yes|yes|

总结：需要关注的是
1. 如果是异步ajax chrome控制台会显示canceled然后立即跳走或者关闭，它不会等待请求返回，通过抓包看到请求是发送了，但是这种情况没法保证请求一定每次都能成功发出。
2. 如果是同步ajax chrome在前进、后退时不会发送请求，关闭标签页和浏览器 时都会等待请求返回
