import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
const powerImage = require('../../assets/power.png');

// @ts-ignore
const Reservation = ({ navigation }) => {
    const [timeSlot, setTimeSlot] = useState('');
    // @ts-ignore
    const HanderNavigateToConfirmationPage = (timeSlot) => {
        if (!timeSlot) {
            // Case 1: No time slot selected
            alert("Please select a time slot.");
        }
        else {
            Alert.alert(
                "Confirmation",
                `You selected ${timeSlot}. Do you want to reserve for this time slot?`,
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        // @ts-ignore
                        onPress: () => navigation.navigate("ConfirmationPage")
                    }
                ]
            );
        }
    }

    // @ts-ignore
    const handleSelectTimeSlot = (timeSlot) => {
        setTimeSlot(timeSlot);
        // You can add your logic here to handle the selection of a time slot
        console.log("Selected time slot:", timeSlot);
    }

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
            <TouchableOpacity
                style={styles.button}
                onPress={() => HanderNavigateToConfirmationPage(timeSlot)}>
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
