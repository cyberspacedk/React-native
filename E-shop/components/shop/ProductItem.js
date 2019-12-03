import React from 'react'
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../../constatnts/Colors';

const ProductItem = (props) =>  {

  // checking support TouchableNativeFeedback
  
  // by default will use TouchableOpacity component
  let TouchableCmp = TouchableOpacity;

  // for Android devices we will use TouchableNativeFeedback component with useForeGround props
  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  } 
  
  return (
  <TouchableCmp onPress={props.onViewDetail} useForeground>
    <View style={styles.product}>
      <View style={styles.imageContainer}> 
        <Image style={styles.image} source={{uri: props.image}}/>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>{props.price.toFixed(2)}</Text>
      </View> 
      <View style={styles.actions}>
        <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
        <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/> 
      </View>
    </View>
  </TouchableCmp>

) }

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: .26,
    textShadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#fff',  
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
    height: '15%',
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
