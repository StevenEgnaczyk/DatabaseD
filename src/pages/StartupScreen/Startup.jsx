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

  return (
    <div>
        <div className="auth-container" onClick={handleTextRotation}>
          <div className="static-text" ref={textRef}>Databased</div>
          <div>
            <Login setUser={setUser} />
            <Signup setUser={setUser} />
          </div>
        </div>
    </div>
  );
};

export default Startup;
