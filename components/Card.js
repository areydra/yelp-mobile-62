import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

const {width} = Dimensions.get('window');

const Card = props => {
  return props.business.name === 'empty' ? (
    <View style={{...styles.container, backgroundColor: 'transparent'}} />
  ) : (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => props.navigation.navigate('Details', {idBusiness: props.business.id, nameBusiness: props.business.name})}>
      <View style={styles.containerImage}>
        <Image style={styles.cardImage} source={{uri: props.business.image_url}} />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.textName}>{props.business.name}</Text>
        <Text>{props.business.review_count} Reviews</Text>
        <Text>{props.business.rating} Stars</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    height: width / 2,
    overflow: 'hidden',
    marginVertical: width / 50,
  },
  cardImage: {
    width: width / 2.2,
    height: width / 3,
    backgroundColor: 'transparent',
    borderRadius: 5
  },
  containerText: {
    paddingLeft: 2,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default withNavigation(Card);
