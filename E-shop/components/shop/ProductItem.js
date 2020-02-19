import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Card from '../UI/Card';

const ProductItem = ({onSelect, imageUrl, title, price, children}) =>  { 
  // checking support TouchableNativeFeedback 
  // by default will use TouchableOpacity component
  let TouchableCmp = TouchableOpacity;

  // for Android devices we will use TouchableNativeFeedback component with useForeGround props
  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  } 
  
  return (
    <TouchableCmp onPress={onSelect} useForeground>
      <Card style={product}> 
        <ImageScreen> 
          <Image source={{uri: imageUrl}} />
        </ImageScreen>
        <Details>
          <Title>{title}</Title>
          <Price>{price}</Price>
        </Details> 
        <Actions>
          {children}
        </Actions> 
      </Card> 
    </TouchableCmp> 
) }

const product = {
  height: 300,
  margin: 20 
}

const ImageScreen = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60%;
  overflow: hidden;
  width: 100%;
`;

const Image = styled.Image`
  width: 50%;
  height: 100%;
  margin: 0 auto;
`;

const Details = styled.View`
  align-items: center;
  height: 17%;
  padding: 10px;
`;

const Actions = styled.View`
  align-items: center;
  flex-direction:row;
  height: 25%;
  justify-content: space-between;
  padding: 0 20px;
`;

const Price = styled.Text`
  color: #888;
  font-family: 'open-sans';
  font-size: 14px;
`;

const Title = styled.Text`
  font-family: 'open-sans-bold';
  font-size: 18px;
  margin: 4px 0;
`;
 
ProductItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired, 
   price: PropTypes.number.isRequired, 
   children: PropTypes.node.isRequired
}

export default ProductItem;
