import {View, Pressable, Text, StyleSheet} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import Colors from '../../constants/colors';

function PrimaryButton({children, onPress}){
    function pressHandler(){
        onPress()
        console.log('press');
    }
    return (
    <View style={styles.buttonOuterContainer}>
        <Pressable 
            style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer}
            onPress={pressHandler} 
            android_ripple={{color: Colors.primary600}}
        >
            <Text style={styles.buttonText}> {children} </Text>
        </Pressable>
    </View>
    );// we can pass a array of styles to the style, and all the styles would be considered by react native
}
// the input param must have {}

const styles=StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'open-sans',
    },
    pressed: {
        opacity: 0.75,
    }
})

export default PrimaryButton;