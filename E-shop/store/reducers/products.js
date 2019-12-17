import PRODUCTS from '../../data/dummy-data'; 
import {DELETE_PRODUCT} from '../actions/products';

// grab products concrete user
const userOneProducts = PRODUCTS.filter(product=> product.ownerId === 'u1');

const initialState = {
  avalaibleProducts: PRODUCTS,
  userProducts: userOneProducts 
}

export default (state = initialState, action )=> {
  switch(action.type){
    case DELETE_PRODUCT:
      const updatedUserProducts = userOneProducts.filter(product=> product.id !== action.productId);
      return {
        ...state, 
        userProducts : updatedUserProducts,
        avalaibleProducts: updatedUserProducts 
      }
  }
  return state;
}