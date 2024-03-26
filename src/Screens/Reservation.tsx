import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
const powerImage = require('../../assets/power.png');
import { useResidents } from "../hook/useResident";
import {auth, db} from "../config/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";

// @ts-ignore
const Reservation = ({ navigation }) => {
    const [peakTimeSlot, setPeakTimeSlot] = useState("");
    const [TimeSlot, setTimeSlot] = useState('');
    const { residents } = useResidents();
    // @ts-ignore
    const fetchUserCoins = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                let userCoins = userData?.coins || 0;
                userCoins ++;
            }
        }
    };
    useEffect(() => {
        let maxWattage = 0;
        let peakTimeSlot = "";

        timeSlots.forEach(slot => {
            const totalWattage = residents.filter(resident => resident.timeSlot === slot).reduce((total, resident) => total + resident.totalPower, 0);
            if (totalWattage > maxWattage) {
                maxWattage = totalWattage;
                peakTimeSlot = slot;
            }
        });

        setPeakTimeSlot(peakTimeSlot);
    }, [residents]);

    const assignColor = (timeSlot: string) => {
        const wattage = calculateMaxWattage(timeSlot);
        if (wattage <= 1000) {
            return 'green';
        } else if (wattage <= 2500 && wattage > 1000) {
            return 'orange';
        } else if (wattage > 2500) {
            return 'red';
        }
    }
    const calculateMaxWattage = (slot: string) => {
        return Math.max(...residents.filter(resident => resident.timeSlot === slot).map(resident => resident.totalPower));
    }


    // @ts-ignore
    // @ts-ignore
    const HanderNavigateToConfirmationPage = async (TimeSlot) => {
        const currentUser = residents.find(resident => resident.id === auth.currentUser?.uid);
        if (!currentUser || currentUser.equipmentCount === 0) {
            // The resident has no equipment
            alert("Vous n'avez pas d'équipement, veuillez en ajouter pour réserver un créneau.")
        } else {
            if (!TimeSlot) {
                // Case 1: No time slot selected
                alert("Veuillez sélectionner un créneau horaire.");
            } else {
                Alert.alert(
                    "Confirmation",
                    `You selected ${TimeSlot}. Voulez-vous réserver pour ce créneau horaire ?`,
                    [
                        {
                            text: "No",
                            style: "cancel"
                        },
                        {
                            text: "Yes",
                            // @ts-ignore
                            onPress: async () => {
                                const color = assignColor(TimeSlot);
                                const user = auth.currentUser;
                                if (user) {
                                    const userRef = doc(db, "users", user.uid);
                                    const userDoc = await getDoc(userRef);
                                    if (userDoc.exists()) {
                                        const userData = userDoc.data();
                                        let userCoins = userData?.coins || 0;
                                        if (color === 'green') {
                                            userCoins++;
                                        } else if (color === 'red') {
                                            userCoins--;
                                        }
                                        await updateDoc(userRef, {
                                            coins: userCoins,
                                            TimeSlot: TimeSlot
                                        });
                                    }
                                }
                                navigation.navigate("ConfirmationPage", { color: color });
                            }
                        }
                    ]
                );
            }
        }
    }

// @ts-ignore
    const handleSelectTimeSlot = (TimeSlot) => {
        setTimeSlot(TimeSlot);
        console.log("Selected time slot:", TimeSlot);
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
                    <Text style={styles.infoText}>Pic de consommation: </Text>
                    <Text style={styles.infoNumber}>{peakTimeSlot}</Text>
                </View>
            </View>

            <View style={[styles.info, styles.infoItemsqr]}>
                <Text style={styles.infoTextsqr}>Choix d’horaires moins énergivores</Text>
                <View style={styles.timeSlotContainer}>
                    {timeSlots.map((TimeSlot, index) => {
                        const color = assignColor(TimeSlot);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.timeSlotButton, {backgroundColor: color}]}
                                onPress={() => handleSelectTimeSlot(TimeSlot)}>
                                <Text style={styles.timeSlotText}>{TimeSlot}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => HanderNavigateToConfirmationPage(TimeSlot)}>
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
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
    },
    timeSlotButton: {
        width: '30%',
        height: '27%',
        backgroundColor: '#000000',
        borderRadius: 8,
        padding: 10,
        elevation: 2,
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
