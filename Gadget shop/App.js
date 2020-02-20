import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import store from './store'; 
import NavigationContainer from './navigation/NavigationContainer';
 
// fetch fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf') 
  })
}

export default function App() {
  // indicator of fonts fetching progress
  const [fontLoaded, setFontLoaded] = useState(false);  

  if(!fontLoaded){ 
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)}
      />
    )
  } 

  return (
    <Provider store={store}>
      <NavigationContainer /> 
    </Provider> 
  );
} 
 