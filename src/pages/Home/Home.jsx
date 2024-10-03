
// src/Home.jsx
import React from 'react';
import "./Home.css"

const Home = ({user, setUser}) => {
  return (
    <div className={"navBar"}>
      <h1>Welcome, {user.email}</h1>
    </div>
  );
};

export default Home;