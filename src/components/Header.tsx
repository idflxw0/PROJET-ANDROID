import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// @ts-ignore
const Header = ({title,navigation}) => {
    const handleBackPress = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.backIconContainer}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backIcon}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.backIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    backIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-5%',
        alignSelf: 'flex-start',
        marginVertical: 16,
        left : '-2%',
        paddingBottom: 30,
    },
    backIcon: {
        padding: 10, // Makes it easier to press
    },
    headerTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
});

export default Header;
