import React, {useReducer, useCallback} from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Button } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import {signUp} from '../../store/actions/auth';

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

  const signUpHandler = () => {
    const {email, password} = formState.inputValues;  
    dispatch(signUp(email, password))
  };

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
              <Button title="Login" color={Colors.primary} onPress={signUpHandler}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Switch to Sign Up" color={Colors.accent} onPress={()=>{}}/> 
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
