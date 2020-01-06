import React, {useEffect} from 'react'
import { View, Text, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux';
 
import Colors from '../constatnts/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  const tryLogin = async ()=> {
    const userData = await AsyncStorage.getItem('userData'); 
    if(!userData) {
      props.navigation.navigate('Auth')
      return;
    } 
    const {token, userId, expiryDate} = JSON.parse(userData);
    const expDate = new Date(expiryDate); 
    if(expDate <= new Date() || !token || !userId){
      props.navigation.navigate('Auth')
      return;
    } 
    prop.navigation.navigate('Shop');
    dispatch(authenticate(userId,token))
  }

  useEffect(()=> {tryLogin()},[dispatch]);
  
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
