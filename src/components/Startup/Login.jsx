// src/Login.jsx
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <form className={"form-container"} onSubmit={handleLogin}>
        <h2>Log-in</h2>
        <input className={"custom-input"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className={"custom-input"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className={"submit-button"} type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
  );
};

export default Login;
