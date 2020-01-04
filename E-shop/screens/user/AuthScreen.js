import React, {useState, useReducer, useCallback, useEffect} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, KeyboardAvoidingView, Button, Alert} from 'react-native'
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

const AuthScreen = () => {
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
      await dispatch(authMode(email, password)) 
    }catch(err){
      setIsError(err.message)
    }    
    setIsLoading(false)
  };
  
  const switchAuthMode = ()=> setIsSignUpMode(prevState => !prevState);
    
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>  
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

            <View style={styles.buttonContainer}>
              {isLoading ? 
                <ActivityIndicator size="small" /> 
                  :
                <Button title={isSignUpMode ? "SignUp":"Login"} color={Colors.primary} onPress={authHandler}/> 
              }
            </View>
            <View style={styles.buttonContainer}>
              <Button title={`Switch to ${isSignUpMode ? 'Login' : 'Sign Up'}`} color={Colors.accent} onPress={switchAuthMode}/> 
            </View> 
          </ScrollView>
        </Card>
      </LinearGradient> 
    </KeyboardAvoidingView> 
  )
} 


AuthScreen.navigationOptions = { 
    headerTitle: 'Authenticate'  
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    height: '50%',
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 10
  }
})

export default AuthScreen
