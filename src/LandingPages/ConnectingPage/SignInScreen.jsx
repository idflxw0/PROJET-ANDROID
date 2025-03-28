import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo/vector-icons
import Header from '../../components/Header';
import CustomButton from "../../components/CustomButton";
import {LinearGradient} from "expo-linear-gradient";
import { auth,loginUser} from '../../config/firebase';
import { GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [request,response,promptAsyn] = Google.useAuthRequest({
        webClientId: '640023812885-bcupupo5m0j4j8otdou60aac689benk6.apps.googleusercontent.com',
        androidClientId: '640023812885-3rhielb66921mil65ikmfahra5rr7jp7.apps.googleusercontent.com',
    });
    const handlePasswordForgot = () => {
        navigation.navigate('ForgotPassword');
    }
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    navigation.navigate('Home');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    Alert.alert("Login Failed", errorMessage);
                });
        }
    }, [response]);

    const handleSignIn = () => {
    loginUser(auth, email, password)
        .then((userCredential) => {
            setTimeout(() => {
                navigation.navigate('Home');
            }, 100);
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
    };

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.container}>
            <Header title={'Log in'} navigation={navigation}></Header>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={!showPassword} // Show or hide password based on showPassword state
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                >
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <CustomButton buttonText="Log in" onPress={handleSignIn} />

            <Text style={styles.orText}>Or with</Text>

            <TouchableOpacity style={styles.corporateButton} onPress={()=>promptAsyn()}>
                <Image
                    source={require('../../../assets/LandingImages/google.png')}
                    style={styles.logoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign In with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.corporateButton} onPress={handleSignIn}>
                <Image
                    source={require('../../../assets/LandingImages/meta.png')}
                    style={styles.logoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign In with Meta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePasswordForgot}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity >

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account yet? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signInButton} >Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#95E1D3', // Background color grading
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        backgroundColor: 'transparent', // Input field color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    forgotPassword: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        color: '#000', // Forgot password text color grading
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signUpText: {
        fontSize: 16,
        color: '#000', // Sign up text color grading
    },
    signInButton: {
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#000', // Sign up button text color grading
    },
    orText: {
        fontWeight: 'bold',
        marginTop: 5,
        color: '#000', // Or text color grading
        alignSelf: 'center',
        marginBottom: 15,
    },
    corporateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent', // Corporate button color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
        alignSelf: 'stretch',
    },
    logoImageStyle: {
        marginLeft: 65,
        width: 31,
        height: 31,
    },
    buttonCorporateText: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        marginRight: 40,
        textAlign: "center"
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        backgroundColor: 'transparent', // Input field color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -13 }],
    },
});

export default SignInScreen;
