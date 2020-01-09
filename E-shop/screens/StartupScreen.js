import React, {useEffect} from 'react'
import { View, Text, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux';
 
import Colors from '../constatnts/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  // async function for handling expiration token
  const tryLogin = async ()=> {
    // get data from device storage
    const userData = await AsyncStorage.getItem('userData');  
    // if data doesnt exist push user to auth screen
    if(!userData) {
      props.navigation.navigate('Auth')
      return;
    } 
    // get concrete data from userData object 
    const {token, userId, expiryDate} = JSON.parse(userData); 
    // create new Date from token expiration date 
    const expDate = new Date(expiryDate);  
    // if token expired or userId and token are empty push user to auth screen
    if(expDate <= new Date() || !token || !userId){
      props.navigation.navigate('Auth')
      return;
    } 
    // if all checks pass push user to Shop page
    props.navigation.navigate('Shop');

    // dispatch AUTH action to redux store
    dispatch(authenticate(userId,token))

  }

  // launch function when page refresh or mounts
  useEffect(()=> {tryLogin()},[dispatch]);

  // when token logic checks show spinner
  return (
    <View style={styles.screen}>
       <ActivityIndicator size="large" color={Colors.primary}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

 
export default StartupScreen
