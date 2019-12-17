import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Button } from 'react-native';
import {useSelector} from 'react-redux'; 
import {HeaderButtons , Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constatnts/Colors';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = () => {
  const userProducts = useSelector(state=> state.products.userProducts)
  return (
    <FlatList 
      data={userProducts} 
      keyExtractor={(item)=> item.id} 
      renderItem={({item})=> ( 
        <ProductItem {...item}  onselect={()=>null}>
          <Button color={Colors.primary} title="Edit" onPress={()=>  null}/>
          <Button color={Colors.primary} title="Delete" onPress={()=>  null}/> 
        </ProductItem>
      )} 
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


