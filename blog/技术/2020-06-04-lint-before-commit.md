# 代码lint 提交前进行hook

## eslint

lint工具时候用eslint，支持ECMSScript，typescript。

```
yarn add eslint
npx eslint --init # 会命令式地一问一答帮助配置
npx eslint index.js # 检查某个文件
```
## git hook

git本身自带的 `.git/hook` 下面添加pre-commit，但它是本地的，不便于团队共享，于是就有了`husky`。可以在package.json中pre-commit进行代码lint，如果lint不过，不能commit
