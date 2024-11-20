/* Admin.jsx imports */
import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import './Admin.css';

import NavBar from '../Home/components/NavBar';
import UnapprovedUsers from './components/UnapprovedUsers';
import TagsTabInterface from './components/TagsTabInterface';
import { useUserRole } from '../../config/adminContext';

/* Admin page component */
const Admin = () => {

    /* State variables */
    const [unapprovedUsers, setUnapprovedUsers] = useState([]);
    const userRole = useUserRole();

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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                return;
            }
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (userRole === "admin") {
            fetchUnapprovedUsers();
        }
    }, [userRole, fetchUnapprovedUsers]);

    /* Render the admin page */
    if (userRole !== "admin") {
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
