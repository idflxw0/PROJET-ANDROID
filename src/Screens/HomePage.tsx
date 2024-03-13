import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useResidents } from "../hook/useResident";
import { db } from "../config/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const HomePage = () => {
    const navigation = useNavigation();
    const { residents, totalPower, loading, error, refresh } = useResidents();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            //alert('Refreshed');
            refresh();
        });

        return unsubscribe;
    }, [navigation, refresh]);



    const [totalPowers, setTotalPower] = useState(0);

    useEffect(() => {
        const calculateTotalPower = async () => {
            let total = 0;
            for (const resident of residents) {
                const equipmentsQuerySnapshot = await getDocs(
                    query(collection(db, 'users', resident.id, 'equipments'))
                );
                equipmentsQuerySnapshot.forEach((doc) => {
                    const equipmentData = doc.data();
                    total += equipmentData.puissance;
                });
            }
            setTotalPower(total);
        };

        if (residents.length > 0) {
            calculateTotalPower();
        }
    }, [residents]);
    

    const handleNavigateToReservation = () => {
        // @ts-ignore
        navigation.navigate("Reservation");
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
                        <Text style={styles.statValue}>{totalPowers}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.calendar}>
                <Calendar
                    markedDates={{
                        '2024-03-26': { selected: true, marked: true, dotColor: 'red' }
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToReservation}
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
