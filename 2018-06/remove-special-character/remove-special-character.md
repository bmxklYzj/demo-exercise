# 移除历史md文档中特殊字符

代码由来：https://www.zhihu.com/question/61638859/answer/361418428

先说结论：vscode底层是electron，electron底层用的chromium，这个bug是chromium的，最终导致vscode也有问题。如果你把编辑器分成两列，左侧是md，右侧是md的preview，那么用中文输入法输入f再删除，需要按两次delete键。如果按一次就会出现ascii为8的退格字符，默认vscode中md文件看不到，github上会看到类似问号的特殊字符，vscode设置中添加`"editor.renderControlCharacters": true,`就可以看到。截止2018-04-08 vscode中仍旧有这个问题，不过据说不久会修复。
当前解决办法：写md不开preview预览；或者添加设置，出现back space则手动删除。

reference： vscode控制字符引起的问题以及解决思路(https://juejin.im/entry/5a806ddef265da4e84092eeb)
