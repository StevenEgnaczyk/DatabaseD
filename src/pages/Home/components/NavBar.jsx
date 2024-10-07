/* NavBar.jsx imports */
import React, { useEffect, useState, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo.jpeg';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

/* Component for the navigation bar */
const NavBar = () => {

    /* User role states */
    const [userRole, setUserRole] = useState(null);
    const db = getFirestore();
    const auth = getAuth();

    /* Dropdown states */
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const textRef = useRef(null);
    const navigate = useNavigate();

    /* Fetch the user's role from the database */
    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await(getDoc(docRef));

                    if (docSnap.exists()) {
                        setUserRole(docSnap.data().role);
                    } else {
                        console.log("No such document!");
                    }
                } catch (e) {
                    console.error("Error getting document:", e);
                }
            }
        };
        fetchUserRole();
    }, [auth, db]);

    /* Toggle the dropdown menu */
    const toggleDropdown = () => {
        if (dropdownOpen) {
            setClosing(true);
            setTimeout(() => {
                setDropdownOpen(false);
                setClosing(false); 
            }, 300);
        } else {
            setDropdownOpen(true);
        }
    };

    /* Return to the login page */
    function returnToLogin() {
        navigate('/');
    }

    /* Rotate the logo text */
    const handleTextRotation = () => {
        const textElement = textRef.current;
        if (textElement) {
            textElement.classList.add("rotate");
            setTimeout(() => {
                textElement.classList.remove("rotate");
            }, 2000);
        }
    };

    /* Render the navigation bar */
    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={handleTextRotation}>
                <img className="logo-img" src={logo} alt="Logo" />
                <div className="logo-text" ref={textRef}>DataBaseD</div>
            </div>
            <div className="navbar-dropdown">
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    Menu
                </button>

                {/* Conditionally render the dropdown menu */}
                {dropdownOpen && (
                    <div className={`dropdown-menu ${closing ? 'closing' : ''}`}>

                        {/* Conditionally render the Admin Panel Link for admin users */}
                        {userRole === "admin" && (
                            <Link to="/admin" className="dropdown-link">Admin Panel</Link> // Use Link for Admin Panel
                        )}

                        <button onClick={returnToLogin}>Log out</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;