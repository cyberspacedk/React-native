import React from 'react';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const App =()=> {
  return (
    <View style={styles.screen}>
     <Header title="Guess a Number" />
     <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,  
  }
  
});

export default App;