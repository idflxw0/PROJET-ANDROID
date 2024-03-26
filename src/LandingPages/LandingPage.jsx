import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions, Animated, StatusBar } from 'react-native';
const { width } = Dimensions.get('window');
import Paginator from "../components/Paginator";
import slides from "../../slides";
import OnboardingItem from "../components/OnboardingItem";

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current; // Use useRef here for consistent reference
    const slidesRef = useRef(null);

    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };
    const handleLogInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#554F59" barStyle="light-content" />
            <View style={{ flex: 3, marginBottom: '35%' }}>
                <FlatList
                    data={slides}
                    renderItem={({ item,index}) => <OnboardingItem item={item}  isFirst={index === 0}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    style={{ position: 'relative' }}
                />
            </View>

            <View style={styles.footer }>
                <Paginator data={slides} scrollX={scrollX} />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogInPress}
                >
                    <Text style={styles.signUpButtonText}>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUpPress}
                >
                    <Text style={styles.buttonText}>Inscription</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#95E1D3',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: '-2.2%',
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 20,
    },
    slide: {
        width: width,
        alignItems: 'center',
        overflow: 'hidden',
    },
    loginButton: {
        backgroundColor: '#34495E',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '90%',
        marginBottom: 10,
    },
    signUpButton: {
        backgroundColor: '#F39C12',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: '15%',
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default OnboardingScreen;
