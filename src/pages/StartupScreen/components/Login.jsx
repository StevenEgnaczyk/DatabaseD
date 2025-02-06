/* Login.jsx Imports */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

/* Component for the login page */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* Handle the login form submission */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        toast.error("Please verify your email address.");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists() || !userDoc.data().approved) {
        toast.error("Your account is not approved yet.");
        return;
      }

      navigate('/home');
      
    } catch (err) {
      const error_message = err.code === 'auth/invalid-credential' 
        ? "Invalid password or email."
        : err.message;
      toast.error(error_message);
    } finally {
      setLoading(false);
    }
  };

  /* Render the login form */
  return (
    <form className="form-container" onSubmit={handleLogin}>
      <h2>Log-in</h2>
      <input 
        className="startup-input" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        className="startup-input" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button 
        className="submit-button" 
        type="submit" 
        disabled={loading}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
