import React from 'react';
import { View, Keyboard, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import SuggestionBarContent from './SuggestionBar';

let { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  barWrapper: {
    zIndex: 9999,
    position: 'absolute',
    overflow: 'hidden',
    height: 40,
  },
});

class SuggestionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width,
      isShowSuggestionBar: false,
    };
  }

  componentWillMount(props) {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowHandler
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShowHandler = ({ endCoordinates }) => {
    this.setState({
      bottom: endCoordinates.height,
      width: endCoordinates.width,
      isShowSuggestionBar: true,
    });
  };

  keyboardDidHideHandler = () => {
    this.setState({
      isShowSuggestionBar: false,
    });
  };

  render() {
    const { bottom, width } = this.state;

    return this.state.isShowSuggestionBar ? (
      <View style={[{ bottom, width }, styles.barWrapper]}>
        <SuggestionBarContent
          wordIndex={this.props.wordIndex}
          suggestionWords={this.props.suggestionWords}
          onWordPressed={this.props.onWordPressed}
        />
      </View>
    ) : null;
  }
}

SuggestionBar.propTypes = {
  wordIndex: PropTypes.number.isRequired,
  suggestionWords: PropTypes.array.isRequired,
  onWordPressed: PropTypes.func.isRequired,
};

export default SuggestionBar;
