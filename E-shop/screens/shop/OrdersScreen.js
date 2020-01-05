import React, {useEffect, useState, useCallback} from 'react'
import { View, Text ,Platform , FlatList, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';

import {getOrders} from '../../store/actions/orders';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem'; 
import Colors from '../../constatnts/Colors';

const OrdersScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(state=> state.orders.orders); 

  const loadOrders = useCallback(async ()=> {
    setIsLoading(true);
    await dispatch(getOrders());
    setIsLoading(false);
  },[setIsLoading, dispatch]);

  useEffect(()=> {loadOrders()},[loadOrders])

  if(isLoading){
    return (
      <View style={{flex:1 , justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )
  }

    // handling empty orders screen. 
  // in future will be nice add separate component (with image)
  if(orders.length === 0){
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No orders found</Text>
    </View>)
  }

  return (
  <FlatList keyExtractor={item=>item.id} data={orders} renderItem={({item})=> <OrderItem  {...item}/>}/>
  )
}

OrdersScreen.navigationOptions = nav => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}> 
      <Item 
        title="Cart" 
        iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'}
        onPress={()=> nav.navigation.toggleDrawer()}
      />
    </HeaderButtons>
    ),
  }
}

export default OrdersScreen
