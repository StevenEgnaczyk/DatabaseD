import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserRoleContext = createContext();

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const db = getFirestore();
    const auth = getAuth();

    const fetchUserRole = useCallback(async (user) => {
        if (user) {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserRole(docSnap.data().role);
                } else {
                    console.log("No such document!");
                }
            } catch (e) {
                console.error("Error getting document:", e);
            }
        } else {
            setUserRole(null); // Reset role if no user is logged in
        }
    }, [db]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            fetchUserRole(user);
        });

        return () => {
            unsubscribe();
        };
    }, [fetchUserRole, auth]);

    return (
        <UserRoleContext.Provider value={userRole}>
            {children}
        </UserRoleContext.Provider>
    );
};
