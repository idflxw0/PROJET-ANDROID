import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useResidents } from "../hook/useResident";
import { db, auth } from "../config/firebase";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import firebase from "firebase/compat";

const HomePage = () => {
    const navigation = useNavigation();
    const { residents, totalPower, loading, error, refresh } = useResidents();
    const [selectedDate, setSelectedDate] = useState('');
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            //alert('Refreshed');
            refresh();
        });

        return unsubscribe;
    }, [navigation, refresh]);



    // @ts-ignore
    const handleDayPress = (day) => {
        const date = day.dateString; // The date is in the format 'YYYY-MM-DD'
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    const handleReservations = () => {
        if (!selectedDate) {
            // Case 1: No date selected
            alert("Please select a date.");
        } else {
            const today = new Date();
            const selected = new Date(selectedDate);

            if (selected.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                // Case 2: Selected date is before today
                alert("Please select a date that is today or in the future.");
            } else {
                // Case 3: Selected date is today or in the future
                Alert.alert(
                    "Confirmation",
                    `You selected ${selectedDate}. Do you want to reserve for this day?`,
                    [
                        {
                            text: "No",
                            style: "cancel"
                        },
                        {
                            text: "Yes",
                            // @ts-ignore
                            onPress: () => {
                                // @ts-ignore
                                navigation.navigate("Reservation", { selectedDate });
                            }
                        }
                    ]
                );
            }
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Consommations globales de la résidence</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.statCard}>
                        <Icon name="people-outline" size={30} color="#000" />
                        <Text style={styles.statLabel}>Nombre de résidents</Text>
                        <Text style={styles.statValue}>{residents.length}</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Icon name="flash-outline" size={30} color="#000" />
                        <Text style={styles.statLabel}>Puissance Max (en W)</Text>
                        <Text style={styles.statValue}>{totalPower}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.calendar}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        [todayString]: { selected: true, marked: true, dotColor: 'red' },
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleReservations}
            >
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
        flexWrap: 'wrap',
        fontSize: 16,
        color: 'black',
    },
    calendar: {
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
        padding: 10,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 12,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#333',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default HomePage;
