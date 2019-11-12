import React , {useState} from 'react';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AppLoading } from 'expo';

import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'custom-font': require('./assets/fonts/YeonSung-Regular.ttf')
  })
}

const App =()=> {
  const [userNumber, setUserNumber]= useState();
  const [guessRounds, setGuessRounds]=useState(0);  
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){ 
    return (
    <AppLoading 
      startAsync={fetchFonts} 
      onFinish={setDataLoaded.bind(this, true)}
      onError={(err)=>console.error(err)}
      />
      )
    }

  const startGameHandler = (selectedNumber)=> {
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/> 
  }else if(guessRounds > 0){
    content = <GameOverScreen />
  }

  return (
    <View style={styles.screen}>
     <Header title="Guess a Number" /> 
     {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,  
  }
  
});

export default App;