import {AsyncStorage} from 'react-native';

import {API} from '../../constatnts/api';
 
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId) => ({ 
    type: AUTHENTICATE,
    userId,
    token 
})

export const signUp = (email, password) => {
  return async dispatch => {
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
      
      // after handling message throw error with this
      throw new Error(messageToShow)
    }

    const {idToken, localId, expiresIn} = await response.json(); 

    dispatch(authenticate(idToken, localId));

     // define expiration date of token
     const expDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000); 
     // store to device 
     saveDataToStorage(idToken, localId, expDate)
  };
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
      
      // after handling message throw error with this
      throw new Error(messageToShow)
    }
 
    const {idToken, localId, expiresIn} = await response.json(); 
    
    dispatch(authenticate(idToken, localId));
    // define expiration date of token
    const expDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000); 
    console.log("➡️: logIn -> expDate", expDate)
    // store to device 
    saveDataToStorage(idToken, localId, expDate)
  };

export const logout = () => ({ type: LOGOUT}); 

const saveDataToStorage = (token, userId, expDate) => {
  AsyncStorage.setItem('userData',JSON.stringify({
    token,
    userId, 
    expiryDate: expDate.toISOString()
  }))
}