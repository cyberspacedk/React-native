import React, {useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, Button, ActivityIndicator, Platform } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

import {addToCart} from '../../store/actions/cart';  
import {fetchProducts} from '../../store/actions/products';

import Colors from '../../constatnts/Colors';

const ProductsOverviewScreen = ({navigation}) => { 
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const products = useSelector(state=> state.products.avalaibleProducts);   
  const dispatch = useDispatch(); 
 
  const loadProducts = useCallback( async ()=> { 
    setIsError(false);
    setIsRefreshing(true);
    try{  
      await dispatch(fetchProducts())
    }catch{
      setIsError(true)
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setIsError])
 
  useEffect(()=>{  
   const willFocusSubcscription =  navigation.addListener('willFocus',  loadProducts);  
    return ()=> willFocusSubcscription.remove();
  },[loadProducts])
 
  useEffect(()=>{ 
    setIsLoading(true);
    loadProducts().then(()=> setIsLoading(false))
  },[loadProducts]);

  const handleItemDetails = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId:  id,
      productTitle:  title
    })
  };

  if(isError){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An Error occured!</Text>
        <Button title="try again" onPress={loadProducts} color={Colors.primary} />
      </View>
    )
  }

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  } 

  if(!isLoading && products.length ===0){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No products found. Maybe start adding some !</Text> 
      </View>
    )
  }

  return (
    <FlatList 
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products} 
      keyExtractor={item=> item.id} 
      renderItem={({item})=> (
        <ProductItem 
          {...item}
          onSelect={()=> handleItemDetails(item.id, item.title)} 
        >
          <Button color={Colors.primary} title="View Details" onPress={()=> handleItemDetails(item.id, item.title)} />
          <Button color={Colors.primary} title="To Cart" onPress={()=> dispatch(addToCart(item))} /> 
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

ProductsOverviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
  }).isRequired
};

export default ProductsOverviewScreen;
