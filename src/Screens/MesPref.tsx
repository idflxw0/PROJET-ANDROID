import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import {ImagePickerResult} from "expo-image-picker";
import {useUserProfile} from "../hook/useUserProfile ";
import {MaterialIcons} from "@expo/vector-icons";
import {NavigationProp} from "@react-navigation/native";


//@ts-ignore
const MesPref = ({navigation}) => {
    const [image, setImage] = useState<string | null>(null);
    const { userProfile, refreshUserProfile } = useUserProfile();

    const getFilePermission = async() => {
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

    return (
        <View style={styles.container}>
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
            <Button title="Change Profile Picture" onPress={confirmUploadImage} />
            <TouchableOpacity onPress={handleNotificationNavigation} style={styles.notification}>
                <MaterialIcons name="notifications" size={24} color="black" style={styles.icon} />
                <Text style={styles.txtNotification}>Notifications</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#95E1D3',
        paddingTop: 20,
    },
    Header: {
        alignItems: 'center',
        marginTop:"10%",
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
        width: '50%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    txtNotification: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    icon: {
        // You can adjust icon styles if needed
    },
});

export default MesPref;