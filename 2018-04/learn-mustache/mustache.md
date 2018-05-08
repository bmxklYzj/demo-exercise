# mustache

官方地址： https://github.com/janl/mustache.js
官方 readme 说的很详细了，这里只总结关键信息和若干重点

没有if-else、for循环，全部用tag实现，具备对 true、变量、数组iterate

`{{person}}` 会渲染出当前作用域中的 `person` key，默认是 html-escaped ，要转化为 unescaped 的用法为 `{{{perosn}}}` 或 `{{& person}}`

和 `{{#person}}` 中的 person 都是key