import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text>
                HomePage
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

export default HomePage;