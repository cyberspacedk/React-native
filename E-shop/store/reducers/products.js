import PRODUCTS from '../../data/dummy-data';

// grab products concrete user
const userOneProducts = PRODUCTS.filter(product=> product.ownerId === 'u1');

const initialState = {
  avalaibleProducts: PRODUCTS,
  userProducts: userOneProducts 
}

export default (state = initialState, action )=> {
  return state;
}