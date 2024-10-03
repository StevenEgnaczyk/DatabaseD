
// src/Home.jsx
import React from 'react';
import "./Home.css"
import NavBar from './../../components/Home/NavBar';
import NavBarLeft from './../../components/Home/NavBarLeft';

const Home = ({ user }) => {
    return (

        <div>
            <NavBar />
            {/*<h1>Welcome, {user.email}</h1>*/}
            <NavBarLeft />
        </div>
    );
};

export default Home;