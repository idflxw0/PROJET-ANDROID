import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splashscreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the main screen after 3 seconds
            navigation.navigate('LandingPage');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/image-removebg-preview.png')} // Change path to your image
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95E1D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%', // Adjust width as needed
        height: '80%', // Adjust height as needed
    },
});

export default Splashscreen;
