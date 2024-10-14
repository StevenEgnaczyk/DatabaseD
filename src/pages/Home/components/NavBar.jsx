/* NavBar.jsx Imports */
import React, { useEffect, useState, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/Logo.jpeg';
import './NavBar.css';

/* Component for the navigation bar */
const NavBar = () => {

    /* State variables */
    const [userRole, setUserRole] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    /* Refs */
    const dropdownRef = useRef(null);
    const db = getFirestore();
    const auth = getAuth();
    const textRef = useRef(null);
    const navigate = useNavigate();

    /* Fetch the user's role from the database */
    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
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
            }, 500);
        } else {
            setDropdownOpen(true);
        }
    };

    /* Close the dropdown menu */
    const closeDropdown = () => {
        if (dropdownOpen) {
            setClosing(true);
            setTimeout(() => {
                setDropdownOpen(false);
                setClosing(false);
            }, 500);
        }
    };

    /* Handle clicks outside of the dropdown menu */
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
        }
    };

    /* Add event listener for clicks outside of the dropdown menu */
    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    /* Navigate to the login page */
    function returnToLogin() {
        navigate('/');
    }

    /* Navigate to the admin panel */
    function returnToHome() {
        navigate('/home');
    }

    /* Navigate to the admin panel */
    function navigateToAdmin() {
        navigate('/admin');
    }

    /* Handle the text rotation animation */
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
            <div className="navbar-dropdown" ref={dropdownRef}>
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    Menu
                </button>

                {dropdownOpen && (
                    <div className={`dropdown-menu ${closing ? 'closing' : 'open'}`}>
                        <button onClick={returnToHome}>Home</button>
                        {userRole === "admin" && (
                            <button onClick={navigateToAdmin}>Admin Panel</button>
                        )}
                        <button onClick={returnToLogin}>Log out</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
