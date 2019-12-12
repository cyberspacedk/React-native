import React from 'react'
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {addToCart} from '../../store/actions/cart';  
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {

  const products = useSelector(state=> state.products.avalaibleProducts); 
  const dispatch = useDispatch(); 
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
          onAddToCart={()=> dispatch(addToCart(item))}
        />
      )}
    />
  )
} 

ProductsOverviewScreen.navigationOptions = nav => ({ 
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}> 
      <Item 
        title="Cart" 
        iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'}
        onPress={()=> nav.navigation.toggleDrawer()}
      />
    </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item 
          title="Cart" 
          iconName={Platform.OS === 'android' ? 'md-cart':'ios-cart'}
          onPress={()=> nav.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ) 
  })

export default ProductsOverviewScreen;
