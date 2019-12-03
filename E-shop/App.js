import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
// navigator
import ShopNavigator from './navigation/ShopNavigator';

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator /> 
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
