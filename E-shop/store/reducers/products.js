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
      // find product index in array
      const userProductIndex = state.userProducts.findIndex(prod=> prod.id === action.productId ); 
      const avalaibleProductIndex= state.avalaibleProducts.findIndex(prod=> prod.id === action.productId ); 
      // getting data for update
      const {title, description, imageUrl} = action.productData;
      const id = state.userProducts[userProductIndex].ownerId; 
      // create new one
      const updatedProduct = new Product(action.productId, id, title, imageUrl, description ); 
      // make cope of existing
      const updatedUserProducts = [...state.userProducts];
      const updatedAvalaibleProducts = [...state.avalaibleProducts];
      // rewrite existing product on New product by Index 
      updatedUserProducts[userProductIndex] = updatedProduct;
      updatedAvalaibleProducts[avalaibleProductIndex] = updatedProduct; 

      // return updated state
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