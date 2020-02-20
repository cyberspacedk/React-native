/* eslint-disable react-native/no-raw-text */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CartItem = ({quantity, productTitle, sum, onRemove, deleteable}) => {
  const fixedSum = sum.toFixed(2);
  return (
    <CardItemScreen>

      <ItemData>
        <Title>{productTitle}</Title> 
        <Quantity>{quantity}</Quantity>
      </ItemData>

      <ItemData>
        <Amount>
          {' '}
          $
          {' '}
          {fixedSum}
          {' '}
        </Amount>
        {deleteable &&  (
          <DeleteButton onPress={onRemove}>
            <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red" />
          </DeleteButton>
        )}
       
      </ItemData> 

    </CardItemScreen>
  )
}

const CardItemScreen = styled.View`
  padding: 10px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`;

const ItemData = styled.View`
  align-items: center;
  flex-direction: row; 
`;

const Title = styled.Text`
  font-family: 'open-sans-bold';
  font-size: 16px;
`;

const Quantity = styled.Text`
  color: #888;
  font-family: 'open-sans';
  font-size: 16px;
`;

const Amount = styled.Text`
  color: #888;
  font-size: 16px;
  font-family: 'open-sans';
 `;

const DeleteButton = styled.TouchableOpacity`
  margin-left: 20px;
`; 

CartItem.propTypes = {
  quantity: PropTypes.string.isRequired, 
  productTitle: PropTypes.string.isRequired, 
  sum: PropTypes.number.isRequired, 
  onRemove: PropTypes.func.isRequired, 
  deleteable: PropTypes.bool.isRequired
}

export default CartItem
