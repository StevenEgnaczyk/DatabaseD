// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Startup from './pages/StartupScreen/Startup';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import { UserProvider, useUser, useAuthLoading } from './config/userContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const user = useUser();
  const loading = useAuthLoading();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (user === null) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <ToastContainer />
      </div>
    </UserProvider>
  );
};

export default App;
