import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-ionicons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import Colors from '../constants/Colors';
import {detailsBusiness} from '../store/actions/business';

const {width} = Dimensions.get('window');

const Details = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const idBusiness = props.navigation.getParam('idBusiness');
  const businessDetails = useSelector(state => state.business.detailsBusiness);
  const dollarActive = businessDetails.price ? _.range(1, businessDetails.price.length + 1) : []
  const dollarInActive = businessDetails.price ? _.range(1, 4 - dollarActive.length + 1) : [1,2,3,4]

  const dispatch = useDispatch();

  useEffect(() => {
    if (businessDetails.id !== idBusiness) {
      fetchBusinessDetails();
    }
  }, []);

  const fetchBusinessDetails = async () => {
    await dispatch(detailsBusiness(idBusiness));
  };

  const _renderImage = item => {
    return (
      <View style={styles.containerImage}>
        <Image
          source={{uri: item.item}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  };

  return businessDetails.id === idBusiness ? (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Carousel
          data={businessDetails.photos}
          renderItem={_renderImage}
          sliderWidth={width / 1.13}
          itemWidth={width / 1.13}
          autoplay={true}
          loop={true}
          layout={'default'}
          autoplayInterval={5000}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={businessDetails.photos.length}
          activeDotIndex={activeIndex}
          containerStyle={{marginTop: -60}}
          dotStyle={{
            width: 20,
            height: 5,
            marginHorizontal: -5,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={styles.containerReviews}>
        <Text style={styles.numberReviews}>{businessDetails.review_count}</Text>
        <Text style={styles.textCenter}>Reviews</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{...styles.border, borderEndWidth: 0.5}}>
          <Text style={{...styles.textCenter, marginRight: 5, fontSize: 20}}>
            {businessDetails.rating}
          </Text>
          <Icon name="star-outline" />
        </View>
        <View style={{...styles.border, borderStartWidth: 0.5}}>
          {dollarActive.length
            ? dollarActive.map(index => (
                <Image
                  key={index}
                  source={require('../assets/icons/dollar_active.png')}
                  style={{width: 20, height: 20}}
                />
              ))
            : null}
          {dollarInActive.length
            ? dollarInActive.map(index => (
                <Image
                  key={index}
                  source={require('../assets/icons/dollar.png')}
                  style={{width: 20, height: 20}}
                />
              ))
            : null}
        </View>
      </View>
    </View>
  ) : (
    <View style={{...styles.container, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

Details.navigationOptions = navigationData => {
  const name = navigationData.navigation.getParam('nameBusiness');
  return {
    headerTitle: name,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerImage: {
    height: 200,
    backgroundColor: 'red',
    marginBottom: 40,
  },
  containerReviews: {
    borderWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 0,
    paddingVertical: 20,
  },
  numberReviews: {
    textAlign: 'center',
    fontSize: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  border: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
