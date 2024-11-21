/* Signup.jsx imports */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config/firebase';

/* Component for the signup page 
  setUser - Function to set the user state */
const Signup = ({ setUser }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* Handle the signup form submission */
  const handleSignup = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      /* Send email verification */
      await sendEmailVerification(userCredential.user);

      /* Add user to the database */
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        fullName,
        approved: false,
        timeStamp: serverTimestamp(),
        role: "user",
      });

      /* Pop up with success and verification notice */
      toast.success("A verification email has been sent to your email address", { position: 'top-center' });
      setUser(null);
      setError('');
      navigate('/');

    } catch (err) {
      if (err.message !== error) {
        setError(err.message);
        let error_message;
        switch (err.code) {
          case 'auth/email-already-in-use':
            error_message = "The email address is already in use by another account.";
            break;
          case 'auth/invalid-email':
            error_message = "The email address is not valid.";
            break;
          case 'auth/weak-password':
            error_message = "The password must contain a minimum of 6 characters";
            break;
          default:
            error_message = err.message;
        }
        toast.error(error_message, { position: 'top-center' });
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
        setError('');
      }
    } finally {
      setLoading(false);
    }
  }
  
  /* Render the signup form */
  return (
    <form className={"form-container"} onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input className={"startup-input"} type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Name" required />
      <input className={"startup-input"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className={"startup-input"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className={"submit-button"} type="submit" disabled={loading}>Signup</button>
    </form>
  );
};
export default Signup;
