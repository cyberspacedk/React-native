import React from 'react'
import { View, Text, ScrollView, Image, Button, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux';
import Colors from '../../constatnts/Colors';

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector(state=> state.products.avalaibleProducts.find(prod=> prod.id === productId));

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: product.imageUrl}}/>
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={()=> null} /> 
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text> 
    </ScrollView>
  )
}
const styles = StyleSheet.create({ 
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14, 
    textAlign: 'center',
    paddingHorizontal: 10
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  }
})

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

export default ProductDetailScreen
