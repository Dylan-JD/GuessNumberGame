import {Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

function InstructionText({children, style}){
    return <Text style={[styles.instructionText, style]}>{children}</Text>;
}// use array to achieve cascading styles, the style behind can overwrite the previous style.

const styles = StyleSheet.create({
    instructionText:{
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    },
})

export default InstructionText
