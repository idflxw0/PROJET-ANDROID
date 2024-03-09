import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = ({title,navigation}) => {
    const handleBackPress = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.backIconContainer}>
            <AntDesign name="arrowleft" size={24} color="black" onPress={handleBackPress} />
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    backIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 10,
        alignSelf: 'flex-start',
        marginVertical: 16,
        marginLeft: '2%',
        paddingBottom: 30,
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
