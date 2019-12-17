import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform} from 'react-native'
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector} from 'react-redux';

const EditProductScreen = (props) => {
// if we have a productId that means we in a Edit screen, otherwise we in a Add product screen
const productId = props.navigation.getParam('productId');
const editedProduct = useSelector(state=> state.products.userProducts.find(product=> product.id === productId)); 
 
const [title, setTitle]= useState(editedProduct ? editedProduct.title : '');
const [imageUrl, setImageUrl]= useState(editedProduct ? editedProduct.imageUrl : '');
const [description, setDescription]= useState(editedProduct ? editedProduct.description : '');
const [price, setPrice]= useState('');

const submitHandler = useCallback(()=> {
  props.navigation.setParams({submit: submitHandler})
});
useEffect(()=> {

}, [submitHandler])

return (
    <ScrollView>
      <View style={styles.form}> 

        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={text=> setTitle(text)}/>
        </View>

        <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={text=> setImageUrl(text)}/>
        </View>

        {editedProduct ? null : (
           <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={text=> setPrice(text)}/>
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
     padding: '5px 2px',
     borderBottomColor: '#ccc',
     borderBottomWidth: 1
   }
})


export default EditProductScreen
