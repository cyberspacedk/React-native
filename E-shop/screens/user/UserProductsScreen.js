import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Button } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'; 
import {HeaderButtons , Item} from 'react-navigation-header-buttons'; 
import HeaderButton from '../../components/UI/HeaderButton';

import {deleteProduct} from '../../store/actions/products';

import Colors from '../../constatnts/Colors';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = (props) => {
  const userProducts = useSelector(state=> state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id})
  }
  return (
    <FlatList 
      data={userProducts} 
      keyExtractor={(item)=> item.id} 
      renderItem={({item})=> ( 
        <ProductItem {...item}  onSelect={()=> editProductHandler(item.id)}>
          <Button color={Colors.primary} title="Edit" onPress={()=> editProductHandler(item.id)}/>
          <Button color={Colors.primary} title="Delete" onPress={()=>  dispatch(deleteProduct(item.id))}/> 
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
        title="Add" 
        iconName={Platform.OS === 'android' ? 'md-create':'ios-create'}
        onPress={()=> nav.navigation.navigate('EditProduct')}
      />
    </HeaderButtons>
  ) 
})

const styles = StyleSheet.create({
    
})

export default UserProductsScreen


