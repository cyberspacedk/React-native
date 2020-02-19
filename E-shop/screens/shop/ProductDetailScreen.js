import React from 'react'
import { ScrollView, Button} from 'react-native';
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import Colors from '../../constatnts/Colors';
import {addToCart} from '../../store/actions/cart'; 

const ProductDetailScreen = ({navigation}) => {
  const productId = navigation.getParam('productId');
  const product = useSelector(state=> state.products.avalaibleProducts.find(prod=> prod.id === productId)); 
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} />
      <AddToCart>
        <Button color={Colors.primary} title="Add to Cart" onPress={()=> dispatch(addToCart(product))} /> 
      </AddToCart>
      <Price>
        $
        {product.price}
      </Price>
      <Description>{product.description}</Description> 
    </ScrollView>
  )
}

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
const AddToCart = styled.View`
  align-items: center;
  margin: 10px 0;
`;
const Description = styled.Text`
  font-size: 14px;
  padding: 0 10px;
  text-align: center;
`;
const Price = styled.Text`
  color: #888;
  font-family: 'open-sans-bold';
  font-size: 20px;
  text-align: center;
`;

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
};

ProductDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  }).isRequired
}

export default ProductDetailScreen
