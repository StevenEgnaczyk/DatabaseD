// src/Home.jsx
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import logo from '../../assets/Logo.jpeg';


import './Startup.css';

const Startup = ({user, setUser}) => {

  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between Login and Signup

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState); // Toggle between Login and Signup
  };

  return (
      <div>
        <div className="main-container">
          <img className="logo-login-img" src={logo} alt="Logo"  />
          <div className="auth-container">
            {isSigningUp ? (
                <Signup setUser={setUser} />
            ) : (
                <Login setUser={setUser} />
            )}
            <button className={"swap-button"} onClick={toggleAuthMode}>
              <span>{isSigningUp ? "Already have an account? Login" : "Need an account? Sign up"}</span>
            </button>
          </div>
        </div>

      </div>
  )};



export default Startup;
