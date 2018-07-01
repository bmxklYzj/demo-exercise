# node自定义命令

npm init 之后在项目的bin目录下创建test.js，并在package.json中的bin字段中加上:

```
"test": 'bin/test.js'
```

通过 `npm prefix -g` 可以查看node全局命令的存放地址`{prefix}`，执行 `npm link` 即可在{prefix}/bin下面可以看到有`test`的软链

之后就可以在控制台使用`test`命令了，是不是很酷

这只是我们本地使用，也可以发布到npm上，别人通过 `npm i test -g`，当然test不能和npm现在已有的包名重复。

通过 `npm publish` 发布即可，每次修改之后可以通过 `npm version 1.0.1/patch/minor/major`，参考[npm 官网](https://docs.npmjs.com/getting-started/publishing-npm-packages)
