# react-native-model 和 TextInput autoFocus问题

## 背景

第一个页面中有个modal，其中是按钮组成的popUpMenu，modal隐藏有动画，点击按钮执行跳转动作

第二个页面有个 autoFocus的TextInput

modal和键盘 不能同时出现，modal是全局的（跨页面）。页面2键盘想要弹起时，modal还没有隐藏，所以键盘弹不起来

## 解决

在react-native-model 的onModalHide回调中执行跳转页面。但发现android还得加上setTimeout 0

```js
onModalHide = () => {
  setTimeout(() => navigateToXXX, 0);
}
```