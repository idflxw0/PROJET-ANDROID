import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

interface UserProfile {
    name: string;
    profilePicture?: string;
}

export const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        // Directly assert the type when setting the state
                        setUserProfile(docSnap.data() as UserProfile);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    return userProfile;
};
