import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useResidents} from "../hook/useResident";
import {useNavigation} from "@react-navigation/native";


const powerImage = require('../../assets/power.png');
const coinImage = require('../../assets/coin.png');
const peopleImage = require('../../assets/people 1.png');


const LDH = () => {
    const navigation = useNavigation();
    const { residents, totalPower, loading, error, refresh } = useResidents();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            //alert('Refreshed');
            refresh();
        });

        return unsubscribe;
    }, [navigation, refresh]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Liste des habitats</Text>
                <View style={styles.infoContainer}>
                    <View style={[styles.infoItem, styles.infoItemFirst]}>
                        <Image source={peopleImage} style={styles.infoImage} />

                        <View>
                            <Text style={styles.infoText}>Nombre de résidents</Text>
                            <Text style={[styles.infoText, styles.infoNumber]}>{residents.length}</Text>
                        </View>
                    </View>
                    <View style={[styles.infoItem, styles.infoItemSecond]}>
                        <Image source={powerImage} style={styles.infoImage} />
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
                    {residents.map((resident, index) => (
                        <View key={index} style={styles.equipmentEntry}>
                            <Text style={styles.equipmentItem}>{resident.name}</Text>
                            <Text style={styles.equipmentItem}>{resident.equipmentCount}</Text>
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
        marginRight: '1%',
        marginLeft: '2.5%',
    },
    infoItemSecond: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
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

export default LDH;
