// src/Login.jsx
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        toast.error("Please verify your email address.", { position: "top-center" });
        return;
      }

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists() || !userDoc.data().approved) {
        toast.error("Your account is not approved yet.", { position: "top-center" });
        return;
      }

      setUser(userCredential.user); // ALlow login only if email is verified
      setError('');
    } catch (err) {
      if (err.message !== error) { // Check if the error message is different
        setError(err.message);
        let error_message;
        switch(err.code){
          case 'auth/invalid-credential':
            error_message = "Invalid password or email.";
            break;
          default:
            error_message = err.message;
        }
        toast.error(error_message, { position: "top-center" });

        // Asynchronous wait before clearing the error
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        setError(''); // Clear the error after the wait
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
      <form className={"form-container"} onSubmit={handleLogin}>
        <h2>Log-in</h2>
        <input className={"custom-input"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className={"custom-input"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className={"submit-button"} type="submit" disabled={loading}>Login</button>
      </form>
  );
};

export default Login;
