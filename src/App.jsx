// src/App.jsx
import React, { useRef, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

import './components/auth.css';


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

  return (
    <div>
      {!user ? (
        <div className="auth-container" onClick={handleTextRotation}>
          <div className="static-text" ref={textRef}>Databased</div>
        <div>
          <Login setUser={setUser} />
          <Signup setUser={setUser} />
        </div>
        </div>
      ) : (
        <Home user={user} />
      )}
    </div>
  );
};

export default App;
