// src/Login.jsx
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(''); // Clear error on successful login
    } catch (err) {
      if (err.message !== error) { // Check if the error message is different
        setError(err.message);
        let error_message;
        switch(err.code){
          case 'auth/invalid-credential':
            error_message = "Invalid password or email.";
            break;
          default:
            error_message=err.message;

        }
        toast.error(error_message,{position:"top-center"})
        
      }
      setError(''); // Clear error message
    }
  };

  return (
      <form className={"form-container"} onSubmit={handleLogin}>
        <h2>Log-in</h2>
        <input className={"custom-input"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className={"custom-input"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className={"submit-button"} type="submit">Login</button>
      </form>
  );
};

export default Login;
