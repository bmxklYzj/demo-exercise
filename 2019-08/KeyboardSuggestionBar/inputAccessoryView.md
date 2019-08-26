# [inputAccessoryView](https://facebook.github.io/react-native/docs/inputaccessoryview)

inputAccessoryView 绑定 nativeId ，TextInput绑定 inputAccessoryViewID 。

>The input accessory view is displayed above the keyboard whenever a TextInput has focus.


1. 不绑定id：不行，初始时候inputAccessoryView展示在页面底部，focus到TextInput及之后会消失
  ![](http://ww4.sinaimg.cn/large/006y8mN6gy1g6dagfowdjg30gw0wsdl4.gif)

    ```js
      render() {
        return (
          <SafeAreaView>
            <InputAccessoryView>
              <Text>InputAccessoryView</Text>
            </InputAccessoryView>

            <View>
              <Text>input: </Text>
              <TextInput />
            </View>
          </SafeAreaView>
        );
      }
    ```

2. 正确绑定id：inputAccessoryView和TextInput是一对一或多对一的关系
  ![](http://ww3.sinaimg.cn/large/006y8mN6gy1g6db5pgrlkg30f00py42g.gif)

    ```js
    render() {
      return (
        <SafeAreaView>
          <InputAccessoryView nativeID="uniqueID1">
            <Text>InputAccessoryView 1</Text>
          </InputAccessoryView>
          <InputAccessoryView nativeID="uniqueID2">
            <Text>InputAccessoryView 2</Text>
          </InputAccessoryView>
          <View>
            <Text>input 1:</Text>
            <TextInput inputAccessoryViewID="uniqueID1" />
            <Text>input 2:</Text>
            <TextInput inputAccessoryViewID="uniqueID2" />
          </View>
        </SafeAreaView>
      );
    }
    ```