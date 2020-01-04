import {createStore, combineReducers, applyMiddleware } from 'redux';  
import ReduxThunk from 'redux-thunk';

// reducers
import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
}) 

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;