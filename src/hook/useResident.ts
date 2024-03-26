// useResidents.js
import { useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebase'; // Assurez-vous que cela pointe vers votre fichier de configuration Firebase
import { collection, getDocs, query } from 'firebase/firestore';

type Resident = {
    timeSlot: string;
    id: string;
    name: string;
    equipmentCount: number;
    coins: number;
    totalPower: number;
};

export const useResidents = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [totalPower, setTotalPower] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchResidentsData = useCallback(async () => {
        setLoading(true);
        try {
            const usersQuery = query(collection(db, "users"));
            const querySnapshot = await getDocs(usersQuery);
            const usersData: Resident[] = [];
            let totalPowerSum = 0;
            await Promise.all(
                querySnapshot.docs.map(async (userDoc) => {
                    const userId = userDoc.id;
                    const userName = userDoc.data().name;
                    const usertimeSlot = userDoc.data().TimeSlot || "9h-10h";
                    const userCoins = userDoc.data().coins || 0;
                    const equipmentsQuery = query(collection(db, "users", userId, "equipments"));
                    const equipmentsSnapshot = await getDocs(equipmentsQuery);
                    const equipmentCount = equipmentsSnapshot.size;
                    let userPower = 0;
                    equipmentsSnapshot.forEach((doc) => {
                        const equipmentData = doc.data();
                        userPower += equipmentData.puissance;
                    });
                    totalPowerSum += userPower;
                    usersData.push({ id: userId, name: userName, equipmentCount, coins: userCoins , timeSlot: usertimeSlot, totalPower: userPower }); // Add totalPower to each resident
                })
            );
            setResidents(usersData);
            setTotalPower(totalPowerSum);
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    }, [db]);

    useEffect(() => {
        fetchResidentsData();
    }, [fetchResidentsData]);

    return { residents, totalPower, loading, error, refresh: fetchResidentsData };
};