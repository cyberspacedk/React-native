import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, AsyncStorage} from 'react-native'
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import Colors from '../constatnts/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // async function for handling expiration token
  const tryLogin = async ()=> {
    // get data from device storage
    const userData = await AsyncStorage.getItem('userData');  
    // if data doesnt exist push user to auth screen
    if(!userData) {
      navigation.navigate('Auth')
      return;
    } 
    // get concrete data from userData object 
    const {token, userId, expiryDate} = JSON.parse(userData); 
    // create new Date from token expiration date 
    const expirationDate = new Date(expiryDate);  
    // if token expired or userId and token are empty push user to auth screen
    if(expirationDate <= new Date() || !token || !userId){
      navigation.navigate('Auth')
      return;
    } 

    // get ms time token and minus current time ms
    const expirationTime = expirationDate.getTime() - new Date().getTime(); 

    // if all checks pass push user to Shop page
    navigation.navigate('Shop');

    // dispatch AUTH action to redux store
    dispatch(authenticate(userId,token, expirationTime))

  }

  // launch function when page refresh or mounts
  useEffect(()=> {tryLogin()},[dispatch]);

  // when token logic checks show spinner
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
