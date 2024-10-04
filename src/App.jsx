// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Startup from './pages/StartupScreen/Startup';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin'; // Import Admin component

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={<Startup user={user} setUser={setUser} />} 
        />
        <Route 
          path="/home" 
          element={<Home user={user} setUser={setUser} />} 
        />
        <Route 
          path="/admin" 
          element={<Admin />} // Render the Admin component
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
