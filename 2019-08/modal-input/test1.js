import React from 'react';
import { Keyboard, View, Text, TextInput, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { BoxModal } from '../../../components/PopupMenu/style';

class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    setTimeout(() => {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    }, 3000);

    setTimeout(() => {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    }, 5000);
  }

  onModalHide = () => {
    // trick for android
    setTimeout(() => {
      this.props.navigation.navigate({
        routeName: 'test2',
      });
    }, 0);
  };

  render() {
    return (
      <SafeAreaView>
        <Text>hello</Text>
        <TextInput autoFocus />

        <Modal isVisible={this.state.isVisible} onModalHide={this.onModalHide}>
          <Text>modal</Text>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default Test;
