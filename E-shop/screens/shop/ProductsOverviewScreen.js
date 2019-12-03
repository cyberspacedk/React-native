import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux';

const ProductsOverviewScreen = (props) => {

  const products = useSelector(state=> state.products.avalaibleProducts); 
  

  return (
    <FlatList 
      data={products} 
      keyExtractor={item=> item.id} 
      renderItem={({item})=> <Text>{item.title}</Text>}
    />
  )
} 

export default ProductsOverviewScreen;
