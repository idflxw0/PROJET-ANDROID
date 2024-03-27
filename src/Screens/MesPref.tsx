import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {signOut} from "firebase/auth";
//@ts-ignore

const MesPref = ({ navigation }) => {
    const handleSignOut = async () => {
        try {
            await signOut; // Call the signOut method provided by Firebase Auth
            // Navigate to the sign-in or home screen after sign-out
            navigation.navigate('LandingPage'); // Replace 'SignIn' with the appropriate screen name
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos préférences</Text>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('ModifyProfile')}}>
                <Text style={styles.text}>Votre compte</Text>
                <Icon name="chevron-forward-outline" size={20} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {/* navigate to your account screen */}}>
                <Text style={styles.text}>Langue et région</Text>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>Français</Text>
                    <Icon name="chevron-forward-outline" size={20} color="grey" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {/* navigate to your account screen */}}>
                <Text style={styles.text}>Thème</Text>
                <View style={styles.subContainer}>
                    <Text style={styles.subText}>clair</Text>
                    <Icon name="chevron-forward-outline" size={20} color="grey" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('Notification')}}>
                <Text style={styles.text}>Notification</Text>
                <Icon name="chevron-forward-outline" size={20} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {/* navigate to your account screen */}}>
                <Text style={styles.text}>Nous contacter</Text>
                <Icon name="chevron-forward-outline" size={20} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => {/* navigate to your account screen */}}>
                <Text style={styles.text}>Aide</Text>
                <Icon name="chevron-forward-outline" size={20} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Se déconnecter</Text>
                <Icon name="log-out-outline" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95E1D3',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '5%',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        marginBottom: '2%',
    },
    text: {
        fontWeight: 'bold',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subText: {
        opacity: 0.5,
        fontWeight: 'bold',
        marginRight: 3,
    },
    signOutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7E67',
        paddingVertical: 20,
        borderRadius: 15,
        marginHorizontal: 15,
        marginTop: '2%',
    },
    signOutText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 10,
    },

});

export default MesPref;
