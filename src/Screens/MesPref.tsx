import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ImagePickerResult } from "expo-image-picker";
import { useUserProfile } from "../hook/useUserProfile ";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

//@ts-ignore
const MesPref = ({ navigation }) => {
    const [image, setImage] = useState<string | null>(null);
    const { userProfile, refreshUserProfile } = useUserProfile();
    const [newName, setNewName] = useState('');
    const [toggleValue, setToggleValue] = useState(false); // Thème clair par défaut

    useEffect(() => {
        // Appliquer le thème sombre lors de l'entrée sur la page
        // Mettez en œuvre cela en fonction de votre logique de thème sombre
        // Peut-être basé sur les préférences utilisateur stockées ou les paramètres de l'application
    }, []);

    const getFilePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return false;
        }
        return true;
    }

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

    const handleNotificationNavigation = () => {
        navigation.navigate('Notification');
    }

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
            if (newName === '') return;
            const userDocRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userDocRef, {
                    name: newName,
                });
                alert('Profile updated successfully');
                refreshUserProfile()
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    const switchTheme = () => {
        setToggleValue(!toggleValue); // Inverser le thème lorsque le bouton est pressé
    };

    return (
        <View style={[styles.container, toggleValue ? styles.containerBlack : styles.containerDefault]}>
            <View style={styles.Header}>
                {userProfile ? (
                    <>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: userProfile.profilePicture || 'default_image_uri_here' }} // Adjust 'default_image_uri_here' as needed
                                style={styles.profileImage}
                            />
                            {/* Button for picking a new image */}
                            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
                                <MaterialIcons name="photo-camera" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.profileName}>{userProfile.name}</Text>
                    </>
                ) : (
                    <Text>Loading profile...</Text>
                )}
            </View>
            <TouchableOpacity onPress={handleNotificationNavigation} style={styles.notification}>
                <MaterialIcons name="notifications" size={30} color="black" style={styles.icon} />
                <Text style={styles.txtNotification}>Notifications</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={setNewName}
                value={newName}
                placeholder="Enter New Name"
            />
            <TouchableOpacity style={styles.buttonModifier} onPress={handleSaveProfile}>
                <Text style={styles.buttonModifierText}>Modifier le Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
            {/* Bouton à bascule */}
            <TouchableOpacity onPress={switchTheme} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>{toggleValue ? 'Mode Sombre' : 'Mode Clair'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    containerBlack: {
        backgroundColor: '#1C1C1E',
    },
    containerDefault: {
        backgroundColor: '#95E1D3',
    },
    Header: {
        alignItems: 'center',
        marginTop: "10%",
        marginBottom: 20,
    },
    imageContainer: {
        position: 'relative',
    },
    changeImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#007bff',
        borderRadius: 20,
        padding: 8,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: 'white',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    pickedImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    notification: {
        marginTop: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '90%',
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    txtNotification: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
    icon: {
        right: '150%',
    },
    buttonModifier: {
        marginTop: 10,
        backgroundColor: '#00B4D8',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        shadowColor: '#00B4D8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    signOutButton: {
        marginTop: 20,
        backgroundColor: '#E94560',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        shadowColor: '#E94560',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    signOutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonModifierText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '80%',
        marginVertical: 15,
        borderWidth: 0,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    toggleButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 10,
    },
    toggleButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default MesPref;
