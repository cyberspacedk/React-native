import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  total: 0
}

export default (state=initialState, action) =>{
  switch(action.type){
    
    case ADD_TO_CART : { 
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title; 
      let updatedOrNewCartItem;
 
      if(state.items[addedProduct.id]){ 
        const currentItem = state.items[addedProduct.id];
        updatedOrNewCartItem = new CartItem(
          currentItem.quantity+1, productPrice, productTitle, currentItem.sum + productPrice
          );
        return {
          ...state,
          items:{
            ...state.items,
            [addedProduct.id] : updatedOrNewCartItem
          },
          total: state.total + productPrice 
        }
      }else{ 
        updatedOrNewCartItem = new CartItem(1,productPrice, productTitle, productPrice); 
      } 
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem
        },
        total: state.total + productPrice
      };} 
    case REMOVE_FROM_CART: { 
      const {productId} = action;
      const currentItem = state.items[productId] 
      const currentItemQuantity = currentItem.quantity;
      let updatedCartItems;

      if(currentItemQuantity > 1){ 
        const updatedCartItem = {
          ...currentItem, 
          quantity: currentItemQuantity-1,
          sum: currentItem.sum - currentItem.productPrice
        }
        
        updatedCartItems = {...state.items, [productId]: updatedCartItem}
        
      }else { 
        updatedCartItems = {...state.items}; 
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        total: state.total - currentItem.productPrice
      };} 
    case ADD_ORDER:
      return initialState; 
    case DELETE_PRODUCT: {
    if(!state.items[action.productId]){
      return state;
    }

    const updatedItems = {...state.items};
    const sumDeleted = updatedItems[action.productId].sum;
    delete updatedItems[action.productId]

      return {
        ...state, 
        items: {
          ...updatedItems
        },
        total: state.total - sumDeleted
      } }
    default: 
      return state;
  }
}