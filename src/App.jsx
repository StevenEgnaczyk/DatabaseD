// src/App.jsx
import React, { useRef, useState } from 'react';
import Login from './components/Startup/Login';
import Signup from './components/Startup/Signup';
import Home from './pages/Home/Home';

import "./App.css"


const App = () => {

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
  const [user, setUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between Login and Signup

  const toggleAuthMode = () => {
    setIsSigningUp((prevState) => !prevState); // Toggle between Login and Signup
  };

  return (
    <div>
      {!user ? (
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
      ) : (
          <Home user={user} />
      )}
    </div>
  );
};

export default App;
