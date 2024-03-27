# docker 学习

## demo1: nginx 打包 image
1. 执行`docker run -p 8088:80 -d nginx`
   `-p 8088:80`是把容器里面 nginx 的80端口映射到主机的8088端口，我们在主机就能访问8088端口，实际就能访问到 docker 中的 nginx 了。
   `-d` 是让其在后台运行。后台模式（detached mode），表示在后台运行容器，不会将容器的输出直接打印到终端。且会返回容器 id。

   访问 http://localhost:8088/ 就能看到nginx 的默认首页了
2. `docker cp index.html e9e9b47f0962://usr/share/nginx/html` 修改 nginx 的默认首页
3. `docker stop e9e9b47f0962` 停止容器
4. 再次运行 nginx `docker run -p 8088:80 -d nginx` 发现首页变成默认的了，不是第二步修改后的了。docker 默认不会保存任何改动
5. `docker cp index.html e9e9b47f0962://usr/share/nginx/html` 修改 nginx 的默认首页
6. 保存 iamge： `docker commit -m 'hello docker' ab19bfb94505 hello-docker`
7. 运行保存后的 image: `docker run -p 8088:80 -d hello-docker` 发现首页是修改后的，说明 image 中保存了我们的变更。

## demo2： dockerfile
1. 新建一个 Dockerfile
```docker
// Dockerfile
FROM alpine:latest
CMD echo "hello world"
```
2. build打包： `docker build -t hello_docker .`
3. 运行: `docker run hello_docker` 可以看到打印出“hello world”

| 命令  | 用途  |
|---|---|
| FROM  | base image  |
| RUN  | 执行命令  |
| COPY  | 拷贝文件  |
| CMD  |  执行命令 |
|  EXPOSE  | 暴露端口 |
|  ENTRYPOINT  | 容器入口 |

## 命令总结
| 命令  | 用途  |
|---|---|
| docker pull  | 获取 image  |
| docker images  |  列出本地所有 image  |
| docker run  |  运行 container  |
| docker  ps  |  列出 所有正在运行的 container  |
| docker  ps -a |  列出 所有 container  |
| docker  rm  |   删除 container  |
| docker  rmi  |  删除  image  |
| docker  cp  |  在 host 和 container 之间拷贝文件 |
| docker   commit  |   保存改动为新的 image |
---
docker 架构图：
![picture 0](https://cdn.jsdelivr.net/gh/bmxklYzj/bmxklYzj.github.io@master/demos/images/1f78ea5445df0a5463c08741d421abb5b79d8765c366c09e492ac5f8914c0aee.png)  

## 参考
1. 阮一峰： https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
2. imooc： https://www.imooc.com/video/15727