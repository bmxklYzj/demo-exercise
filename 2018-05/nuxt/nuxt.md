# nuxt入门

[nuxt官网](https://zh.nuxtjs.org/) ,nuxt是干什么的，它能解决什么问题？

对seo友好，提高首屏速度。这是nuxt的目标。

## spa和ssr（server side render 或者理解为页面静态化）的对比

先看看spa是如何做的？它的困境是什么

一个普通的spa页面的html如下：

1. seo不友好

```html
<!DOCTYPE html>
<html lang=en>

<head>
    <meta charset=UTF-8>
    <title>医疗服务</title>
    <meta charset=utf-8>
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1">
    <meta name=format-detection content="telephone=no">
    <!-- something more meta properties like：keywords、description etc. -->
    <link href=/static/css/app.99237d.css rel=stylesheet>
</head>

<body>
    <div id=app></div>

    <script type=text/javascript src=/static/js/manifest.3a05ef.js></script>
    <script type=text/javascript src=/static/js/vendor.db5327.js></script>
    <script type=text/javascript src=/static/js/app.ea8127.js></script>
</body>

</html>
```

html几乎没有任何文本内容，唯一能做seo的地方就是在head中加上meta信息如keywords、description，但这样对于内容类网站、论坛类网站是远远不够的。

2. 首屏渲染速度相对慢

spa站点加载资源内容的流程为：html -> head中的css -> `</body>`前面的js -> 运行js并发起xhr -> 页面渲染完成

而静态站点渲染页面的流程为： html -> head中的css -> `</body>`前面的js -> 页面渲染完成

看起来spa站点只比静态站点少了一步：运行js并发起xhr ，但由于html的页面结构不同，页面渲染速度差异很大。

在spa中html中没有正文，需要等js加载完成并运行js，此时页面的固定内容先渲染出来（不需要从ajax获取数据的部分），

js加载并运行过程中的 截图：
![](https://github.com/bmxklYzj/demo-exercise/raw/master/markdownImage/2018/spa-js-loaded.png
)

等到js 发起xhr请求异步拉取数据，xhr返回后才能最终渲染完界面。这里的js负责生成页面内容。

而静态站点的html中本身就有正文内容，html拉取完毕就会立即渲染界面，同步拉取css设置样式。js在最后面，会在页面渲染完毕才会加载，这里的js只是起到处理后续页面交互的作用。

## nuxt 动手实践

### 创建项目

像spa一样我们可以用`vue-cli`脚手架来创建 `nuxt`项目。

```sh
vue init nuxt-community/starter-template <project-name>
cd <project-name>
npm install
npm run dev
```
pakeage.json中有重要的命令：

|命令|描述|
|:--------|:--------|
|nuxt|	启动一个热加载的Web服务器（开发模式） localhost:3000。|
|nuxt build|	利用webpack编译应用，压缩JS和CSS资源（发布用）。|
|nuxt start|	以生成模式启动一个Web服务器 (nuxt build 会先被执行)。|
|nuxt generate|	编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。|

他们被放到了package.json中

```sh
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate"
}
```

开发使用 `npm run dev`

其余命令是部署相关：部署分两种类型，一种是服务端渲染应用部署 和 静态应用部署

服务端渲染应用部署 可通过以下两个命令来完成：

```sh
nuxt build
nuxt start
```

或直接用 `npm run start`

静态应用部署用命令 `npm run generate` ,这时候会生成 `dist` 文件夹，直接部署dist文件夹即可。

### 服务端渲染应用部署 和 静态应用部署 的区别

nuxt中扩充了vue.js并增加了一个 `asyncData` 的方法：他的作用就是 在服务器端获取并渲染数据

[nuxt 异步数据](https://zh.nuxtjs.org/guide/async-data)

[asyncData 方法](https://zh.nuxtjs.org/api/)

如果是使用`npm run generate` 静态应用部署，那么会在生成`dist`的时候会拉取数据并填充生成静态页面，之后页面内容不会变化（小插曲：怎么证明generate会拉取数据呢，用node打包charles代理发现没发接口请求，原来是charles改动的是系统代理，那么各个浏览器会走系统代理，ok。但在bash中不走系统代理，走的自己的一个端口1080，[参考](https://superuser.com/questions/398977/how-can-i-run-all-http-requests-through-charles-web-debugging-proxy-including)。只能另想办法：修改接口返回值，发现打包后的html也同步变化）

[静态应用部署 now.sh demo体验: asyncData的内容在打包后产出固定html，刷新页面内容不变](https://dist-reyxhwdwsd.now.sh/about/async)

[静态应用部署 now.sh demo体验: spa方式，在created函数中发xhr，刷新页面内容变化](https://dist-reyxhwdwsd.now.sh/about/spa)

如果使用 服务端渲染应用部署 是需要node环境实时生成的，不论是用asyncData方式、还是在created函数中发xhr 刷新后页面内容都会变化

[服务端渲染应用部署 asyncData 每次服务的渲染都会拉取数据重新生成html，刷新页面内容变化](https://first-nuxt-buvzzjyvdw.now.sh/about/async)

[服务端渲染应用部署 spa方式，在created函数中发xhr，刷新页面内容变化](https://first-nuxt-buvzzjyvdw.now.sh/about/async)

关于spa和页面静态化的性能问题有如下demo：

[spa](https://files-vthywkjhuh.now.sh/first-nuxt-buvzzjyvdw.now.sh_2018-05-11_13-19-19.report.html)
[页面静态化](https://files-vthywkjhuh.now.sh/first-nuxt-buvzzjyvdw.now.sh_2018-05-11_13-17-26.report.html)

可以看到最终渲染都是同样的结果，页面静态化耗时2.6s，但spa耗时5s，基本是2倍。

**总结**

1. asyncData中如果是静态部署，会在 `nuxt generate` 时异步拉取数据生成固定的html，适用于页面内容从来不会变化；如果是动态部署，会在运行时由node每次拉取数据生成变化的html

2. 静态应用部署适用于页面内容从不变化，在打包时候就会在asyncData中异步拉取数据

3. 如果全部不用asyncData就没有静态化的意义，相当于全部是spa页面了（发xhr获取数据后才渲染页面）

4. 最佳的是：页面首屏数据用 syncData并采用服务器端渲染 技术提高首屏速度，非首屏及后续的页面用spa的方式

### 其它知识点：

路由是 page 文件夹的目录结构决定的，当然支持可选参数、嵌套、循环路由等功能。



