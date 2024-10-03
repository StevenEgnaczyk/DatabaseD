// src/App.jsx
import Startup from './pages/StartupScreen/Startup';
import Home from './pages/Home/Home';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from 'react';

const App = () => {

  const [user, setUser] = useState(null);

  return (
      <div>
        {!user ? (
            <Startup user={user} setUser ={setUser}/>
        ) : (
            <Home user={user} setUser={setUser} />
        )}
        <ToastContainer/>
      </div>
  );
};

export default App;