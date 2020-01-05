import {API} from '../../constatnts/api';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

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

    const resData = await response.json(); 

    dispatch({ 
      type: SIGNUP, 
      token: resData.idToken, 
      userId: resData.localId
    });
  };
};


export const logIn = (email, password) => {
  return async dispatch => {
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

    const resData = await response.json(); 
    
    dispatch({ 
      type: LOGIN, 
      token: resData.idToken, 
      userId: resData.localId 
    });
  };
};