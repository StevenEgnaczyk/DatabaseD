import React, { useState, useRef } from 'react';
import './NavBar.css';
import logo from '../../assets/Logo.jpeg';


const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    function returnToLogin(){
        window.location.href = "./pages/Login.jsx";
    }

    const handleTextRotation = () => {
        const textElement = textRef.current;
        if(textElement){
          textElement.classList.add("rotate");
    
          setTimeout(() => {
            textElement.classList.remove("rotate");
          }, 2000);
        }
      };
    
      const textRef = useRef(null);

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={handleTextRotation}>
                <img className="logo-img" src={logo} alt="Logo" />
                <div className="logo-text" ref={textRef}>DataBaseD</div>
            </div>
            <div className="navbar-dropdown">
                <button onClick={toggleDropdown} className="dropdown-toggle">
                    Menu
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <div>
                            <button onClick={returnToLogin}>Log out</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;