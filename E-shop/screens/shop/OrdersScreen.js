import React from 'react'
import { View, Text ,Platform , FlatList} from 'react-native'
import {useSelector} from 'react-redux';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = (props) => {

  const orders = useSelector(state=> state.orders.orders);

  return (
  <FlatList keyExtractor={item=>item.id} data={orders} renderItem={({item})=> <Text>{item.total}</Text>}/>
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
