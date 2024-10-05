/* Login.jsx Imports */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

/* Component for the login page */
const Login = ({ setUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* Handle the login form submission */
  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      /* Check if the user's email is verified */
      if (!userCredential.user.emailVerified) {
        toast.error("Please verify your email address.", { position: "top-center" });
        return;
      }

      /* Check if the user is approved */
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists() || !userDoc.data().approved) {
        toast.error("Your account is not approved yet.", { position: "top-center" });
        return;
      }

      /* Set the user state and navigate to the home page */
      setUser(userCredential.user);
      setError('');
      navigate('/home');
      
    } catch (err) {
      if (err.message !== error) {
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
        await new Promise(resolve => setTimeout(resolve, 5000));
        setError('');
      }
    } finally {
      setLoading(false);
    }
  };

  /* Render the login form */
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
