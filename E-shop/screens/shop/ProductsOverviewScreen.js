import React, {useEffect, useState, useCallback} from 'react'
import { View, Text, FlatList, Button, ActivityIndicator, Platform } from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import {addToCart} from '../../store/actions/cart';  
import {fetchProducts} from '../../store/actions/products';

import Colors from '../../constatnts/Colors';

const ProductsOverviewScreen = (props) => {
  // handling async requests
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const products = useSelector(state=> state.products.avalaibleProducts);   
  const dispatch = useDispatch(); 

  // async func for getting products
  const loadProducts = useCallback( async ()=> {
    setIsLoading(true);
    setIsError(false);
    try{  
      await dispatch(fetchProducts())
    }catch{
      setIsError(true)
    } 
    setIsLoading(false);  
  }, [dispatch, setIsLoading, setIsError])

  // load products every time when navigation is change
  useEffect(()=>{
  // store to constant event listener
   const willFocusSubcscription =  props.navigation.addListener('willFocus',  loadProducts); 
  //  unsubscribe from event when component unmounts
    return ()=> willFocusSubcscription.remove();
  },[loadProducts])

  // load products when component mounts
  useEffect(()=>{ loadProducts()},[loadProducts]);


  const handleItemDetails = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId:  id,
      productTitle:  title
    })
  };

  if(isError){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An Error occured!</Text>
        <Button title="try again" onPress={loadProducts} color={Colors.primary}/>
      </View>
    )
  }

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary}/>
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
