import React, { useState, useRef } from 'react';
import './NavBar.css';
import logo from '../../assets/Logo.jpeg';

const NavBar = ({ user }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const textRef = useRef(null);

    const toggleDropdown = () => {
        console.log(user.role)
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
                        <button onClick={returnToLogin}>Log out</button>

                        {/* Conditionally render the Admin Panel Link for admin users */}
                        {user && user.role === "admin" && (
                            <button onClick={() => window.location.href = "/admin"}>Admin Panel</button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;