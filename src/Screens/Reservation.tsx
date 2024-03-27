import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
const powerImage = require('../../assets/power.png');
import { useResidents } from "../hook/useResident";
import {auth, db} from "../config/firebase";
import {addDoc, collection, doc, getDoc, setDoc} from "firebase/firestore";
import {useRoute} from "@react-navigation/native";
import { query, where, getDocs } from "firebase/firestore";

// @ts-ignore
const Reservation = ({ navigation }) => {
    const [timeSlot, setTimeSlot] = useState('');
    const { residents } = useResidents();
    const route = useRoute();
    // @ts-ignore
    const { selectedDate } = route.params;    // @ts-ignore
    const [timeSlotCounts, setTimeSlotCounts] = useState({});

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
        const getCounts = async () => {
            const counts = await fetchTimeSlotCounts(selectedDate);
            console.log("Time slot counts:", counts); // Log the counts to the console
        };

        getCounts();
    }, [selectedDate]); // Run this effect when selectedDate changes

    // @ts-ignore
    const buttonColor = (timeSlot) => {
        // @ts-ignore
        const count = timeSlotCounts[timeSlot] || 0;
        if (count >= 4) return 'red';
        else if (count >= 1) return 'orange';
        else return 'green';
    };

    // @ts-ignore
    const fetchTimeSlotCounts = async (selectedDate) => {
        const user = auth.currentUser;
        try {
            // @ts-ignore
            const reservationsRef = collection(db, "users", user.uid, "Reservasions");
            const q = query(reservationsRef, where("date", "==", selectedDate));
            const querySnapshot = await getDocs(q);
            const counts = {};

            querySnapshot.forEach((doc) => {
                const { timeSlot } = doc.data();
                // @ts-ignore
                counts[timeSlot] = (counts[timeSlot] || 0) + 1;
            });

            setTimeSlotCounts(counts);
        } catch (error) {
            console.error("Error fetching time slot counts:", error);
        }
    };

    /*const saveReservationToDB = async (selectedDate: string, timeSlot: string) => {
        const user = auth.currentUser;
        if (user) {
            const reservationRef = collection(db, "users", user.uid, "Reservasions");
            const docRef = await addDoc(reservationRef, {
                date: selectedDate,
                timeSlot: timeSlot,
            });

            console.log("Reservation added with ID:", docRef.id);
            return docRef.id; // Optionally return the document ID
        }
    };*/
    // @ts-ignore
    const saveReservationToDB = async (selectedDate, timeSlot) => {
        const user = auth.currentUser;
        if (user) {
            const reservationRef = collection(db, "users", user.uid, "Reservasions");
            const q = query(reservationRef, where("date", "==", selectedDate));

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Existing reservation found
                const existingReservationId = querySnapshot.docs[0].id; // Assuming one reservation per date
                Alert.alert(
                    "Existing Reservation",
                    "You already have a reservation on this date. Do you want to replace it?",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Replace",
                            onPress: () => {
                                // Call to update the existing reservation
                                console.log("Replacing existing reservation...");
                                // @ts-ignore
                                addOrUpdateReservation(reservationRef, selectedDate, timeSlot, existingReservationId);
                                navigation.navigate("ConfirmationPage");
                            }
                        }
                    ]
                );
            } else {
                // No reservation exists, proceed to add a new one
                addOrUpdateReservation(reservationRef, selectedDate, timeSlot);
                navigation.navigate("ConfirmationPage");
            }
        }
    };


// Helper function to add or update a reservation
    // @ts-ignore
    const addOrUpdateReservation = async (reservationRef, selectedDate, timeSlot, existingReservationId = null) => {
        if (existingReservationId) {
            // Existing reservation ID is provided, update the document
            const reservationDocRef = doc(reservationRef, existingReservationId);
            await setDoc(reservationDocRef, {
                date: selectedDate,
                timeSlot: timeSlot,
            }, { merge: true }); // merge true to update partially
            console.log("Reservation updated with ID:", existingReservationId);
        } else {
            // No existing reservation ID, add a new document
            const docRef = await addDoc(reservationRef, {
                date: selectedDate,
                timeSlot: timeSlot,
            });
            console.log("New reservation added with ID:", docRef.id);
        }
    };

    const saveTimeSlotToDB = async (timeSlot: string) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { timeSlot: timeSlot }, { merge: true });
        }
    };
    // @ts-ignore
    const HanderNavigateToConfirmationPage = (timeSlot) => {
        const currentUser = residents.find(resident => resident.id === auth.currentUser?.uid);
        if (!currentUser || currentUser.equipmentCount === 0) {
            // The resident has no equipment
            alert("Vous n'avez pas d'équipement, veuillez en ajouter pour réserver un créneau.")
        } else {
            if (!timeSlot) {
                // Case 1: No time slot selected
                alert("Please select a time slot.");
            } else {
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
                            onPress: () => {
                                console.log("Selected time slot:", selectedDate, timeSlot);
                                saveReservationToDB(selectedDate, timeSlot);
                            }
                        }
                    ]
                );
            }
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
                        /*<TouchableOpacity
                            key={index}
                            style={styles.timeSlotButton}
                            onPress={() => handleSelectTimeSlot(timeSlot)}>
                            <Text style={styles.timeSlotText}>{timeSlot}</Text>
                        </TouchableOpacity>*/
                        <TouchableOpacity
                            key={index}
                            style={[styles.timeSlotButton, { backgroundColor: buttonColor(timeSlot) }]} // Use function to set color
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
