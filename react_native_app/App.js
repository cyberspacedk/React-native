import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [outputText, setOutputText]= useState('Open up App.js to start working on your app!')
  return (
    <View style={{padding: 50, flexDirection: 'row'}}>
      <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TextInput 
         palceholder="Course goal"
         style={{width: '80%', borderBottomColor: 'black', borderBottomWidth: 1, padding: 10}}/>
        <Button title="ADD"/>
      </View>
       
    </View>
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
