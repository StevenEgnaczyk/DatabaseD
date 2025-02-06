/* Signup.jsx imports */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config/firebase';

/* Component for the signup page */
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      await sendEmailVerification(userCredential.user);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: formData.email,
        fullName: formData.fullName,
        approved: false,
        timeStamp: serverTimestamp(),
        role: "user",
      });

      toast.success("A verification email has been sent to your email address");
      navigate('/');

    } catch (err) {
      const errorMessages = {
        'auth/email-already-in-use': "The email address is already in use by another account.",
        'auth/invalid-email': "The email address is not valid.",
        'auth/weak-password': "The password must contain a minimum of 6 characters"
      };
      toast.error(errorMessages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* Render the signup form */
  return (
    <form className="form-container" onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input 
        className="startup-input"
        name="fullName"
        type="text" 
        value={formData.fullName} 
        onChange={handleChange} 
        placeholder="Name" 
        required 
      />
      <input 
        className="startup-input"
        name="email"
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        required 
      />
      <input 
        className="startup-input"
        name="password"
        type="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required 
      />
      <button 
        className="submit-button" 
        type="submit" 
        disabled={loading}
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
