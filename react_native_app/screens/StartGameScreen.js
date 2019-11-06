import React from 'react'
import { View, StyleSheet, Text, TextInput, Button} from 'react-native'  
import Card from "../components/Card";
import Colors from '../constants/colors';
import Input from '../components/Input';
const StartGameScreen = props => {
return (
  <View style={styles.screen}> 

    <Text style={styles.title}>Start a New Game!</Text>

    <Card styles={styles.inputContainer}> 
      <Text>Select a Number</Text>
      <Input style={styles.input}/>   
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Reset" color={Colors.accent}/>
          </View>
        <View style={styles.button}>
          <Button title="Confirm" color={Colors.primary}/> 
          </View> 
      </View>  
    </Card>

  </View>
)
}


const styles = StyleSheet.create({
  screen: { 
    padding: 10, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {  
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
   
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 15
  }, 
  button: {
    width: 100, 
  },
  input: {
    width: 50
  }
 
})

export default StartGameScreen