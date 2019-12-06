import {ADD_TO_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  total: 0
}

export default (state=initialState, action) =>{
  switch(action.type){
    case ADD_TO_CART : 
    // get data from added product
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      // define a variable that stores incoming data 
      let updatedOrNewCartItem;

      // check product existing by "ID"
      if(state.items[addedProduct.id]){
        // get current item from Items
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
        // create new Item  
        updatedOrNewCartItem = new CartItem(1,productPrice, productTitle, productPrice); 
      } 
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem
        },
        total: state.total + productPrice
      };
    default: 
      return state;
  }
}