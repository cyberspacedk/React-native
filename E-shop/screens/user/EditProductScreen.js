import React, { useEffect, useCallback, useReducer} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native'
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';

import {createProduct, updateProduct} from '../../store/actions/products';

import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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

const EditProductScreen = (props) => {

// if we have a productId that means we in a Edit screen, otherwise we in a Add product screen
  const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state=> state.products.userProducts.find(product=> product.id === productId)); 

// extract dispatch
  const dispatch = useDispatch();

// define initial state as second argument, which avaliable in formState variable
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    }, 
    formIsValid: editedProduct ? true : false
  }); 
  
// for convininience purposes destructure data in variables
  const {title, imageUrl, description, price} = formState.inputValues; 


// submit form memoized function
  const submitHandler = useCallback(()=> { 
    if(!formState.formIsValid){ 
      Alert.alert('Wrong input!', 'Please check the errors in the form!', [{text: 'Okay'}])
      return
    };
    if (editedProduct){
    // if product exist dispatch updating action
      dispatch(updateProduct(productId, title ,description, imageUrl ))
    }else{
      dispatch(createProduct(title ,description, imageUrl, +price))
    } 
    props.navigation.goBack();
  }, [dispatch, productId, formState]);
 
// lifecycle
  useEffect(()=> {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler])

// handler
  const inputChangeHandler = useCallback((inputName, value, isValid) => { 
  // shoot an action with filled fields 
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      name: inputName,
      value,
      isValid
    })
  },[dispatchFormState]);


  return (
      <ScrollView>
        <View style={styles.form}>  

          <Input 
            name="title"
            label="Title"  
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next" 
            onInputChange={inputChangeHandler}
            initialValidity={!!editedProduct}
            initialValue={editedProduct ? editedProduct.title : ''}  
            required
          /> 

          <Input  
            name="imageUrl"
            label="Image URL"  
            errorText="Please enter a valid url!"
            keyboardType="default" 
            returnKeyType="next"  
            onInputChange={inputChangeHandler} 
            initialValidity={!!editedProduct}
            initialValue={editedProduct ? editedProduct.imageUrl : ''} 
            required
          />  

          {editedProduct ? null : (
            <Input 
              name="price"
              label="Price"  
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad" 
              returnKeyType="next"  
              onInputChange={inputChangeHandler} 
              required
              min={0.1}
            />   
            ) 
          } 

          <Input  
            name="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences" 
            autoCorrect
            multiline
            numberOfLines={3}   
            onInputChange={inputChangeHandler} 
            initialValidity={!!editedProduct}
            initialValue={editedProduct ? editedProduct.description : ''} 
            required
            min={5}
          />   

        </View> 
      </ScrollView> 
  )
}

EditProductScreen.navigationOptions = nav => {
// transfer this func from component
  const submitFunc = nav.navigation.getParam('submit');

  return {
    headerTitle: nav.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item 
          title="Save" 
          iconName={Platform.OS === 'android' ? 'md-checkmark':'ios-checkmark'}
          onPress={submitFunc}
        />
      </HeaderButtons>
    ) 
  } 
}

const styles = StyleSheet.create({
   form: {
     margin: 20,
   },
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
   }
})


export default EditProductScreen
