// src/Signup.jsx
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        timeStamp: serverTimestamp(),
      });
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
