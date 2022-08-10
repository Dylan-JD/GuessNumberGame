import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useState } from 'react'; 
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading'; // can loading when something haven't finished loaded

import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGameIsOver(true);
    setGuessRounds(0);

  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if (userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }

  if (gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

 
  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode="cover" 
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        {/*SafeAreaView is a component to avoid notch influence*/}
      </ImageBackground>
    </LinearGradient>
    
  );
}// Views only takes space as they need to fit their content into themselves

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage:{
    opacity:0.15,
  }
});
