import {DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS} from '../actions/products';
import Product from '../../models/product';
 
const initialState = {
  avalaibleProducts: [],
  userProducts: [] 
}

export default (state = initialState, action )=> {
  switch(action.type){

    case SET_PRODUCTS: {
      return {
        avalaibleProducts: action.products,
        userProducts: action.userProducts
      }
    }
 
    case DELETE_PRODUCT:{
      const updatedUserProducts = state.avalaibleProducts.filter(product=> product.id !== action.productId);  
      return {
        ...state, 
        userProducts : updatedUserProducts,
        avalaibleProducts: updatedUserProducts 
      };
    }
 
    case CREATE_PRODUCT: {
      const {id, title, description, imageUrl, price, ownerId} = action.productData;
      const newProduct = new Product(id, ownerId, title, imageUrl, description, price); 
      
      return {
        ...state,
        avalaibleProducts: state.avalaibleProducts.concat(newProduct),
        userProducts: state.avalaibleProducts.concat(newProduct)
      };
    }

    case UPDATE_PRODUCT: {  
      const userProductIndex = state.userProducts.findIndex(prod=> prod.id === action.productId ); 
      const avalaibleProductIndex= state.avalaibleProducts.findIndex(prod=> prod.id === action.productId );  
      const {title, description, imageUrl} = action.productData;
      const id = state.userProducts[userProductIndex].ownerId;  
      const updatedProduct = new Product(action.productId, id, title, imageUrl, description );  
      const updatedUserProducts = [...state.userProducts];
      const updatedAvalaibleProducts = [...state.avalaibleProducts]; 
      updatedUserProducts[userProductIndex] = updatedProduct;
      updatedAvalaibleProducts[avalaibleProductIndex] = updatedProduct; 
 
      return {
        ...state, 
        avalaibleProducts: updatedAvalaibleProducts,
        userProducts: updatedUserProducts
      };
    }

    default : 
      return state; 
  }
}