import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import {useSelector} from 'react-redux'; 
import {HeaderButtons , Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/UI/HeaderButton';

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = () => {
  const userProducts = useSelector(state=> state.products.userProducts)
  return (
    <FlatList 
      data={userProducts} 
      keyExtractor={(item)=> item.id} 
      renderItem={({item})=> ( <ProductItem {...item} onViewDetail={()=> null} onAddToCart={()=>null}/> )} 
    />
  )
}

UserProductsScreen.navigationOptions = (nav)=> ({
  headerTitle : "Your Products",
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

const styles = StyleSheet.create({
    
})

export default UserProductsScreen
