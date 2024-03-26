import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install the expo/vector-icons package

const APropos = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialIcons name="info-outline" size={60} color="#1572A1" />
            </View>
            <Text style={styles.heading}>About</Text>
            <View style={styles.textContentContainer}>
                <Text style={styles.content}>
                    Cette application est une interface utilisateur mobile pour gérer une résidence participative. Les utilisateurs de cette application sont les résidents de ces habitats. Chaque habitat a potentiellement accès à une gamme d'appareils ménagers. La résidence est participative car elle permet aux résidents d'influencer le coût réel de la consommation de la résidence grâce à un système de bonus et de pénalités. Par exemple, un résident pourrait contribuer à réduire un pic de consommation en s'engageant à n'utiliser qu'une partie de ses appareils ménagers pendant une période définie. En retour, le résident peut choisir une autre plage horaire moins énergivore et recevoir un bonus dans la monnaie locale de la résidence, appelée l'éco-coin.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95E1D3', // Using the specified background color
        padding: 20,
    },
    iconContainer: {
        backgroundColor: '#E8F6EF',
        borderRadius: 50,
        padding: 15,
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#104E5B',
        marginBottom: 20,
        fontFamily: 'System',
    },
    textContentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        maxWidth: '90%',
    },
    content: {
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 24,
        color: '#333',
        fontFamily: 'System',
    },
});

export default APropos;
