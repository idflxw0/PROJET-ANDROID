import React, {useState, FC , memo} from 'react';
import {View, Text, StyleSheet, Alert, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, KeyboardType} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
// import Alert from '@mui/material/Alert';

//Image
import * as ImagePicker from "expo-image-picker";
import {ImagePickerResult} from "expo-image-picker";

//Firebase
import {auth, db} from "../config/firebase";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import {useUserProfile} from "../hook/useUserProfile ";
interface ClearableTextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
}
const ClearableTextInput: FC<ClearableTextInputProps> = memo(({ value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Icon name="close-circle" size={20} color="grey" />
                </TouchableOpacity>
            )}
        </View>
    );
});

//@ts-ignore
const ModifProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const { userProfile, refreshUserProfile } = useUserProfile();

    const getFilePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return false;
        }
        return true;
    }

    const isValidBirthDate = (value: string) => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
        return regex.test(value);
    };

    const handleBirthDateChange = (text: string) => {
        const cleaned = text.replace(/[^\d/]/g, '');
        const formatted = cleaned.substring(0, 10);
        setBirthDate(formatted);
    };




    const pickImage = async () => {
        const hasPermission = await getFilePermission();
        if (!hasPermission) return;
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const pickedImageUri = result.assets[0].uri;
            setImage(pickedImageUri);
        }
    };

    const confirmUploadImage = async () => {
        if (image) {
            uploadImage(image);
        } else {
            Alert.alert("No Image Selected", "Please pick an image first.");
        }
    };

    const uploadImage = async (uri: string) => {
        const user = auth.currentUser;
        if (user) {
            const response = await fetch(uri);
            const blob = await response.blob();

            const storage = getStorage();
            const storageRef = ref(storage, `profilePictures/${user.uid}/profilePic.jpg`);

            uploadBytes(storageRef, blob).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    const userDocRef = doc(db, "users", user.uid);
                    setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true }).then(() => {
                        Alert.alert("Profile Picture Updated", "Your profile picture has been updated successfully.");
                        setImage('');
                        refreshUserProfile();
                    }).catch((error) => {
                        console.error("Error updating profile picture:", error);
                    });
                });
            }).catch((error) => {
                console.error("Error uploading image:", error);
            });
        }
    };
    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.navigate('LandingPage');
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    const handleSaveProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            let updateData: Record<string, any> = {};

            if (name) updateData.name = name;
            if (birthDate) updateData.birthDate = birthDate;
            if (phone) updateData.phone = phone;

            if (image) {
                await confirmUploadImage();
            }
            if (Object.keys(updateData).length > 0) {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    await updateDoc(userDocRef, updateData);
                    Alert.alert('Profile updated successfully');
                    await refreshUserProfile(); // Make sure this function re-fetches the user data
                } catch (error) {
                    console.error("Error updating profile:", error);
                }
            }
            if (password) {
                try {
                    await updatePassword(user, password);
                    Alert.alert('Password updated successfully');
                } catch (error) {
                    console.error("Error updating password:", error);
                    // Handle errors here, such as a weak password error or a recent login required error.
                }

            }}
        };
        // @ts-ignore
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView>
                    <View style={styles.headerTitle}>
                        <Header title={'Votre compte'} navigation={navigation} />
                    </View>
                    <View style={styles.profileSection}>
                        <Image
                            source={userProfile?.profilePicture
                                ? { uri: userProfile.profilePicture }
                                : require('../../assets/Default_pfp.png')}
                            style={styles.profilePic}
                        />
                        <Text style={styles.userName}>{userProfile?.name}</Text>
                        <Text style={styles.editPhotoText} onPress={pickImage}>Modifier la photo</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <ClearableTextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Nom"
                        />
                        <ClearableTextInput
                            value={birthDate}
                            onChangeText={handleBirthDateChange}
                            placeholder="jj/mm/aaaa"
                            keyboardType="phone-pad"
                        />
                        <ClearableTextInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Téléphone"
                            keyboardType="phone-pad"
                        />
                        <ClearableTextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                        <Text style={styles.buttonText}>Valider les changements</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95E1D3', // Light cyan background color
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    headerTitle: {
        marginTop: '2%',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    profileSection: {
        marginTop: '-35%',
        alignItems: 'center',
        padding: 20,
    },
    profilePic: {
        marginTop: '20%',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 8,
    },
    editPhotoText: {
        color: 'blue',
        marginTop: 4,
    },
    infoSection: {
        // backgroundColor: 'white',
        padding: 20,
        // borderTopWidth: 1,
        // borderColor: '#cccccc',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },

    label: {
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#4287F5',
        fontWeight: 'bold',
    },
});


export default ModifProfile;