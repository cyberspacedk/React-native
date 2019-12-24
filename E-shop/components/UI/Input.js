import React, {useReducer, useEffect} from 'react'
import { View, Text,TextInput, StyleSheet} from 'react-native' 

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
    };
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true
      }
    };
    default : {
      return state;
    }
  }
}

const Input = (props) => { 
// define state and reducers
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValidity, 
    touched: false
  })

  // for convinience destructure data 
  const {onInputChange, name, label, errorText} = props;
  const {value, isValid, touched}=inputState;

  // if field touched shot function that change value in parent component
  useEffect(()=>{
    if(touched) onInputChange(name, value, isValid)
  },[inputState, onInputChange, name])

  // validation and handling input func
  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    
  // form firewall
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    // after all checks dispatch value and isValid 
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  // onBlur handler
  const lostFocusHandler = ()=> {
    dispatch({type: INPUT_BLUR});
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input} 
        value={inputState.value}  
        onChangeText={textChangeHandler} 
        onBlur={lostFocusHandler}
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}> 
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
  </View> 
  )
}

const styles = StyleSheet.create({
  formControl : {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    padding: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5, 
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
})

export default Input
