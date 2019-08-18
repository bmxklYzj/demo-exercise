import React from 'react';
import PropTypes from 'prop-types';
import { InputAccessoryView } from 'react-native';
import SuggestionBarContent from './SuggestionBar';

const SuggestionBar = ({ iOSInputAccessoryViewID, wordIndex, suggestionWords, onWordPressed }) => {
  return (
    <InputAccessoryView nativeID={iOSInputAccessoryViewID}>
      <SuggestionBarContent
        wordIndex={wordIndex}
        suggestionWords={suggestionWords}
        onWordPressed={onWordPressed}
      />
    </InputAccessoryView>
  );
};

SuggestionBar.protoTypes = {
  iOSInputAccessoryViewID: PropTypes.string.isRequired,
  wordIndex: PropTypes.number.isRequired,
  suggestionWords: PropTypes.array.isRequired,
  onWordPressed: PropTypes.func.isRequired,
};

export default SuggestionBar;
