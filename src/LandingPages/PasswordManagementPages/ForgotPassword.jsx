import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import Header from '../../../../Components/Header';
import {LinearGradient} from "expo-linear-gradient";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const handleContinue = () => {
        navigation.navigate('ResetConfirmation', { email: email });
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Header title={"Forgot password"} navigation={navigation}></Header>
            <View>
                <Text style={styles.text}>
                    Don't worry.
                </Text>
                <Text style = {styles.text}>
                    Enter your email and we'll send you a link to reset your password.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.ContinueButton}
                onPress={handleContinue}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#30363D',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    text : {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        //marginBottom: 30,
    },
    input: {
        backgroundColor: 'transparent', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 15,
        marginBottom: 15,
    },
    ContinueButton: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        padding: 15,
        paddingVertical: 19,
        borderRadius: 16,
        marginTop : 15,
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
export default ForgotPassword;