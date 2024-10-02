// src/Home.jsx
import React from 'react';

const Home = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  );
};

export default Home;
