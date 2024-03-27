import { initializeApp,getApps, FirebaseApp} from 'firebase/app';
import 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {getFirestore } from "firebase/firestore";



//android : 640023812885-3rhielb66921mil65ikmfahra5rr7jp7.apps.googleusercontent.com
const configuration = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId:process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket:process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId:process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID ,
    appId:process.env.EXPO_PUBLIC_APP_ID ,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
}
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(configuration);
} else {
    firebaseApp = getApps()[0];
}
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Export auth functions
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

