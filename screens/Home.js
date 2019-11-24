import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Card from '../components/Card';
import Search from '../components/Search';
import {fetchBusiness, loadMoreBusiness} from '../store/actions/business';
import Colors from '../constants/Colors';

const Home = () => {
  const data = useSelector(state => state.business.business);
  const [offset, setOffset] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isRefreshLoadMore, setIsRefreshLoadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    setOffset(state => state + 1);
  }, []);

  const fetchData = async () => {
    await dispatch(fetchBusiness());
    setIsRefresh(false);
  };

  const renderCard = data => {
    return <Card business={data.item} />;
  };

  const loadMore = async () => {
    await setIsRefreshLoadMore(true);
    await dispatch(loadMoreBusiness(offset + 1));
    setOffset(state => state + 1);
    setIsRefreshLoadMore(false);
  };

  return data.length ? (
    <View style={{flex: 1}}>
      <FlatList
        onRefresh={fetchData}
        refreshing={isRefresh}
        keyExtractor={(data, index) => index}
        data={data}
        renderItem={renderCard}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-around', marginBottom: 10}}
        style={{marginTop: 20}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      {isRefreshLoadMore ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ backgroundColor: 'transparent' }} />
      ) : null}
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {data === 'null' ? (
        <Text>Data not found</Text>
      ) : (
        <ActivityIndicator size="small" color={Colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

Home.navigationOptions = () => {
  return {
    headerTitle: <Search />,
  };
};

export default Home;
