import React from 'react';
import { Keyboard, View, Text, TextInput, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import {BoxModal} from "../../../components/PopupMenu/style";

class Test extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <Text>hello23</Text>
        <TextInput autoFocus />

      </SafeAreaView>
    );
  }
}

export default Test;
