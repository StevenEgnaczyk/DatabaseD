// src/Home.jsx
import React, { useRef, useState } from 'react';
import Login from '../../components/Startup/Login';
import Signup from '../../components/Startup/Signup';

import './Startup.css';

const Startup = ({user, setUser}) => {

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
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between Login and Signup

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState); // Toggle between Login and Signup
  };

  return (
      <div>
        <div className="main-container" onClick={handleTextRotation}>
          <div className="static-text" ref={textRef}>DataBaseD</div>
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
