
// src/Home.jsx
import React from 'react';
import "./Home.css"
import NavBar from './../../components/Home/NavBar';

const Home = ({ user }) => {
    return (

        <div>
            <NavBar />
            <h1>Welcome, {user.email}</h1>
        </div>
    );
};

export default Home;