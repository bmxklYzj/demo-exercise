# docker 学习

## 镜像

我们都知道，操作系统分为 **内核** 和 **用户空间**。对于 `Linux` 而言，内核启动后，会挂载 `root` 文件系统为其提供用户空间支持。而 **Docker 镜像**（`Image`），就相当于是一个 `root` 文件系统。比如官方镜像 `ubuntu:18.04` 就包含了完整的一套 Ubuntu 18.04 最小系统的 `root` 文件系统。

**Docker 镜像** 是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像 **不包含** 任何动态数据，其内容在构建之后也不会被改变。

## 容器

镜像（`Image`）和容器（`Container`）的关系，就像是面向对象程序设计中的 `类` 和 `实例` 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 [命名空间](https://en.wikipedia.org/wiki/Linux_namespaces)。因此容器可以拥有自己的 `root` 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。

## 使用镜像

1. 使用nginx 镜像创建一个容器，命名为 webserver `docker run --name webserver -d -p 8080:80 nginx` 之后便可以访问 localhost:8080 访问

2. 修改容器的首页内容

   ```
   docker exec -it webserver bash
   root@23b42610e23c:/# echo '<h1>hello docker</h1>'> /usr/share/nginx/html/index.html
   root@23b42610e23c:/# exit
   exit
   ```

   我们以交互式终端方式进入 `webserver` 容器，并执行了 `bash` 命令，也就是获得一个可操作的 Shell。

   我们修改了容器的文件，也就是改动了容器的存储层。我们可以通过 `docker diff` 命令看到具体的改动。

   ```
   ➜  ~ docker diff webserver
   C /etc
   C /etc/nginx
   C /etc/nginx/conf.d
   C /etc/nginx/conf.d/default.conf
   C /usr
   C /usr/share
   C /usr/share/nginx
   C /usr/share/nginx/html
   C /usr/share/nginx/html/index.html
   C /var
   C /var/cache
   C /var/cache/nginx
   A /var/cache/nginx/client_temp
   A /var/cache/nginx/fastcgi_temp
   A /var/cache/nginx/proxy_temp
   A /var/cache/nginx/scgi_temp
   A /var/cache/nginx/uwsgi_temp
   C /run
   A /run/nginx.pid
   ```

   现在我们定制好了变化，我们希望能将其保存下来形成镜像。

   要知道，当我们运行一个容器的时候（如果不使用卷的话），我们做的任何文件修改都会被记录于容器存储层里。而 Docker 提供了一个 `docker commit` 命令，可以将容器的存储层保存下来成为镜像。换句话说，就是在原有镜像的基础上，再叠加上容器的存储层，并构成新的镜像。以后我们运行这个新镜像的时候，就会拥有原有容器最后的文件变化。

3. 将容器保存为镜像

   ```
   ➜  ~ docker commit --author 'yzj' --message '修改默认首页' webserver nginx:v2
   sha256:4ef92625443816abc64dfece2c50c5c86d4328caad75522dd645704318e9eb55
   ```

   使用`docker iamges` 查看镜像

   ```
   
   ➜  ~ docker images
   REPOSITORY               TAG          IMAGE ID       CREATED         SIZE
   nginx                    v2           4ef926254438   4 seconds ago   187MB
   ...
   ```

   使用`docker history`查看容器内的历史记录

   ```
   ➜  ~ docker history nginx:v2
   IMAGE          CREATED          CREATED BY                                       SIZE      COMMENT
   4ef926254438   29 seconds ago   nginx -g daemon off;                             1.39kB    修改默认首页
   92b11f67642b   8 weeks ago      CMD ["nginx" "-g" "daemon off;"]                 0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      STOPSIGNAL SIGQUIT                               0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      EXPOSE map[80/tcp:{}]                            0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      ENTRYPOINT ["/docker-entrypoint.sh"]             0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      COPY 30-tune-worker-processes.sh /docker-ent…   4.62kB    buildkit.dockerfile.v0
   <missing>      8 weeks ago      COPY 20-envsubst-on-templates.sh /docker-ent…   3.02kB    buildkit.dockerfile.v0
   <missing>      8 weeks ago      COPY 15-local-resolvers.envsh /docker-entryp…   336B      buildkit.dockerfile.v0
   <missing>      8 weeks ago      COPY 10-listen-on-ipv6-by-default.sh /docker…   2.12kB    buildkit.dockerfile.v0
   <missing>      8 weeks ago      COPY docker-entrypoint.sh / # buildkit           1.62kB    buildkit.dockerfile.v0
   <missing>      8 weeks ago      RUN /bin/sh -c set -x     && groupadd --syst…   112MB     buildkit.dockerfile.v0
   <missing>      8 weeks ago      ENV PKG_RELEASE=1~bookworm                       0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      ENV NJS_VERSION=0.8.3                            0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      ENV NGINX_VERSION=1.25.4                         0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      LABEL maintainer=NGINX Docker Maintainers <d…   0B        buildkit.dockerfile.v0
   <missing>      8 weeks ago      /bin/sh -c #(nop)  CMD ["bash"]                  0B
   <missing>      8 weeks ago      /bin/sh -c #(nop) ADD file:b86ae1c7ca3586d8f…   74.8MB
   ```

   新的镜像定制好后，我们可以来运行这个镜像。

   ```
   docker run --name web2 -d -p 8081:80 nginx:v2
   ```

   访问 `http://localhost:8081` 看到结果，其内容应该和之前修改后的 `webserver` 一样。

   至此，我们第一次完成了定制镜像，使用的是 `docker commit` 命令，手动操作给旧的镜像添加了新的一层，形成新的镜像，对镜像多层存储应该有了更直观的感觉。

### 慎用 `docker commit`

使用 `docker commit` 命令虽然可以比较直观的帮助理解镜像分层存储的概念，但是实际环境中并不会这样使用。

首先，如果仔细观察之前的 `docker diff webserver` 的结果，你会发现除了真正想要修改的 `/usr/share/nginx/html/index.html` 文件外，由于命令的执行，还有很多文件被改动或添加了。这还仅仅是最简单的操作，如果是安装软件包、编译构建，那会有大量的无关内容被添加进来，将会导致镜像极为臃肿。

此外，使用 `docker commit` 意味着所有对镜像的操作都是黑箱操作，生成的镜像也被称为 **黑箱镜像**，换句话说，就是除了制作镜像的人知道执行过什么命令、怎么生成的镜像，别人根本无从得知。而且，即使是这个制作镜像的人，过一段时间后也无法记清具体的操作。这种黑箱镜像的维护工作是非常痛苦的。

而且，回顾之前提及的镜像所使用的分层存储的概念，除当前层外，之前的每一层都是不会发生改变的，换句话说，任何修改的结果仅仅是在当前层进行标记、添加、修改，而不会改动上一层。如果使用 `docker commit` 制作镜像，以及后期修改的话，每一次修改都会让镜像更加臃肿一次，所删除的上一层的东西并不会丢失，会一直如影随形的跟着这个镜像，即使根本无法访问到。这会让镜像更加臃肿。

###  使用 Dockerfile

新建 Dockerfile 文件：

```dockerfile
FROM nginx
RUN echo '<h1>hello docker </h1>' > /usr/share/nginx/html/index.html

```

FROM 指定基础镜像：所谓定制镜像，那一定是以一个镜像为基础，在其上进行定制。就像我们之前运行了一个 `nginx` 镜像的容器，再进行修改一样，基础镜像是必须指定的。而 `FROM` 就是指定 **基础镜像**，因此一个 `Dockerfile` 中 `FROM` 是必备的指令，并且必须是第一条指令。

`RUN` 指令是用来执行命令行命令的。由于命令行的强大能力，`RUN` 指令在定制镜像时是最常用的指令之一。其格式有两种：

- *shell* 格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 `RUN` 指令就是这种格式。

  ```
  RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
  ```

- *exec* 格式：`RUN ["可执行文件", "参数1", "参数2"]`，这更像是函数调用中的格式。

构建镜像：`docker build -t ngnix:v3 .`

运行镜像：`docker run -d --rm -p 8082:80 ngnix:v3`

## 数据管理

### 数据卷

`数据卷` 是一个可供一个或多个容器使用的特殊目录，它绕过 UnionFS，可以提供很多有用的特性：

- `数据卷` 可以在容器之间共享和重用
- 对 `数据卷` 的修改会立马生效
- 对 `数据卷` 的更新，不会影响镜像
- `数据卷` 默认会一直存在，即使容器被删除

1. 创建数据卷 `docker volume create my-vol`

2. 查看所有数据卷

   ```bash
   ➜  ~ docker volume ls
   DRIVER    VOLUME NAME
   local     my-vol
   ```

3. 查看数据卷的信息

   ```bash
   ➜  ~ docker volume inspect my-vol
   [
       {
           "CreatedAt": "2024-04-14T14:26:50Z",
           "Driver": "local",
           "Labels": null,
           "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
           "Name": "my-vol",
           "Options": null,
           "Scope": "local"
       }
   ]
   ```

4. 启动一个挂载数据卷的容器

   ```
   docker run -d -p 8080:80 --name web --mount source=my-vol,target=/usr/share/nginx/html nginx
   ```

5. 查看容器数据卷的具体信息 `docker inspect web`

   信息在 Mounts 字段中

   ```bash
   "Mounts": [
       {
           "Type": "volume",
           "Name": "my-vol",
           "Source": "/var/lib/docker/volumes/my-vol/_data",
           "Destination": "/usr/share/nginx/html",
           "Driver": "local",
           "Mode": "z",
           "RW": true,
           "Propagation": ""
       }
   ],
   ```

6. 在 mac 电脑下如果想要进入my-vol对应的主机地址：`"/var/lib/docker/volumes/my-vol/_data"` 则需要执行 `docker run -it --rm --privileged --pid=host justincormack/nsenter1`。进入`/usr/share/nginx/html`并修改 index.html 刷新可看到 nginx 首页变了。

7. 删除数据卷 `docker volume rm my-vol`

### 挂载主机目录作为数据卷

```bash
docker run -d -P \
    --name web \
    # -v /src/webapp:/usr/share/nginx/html \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html \
    nginx:alpine
```

## 容器网络

如果你之前有 `Docker` 使用经验，你可能已经习惯了使用 `--link` 参数来使容器互联。

随着 Docker 网络的完善，强烈建议大家将容器加入自定义的 Docker 网络来连接多个容器，而不是使用 `--link` 参数。

创建一个新的 Docker 网络。

```
docker network create -d bridge my-net
```

运行一个容器并连接到新建的 `my-net` 网络

```
docker run -it --rm --name busybox1 --network my-net busybox sh
```

打开新的终端，再运行一个容器并加入到 `my-net` 网络

```
docker run -it --rm --name busybox2 --network my-net busybox sh
```

通过 `ping` 证明 `busybox1` 容器和 `busybox2` 容器建立了互联关系：

```sh
➜  demo5 git:(master) ✗ docker run -it --rm --name busybox2 --network my-net busybox sh
/ # ping busybox1
PING busybox1 (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.185 ms
...
```

如果你有多个容器之间需要互相连接，推荐使用 [Docker Compose](https://yeasy.gitbook.io/docker_practice/compose)。

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
| docker container prune 或 docker rm $(docker ps -qa) | 删除本地所有container |
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
3. volume: 先创建一个 volume，在把 volume 和容器中的路径绑定

## demo wordpress

Ref: [阮一峰 Docker 微服务教程](https://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html)

### 1. 自建 WordPress 容器
1. 官方 php 镜像
    `docker container run -p 8089:80 --rm --name wordpress --volume "$PWD/":/var/www/html php:5.6-apache`

2. 下载并解压 WordPress 压缩包

   ```
   wget https://cn.wordpress.org/wordpress-4.9.4-zh_CN.tar.gz
   tar -xvf wordpress-4.9.4-zh_CN.tar.gz
   ```

   访问 localhost:8089/wordpress 就能访问 wordpress 了，但 wordpress 还依赖 mysql 数据库

3. 官方mysql 镜像
    `docker container run -d --rm --name wordpressdb --env MYSQL_ROOT_PASSWORD=123456 --env MYSQL_DATABASE=wordpress mysql:5.7`

  如何把 wordpress程序和 mysql 联系起来呢？

4. 新建一个 Dockerfile 文件，在原来 PHP 的 image 基础上，安装`mysqli`的扩展。然后，启动 Apache。

   ``````
   FROM php:5.6-apache
   RUN docker-php-ext-install mysqli
   CMD apache2-foreground
   ``````

   创建一个名为 phpwithmysql 的镜像：`docker build -t phpwithmysql .`

5. wordpress连接 mysql： `docker container run -p 8089:80 --rm --name wordpress --volume "$PWD/":/var/www/html --link wordpressdb:mysql phpwithmysql`

### 2. wordpress官方镜像

1. 创建并启动 mysql 容器 

   ```
   docker container run -d --rm --name wordpressdb --env MYSQL_ROOT_PASSWORD=123456 --env MYSQL_DATABASE=wordpress mysql:5.7
   ```

2. 创建并启动 wordpress 镜像

   ```
   docker container run -p 8089:80 --rm --name wordpress --env WORDPRESS_DB_PASSWORD=123456 --env WORDPRESS_DB_USER=root --volume "$PWD/wordpress":/var/www/html --link wordpressdb:mysql wordpress
   ```


### 3. compose

上面的方法 B 已经挺简单了，但是必须自己分别启动两个容器，启动的时候，还要在命令行提供容器之间的连接信息。因此，Docker 提供了一种更简单的方法，来管理多个容器的联动。

新建一个`docker-compose.yaml`文件，执行`docker-compose up`则会自动拉起2个 pod

```yaml
version: '3.3'
services:
  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=wordpress
  wordpress:
    image: wordpress
    depends_on:
      - mysql
    environment:
      - WORDPRESS_DB_PASSWORD=123456
      - WORDPRESS_DB_USER=root
    ports:
      - "8089:80"
volumes:
  mysql_data: # 定义一个名为mysql_data的卷，用于MySQL数据持久化【2】

networks:
  mywordpress: # 定义一个名为mywordpress的网络，用于服务间的通信【3】
```

## 参考
1. [阮一峰: Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
2. [imooc: Docker入门](https://www.imooc.com/video/15727)
3. [Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice)