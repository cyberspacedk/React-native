import React from 'react'
import { View, Text, StyleSheet, FlatList, Button} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';

import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem';

import Colors from '../../constatnts/Colors';

const CartScreen = () => {

  const cartTotalAmount = useSelector(({cart})=> cart.total);  

  const cartItems = useSelector(({cart})=> {
    const transformedCartItems = [];
    Object.keys(cart.items).forEach(key=> {
      const {productTitle,productPrice,quantity,sum } = cart.items[key]
      transformedCartItems.push({
        productId: key,
        productTitle,
        productPrice,
        quantity,
        sum
      })
    });
    return transformedCartItems;
  });

  const dispatch = useDispatch();


  const emptyCart = cartItems.length === 0;
     
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}> 
          Total: 
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button title="Order Now" color={Colors.accent} disabled={emptyCart} onPress={()=> dispatch(addOrder(cartItems, cartTotalAmount))}/>
      </View>

      <FlatList 
        data={cartItems} 
        keyExtractor={({productId})=> productId} 
        renderItem={({item})=> <CartItem {...item} deleteable onRemove={()=> dispatch(removeFromCart(item.productId))}/>}
      />
      
    </View>
  )
}
const styles = StyleSheet.create({ 
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: .26,
    textShadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,

  },
  amount: {
    color: Colors.primary
  }
})


export default CartScreen
