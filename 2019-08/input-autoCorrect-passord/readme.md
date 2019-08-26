# input autoCorrect 与 passord 自动填充问题

## 背景

snack link: https://snack.expo.io/@bmxklyzj/input-autocorrect-passord
github issue: https://github.com/facebook/react-native/issues/26159

第一个页面TextInput autoCorrect={false}，不做任何操作跳转到第二个页面

第二个页面 <TextInput secureTextEntry /> 是密码输入，当选择了密码自动填充后。密码填充到了当前TextInput，用户名被填充到了前一个页面的TextInput

## 解决

没法解决，应该是React-native的bug。