import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

export const addOrder = (cartItems, total)=> async (dispatch, getState)=> {
  const date = new Date().toISOString();
  try{  
    const {token, userId} = getState().auth;

    const response =  await fetch(`https://e-shop-rn-mobile.firebaseio.com/orders/${userId}.json?auth=${token}`, {
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

export const getOrders = () => async (dispatch, getState)=> {

  const {userId} = getState().auth; 
  const response = await fetch(`https://e-shop-rn-mobile.firebaseio.com/orders/${userId}.json`);
  const responseData = await response.json(); 
  console.log("➡️: getOrders -> responseData", responseData)

  const loadedOrders = [];
      
 responseData && Object.keys(responseData).forEach(order => { 
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