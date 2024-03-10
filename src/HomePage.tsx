import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text>
                This is home page
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomePage;