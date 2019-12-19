import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Card from '../UI/Card';

const ProductItem = (props) =>  {

  // checking support TouchableNativeFeedback
  
  // by default will use TouchableOpacity component
  let TouchableCmp = TouchableOpacity;

  // for Android devices we will use TouchableNativeFeedback component with useForeGround props
  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  } 
  
  return (
  <TouchableCmp onPress={props.onSelect} useForeground>
    <Card style={styles.product}> 
        <View style={styles.imageContainer}> 
          <Image style={styles.image} source={{uri: props.imageUrl}}/>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>{props.price}</Text>
        </View> 
        <View style={styles.actions}>
          {props.children}
        </View> 
    </Card> 
  </TouchableCmp> 
) }

const styles = StyleSheet.create({
  product: { 
    height: 300,
    margin: 20, 
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%', 
    borderTopRightRadius:10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  }
})


export default ProductItem;
