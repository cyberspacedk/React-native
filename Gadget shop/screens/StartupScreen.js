import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, AsyncStorage} from 'react-native'
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import Colors from '../constatnts/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = ({navigation}) => {
  const dispatch = useDispatch();
 
  const tryLogin = async ()=> { 
    const userData = await AsyncStorage.getItem('userData');   
    if(!userData) {
      navigation.navigate('Auth')
      return;
    }  
    const {token, userId, expiryDate} = JSON.parse(userData);  
    const expirationDate = new Date(expiryDate);   
    if(expirationDate <= new Date() || !token || !userId){
      navigation.navigate('Auth')
      return;
    }  
    const expirationTime = expirationDate.getTime() - new Date().getTime(); 
 
    navigation.navigate('Shop');
 
    dispatch(authenticate(userId,token, expirationTime))

  }
 
  useEffect(()=> {tryLogin()},[dispatch]);
 
  return (
    <Screen>
      <ActivityIndicator size="large" color={Colors.primary} />
    </Screen>
  )
} 

const Screen = styled.View`
  display: flex;
  align-items: center;
  flex:1;
  justify-content: center;
`; 
 
StartupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
export default StartupScreen
