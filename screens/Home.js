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
import {
  fetchBusiness,
  loadMoreBusiness,
  resetSearch,
} from '../store/actions/business';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = () => {
  const data = useSelector(state => state.business.business, []);
  const search = useSelector(state => state.business.search, []);
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
    await dispatch(loadMoreBusiness(offset + 1, search))

    setOffset(state => state + 1);
    setIsRefreshLoadMore(false);
  };

  const handleResetSearch = async () => {
    await dispatch(resetSearch());
  };

  const searchText = () => {
    return search.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <Text>Search for : {search}</Text>
          <TouchableOpacity onPress={handleResetSearch}>
            <Text style={{color: 'red'}}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : null;
  };

  return data.length && data !== 'null' ? (
    <View style={{flex: 1}}>
      {searchText()}
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
        style={{marginTop: 5}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      {isRefreshLoadMore ? (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={{backgroundColor: 'transparent', marginBottom: 10}}
        />
      ) : null}
    </View>
  ) : (
    <React.Fragment>
      {searchText()}
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data === 'null' ? (
          <Text style={{textAlign: 'center'}}>Data not found</Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});

Home.navigationOptions = () => {
  return {
    headerTitle: <Search />,
  };
};

export default Home;
