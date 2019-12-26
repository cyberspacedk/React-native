import moment from 'moment'; 
import Order from '../../models/order';

import {ADD_ORDER, GET_ORDERS} from '../actions/orders';

const initialState = {
  orders: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_ORDER: { 
      const {id, cartItems, total, date} = action.orderData;      
      const newOrder = new Order(id, cartItems, total, date);
      
       return {
         ...state,
         orders: [...state.orders, newOrder]
       }
    }
    case  GET_ORDERS: {
      return {
        orders: action.orders
      }
    }
    default: 
      return state;
  }
} 