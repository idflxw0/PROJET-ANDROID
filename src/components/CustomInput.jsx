import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({inputType,value, setValue}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [password, setPassword] = useState('');
    const handleInputChange = (text) => {
        setPassword(text);
        setShowEyeIcon(text.length > 0);
    };
    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
    return (
        <View style={styles.inputContainer}>
            {!inputType.toLowerCase().includes('password')  && (
                <TextInput
                    style={styles.input}
                    placeholder={inputType}
                    placeholderTextColor="#000"
                    keyboardType={inputType === 'Email' ? 'email-address' : 'default'}
                    secureTextEntry={inputType === 'Password' && !isPasswordVisible}
                    value={value}
                    onChangeText={setValue}
                />
            )}
            {inputType.toLowerCase().includes('password') && (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder={inputType}
                        placeholderTextColor="#000"
                        onChangeText={setValue}
                        secureTextEntry={!isPasswordVisible}
                        value={value}
                    />
                    {showEyeIcon && (
                        <TouchableOpacity style={styles.eyeIcon} onPress={handlePasswordVisibility}>
                            <Icon
                                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: 'transparent', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 12,
        marginBottom: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
});
export default CustomInput;