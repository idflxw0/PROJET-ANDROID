import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,Button, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import {ImagePickerResult} from "expo-image-picker";


const MesPref = () => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        // Launch image picker
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
            <Text>Mes Preferences</Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Pick an Image" onPress={pickImage} />
            <Button title="Change Profile Picture" onPress={confirmUploadImage} />
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

export default MesPref;