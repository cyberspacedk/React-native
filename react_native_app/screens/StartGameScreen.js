import React, {useState} from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Button, Keyboard, Alert} from 'react-native'  
import Card from "../components/Card";
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, seSelectedNumber] = useState();

  const numberInputHandler= (inputText)=> {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false); 
  };

  const confirmInputHandler = ()=> {
    const chosenNumber = parseInt(enteredValue);
    if(!chosenNumber || chosenNumber <=0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid numver!', 
        'Number has to be a number between 1 and 99',
         [{text:'Okay', style: 'destructive', onPress: resetInputHandler}])
      return;
    }
    setConfirmed(true);
    seSelectedNumber(chosenNumber);
    setEnteredValue(''); 
  }
  let confirmedOutput;
  if(confirmed){
    confirmedOutput = (<Card style={styles.summaryContainer}>
      <Text>You selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      </Card>)
  }
return (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={styles.screen}> 

    <Text style={styles.title}>Start a New Game!</Text>

    <Card styles={styles.inputContainer}> 
      <Text>Select a Number</Text>
      <Input 
        style={styles.input} 
        blurOnSubmit 
        keyboardType="number-pad"
        value={enteredValue}
        onChangeText={numberInputHandler}

      />   
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Reset" color={Colors.accent} onPress={resetInputHandler}/>
          </View>
        <View style={styles.button}>
          <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/> 
          </View> 
      </View>  
    </Card>
    {confirmedOutput}
    </View>
  </TouchableWithoutFeedback> )
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
  }, 
  summaryContainer:{
    marginTop: 20
  }
 
})

export default StartGameScreen