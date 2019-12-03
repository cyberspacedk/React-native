import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {

  const products = useSelector(state=> state.products.avalaibleProducts); 
  

  return (
    <FlatList 
      data={products} 
      keyExtractor={item=> item.id} 
      renderItem={({item})=> (
        <ProductItem 
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetail={()=> props.navigation.navigate('ProductDetail', {
            productId: item.id,
            productTitle: item.title
          })}
          onAddToCart={()=> null}
        />
      )}
    />
  )
} 

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
