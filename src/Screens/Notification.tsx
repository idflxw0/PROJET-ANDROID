import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import { useResidents } from '../hook/useResident';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../config/firebase";
import { doc, getDoc , updateDoc} from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from "../components/Header";
const modifyTimeSlot = async (newTimeSlot: string) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                TimeSlot: newTimeSlot
            });
        } else {
            alert('No authenticated user found.');
        }
    } catch (error) {
        console.error("Error updating time slot in Firestore:", error);
        alert('Error updating time slot in Firestore.');
    }
};

// @ts-ignore
const TimeSlotButton = ({ timeSlot, handleModifyTimeSlot }) => (
    <TouchableOpacity style={styles.timeSlotButton} onPress={() => handleModifyTimeSlot(timeSlot)}>
        <Text style={styles.timeSlotButtonText}>{timeSlot}</Text>
    </TouchableOpacity>
);

const initialTimeSlot = "9h-10h";
const timeSlots = ["9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h", "17h-18h", "18h-19h", "19h-20h", "20h-21h", "21h-22h"];
const powerImage = require('../../assets/power.png');

// @ts-ignore
const Notification = ({ navigation }) => {
    //const navigation = useNavigation();
    const { residents, totalPower, loading, error, refresh } = useResidents();
    const [timeslot, setTimeslot] = useState(initialTimeSlot);
    const [modalVisible, setModalVisible] = useState(false);

    const maxWattage = 5000;
    // Calculate the total wattage of all residents for the selected time slot
    const totalWattage = residents.filter(resident => resident.timeSlot === timeslot).reduce((total, resident) => total + resident.totalPower, 0);
    // Compare the total wattage with maxWattage
    const isOverMaxWattage = totalWattage > maxWattage;
    const fetchUserTimeSlot = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userTimeSlot = userData?.TimeSlot || 0;
                setTimeslot(userTimeSlot);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refresh();
        });

        return unsubscribe;
    }, [navigation, refresh]);

    const handleModifyTimeSlot = (newTimeSlot: string) => {
        modifyTimeSlot(newTimeSlot);
        setTimeslot(newTimeSlot);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header title={'Notification'} navigation={navigation} />

                <Text style={styles.timeSlotText}>Time Slot: {timeslot} </Text>
                <Text style={styles.timeSlotText}>Max Wattage: {maxWattage} </Text>
                <View style={styles.infoContainer}>

                    <View style={[styles.infoItem]}>
                        <Image source={powerImage} style={styles.infoImage} />
                        <View>
                            <Text style={styles.infoText}>Total Wattage sur ce créneau</Text>
                            <Text style={[styles.infoText, styles.infoNumber]}>{totalWattage}W</Text>
                        </View>
                    </View>
                </View>

                {isOverMaxWattage && <Text style={styles.warningText}>Attention: Total wattage dépasse la limite autorisée !</Text>}

                <Button title="Sélectionner Time Slot" onPress={() => setModalVisible(true)} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Sélectionner un horaire</Text>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {timeSlots.map(timeSlot => (
                                    <TimeSlotButton key={timeSlot} timeSlot={timeSlot} handleModifyTimeSlot={handleModifyTimeSlot} />
                                ))}
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>

            <ScrollView style={styles.equipmentScrollView}>
                {residents.filter(resident => resident.timeSlot === timeslot).map((resident, index) => (

                    <View key={index} style={styles.equipmentEntry}>
                        <Text style={styles.equipmentItem}>{resident.name}</Text>
                        <Text style={styles.equipmentItem}>{resident.totalPower}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    warningText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
    timeSlotText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    timeSlotButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    timeSlotButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationList: {
        width: '100%',
        marginBottom: 20,
    },
    neighborItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    maxWattage: {
        fontWeight: 'bold',
    },
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
        width: '80%',

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

    infoImage: {
        width: 35,
        height: 35,
        alignItems: 'center',


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
        paddingHorizontal: 45,
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

export default Notification;
