export const ADD_TO_CART = 'ADD_TO_CART';

export default addToCart = product => {
  return {
    type: ADD_TO_CART,
    product: product
  }
}