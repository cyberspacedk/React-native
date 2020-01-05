import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

export const addOrder = (cartItems, total)=> async (dispatch, getState)=> {
  const date = new Date().toISOString();
  try{  
    const {token} = getState().auth;

    const response =  await fetch(`https://e-shop-rn-mobile.firebaseio.com/orders/u1.json?auth=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, total, date})
    })

    if(!response.ok) throw new Error('Something went wrong !');
 
    const responseData = await response.json(); 

    dispatch ({
    type: ADD_ORDER,
    orderData: {
      id: responseData.name,
      cartItems,
      total,
      date
    }
    })
  }catch{
    throw new Error('Something went wrong !');
  }
} 

export const getOrders = () => async dispatch=> {
  const response = await fetch('https://e-shop-rn-mobile.firebaseio.com/orders/u1.json');
  const responseData = await response.json(); 

  const loadedOrders = [];
      
  Object.keys(responseData).forEach(order => { 
    const product = new Order( 
      order,
      responseData[order].cartItems, 
      responseData[order].total, 
       responseData[order].date,  
    ); 
    loadedOrders.push(product)
  }) 
  
  dispatch({
    type: GET_ORDERS,
    orders: loadedOrders
  }) 
}