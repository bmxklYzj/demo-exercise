# `.npmrc` 配置 register 源

一般我们会[安装cnpm到全局](https://npm.taobao.org/)，这样就默认会使用taobao的npm register

但有时候我们需要配置某个 npm 从公司的某个 register地址安装，这时候可以在 `.npmrc` 中配置，[参考](https://stackoverflow.com/questions/34652563/using-myproject-npmrc-with-registry)

```
# 通用 register
register=https://registry.npm.taobao.org

# 特殊register
@<your-scope-name>:httsp://register...
```