import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { auth, db } from '../config/firebase'; // Ensure these are correctly imported
import { collection, addDoc,query, where, getDocs  } from 'firebase/firestore';

const powerImage = require('../../assets/power.png');
const coinImage = require('../../assets/coin.png');
type NavigationProp = StackNavigationProp<any>;

type Equipment = { id: number; nom: string; image: string | null; puissance: number; };
const coins = 100;
const equipmentImages: { [key: string]: any } = {
    'Aspirateur': require('../../assets/aspirateur.png'),
    'Climatiseur': require('../../assets/climatiseur.png'),
    'Fer à repasser': require('../../assets/fer_a_repasser.png'),
    'Machine à laver': require('../../assets/machine_a_laver.png'),
};

const MonHabitat = ({ navigation }: { navigation: NavigationProp }) => {
    const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEquipment, setNewEquipment] = useState<Equipment>({ id: 0, nom: '', image: null, puissance: 0 });


    useEffect(() => {
        const fetchEquipmentData = async () => {
            const user = auth.currentUser;
            if (user) {
                const equipmentQuery = query(collection(db, "users", user.uid, "equipments"));
                try {
                    const querySnapshot = await getDocs(equipmentQuery);
                    const fetchedEquipment = querySnapshot.docs.map(doc => ({
                        ...doc.data() as Equipment
                    }));
                    setEquipmentData(fetchedEquipment);
                } catch (error) {
                    console.error("Error fetching equipment data:", error);
                }
            }
        };

        fetchEquipmentData();
    }, []);

    const addEquipment =async  () => {
        if (!newEquipment.image) {
            alert('Veuillez selecter un équipement');
            return;
        }
        if (isNaN(newEquipment.puissance) || newEquipment.puissance === 0) {
            alert('La puissance doit être un nombre ou être différente de zéro');
            return;
        }
        const id = equipmentData.length + 1;
        console.log(newEquipment)
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = await addDoc(collection(db, "users", user.uid, "equipments"), {
                    ...newEquipment,
                    userId: user.uid,
                });

                setEquipmentData(prevEquipmentData => [
                    ...prevEquipmentData,
                    {
                        ...newEquipment,
                        id: id,
                    },
                ]);

                alert('Équipement ajouté avec succès.');
            } else {
                alert('No authenticated user found.');
            }
        } catch (error) {
            console.error("Error adding equipment to Firestore:", error);
            alert('Erreur lors de l’ajout de l’équipement à Firestore.');
        }

        setNewEquipment({ id: 0, nom: '', image: null, puissance: 0 });
        setModalVisible(false);
    };

    const resetEquipment = () => {
        setEquipmentData([]);
    };

    const pickImage = (image: string) => {
        // @ts-ignore
        const nom = Object.keys(equipmentImages).find(key => equipmentImages[key] === image) || '';
        setNewEquipment({ ...newEquipment, image, nom });
    };

    const totalPower = equipmentData.reduce((sum, equipment) => sum + equipment.puissance, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Mon habitat</Text>
                <View style={styles.addButtonContainer}>
                    <View style={styles.infoContainer}>
                        <View style={[styles.infoItem, styles.infoItemFirst]}>
                            <Image source={powerImage} style={styles.infoImage} />
                            <View>
                                <Text style={styles.infoText}>Puissance Max:</Text>
                                <Text style={styles.infoNumber}>{totalPower}W</Text>
                            </View>
                        </View>
                        <View style={[styles.infoItem, styles.infoItemSecond]}>
                            <Image source={coinImage} style={styles.infoImage} />
                            <View>
                                <Text style={styles.infoText}>Éco-coins:</Text>
                                <Text style={styles.infoNumber}>{coins}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>Ajouter un équipement</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={resetEquipment} style={styles.resetButton}>
                            <Text style={styles.resetButtonText}>Réinitialiser</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.equipmentHeader}>
                <Text style={styles.headerItem}>ID</Text>
                <Text style={styles.headerItem}>Nom</Text>
                <Text style={styles.headerItem}>Type</Text>
                <Text style={styles.headerItem}>Puissance</Text>
            </View>
            <ScrollView style={styles.equipmentScrollView}>
                {equipmentData.map((equipment, index) => (
                    <View key={index} style={styles.equipmentEntry}>
                        <Text style={styles.equipmentItem}>{equipment.id}</Text>
                        <Text style={styles.equipmentItem}>{equipment.nom}</Text>
                        <Image source={equipment.image ? equipmentImages[equipment.nom] : null} style={styles.equipmentImage} />
                        <Text style={styles.equipmentItem}>{equipment.puissance}W</Text>
                    </View>
                ))}
            </ScrollView>

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
                        <Text style={styles.modalText}>Ajouter un équipement</Text>
                        <View style={styles.imageContainer}>
                            {Object.entries(equipmentImages).map(([type, image], index) => (
                                <TouchableOpacity key={index} onPress={() => pickImage(image)} style={styles.imageButton}>
                                    <Image source={image} style={styles.equipmentImage} />
                                    <Text>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.powerContainer}>
                            <Text style={styles.powerText}>Puissance</Text>
                            <TextInput
                                placeholder="Enter power"
                                value={newEquipment.puissance.toString()}
                                onChangeText={(text) => setNewEquipment({ ...newEquipment, puissance: Number(text) })}
                                style={styles.powerInput}
                                keyboardType="numeric" // Only show numeric keys
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Ajouter" onPress={addEquipment} />
                            <Button title="Annuler" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },

    infoText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    infoItemFirst: {
        marginRight: '2.5%', // Add right margin to the first item
        marginLeft: '2.5%', // Add left margin to the first item
    },
    infoItemSecond: {
        marginLeft: '2.5%', // Add left margin to the second item
        marginRight: '2.5%', // Add right margin to the first item
    },
    infoImage: {
        width: 35,
        height: 35,
        marginRight: 10,
    },

    totalPowerContainer: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    totalPowerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    powerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    powerText: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    powerInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 8,
    },
    equipmentImage: {
        width: 16,
        height: 16,
    },
    imageButton: {
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    addButtonContainer: {
        alignItems: 'center',
        marginBottom: 20, // Add margin bottom to create space between the button and other elements
    },
    addButton: {
        height: 30, // Adjust the height to make it smaller
        paddingHorizontal: 20, // Adjust the horizontal padding to control the width of the button
        backgroundColor: '#000',
        borderRadius: 5,
        flexDirection: 'row', // Add this line
        justifyContent: 'flex-start', // Change this line
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'flex-start', // Add this line
        marginLeft: '0%', // Add this line
    },
    resetButton: {
        height: 30, // Adjust the height to make it smaller
        paddingHorizontal: 20, // Adjust the horizontal padding to control the width of the button
        backgroundColor: '#FF5733', // Set background color to red
        borderRadius: 5,
        flexDirection: 'row', // Add this line
        justifyContent: 'flex-start', // Change this line
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'flex-start', // Add this line
        marginLeft: 10, // Add this line
    },
    addButtonText: {
        color: '#FFF', // Change text color to white
        fontSize: 14, // Adjust the font size if needed
    },
    resetButtonText: {
        color: '#FFF', // Change text color to white
        fontSize: 14, // Adjust the font size if needed
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
    container: {
        flex: 1,
        backgroundColor: '#95E1D3',
    },
    header: {
        width: '100%',
        marginTop: '10%',
    },
    equipmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: '5%',
        marginHorizontal: 10,
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
    headerItem: {
        flex: 0.8,
        color: '#7C7272',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    equipmentItem: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: '-60%',
        left: '3%',
        marginTop: '0%',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default MonHabitat;
