/*
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

//@ts-ignore
const HomePage = ({ navigation }) => {

    const handelrNavigateToReservation = () => {
        navigation.navigate("Reservation");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Liste des habitats</Text>
                <View style={styles.infoContainer}>
                    <View style={[styles.infoItem, styles.infoItemFirst]}>
                        <View>
                            {/!*<Icon name="people-outline" size={30} color="#000" />*!/}
                            <Text style={styles.infoText}>Nombre de résidents</Text>
                            <Text style={styles.infoText}>102</Text>
                        </View>
                    </View>
                    <View style={[styles.infoItem, styles.infoItemSecond]}>
                        <View>
                            {/!*<Icon name="flash-outline" size={30} color="#000" />*!/}
                            <Text style={styles.infoText}>Puissance Max</Text>
                            <Text style={styles.infoText}>10000 W</Text>
                        </View>
                    </View>
                </View>
                {/!* Nouvelles rubriques *!/}
                <View style={styles.cardContainer}>
                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Résidents</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Nb équipements</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Types</Text>
                    </View>
                </View>
            </View>
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
        marginBottom: 16,
        color: '#006400',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
    },
    infoItem: {
        paddingVertical: 15,
        borderRadius: 15,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
        width: '62%',
        height: '100%',
    },
    infoItemSecond: {
        marginLeft: '2.5%', // Add left margin to the second item
        marginRight: '2.5%', // Add right margin to the first item
    },
    infoItemFirst: {
        marginRight: '2.5%', // Add right margin to the first item
        marginLeft: '-15%', // Add left margin to the first item
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    calendar: {
        // Style your calendar component
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#006400',
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
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,

    },
    statCard: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 100,
    },
    statLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#777',
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default HomePage;
*/

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth, db} from "../config/firebase";
import {collection, getDocs, query} from "firebase/firestore";
const powerImage = require('../../assets/power.png');
const coinImage = require('../../assets/coin.png');
const HomePage = () => {



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Liste des habitats</Text>
                <View style={styles.infoContainer}>
                    <View style={[styles.infoItem, styles.infoItemFirst]}>
                        <Image source={powerImage} style={styles.infoImage} />

                        <View>
                            <Text style={styles.infoText}>Nombre de résidents</Text>
                            <Text style={[styles.infoText, styles.infoNumber]}>102</Text>
                        </View>
                    </View>
                    <View style={[styles.infoItem, styles.infoItemSecond]}>
                        <Image source={coinImage} style={styles.infoImage} />
                        <View>
                            <Text style={styles.infoText}>Puissance Max</Text>
                            <Text style={[styles.infoText, styles.infoNumber]}>10000 W</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.equipmentHeader}>
                    <Text style={styles.headerItem}>Résident</Text>
                    <Text style={styles.headerItem}>Nb équipements</Text>
                </View>
                <ScrollView style={styles.equipmentScrollView}>
                    {equipmentData.map((equipment, index) => (
                        <View key={index} style={styles.equipmentEntry}>
                            <Text style={styles.equipmentItem}>{equipment.id}</Text>
                            <Text style={styles.equipmentItem}>{equipment.nom}</Text>
                            <Text style={styles.equipmentItem}>{equipment.puissance}W</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
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
        marginBottom: 16,
        color: '#006400',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
        width: '50%',
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
        marginRight: '1%', // Add right margin to the first item
        marginLeft: '2.5%', // Add left margin to the first item
    },
    infoItemSecond: {
        marginLeft: '2.5%', // Add left margin to the second item
        marginRight: '2.5%', // Add right margin to the first item
    },
    infoImage: {
        width: 35,
        height: 35,
        marginRight: 5,
    },
    equipmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: '5%',
        marginHorizontal: 10,
    },
    headerItem: {
        flex: 0.8,
        color: '#7C7272',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    equipmentScrollView: {
        width: '100%',
        paddingHorizontal: 10,
    },
    equipmentEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 45, // Adjust this value to reduce padding on the left side
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    equipmentItem: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default HomePage;
