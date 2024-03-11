import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const APropos = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>About</Text>
                <Text style={styles.content}>
                    Cette application est une interface utilisateur mobile pour gérer une résidence participative.
                    Les utilisateurs de cette application sont les résidents de ces habitats.
                    Chaque habitat a potentiellement accès à une gamme d'appareils ménagers.
                    La résidence est participative car elle permet aux résidents d'influencer le coût réel de la consommation de la résidence grâce à un système de bonus et de pénalités.
                    Par exemple, un résident pourrait contribuer à réduire un pic de consommation en s'engageant à n'utiliser qu'une partie de ses appareils ménagers pendant une période définie.
                    En retour, le résident peut choisir une autre plage horaire moins énergivore et recevoir un bonus dans la monnaie locale de la résidence, appelée l'éco-coin.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95E1D3',
    },
    contentContainer: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        textAlign: 'left',
    },
});

export default APropos;