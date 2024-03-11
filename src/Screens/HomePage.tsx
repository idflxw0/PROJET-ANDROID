import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Consommations globales de la résidence</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>102 residents</Text>
                    <Text style={styles.infoText}>10000 W max power consumption</Text>
                </View>
            </View>
            <View style={styles.calendar}>
                <Calendar
                    markedDates={{
                        '2024-03-26': { selected: true, marked: true, dotColor: 'red' }
                    }}
                />
{/*
                <DatePicker mode="date" date={new Date('2024-03-26')} />
*/}
            </View>
            <TouchableOpacity style={styles.button}>
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
        fontSize: 24,
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
        fontSize: 16,
        color: 'black',
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
});

export default HomePage;
