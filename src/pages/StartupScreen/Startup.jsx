import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component
import logo from '../../assets/Logo.jpeg';
import './Startup.css';

const Startup = ({ user, setUser }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state for Forgot Password

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState);
    setIsForgotPassword(false); // Reset Forgot Password view
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(true); // Show Forgot Password view
    setIsSigningUp(false); // Reset Signup/Login view
  };

  return (
    <div>
      <div className="main-container">
        <img className="logo-login-img" src={logo} alt="Logo" />
        <div className="auth-container">
          {isForgotPassword ? (
            <ForgotPassword setUser={setUser} />
          ) : isSigningUp ? (
            <Signup setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
          {!isForgotPassword && (
            <button className="swap-button" onClick={toggleAuthMode}>
              <span>{isSigningUp ? "Already have an account? Login" : "Need an account? Sign up"}</span>
            </button>
          )}
          <button className="swap-button" onClick={toggleForgotPassword}>
            <span>Forgot Password? Click Here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Startup;
