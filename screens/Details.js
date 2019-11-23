import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-ionicons';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Colors from '../constants/Colors';

const {width} = Dimensions.get('window')

const Details = props => {
  const details = props.navigation.getParam('businessDetails');
  const carouselData = [{name: 'areydra'}, {name: 'desfikri'}];
  const [activeIndex, setActiveIndex] = useState(0) 

  const _renderImage = item => {
    return (
      <View style={styles.containerImage}>
        <Text>{item.item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Carousel
          data={carouselData}
          renderItem={_renderImage}
          sliderWidth={width/1.13}
          itemWidth={width/1.13}
          autoplay={true}
          loop={true}
          layout={'default'}
          autoplayInterval={5000}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={activeIndex}
          containerStyle={{marginTop: -60}}
          dotStyle={{
            width: 30,
            height: 5,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={styles.containerReviews}>
        <Text style={styles.numberReviews}>7840</Text>
        <Text style={styles.textCenter}>Reviews</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{...styles.border, borderEndWidth: 0.5}}>
          <Text style={{...styles.textCenter, marginRight: 5, fontSize: 20}}>
            4.5
          </Text>
          <Icon name="star-outline" />
        </View>
        <View style={{...styles.border, borderStartWidth: 0.5}}>
          <Image
            source={require('../assets/icons/dollar_active.png')}
            style={{width: 20, height: 20}}
          />
          <Image
            source={require('../assets/icons/dollar_active.png')}
            style={{width: 20, height: 20}}
          />
          <Image
            source={require('../assets/icons/dollar.png')}
            style={{width: 20, height: 20}}
          />
          <Image
            source={require('../assets/icons/dollar.png')}
            style={{width: 20, height: 20}}
          />
        </View>
      </View>
    </View>
  );
};

Details.navigationOptions = navigationData => {
  const details = navigationData.navigation.getParam('businessDetails');
  return {
    headerTitle: details.name,
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
