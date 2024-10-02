// src/App.jsx
import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <div>
          <Login setUser={setUser} />
          <Signup setUser={setUser} />
        </div>
      ) : (
        <Home user={user} />
      )}
    </div>
  );
};

export default App;
