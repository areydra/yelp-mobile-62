import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';

import Card from '../components/Card';
import Search from '../components/Search'
import { fetchBusiness } from '../store/actions/business';

const Home = () => {
  // const data = useSelector(state => state.business.business)
  let data = [
    {
      id: 'cool',
      name: 'empty',
    },
  ];

  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    await dispatch(fetchBusiness());
  }

  const renderCard = data => {
    return <Card business={data.item} />;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={data => data.id}
        data={data}
        renderItem={renderCard}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        style={{marginTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

Home.navigationOptions = () => {
    return {
      headerTitle: <Search />,
    };
}

export default Home;
