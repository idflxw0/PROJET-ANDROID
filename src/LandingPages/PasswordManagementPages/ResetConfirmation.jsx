import React from 'react';
import {Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import CustomButton from "../../components/CustomButton";
import {LinearGradient} from "expo-linear-gradient";
const ResetConfirmation = ({route,navigation}) => {
    const {email} = route.params;
    const handleGoBack = () => {
        navigation.navigate('SignIn');
    }
    return(
        <View style = {styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Image
                source={require('../../../../assets/LandingImages/emailSent.png')}
                style={styles.imageStyle}
            />
            <Text style={styles.heading}>
                Your email is on the way
            </Text>
            <Text style = {styles.subtitle}>
                Check your email {''}
                <Text style = {styles.emailText}>
                    {email}
                </Text>
                <Text> and follow the instructions to reset your password </Text>
            </Text>
            <TouchableOpacity style={styles.bottomContainer}>
                <CustomButton buttonText={"Back to Log In"}  onPress={handleGoBack}/>
            </TouchableOpacity>
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
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    heading : {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign : "center"
    },
    imageStyle : {
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    subtitle : {
        marginTop : 15,
        fontSize: 16,
        padding : 12,
        color: '#000',
        textAlign: 'center',
    },
    bottomContainer: {
        position: 'absolute',
        right : 20,
        left : 20,
        bottom: 20,
        width: '100%',
        alignItems: 'center', // Center the button horizontally
    },
    emailText : {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#EBFE69',
    }
})
export default ResetConfirmation;