import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../constants/Colors';
import { searchBusiness, searching } from '../store/actions/business';

const Search = () => {
  const [searchText, setSearchText] = useState(search);
  const dispatch = useDispatch()
  const search = useSelector(state => state.business.search, []);

  useEffect(() => {
    setSearchText(search)
  }, [search])

  const handleSearch = async () => {
    await dispatch(searching(searchText));
    await dispatch(searchBusiness(searchText))
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTextInput}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="white"
          style={styles.textInput}
          returnKeyType="search"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
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
