import React, {useReducer, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { View } from 'react-native' 

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, {type, value, isValid }) => {
  switch(type){
    case INPUT_CHANGE: {
      return {
        ...state, 
        value,
        isValid
      }
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true
      }
    }
    default : {
      return state;
    }
  }
}

const Input = props => { 

 const {initialValue, initialValidity, onInputChange, name, label, 
  errorText, required, email, min, max, minLength} = props;
  
// define state and reducers
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initialValidity, 
    touched: false
  }) 
 
  const {value, isValid, touched}=inputState;

  // if field touched shot function that change value in parent component
  useEffect(()=>{
    if(touched) onInputChange(name, value, isValid)
  },[inputState, onInputChange, name])

  // validation and handling input func
  const textChangeHandler = text => { 
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    
  // form firewall
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    // after all checks dispatch value and isValid 
    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  // onBlur handler
  const lostFocusHandler = ()=> {
    dispatch({type: INPUT_BLUR});
  }

  return (
    <Screen>
      <Label>{label}</Label>
      <TextInput  
        value={inputState.value}  
        onChangeText={textChangeHandler} 
        onBlur={lostFocusHandler}
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View> 
          <ErrorText>{errorText}</ErrorText>
        </View>
      )}
    </Screen> 
  )
}
 
const Screen = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-family: 'open-sans-bold';
  margin: 8px 0;
`;

const TextInput = styled.TextInput`
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  padding: 5px;
`;

const ErrorText = styled.Text`
  color: red;
  font-family: 'open-sans';
  font-size: 13px;
`;

Input.propTypes = {
  initialValue: PropTypes.string.isRequired,
  initialValidity: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired, 
  errorText: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired, 
  email: PropTypes.string.isRequired,  
  min: PropTypes.number.isRequired, 
  max: PropTypes.number.isRequired, 
  minLength: PropTypes.number.isRequired
}

export default Input
