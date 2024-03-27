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

## 卷挂载
1. 把容器里的目录挂载到宿主机，目录为 docker 默认的
   `docker run -d --name mynginx -v /usr/share/nginx/html -p 8088:80 nginx`
   把容器内的路径：`/usr/share/nginx/html`挂载到主机，那挂载到哪里了呢？
   使用`docker inspect ef9f3367f871` 查看容器信息可看到 source 字段
   ```
   "Mounts": [
      {
            "Type": "volume",
            "Name": "4a95d8fca9156da5bbe8a3c887573a6afe55145e70f3a44643b7f3c1fe081e1c",
            "Source": "/var/lib/docker/volumes/4a95d8fca9156da5bbe8a3c887573a6afe55145e70f3a44643b7f3c1fe081e1c/_data",
            "Destination": "/usr/share/nginx/html",
            "Driver": "local",
            "Mode": "",
            "RW": true,
            "Propagation": ""
      }
   ],
   ```
   在 linux 系统下可直接打开source目录，mac 下不能直接打开，这是因为 mac 下 docker 起了个 alpine 虚拟机来运行容器，我们要[进入 alpine 才行](https://gist.github.com/BretFisher/5e1a0c7bcca4c735e716abf62afad389)：`docker run -it --rm --privileged --pid=host justincormack/nsenter1`
   然后在进入 host 目录：`/var/lib/docker/volumes/4a95d8fca9156da5bbe8a3c887573a6afe55145e70f3a44643b7f3c1fe081e1c/_data`
   直接修改里面的 `index.html` ，则容器里面的文件也会更新：
      1. 进入容器 `docker exec mynginx -it /bin/bash`
      2. `cat /usr/share/nginx/html/index.html`
2. 把容器里的目录挂载到宿主机的指定目录
   在`/tmp`目录下执行：`docker run -d --name mynginx -v $PWD/yzj:/usr/share/nginx/html -p 8088:80 nginx`
   查看容器：`docker inspect mynginx` 可以看到 Source 和Destination：
   ```
   "Mounts": [
      {
            "Type": "bind",
            "Source": "/tmp/yzj",
            "Destination": "/usr/share/nginx/html",
            "Mode": "",
            "RW": true,
            "Propagation": "rprivate"
      }
   ],
   ```
   经过试验发现 Destination（原本 nginx 这个目录下有2个文件 50x.html 和 index.html） 总是随着 Source 变化
   1.  Source为空， Destination 也为空
   2.  Source有一个 index.html 文件， Destination 也只有一个 index.html 文件
3. volume

## 参考
1. 阮一峰： https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
2. imooc： https://www.imooc.com/video/15727