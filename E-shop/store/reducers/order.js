import moment from 'moment'; 
import Order from '../../models/order';

import {ADD_ORDER} from '../actions/orders';

const initialState = {
  orders: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case ADD_ORDER:
      const id = new Date().toString(); 
      const date =  moment().format('MMMM Do YYYY, hh:mm')
      
      const newOrder = new Order(id, action.orderData.cartItems, action.orderData.total, date);
       return {
         ...state,
         orders: [...state.orders, newOrder]
       }

    default: 
      return state;
  }
} 