// components/ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Implement password reset functionality here
    alert(`Password reset instructions have been sent to ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <input
        type="email"
        className="startup-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Send Reset Instructions</button>
    </div>
  );
};

export default ForgotPassword;