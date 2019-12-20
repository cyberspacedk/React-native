import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert } from 'react-native'
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';

import {createProduct, updateProduct} from '../../store/actions/products';

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
// if we have a productId that means we in a Edit screen, otherwise we in a Add product screen
const productId = props.navigation.getParam('productId');
const editedProduct = useSelector(state=> state.products.userProducts.find(product=> product.id === productId)); 
 
const [title, setTitle]= useState(editedProduct ? editedProduct.title : '');
const [titleIsValid, setTitleIsValid]= useState(false);

const [imageUrl, setImageUrl]= useState(editedProduct ? editedProduct.imageUrl : '');
const [description, setDescription]= useState(editedProduct ? editedProduct.description : '');
const [price, setPrice]= useState(''); 

const submitHandler = useCallback(()=> { 
  if(!titleIsValid){ 
    Alert.alert('Wrong input!', 'Please check the errors in the form!', [{text: 'Okay'}])
    return
  };
  if (editedProduct){
    dispatch(updateProduct(productId,title ,description, imageUrl ))
  }else{
    dispatch(createProduct(title ,description, imageUrl, +price))
  } 
  props.navigation.goBack();
}, [dispatch, productId, title, description, imageUrl, price]);
 
useEffect(()=> {
  props.navigation.setParams({submit: submitHandler})
}, [submitHandler])

const titleChangeHandler = text => {
  if(text.trim().length === 0 ){
    setTitleIsValid(false)
  }else{
    setTitleIsValid(true)
  }
  setTitle(text);

}
return (
    <ScrollView>
      <View style={styles.form}> 

        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={text=> titleChangeHandler(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            on
          />
        </View>
        {!titleIsValid && <Text>Please enter a valid title! </Text>}

        <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={text=> setImageUrl(text)}/>
        </View>

        {editedProduct ? null : (
           <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={price} 
              onChangeText={text=> setPrice(text)}
              keyboardType="decimal-pad" 
            />
           </View>
          ) 
        } 

        <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={text=> setDescription(text)}/>
        </View>

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
