# React-native

## 自定义键盘上方的 suggestion bar

RN官方为iOS提供了组件 [`inputAccessoryView`](https://facebook.github.io/react-native/docs/inputaccessoryview)，可以在里面放置任意的组件。

在Android上则可以监听 `KeyboardDidShow/KeyboardDidHide` 由于iOS的键盘出现隐藏会有动画，你可以监听 `KeyboardWillShow/KeyboardWillHide` 并加上动画，但没有原生的inputAccessoryView优雅。

所以推荐的方式是iOS使用原生组件，Android上监听键盘事件，[不可在线运行的 demo link](2019-08/KeyboardSuggestionBar)


## 键盘覆盖输入框

	1. KeybaordAvoidingView： 官方自带组件
	2. KeyboardAwareScrollView: open source lib
	3. 监听KeyboardWillShow/KeybaordWillHide(KeyboardDidShow/KeyboardDidHide on Android) 并做动画
reference： https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/