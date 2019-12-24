import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = ()=> async dispatch => {
  try{ 
    const response =  await fetch('https://e-shop-rn-mobile.firebaseio.com/products.json');

    if(!response.ok) throw new Error('Something went wrong !');
    
    const responseData = await response.json();
    const loadedProducts = [];
    
    Object.keys(responseData).forEach(prod => {
      const product = new Product(
        prod, 
        'u1', 
        responseData[prod].title, 
        responseData[prod].imageUrl, 
        responseData[prod].description, 
        responseData[prod].price
      );

      loadedProducts.push(product)
    })

    dispatch({type: SET_PRODUCTS, products: loadedProducts})

  }catch (err){
    throw new Error('Something went wrong !')
  }
}



export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
   }
}

export const createProduct = (title, description, imageUrl, price) => async dispatch => {
// can do async operation
  try{ 
    const response =  await fetch('https://e-shop-rn-mobile.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, imageUrl, price })
    })
    const responseData = await response.json(); 
   
    dispatch ({
      type: CREATE_PRODUCT, 
      productData: {
        id: responseData.name,
        title, 
        description, 
        imageUrl, 
        price
      }
    })
  }catch (err){
    console.log("➡️: err", err) 
  } 

} 
 

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT, 
    productId: id,
    productData: { 
      title, 
      description, 
      imageUrl
    }
  }
} 