// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Startup from './pages/StartupScreen/Startup';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { UserProvider } from './config/userContext';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserProvider>
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
          element={<Admin />} 
        />
      </Routes>
      <ToastContainer />
      </div>
    </UserProvider>
  );
};

export default App;
