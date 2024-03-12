import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useUserProfile } from "../hook/useUserProfile ";


type RootStackParamList = {
    Reservation: undefined; // définissez vos paramètres de navigation si nécessaire
};

type Props = {
    navigation: NavigationProp<RootStackParamList>;
};

const LDH: React.FC<Props> = ({ navigation }) => {
    // @ts-ignore
    const [userName, setUserName] = useState('');
    // @ts-ignore
    const { userProfile, refreshUserProfile } = useUserProfile();
    useEffect(() => {
        refreshUserProfile(); // Rafraîchir les données utilisateur lors du montage du composant
    }, []); // Utilisez un tableau vide pour n'exécuter qu'une seule fois lors du montage initial


    return (
        <View style={styles.container}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <View style={styles.header}>
                <Text style={styles.title}>Liste des habitats</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.statCard}>
                        <Icon name="people-outline" size={30} color="#000" />
                        <Text style={styles.statLabel}>Résidents</Text>
                        <View style={styles.bubble}>
                            <Text style={styles.userName}>{userProfile ? userProfile.name : 'Loading...'}</Text>
         Ò               </View>
                    </View>

                    <View style={styles.statCard}>
                        <Icon name="flash-outline" size={30} color="#000" />
                        <Text style={styles.statLabel}>Puissance Max (en W)</Text>
                        <Text style={styles.statValue}>10000</Text>
                    </View>
                </View>
                {/* Nouvelles rubriques */}
                <View style={styles.cardContainer}>
                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Résidents</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Nb équipements</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={[styles.statLabel, { color: '#777' }]}>Types</Text>
                    </View>
                </View>
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
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
    },
    statCard: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 100,
    },
    statLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#777',
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    bubble: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2, // Ajoute une ombre
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    profileName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default LDH;
