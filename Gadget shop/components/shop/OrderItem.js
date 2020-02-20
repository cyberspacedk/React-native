import React, {useState} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import {Button} from 'react-native'

import CartItem from './CartItem';
import Colors from '../../constatnts/Colors';

const OrderItem = ({total, date, items}) => {
  const [showDetails, setShowDetails] = useState(false);

 const handleShowDetails = ()=> {
    setShowDetails(prevState=> !prevState);
  }
  const totalFixed = total && total.toFixed(2);

  return (
    <OrderItemScreen>
      <Summary>
        <TotalAmount>{totalFixed}</TotalAmount>
        <Date>{date}</Date>
      </Summary>
      {!items && <EmptyOrdersMessage>No orders yet !</EmptyOrdersMessage> }
      <Button color={Colors.primary} title={showDetails ? "Hide details" : "Show details"} onPress={handleShowDetails} disabled={!items} />
      {showDetails && (
        <Details>
          {items && items.map(item=> (<CartItem key={item.productId} {...item} />))}
        </Details>
      )}
    </OrderItemScreen>
  )
} 

const OrderItemScreen = styled.View`
  border-radius: 5px;
  background-color: #fff;
  margin: 20px;
  padding: 10px;
  align-items: center;
`;

const Summary = styled.View`
   align-items: center;
   flex-direction: row;
   justify-content:space-between;
   margin-bottom: 10px;
   width: 100%; 
`;

const TotalAmount = styled.Text`
  font-family: 'open-sans-bold';
  font-size: 16;
`;

const Date = styled.Text`
  color: #000;
  font-family: 'open-sans-bold';
  font-size: 16px;
`;

const Details = styled.View`
  width: 100%;
`;

const EmptyOrdersMessage = styled.Text`
  text-align: center;
`;

OrderItem.propTypes = {
  total: PropTypes.number.isRequired, 
  date: PropTypes.string.isRequired, 
  items: PropTypes.arrayOf.isRequired
}

export default OrderItem
