import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';
// @ts-ignore
const ConfirmationPage = ({ navigation }) => {
    const HanderNavigateToHome = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const currentCoins = userData?.coins || 0;
                const updatedCoins = currentCoins + 1;
                await updateDoc(userRef, {
                    coins: updatedCoins
                });
            }
        }
        navigation.navigate('Home');
    }
    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                Votre réservation a bien été prise en compte !
            </Text>

            <View style={styles.blueShadowContainer}>
                <Ionicons name="checkmark-circle" size={150} color="#007AFF" style={styles.blueShadow} />
            </View>
            <Text style={styles.message}>
                Nous vous tiendrons informé de la situation au plus vite. Vous venez de gagner 1 éco-coin !
            </Text>
            <TouchableOpacity style={styles.button} onPress={HanderNavigateToHome}>
                <Text style={styles.buttonText}>RETOUR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 35,
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 12,
        // top: '-20%',
    },
    blueShadowContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    blueShadow: {
        textShadowColor: 'rgba(0, 122, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    message: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
        color: '#655E5E',
        // top: '-5%'
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmationPage;
