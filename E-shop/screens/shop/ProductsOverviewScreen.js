import React from 'react'
import { View, Text, FlatList, Button, StyleSheet, Platform } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {addToCart} from '../../store/actions/cart';  
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constatnts/Colors';

const ProductsOverviewScreen = (props) => {

  const products = useSelector(state=> state.products.avalaibleProducts); 
  const dispatch = useDispatch(); 
  
  const handleItemDetails = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId:  id,
      productTitle:  title
    })
  };

  return (
    <FlatList 
      data={products} 
      keyExtractor={item=> item.id} 
      renderItem={({item})=> (
        <ProductItem 
         {...item}
          onSelect={()=> handleItemDetails(item.id, item.title)} 
        >
          <Button color={Colors.primary} title="View Details" onPress={()=> handleItemDetails(item.id, item.title)}/>
          <Button color={Colors.primary} title="To Cart" onPress={()=> dispatch(addToCart(item))}/> 
        </ProductItem>
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
