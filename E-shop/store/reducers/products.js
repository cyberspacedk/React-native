import PRODUCTS from '../../data/dummy-data'; 
import {DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, updateProduct} from '../actions/products';
import Product from '../../models/product';

// grab products concrete user
const userOneProducts = PRODUCTS.filter(product=> product.ownerId === 'u1');

const initialState = {
  avalaibleProducts: PRODUCTS,
  userProducts: userOneProducts 
}

export default (state = initialState, action )=> {
  switch(action.type){
    case DELETE_PRODUCT:{
      const updatedUserProducts = state.avalaibleProducts.filter(product=> product.id !== action.productId); 
      
      return {
        ...state, 
        userProducts : updatedUserProducts,
        avalaibleProducts: updatedUserProducts 
      };
    }
 
    case CREATE_PRODUCT: {
      const {title, description, imageUrl, price} = action.productData;
      const newProduct = new Product(new Date().toString(), 'u1', title, imageUrl, description, price); 
      
      return {
        ...state,
        avalaibleProducts: state.avalaibleProducts.concat(newProduct),
        userProducts: state.avalaibleProducts.concat(newProduct),
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