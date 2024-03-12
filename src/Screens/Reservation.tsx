import react from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
const powerImage = require('../../assets/power.png');


// @ts-ignore
const Reservation = ({navigation}) => {
    const HanderNavigateToConfirmationPage = () => {
        navigation.navigate("ConfirmationPage");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reservation</Text>
            </View>
            <View style={[styles.infoItem, styles.infoItemFirst]}>
                <Image source={powerImage} style={styles.infoImage} />
                <View>
                    <Text style={styles.infoText}>Pic de consommation:</Text>
                    <Text style={styles.infoNumber}>19h-20h</Text>
                </View>
            </View>
            <View style={[styles.info, styles.infoItemsqr]}>
                <Text style={styles.infoTextsqr}>Choix d’horaires moins énergivores</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={HanderNavigateToConfirmationPage} >Réserver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F2E9',
        padding: 20,
    },
header: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: '10%',
        marginHorizontal: 24,
        fontSize: 28,
        fontWeight: 'bold',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 30,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the start
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 30,
    },
    infoItemsqr: {
        height: '50%',
    },
    infoText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoTextsqr: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center', // Align text to center
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoItemFirst: {
        marginRight: '35%', // Add right margin to the first item
        marginLeft: '2.5%', // Add left margin to the first item
    },

    infoImage: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#000000',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default Reservation;