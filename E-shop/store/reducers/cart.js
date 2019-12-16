import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/orders';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  total: 0
}

export default (state=initialState, action) =>{
  switch(action.type){
// add item to cart ==============
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
// remove item from cart ==============
    case REMOVE_FROM_CART: 
    // define quantity of ONE product in cart
      const {productId} = action;
      const currentItem = state.items[productId] 
      const currentItemQuantity = currentItem.quantity;
      let updatedCartItems;

      if(currentItemQuantity > 1){
        // decrease quantity and sum in concrete product
        const updatedCartItem = {
          ...currentItem, 
          quantity: currentItemQuantity-1,
          sum: currentItem.sum - currentItem.productPrice
        }
       
        // make a cart update
        updatedCartItems = {...state.items, [productId]: updatedCartItem}
        
      }else {
        // make a cope of items in cart
        updatedCartItems = {...state.items};
        // delete items by passing ID from cart
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        total: state.total - currentItem.productPrice
      };
// when order has been added need to clear cart
    case ADD_ORDER:
      return initialState;
// default return
    default: 
      return state;
  }
}