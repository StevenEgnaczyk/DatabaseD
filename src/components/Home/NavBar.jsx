import React, { useEffect, useState, useRef } from 'react';
import './NavBar.css';
import logo from '../../assets/Logo.jpeg';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const NavBar = () => {

    const [userRole, setUserRole] = useState(null);
    const db = getFirestore();
    const auth = getAuth();

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
    }, [auth]);

    console.log(userRole);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const textRef = useRef(null);

    const toggleDropdown = () => {
        if (dropdownOpen) {
            setClosing(true); // Set closing state to true
            setTimeout(() => {
                setDropdownOpen(false); // Close dropdown after animation
                setClosing(false); // Reset closing state
            }, 300); // Match this duration with the CSS transition duration
        } else {
            setDropdownOpen(true); // Open dropdown
        }
    };

    function returnToLogin() {
        window.location.href = "./pages/Login.jsx";
    }

    const handleTextRotation = () => {
        const textElement = textRef.current;
        if (textElement) {
            textElement.classList.add("rotate");
            setTimeout(() => {
                textElement.classList.remove("rotate");
            }, 2000);
        }
    };

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
                {dropdownOpen && (
                    <div className={`dropdown-menu ${closing ? 'closing' : ''}`}>
                        {/* Conditionally render the Admin Panel Link for admin users */}
                        {userRole && userRole === "admin" && (
                            <button onClick={() => window.location.href = "/admin"}>Admin Panel</button>
                        )}
                        <button onClick={returnToLogin}>Log out</button>


                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;