import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

import Colors from '../constants/Colors';

const Search = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTextInput}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="white"
          style={styles.textInput}
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: '100%',
    width: '100%',
  },
  containerTextInput: {
    backgroundColor: Colors.secondary,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textInput: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'white',
    padding: 5,
  },
});

export default withNavigation(Search);
