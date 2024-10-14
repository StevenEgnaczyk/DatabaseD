/* UnapprovedUsers.jsx imports */
import React from 'react';
import { toast } from 'react-toastify';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';

import './UnapprovedUsers.css';

/* Component for the unapproved users table */
const UnapprovedUsers = ({ unapprovedUsers, fetchUnapprovedUsers, db }) => {

    /* Approve a user */
    const approveUser = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { approved: true });
            toast.success("User approved successfully!");
            fetchUnapprovedUsers();
        } catch (err) {
            console.error("Error approving user:", err);
            toast.error("Failed to approve user.");
        }
    };

    /* Reject a user */
    const rejectUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
            toast.success("User rejected and deleted successfully!");
            fetchUnapprovedUsers();
        } catch (err) {
            console.error("Error rejecting user:", err);
            toast.error("Failed to reject and delete user.");
        }
    };

    /* Render the unapproved users table */
    return (
        <div className="admin-table">
            <h2>Unapproved Users</h2>
            {unapprovedUsers.length === 0 ? (
                <p>No unapproved users.</p>
            ) : (
                <table className="unapproved-users-table">
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
                                    <button onClick={() => rejectUser(user.id)} style={{ marginLeft: '10px' }}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UnapprovedUsers;
