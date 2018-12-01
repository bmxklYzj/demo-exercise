# babel

babel我们都知道是用来把最新的js语法转换成es5语法，确保前端er能享用最新语法，最终编译成浏览器能够运行的代码。

在babel 7 之后使用了 scoped package，也就是包名都是 @babel 这样可以防止和别的开发者之间产生命名冲突。

## @babel/core

core顾名思义他是转换js语法的核心，但注意它只转换语法，譬如箭头函数、class、async/await等语法，像方法之类的比如`Object.assign` `Array.prototype.incluces`不会给打patch。如果需要使用最新的方法有两种办法：
1. 修改浏览器：

    - @babel/polyfill
        - 直接引入（不推荐）：把ES2015+的全部patch塞到最终产出，这样会导致应用体积增大很多，大概80K，即使有些方法你没有用到
        -  @babel/polyfill 配合 @babel/preset-env （推荐） 并设置 useBuiltIns: "usage" 即会根据我们代码自动按需引入相应的polyfill
    - core-js（不推荐）: 直接手动按需引入core-js中的功能
2. 修改自己的代码：@babel/preest-env：通过配置`useBuiltIns: "usage"`，会自动检测你的代码，只给你用到的方法添加patch。

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```

## @babel/cli

用于在命令行执行babel命令：

`./node_modules/.bin/babel src --out-dir lib`
当然你也可以用npx快捷命令 `npx babel src --out-dir lib`

但你发现运行之后除了代码风格有些许变化之外，并没有编译，这是因为没有给其传入 transformations 。比如要转换箭头函数：

```shell
yarn add -D @babel/plugin-transform-arrow-functions
npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

cli的常见参数：

```shell
--out-dir
--out-file
--presets # 指定预置转换参数
--plugins # 指定插件
```

## @babel/preset-env

cli编译需要执行transformations，我们只转换像箭头函数，但更通用的转换是使用：

```shell
yarn add -D @babel/preset-env
npx babel src --out-dir lib --presets=@babel/env
```

默认转换的是ES2015, ES2016, etc.. 也可以为其指定参数。

## @babel/polyfill

最新的js方法的polyfill，推荐配合preset-env并配置 useBuiltIns: "usage" 使用。

## reference

[babel 7 教程](https://blog.zfanw.com/babel-js/#x3-babel-runtime)

[Babel 用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)