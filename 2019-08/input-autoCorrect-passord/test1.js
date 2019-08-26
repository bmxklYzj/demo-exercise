import React from 'react';
import { Button, SafeAreaView, Text, TextInput } from 'react-native';

class Test extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <Text>hello</Text>
        <TextInput autoCorrect={false} />

        <Button
          title={'navigate'}
          onPress={() =>
            this.props.navigation.navigate({
              routeName: 'test2',
            })
          }
        />
      </SafeAreaView>
    );
  }
}

export default Test;
