# mac 使用nginx

用homebrew安装，折腾了好久，提示没有目录，最后手动创出来
```bash
➜  bin sudo mkdir -p /usr/local/var/log/nginx/

➜  bin sudo mkdir -p /usr/local/etc/nginx/
```

## 我本机上的几个重要目录

1. 日志：/usr/local/var/log/nginx
2. 默认存放网站内容的目录：/usr/local/Cellar/nginx/1.23.4/html
3. nginx配置目录：/usr/local/etc/nginx

## nginx启停命令
```bash
nginx #启动nginx
nginx -s reload #重新加载配置文件 ，热加载配置文件
nginx -s quit #:推荐 待nginx进程处理任务完毕进行停止
nginx -s stop #:先查出nginx进程id再使用kill命令强制杀掉进程。
nginx -t #查看nginx.conf配置是否正确
```

参考：
https://juejin.cn/post/6986190222241464350
https://cloud.tencent.com/developer/article/1695765
