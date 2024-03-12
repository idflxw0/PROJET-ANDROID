/*
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from "react";
const powerImage = require('../../assets/power.png');


// @ts-ignore
const Reservation = ({navigation}) => {
    const HanderNavigateToConfirmationPage = () => {
        navigation.navigate("ConfirmationPage");
    }
    const timeSlots = [
        '8h-9h', '9h-10h', '10h-11h', '11h-12h',
        '12h-13h', '13h-14h', '14h-15h', '15h-16h',
        '16h-17h', '17h-18h', '18h-19h', '19h-20h'
    ];
    // @ts-ignore
    const handleSelectTimeSlot = (timeSlot) => {
        // You can add your logic here to handle the selection of a time slot
        console.log("Selected time slot:", timeSlot);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reservation</Text>
            </View>
            {/!**!/}
            <View style={[styles.info, styles.infoItemsqr]}>
                <Text style={styles.infoTextsqr}>Choix d’horaires moins énergivores</Text>
                <View style={styles.timeSlotContainer}>
                    {timeSlots.map((timeSlot, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.timeSlotButton}
                            onPress={() => handleSelectTimeSlot(timeSlot)}>
                            <Text style={styles.timeSlotText}>{timeSlot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={[styles.info, styles.infoItemsqr]}>
                <Text style={styles.infoTextsqr}>Choix d’horaires moins énergivores</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={HanderNavigateToConfirmationPage} >
                <Text style={styles.buttonText}>Réserver</Text>
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

    info: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    timeSlotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    timeSlotButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 5,
    },
    timeSlotText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },

});
export default Reservation;*/

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const powerImage = require('../../assets/power.png');

// @ts-ignore
const Reservation = ({ navigation }) => {
    const HanderNavigateToConfirmationPage = () => {
        navigation.navigate("ConfirmationPage");
    }

    // Function to handle the selection of a time slot
    // @ts-ignore
    const handleSelectTimeSlot = (timeSlot) => {
        // You can add your logic here to handle the selection of a time slot
        console.log("Selected time slot:", timeSlot);
    }

    // Array of time intervals for the buttons
    const timeSlots = [
        '8h-9h', '9h-10h', '10h-11h',
        '11h-12h', '13h-14h', '15h-16h',
        '17h-18h', '20h-21h', '22h-23h',
        '5h-6h', '6h-7h', '7h-8h'
    ];

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
                <View style={styles.timeSlotContainer}>
                    {timeSlots.map((timeSlot, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.timeSlotButton}
                            onPress={() => handleSelectTimeSlot(timeSlot)}>
                            <Text style={styles.timeSlotText}>{timeSlot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={HanderNavigateToConfirmationPage}>
                <Text style={styles.buttonText}>Réserver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        paddingLeft: 0,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 30,
    },
    info: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        marginTop: 30,
    },
    infoItemsqr: {
        height: '45%',
        width: '100%',
    },
    infoTextsqr: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoItemFirst: {
        marginRight: '35%',
        marginLeft: '2.5%',
    },

    infoImage: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    timeSlotButton: {
        backgroundColor: '#000000',
        paddingVertical: 15,
        borderRadius: 8,
        margin: 5,
        width: '30%',
        height: '20%',
        marginTop: 10,
    },
    timeSlotText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
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
