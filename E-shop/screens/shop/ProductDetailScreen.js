import React from 'react'
import { View, Text, ScrollView, Image, Button, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux';

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector(state=> state.products.avalaibleProducts.find(prod=> prod.id === productId));

  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({ 
})

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

export default ProductDetailScreen
