/**
 * @file KeyboardAvoidingView
 */
import React from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

class Test extends React.PureComponent {
  _focusNextField = nextField => {
    this['input' + nextField].focus();
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={'height'}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello1</Text>
          <Button title="button" onPress={() => {console.log('button pressed!')}}></Button>
          <TextInput
            blurOnSubmit={false}
            ref={input => (this.input1 = input)}
            onSubmitEditing={() => this._focusNextField('2')}
          />
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello2</Text>
          <TextInput
            blurOnSubmit={false}
            ref={input => (this.input2 = input)}
            onSubmitEditing={() => this._focusNextField('3')}
          />
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello3</Text>
          <TextInput
            blurOnSubmit={false}
            ref={input => (this.input3 = input)}
            onSubmitEditing={() => this._focusNextField('4')}
          />
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello4</Text>
          <TextInput
            blurOnSubmit={false}
            ref={input => (this.input4 = input)}
            onSubmitEditing={() => this._focusNextField('4')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Test;
