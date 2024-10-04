import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase'; // Adjust your import paths
import { collection, getDocs, query, where, updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const Admin = () => {

    const [unapprovedUsers, setUnapprovedUsers] = useState([]);

    const [isAdmin, setIsAdmin] = useState(false);

    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
                if (user) {
                    try {
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await(getDoc(docRef));

                        if (docSnap.exists() && docSnap.data().role === "admin") {
                            setIsAdmin(true);
                        } 
                    } catch (e) {
                        console.error("Error getting document:", e);
                    }
                }
            };
            fetchUserRole();
            console.log(isAdmin);

            const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserRole();
            } else {
                setIsAdmin(false); // No user is signed in
            }
        });
        return () => unsubscribe(); // Clean up listener
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchUnapprovedUsers();
        }
    }, [isAdmin]);

    const fetchUnapprovedUsers = async () => {
        const q = query(collection(db, "users"), where("approved", "==", false));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUnapprovedUsers(users);
    };

    const approveUser = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { approved: true });
            toast.success("User approved successfully!");
            fetchUnapprovedUsers(); // Refresh list after approval
        } catch (err) {
            console.error("Error approving user:", err);
            toast.error("Failed to approve user.");
        }
    };

    if (!isAdmin) {
        return <p>You do not have access to this page.</p>;
    }

    return (
        <div>
        <h2>Admin Panel</h2>
        {unapprovedUsers.length === 0 ? (
            <p>No unapproved users.</p>
        ) : (
            <table>
            <thead>
                <tr>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {unapprovedUsers.map(user => (
                <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>
                    <button onClick={() => approveUser(user.id)}>Approve</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    };

export default Admin;
