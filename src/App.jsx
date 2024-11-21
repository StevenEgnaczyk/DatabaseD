// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Startup from './pages/StartupScreen/Startup';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { UserRoleProvider } from './config/adminContext';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserRoleProvider>
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
    </UserRoleProvider>
  );
};

export default App;
