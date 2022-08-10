import {View, Text, StyleSheet, Alert, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import {Ionicons} from '@expo/vector-icons';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber); //this only use when first rendered.
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);// dependencies in the []
    //use Effect run after the conponent function be excuted

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[]) //because the dependency is [] this use effect only excute when the component first excute
    // because it only excute when all the component not loaded in the ui.

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'greater' && currentGuess > userNumber)){
                Alert.alert("Don't lie!", "This is wrong...", [
                    { text: 'Sorry', style: 'cancel' },
                ]);
                return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess - 1;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundListLength = guessRounds.length;

    return(
      <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white'/>
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                    </PrimaryButton>
                </View>
            </View>
        </Card>
        <View style={styles.listContainer}>
            <FlatList data={guessRounds} 
            renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item}/>}
            keyExtractor={(item)=>item}
            />
        </View>
      </View>  
    );// because the array of guess number is reversed so we need to calculate the roundNumber not just use index.
}
export default GameScreen;

const styles=StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText:{
        marginBottom: 12,
    },
    buttonsContainer:{
        flexDirection: 'row',
    },
    buttonContainer:{
        flex:1,
    },
    listContainer:{
        flex: 1,
        padding: 16,
    }
})