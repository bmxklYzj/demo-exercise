# webpack

## 安装

```bash
npm i -D webpack
```

运行

```bash
npx webpack
```

运行webpack的三种方法：

1. shell命令： 终端直接执行  `webpack`
2. 通过`webpack.config.js`，然后执行 `webpack --config webpack.config.js`
3. 通过配置package.json中的scripts `"webpack": "webpack --config webpack.config.js"`

## 四个核心概念

- entry
- output
- loader
- plugin

## loader

webpack 默认只能处理js，处理css要使用loader：style-loader、css-loader

处理js中的图片使用 file-loader ，css-loader 会处理 `url: (xx.png)` 中的图片， html-loader 会处理 `<img src="xx.png" />` 中的图片

处理字体： file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体

加载数据：默认支持 `.json` 数据，如果需加载 cvs、xml要使用对应的loader

## plugin

html-webpack-plugin： 在html中自动插入生成的boundle

clean-webpack-plugin: 每次打包自动清理之前的dist内容

## 代码自动编译

1. 使用 `webpack --watch` 参数，代码能自动编译，但在浏览器中需要手动刷新
2. 借助 `webpack-dev-server` ，代码能自动编译，但是整个页面刷新
3. HMR(hot module replace)热更新，



## 其它注意点

### webpack.DefinePlugin() 中定义全局变量

常看到这样的写法

```js
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
}),
```

JSON.stringify('production') 的结果是 `""production""` 为什么要这样，而不直接写成 `"production"` ？

假想我们要把 `'process.env.NODE_ENV'` 定义为需要执行两个全局函数的一个全局常量如 `'process.env.NODE_ENV': 'foo(); bar()'` 这时候必须加一层引号才符合对象的定义规则，那么执行的时候webpack相当于会执行 `eval('foo(); bar()')` 就会执行我们预期的这两个函数。也就是说对象的key-value中value是用引号括起来的 **代码片段**，

这时候回过头来看开始的问题: `'process.env.NODE_ENV': 'production'` 最终 process.env.NODE_ENV 这个全局变量执行 `eval('production')` 的值是 `production` ，通常会提示 `production is undefined`。我们希望这个全局变量是个字符串，`'process.env.NODE_ENV': JSON.stringify('production')` ，执行 `eval("'production'")` 的值为字符串 `"production"`。

[参考](https://stackoverflow.com/questions/39564802/why-does-webpacks-defineplugin-require-us-to-wrap-everything-in-json-stringify)