import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { commonColors } from '../../../../../common/commonColors';

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  button: {
    flex: 1,
    height: '100%',
    backgroundColor: commonColors.grayBackground,
    borderRightWidth: 1,
    borderRightColor: commonColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: commonColors.blue,
  },
});

const SuggestionBar = ({ wordIndex, suggestionWords, onWordPressed }) => {
  return (
    <View style={style.wrapper}>
      {suggestionWords.map((item, index) => (
        <TouchableOpacity
          style={style.button}
          key={index.toString()}
          onPress={() => {
            onWordPressed(wordIndex, item);
          }}
        >
          <Text style={style.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

SuggestionBar.propTypes = {
  wordIndex: PropTypes.number.isRequired,
  suggestionWords: PropTypes.array.isRequired,
  onWordPressed: PropTypes.func.isRequired,
};

export default SuggestionBar;
