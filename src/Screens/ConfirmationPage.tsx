import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing } from 'react-native';

type Props = {
    navigation: any;
};

const ConfirmationPage: React.FC<Props> = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>
                Votre demande a bien été prise en compte !
            </Text>

            <Text style={styles.message}>
                Nous vous tenons informé de la situation au plus vite.
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Retour"
                    color="#E02A2A"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F2E9', // Match background color
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    heading: {
        fontSize: 28, // Adjusted font size
        textAlign: 'center',
        paddingHorizontal: 24, // Adjusted padding
        marginTop: 20, // Adjusted margin
    },
    message: {
        fontSize: 20, // Adjusted font size
        textAlign: 'center',
        marginVertical: 10, // Adjusted margin
        marginHorizontal: 20, // Adjusted margin
        color: '#655E5E',
    },
    buttonContainer: {
        marginTop: 20, // Adjusted margin
    },
    logo1: {
        position: 'absolute',
        bottom: -20, // Adjusted position
        left: 100, // Adjusted position
        width: 150, // Adjusted width
        height: 100, // Adjusted height
        resizeMode: 'contain',
    },
    logo2: {
        position: 'absolute',
        bottom: -20, // Adjusted position
        right: 100, // Adjusted position
        width: 150, // Adjusted width
        height: 100, // Adjusted height
        resizeMode: 'contain',
    },
});

export default ConfirmationPage;
