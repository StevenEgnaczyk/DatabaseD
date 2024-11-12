import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component
import './Startup.css';
import DocumentPreviewAnimation from "./components/DocumentPreviewAnimation";

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
        <div className="auth-container">
          <h1 className={'databased-title'}>DataBaseD</h1>
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
        <div className='scrolling-pages'>
          <DocumentPreviewAnimation />
        </div>
      </div>
    </div>
  );
};

export default Startup;
