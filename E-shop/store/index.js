import {createStore, combineReducers} from 'redux'; 
import { composeWithDevTools} from 'redux-devtools-extension';

// reducers
import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
}) 

const store = createStore(rootReducer, composeWithDevTools());

export default store;