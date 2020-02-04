import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = ()=> async (dispatch, getState) => { 
  const {userId} = getState().auth; 
  const response =  await fetch('https://e-shop-rn-mobile.firebaseio.com/products.json');  
   
  const responseData = await response.json();  
  const loadedProducts = [];
  
  Object.keys(responseData).forEach(prod => {
    const product = new Product(
      prod, 
      responseData[prod].ownerId, 
      responseData[prod].title, 
      responseData[prod].imageUrl, 
      responseData[prod].description, 
      responseData[prod].price
    );

    loadedProducts.push(product)
  })
  const userProducts = loadedProducts.filter(product=> product.ownerId === userId); 

  dispatch({
    type: SET_PRODUCTS, 
    products: loadedProducts,
    userProducts
  }) 
}

export const deleteProduct = productId => async (dispatch, getState) => {
  try{
    const {token} = getState().auth;

    const response = await fetch(`https://e-shop-rn-mobile.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE' 
    })

    if(!response.ok) throw new Error('Something went wrong !');

    dispatch({
      type: DELETE_PRODUCT,
      productId
     }) 
  }catch{
    throw new Error('Something went wrong !');
  } 
}

export const createProduct = (title, description, imageUrl, price) => async (dispatch, getState) => {
    // can do async operation
  try{ 
    const {token, userId} = getState().auth;

    // store product to database
    const response =  await fetch(`https://e-shop-rn-mobile.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageUrl, price, ownerId: userId })
    })
    
    if(!response.ok) throw new Error('Something went wrong !');

    // get created product id from database
    const responseData = await response.json(); 
   
    // store in redux store created product
    dispatch ({
      type: CREATE_PRODUCT, 
      productData: {
        id: responseData.name,
        ownerId: userId,
        title, 
        description, 
        imageUrl, 
        price
      }
    })
  }catch {
    throw new Error('Something went wrong !');
  }  
} 

export const updateProduct = (id, title, description, imageUrl) => async (dispatch, getState) => { 
  try{
    const {token} = getState().auth;
   const response = await fetch(`https://e-shop-rn-mobile.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageUrl })
    }) 
    
    if(!response.ok) throw new Error('Something went wrong !');

    dispatch({
      type: UPDATE_PRODUCT, 
      productId: id,
      productData: {  title, description, imageUrl }
    })  
  }catch{
    throw new Error('Something went wrong !');
  } 
} 