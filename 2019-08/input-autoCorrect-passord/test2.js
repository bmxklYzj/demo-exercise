import React from 'react';
import { Keyboard, View, Text, TextInput, SafeAreaView } from 'react-native';

class Test extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <Text>hello23</Text>
        <TextInput secureTextEntry />
      </SafeAreaView>
    );
  }
}

export default Test;
