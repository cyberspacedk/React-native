import React, { useState, useEffect, useCallback, useReducer} from 'react'
import PropTypes from 'prop-types';
import { ScrollView, Platform, Alert, ActivityIndicator } from 'react-native'
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input'; 
import Colors from '../../constatnts/Colors'; 

import {createProduct, updateProduct} from '../../store/actions/products';

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

const EditProductScreen = ({navigation}) => {
  // extract dispatch
  const dispatch = useDispatch();
  // handling async requests
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  // handling async error
  useEffect(()=> {
    if(isError){ Alert.alert('An Error occured!', 'Something went wrong', [{text: 'Ok'}]) }
  },[isError]);

  // if we have a productId that means we in a Edit screen, otherwise we in a Add product screen
  const productId = navigation.getParam('productId'); 
  const editedProduct = useSelector(state=> state.products.userProducts.find(product=> product.id === productId)); 
  
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
  
  // submit form memoized function
  const submitHandler = useCallback(async ()=> { 
    
    // for convininience purposes destructure data in variables
    const {title, imageUrl, description, price} = formState.inputValues; 

    if(!formState.formIsValid){ 
      Alert.alert('Wrong input!', 'Please check the errors in the form!', [{text: 'Okay'}])
      return
    }

    setIsError(false);
    setIsLoading(true);
    try{
      if (editedProduct){
        // if product exist dispatch updating action
        await dispatch(updateProduct(productId, title ,description, imageUrl ))
      }else{
        await dispatch(createProduct(title ,description, imageUrl, +price))
      }
      navigation.goBack(); 
    }catch{
      setIsError(true);
    }  
    setIsLoading(false);

  }, [dispatch, productId, formState]);
 
  // lifecycle
  useEffect(()=> {
    navigation.setParams({submit: submitHandler})
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

  // show spinner 
  if(isLoading){
    return (
      <Spinner>
        <ActivityIndicator size="large" color={Colors.primary} />
      </Spinner>
    )
  } 

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <FormScreen>  

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

        </FormScreen> 
      </ScrollView> 
    </KeyboardAvoidingView>
  )
}

EditProductScreen.navigationOptions = nav => {
  // transfer this func from component to save icon 
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

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex:1;
`
const FormScreen = styled.View`
  margin: 20px;
`;

const Spinner = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
` 

EditProductScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired
  }).isRequired
}
export default EditProductScreen
