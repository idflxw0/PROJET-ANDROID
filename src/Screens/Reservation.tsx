import react from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    Reservation: undefined; // define your navigation parameters if any
};

type Props = {
    navigation: NavigationProp<RootStackParamList>;
};

const Reservation: React.FC<Props> = ({navigation: navigation}) => {

    const HanderNavigateToHomePage = () => {
        navigation.navigate("Reservation");
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reservation</Text>
            </View>

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
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    statLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
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
export default Reservation;