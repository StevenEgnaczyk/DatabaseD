/* Admin.jsx imports */
import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, getFirestore, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import './Admin.css';

import NavBar from '../Home/components/NavBar';
import UnapprovedUsers from './components/UnapprovedUsers';
import TagsTabInterface from './components/TagsTabInterface';

/* Admin page component */
const Admin = () => {

    /* State variables */
    const [unapprovedUsers, setUnapprovedUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    /* Firebase services */
    const db = getFirestore();
    const auth = getAuth();

    /* Fetch the unapproved users */
    const fetchUnapprovedUsers = useCallback(async () => {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const unapprovedList = usersSnapshot.docs
                .filter(doc => !doc.data().approved)
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setUnapprovedUsers(unapprovedList);
        } catch (error) {
            console.error("Error fetching unapproved users:", error);
        }
    }, [db]);

    /* Fetch the user's role and unapproved users */
    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().role === "admin") {
                        setIsAdmin(true);
                    }
                } catch (e) {
                    console.error("Error getting document:", e);
                }
            }
        };
        fetchUserRole();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserRole();
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, [auth, db]);
    useEffect(() => {
        if (isAdmin) {
            fetchUnapprovedUsers();
        }
    }, [isAdmin, fetchUnapprovedUsers]);

    /* Render the admin page */
    if (!isAdmin) {
        return <p>You do not have access to this page.</p>;
    }
    return (
        <div>
            <NavBar />
            <div className="admin-page-container">
                <div className="left-panel">
                    <UnapprovedUsers unapprovedUsers={unapprovedUsers} fetchUnapprovedUsers={fetchUnapprovedUsers} db={db} />
                </div>
                <div className="right-panel">
                    <TagsTabInterface />
                </div>
            </div>
        </div>
    );
};

export default Admin;
