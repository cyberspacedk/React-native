import React, {useState, useReducer, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, StyleSheet, ScrollView, Button, Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import {signUp, logIn} from '../../store/actions/auth';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constatnts/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// create a reducer for form
const formReducer = (state, {type, name, value, isValid}) => {
  if(type === 'FORM_INPUT_UPDATE'){
    const updatedValues = {
      ...state.inputValues,
      [name]: value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [name]: isValid

    }
    const formIsValid = Object.keys(updatedValidities).every(field=> updatedValidities[field]); 
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid
    }
  }
  return state;
}

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  useEffect(()=>{
    if(error){
      return Alert.alert('An Error Occured!', error, [{text:'Okay'}])
    }
  }, [error])
  
  // define initial state as second argument, which avaliable in formState variable
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
       email: false,
       password: false
    }, 
    formIsValid: false
  }); 

  const inputChangeHandler = useCallback((inputName, value, isValid)=>{
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      name: inputName,
      value,
      isValid
    })
  }, [dispatchFormState])

  const authHandler = async () => {
    const {email, password} = formState.inputValues; 
    setIsLoading(true);
    setIsError(null); 
    const authMode = isSignUpMode ?  signUp : logIn;
    try{
      await dispatch(authMode(email, password));
      props.navigation.navigate('Shop');
    }catch(err){
      setIsError(err.message)
      setIsLoading(false);
    }    
  };
  
  const switchAuthMode = ()=> setIsSignUpMode(prevState => !prevState);
    
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
      <LinearGradient
        colors={['#ffedff', '#ffe3ff']}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}
      >  
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input 
              name="email" 
              label="Email" 
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <Input 
              name="password" 
              label="Password" 
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <ButtonContainer style={styles.buttonContainer}>
              {isLoading ? 
                <ActivityIndicator size="small" /> 
                  :
                <Button title={isSignUpMode ? "SignUp":"Login"} color={Colors.primary} onPress={authHandler} /> 
              }
            </ButtonContainer>
            <ButtonContainer style={styles.buttonContainer}>
              <Button title={`Switch to ${isSignUpMode ? 'Login' : 'Sign Up'}`} color={Colors.accent} onPress={switchAuthMode} /> 
            </ButtonContainer> 
          </ScrollView>
        </Card>
      </LinearGradient> 
    </KeyboardAvoidingView> 
  )
} 

AuthScreen.navigationOptions = { 
    headerTitle: 'Authenticate'  
};

const styles = {
  authContainer: {
    height: '70%',
    maxHeight: 400,
    maxWidth: 420,
    padding: 20,
    width: '90%'
  }  
};

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: center;
  flex:1;
  justify-content: center; 
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
`
  
AuthScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default AuthScreen
