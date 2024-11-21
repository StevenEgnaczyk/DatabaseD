import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const db = getFirestore();
    const auth = getAuth();

    const fetchUser = useCallback(async (user) => {
        if (user) {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    toast.error("User not found");
                }
            } catch (e) {
                toast.error("Error fetching user", e);
            }
        } else {
            setUser(null); // Reset user if no user is logged in
        }
    }, [db]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            fetchUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, [fetchUser, auth]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
