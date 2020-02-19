import React, {useState} from 'react'
import { FlatList, Button, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';
import CartItem from '../../components/shop/CartItem'; 
import Colors from '../../constatnts/Colors';

const CartScreen = () => {
  const [isLoading, setIsloading]= useState(false);
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector(({cart})=> cart.total);  
  const roundedAmount = Math.round(cartTotalAmount.toFixed(2) * 100)/100;

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

  const emptyCart = cartItems.length === 0;
  
  const sendOrderHandler = async ()=> {
    setIsloading(true); 
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsloading(false);
  }

  return (
    <Screen>
      <Summary>
        <SummaryLabel> 
          Total: 
          <Amount>
            $
            {roundedAmount}
          </Amount>
        </SummaryLabel>
        {isLoading ? 
          <ActivityIndicator size="small" color={Colors.primary} /> 
          : 
          <Button title="Order Now" color={Colors.accent} disabled={emptyCart} onPress={sendOrderHandler} />
        }
      </Summary>

      <FlatList 
        data={cartItems} 
        keyExtractor={({productId})=> productId} 
        renderItem={({item})=> <CartItem {...item} deleteable onRemove={()=> dispatch(removeFromCart(item.productId))} />}
      /> 
    </Screen>
  )
}

const Screen = styled.View`
  margin: 20px;
`; 
 
const Amount = styled.Text`
  color: ${Colors.primary}
`;
 
const Summary = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  flex-direction:row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px; 
`;

const SummaryLabel = styled.Text`
  font-family: 'open-sans-bold';
  font-size: 18px;
`;

export default CartScreen
