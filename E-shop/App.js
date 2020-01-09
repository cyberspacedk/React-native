import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './store';
// navigator
import NavigationContainer from './navigation/NavigationContainer';

// fonts tools 
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
 
// fetch fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'), 
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
 