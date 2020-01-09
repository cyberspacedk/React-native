import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
// API for handling navigation  
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

// This container created to access to redux store 
const NavigationContainer = () => {
  // create referense to navigator file
  const navigatorRef = useRef();
  // get token from store
  const isAuth = useSelector(store => store.auth.token); 
  
  useEffect(() => {
    if(!isAuth && isAuth !== null){
      // trigger NavigationActions method navigate
      // dispatch method available in ShopNavigator component 
      navigatorRef.current.dispatch(NavigationActions.navigate({
        routeName: 'Auth'
      }))
    }
    console.log("➡️: NavigationContainer -> isAuth", isAuth)
  }, [isAuth])

  return  <ShopNavigator ref={navigatorRef}/>
}

export default  NavigationContainer;