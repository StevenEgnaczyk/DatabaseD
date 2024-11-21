/* NavBar.jsx Imports */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../config/userContext';
    
import './NavBar.css';

/* Component for the navigation bar */
const NavBar = () => {
    const user = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    const dropdownRef = useRef(null);
    const textRef = useRef(null);
    const navigate = useNavigate();

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

    const closeDropdown = useCallback(() => {
        if (dropdownOpen) {
            setClosing(true);
            setTimeout(() => {
                setDropdownOpen(false);
                setClosing(false);
            }, 500);
        }
    }, [dropdownOpen]);

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
        }
    }, [dropdownRef, closeDropdown]);

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen, handleClickOutside]);

    function returnToLogin() {
        navigate('/');
    }

    function returnToHome() {
        navigate('/home');
    }

    function navigateToAdmin() {
        navigate('/admin');
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
            <div className="navbar-logo">
                <img className="logo-img" src={'./harry.png'} alt="Logo" onClick={handleTextRotation}/>
                <div className="logo-text-container">   
                    <div className="logo-text" ref={textRef} onClick={handleTextRotation}>DataBaseD</div>
                    <div className="logo-text" ref={textRef} onClick={handleTextRotation}>{user.fullName}</div>
                </div>
            </div>
            <div className="navbar-dropdown" ref={dropdownRef}>
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    Menu
                </button>

                {dropdownOpen && (
                    <div className={`dropdown-menu ${closing ? 'closing' : 'open'}`}>
                        <button onClick={returnToHome}>Home</button>
                        {user.role === "admin" && (
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
