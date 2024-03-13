// useResidents.js
import { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Ensure this points to your Firebase config file
import { collection, getDocs, query } from 'firebase/firestore';

type Resident = {
    name: string;
    equipmentCount: number;
};

export const useResidents = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchResidentsData = async () => {
            setLoading(true);
            try {
                const usersQuery = query(collection(db, "users"));
                const querySnapshot = await getDocs(usersQuery);
                const usersData = await Promise.all(
                    querySnapshot.docs.map(async (userDoc) => {
                        const userName = userDoc.data().name;
                        const equipmentsQuery = query(collection(db, "users", userDoc.id, "equipments"));
                        const equipmentsSnapshot = await getDocs(equipmentsQuery);
                        const equipmentCount = equipmentsSnapshot.size;
                        return { name: userName, equipmentCount };
                    })
                );
                setResidents(usersData);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchResidentsData();
    }, []);

    return { residents, loading, error };
};
