import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MonHabitat = () => {
    return (
        <View style={styles.container}>
            <Text>
                MonHabitat
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

export default MonHabitat;