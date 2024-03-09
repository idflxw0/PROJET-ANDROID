import React from 'react';
import {StyleSheet, View} from "react-native";
import Header from '../../../../Components/Header';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const PasswordReset = ({navigation}) => {
    const handleGoBackToLogIn = () => {
        navigation.navigate('SignIn');
    }
    return (
        <View style={styles.container}>
            <Header title={"Reset Password"} navigation={navigation}></Header>
            <CustomInput inputType={"New Password"}></CustomInput>
            <CustomInput inputType={"Retype new password"}></CustomInput>
            <CustomButton buttonText={"Continue"} onPress={handleGoBackToLogIn}></CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#30363D',
        paddingTop: 50,
        paddingHorizontal: 20,
    }
});

export default PasswordReset;