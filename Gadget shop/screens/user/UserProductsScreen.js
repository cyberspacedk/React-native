import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Text, FlatList, Platform, Button, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'; 
import {HeaderButtons , Item} from 'react-navigation-header-buttons'; 

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import Colors from '../../constatnts/Colors';

import {deleteProduct} from '../../store/actions/products';

const UserProductsScreen = ({navigation}) => {
  const userProducts = useSelector(state=> state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    navigation.navigate('EditProduct', {productId: id}) 
  }

const deleteHandler = (id) => {
  Alert.alert('Are you sure ?', 'Do you really want to delete this item ?', [
    {text: 'No', style: 'default'},
    {text: 'Yes', style:'destructive', onPress: ()=> {
      dispatch(deleteProduct(id))
    }}
  ])
  }
 
  if(userProducts.length === 0){
    return (
      <EmptyScreen>
        <Text>No products found</Text>
      </EmptyScreen>
    )
  }

  return (
    <FlatList 
      data={userProducts} 
      keyExtractor={(item)=> item.id} 
      renderItem={({item})=> ( 
        <ProductItem {...item} onSelect={()=> editProductHandler(item.id)}>
          <Button color={Colors.primary} title="Edit" onPress={()=> editProductHandler(item.id)} />
          <Button color={Colors.primary} title="Delete" onPress={()=> deleteHandler(item.id)} /> 
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

const EmptyScreen = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`;

UserProductsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
 
export default UserProductsScreen

