import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const CustomButton = ({buttonText,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#87CEEB','#fc466b']}
                style={styles.ButtonContainer}
            >
                <Text style={styles.ButtonText}>{buttonText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    ButtonContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        padding: 15,
        paddingVertical: 19,
        borderRadius: 16,
        marginTop : 15,
        marginBottom: 15,
    },

    ButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default CustomButton;