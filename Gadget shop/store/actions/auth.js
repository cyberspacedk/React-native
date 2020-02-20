import {AsyncStorage} from 'react-native';

import {API} from '../../constatnts/api';
 
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

// variable for store id setTimeout
let timerId; 

export const authenticate = (token, userId, expiryTime) => async dispatch => {
  dispatch(setLogoutTimer(expiryTime))
  dispatch({ type: AUTHENTICATE, userId, token });
};

export const signUp = (email, password) => async dispatch => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    }
  );

  if (!response.ok) {
    const errorResponseData = await response.json(); 
    const {message} = errorResponseData.error;
    let messageToShow;
    
    switch(message){ 
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': messageToShow = 'We have blocked all requests from this device due to unusual activity. Try again later.';break;
      case 'EMAIL_EXISTS': messageToShow = 'This email has already exist!';break;
      default : messageToShow = 'Something went wrong!'; 
    }
     
    throw new Error(messageToShow)
  }

  const {idToken, localId, expiresIn} = await response.json(); 
  const transformedExpiresIn =  parseInt(expiresIn)*1000;

  dispatch(authenticate(idToken, localId, transformedExpiresIn));
 
  const expDate = new Date(new Date().getTime() + transformedExpiresIn);  
  saveDataToStorage(idToken, localId, expDate)
}; 

export const logIn = (email, password) => async dispatch => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    }
  );

  if (!response.ok) {
    const errorResponseData = await response.json(); 
    const {message} = errorResponseData.error;
    let messageToShow;

    switch(message){
      case 'EMAIL_NOT_FOUND': messageToShow = 'This email could not be found!';break; 
      case 'INVALID_PASSWORD': messageToShow = 'This password is not valid!';break;
      case 'USER_DISABLED': messageToShow = 'The user account has been disabled by an administrator!';break;
      default : messageToShow = 'Something went wrong!'; 
    }
     
    throw new Error(messageToShow)
  }
 
  const {idToken, localId, expiresIn} = await response.json(); 
  const transformedExpiresIn =  parseInt(expiresIn)*1000;

  dispatch(authenticate(idToken, localId, transformedExpiresIn)); 
  const expDate = new Date(new Date().getTime() + transformedExpiresIn);   
  saveDataToStorage(idToken, localId, expDate)
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT}; 
} 

const saveDataToStorage = (token, userId, expDate) => {
  AsyncStorage.setItem('userData',JSON.stringify({
    token,
    userId, 
    expiryDate: expDate.toISOString()
  }))
}
 
const clearLogoutTimer = ()=> {
  if(timerId){
    clearTimeout(timerId)
  }
};

const setLogoutTimer = expirationTime => async dispatch => {  
  setTimeout(()=> dispatch(logout), expirationTime);
}