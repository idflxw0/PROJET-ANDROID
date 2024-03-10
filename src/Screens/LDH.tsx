import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LDH = () => {
    return (
        <View style={styles.container}>
            <Text>
                Liste des habitas
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#95E1D3'
    },
});

export default LDH;