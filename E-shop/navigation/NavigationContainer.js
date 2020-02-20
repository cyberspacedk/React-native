import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'; 
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';
 
const NavigationContainer = () => { 
  const navigatorRef = useRef(); 
  const isAuth = useSelector(store => store.auth.token); 
  
  useEffect(() => {
    if(!isAuth && isAuth !== null){ 
      navigatorRef.current.dispatch(NavigationActions.navigate({
        routeName: 'Auth'
      }))
    } 
  }, [isAuth])

  return  <ShopNavigator ref={navigatorRef} />
}

export default  NavigationContainer;