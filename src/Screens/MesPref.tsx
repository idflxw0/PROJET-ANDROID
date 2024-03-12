import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import {ImagePickerResult} from "expo-image-picker";
import {useUserProfile} from "../hook/useUserProfile ";
import {MaterialIcons} from "@expo/vector-icons";


const MesPref = () => {
    const [image, setImage] = useState<string | null>(null);
    const userProfile = useUserProfile();
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const pickedImageUri = result.assets[0].uri;
            setImage(pickedImageUri);
            uploadImage(pickedImageUri);
        }

    };

    const confirmUploadImage = async () => {
        if (image) {
            uploadImage(image); // Use the stored image URI for upload
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
                    }).catch((error) => {
                        console.error("Error updating profile picture:", error);
                    });
                });
            }).catch((error) => {
                console.error("Error uploading image:", error);
            });
        }
    };

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
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Change Profile Picture" onPress={confirmUploadImage} />
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
        marginBottom: 20, // Space between header and the rest of the content
    },
    imageContainer: {
        position: 'relative',
    },
    changeImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#007bff', // Bootstrap primary button color for example
        borderRadius: 20,
        padding: 8,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Half of width/height to make it circular
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
});

export default MesPref;