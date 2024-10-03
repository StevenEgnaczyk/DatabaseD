
// src/Home.jsx
import React from 'react';
import "./Home.css"
import NavBar from './../../components/Home/NavBar';
import NavBarLeft from './../../components/Home/NavBarLeft';
import FileQueryBar from './../../components/Home/FileQueryBar';


const Home = ({ user }) => {
    return (

        <div>
            <NavBar />
            {/*<h1>Welcome, {user.email}</h1>*/}
            <div className={"page-container"}>
                <NavBarLeft />
                <div className={"file-view"}>
                    <FileQueryBar />
                </div>
            </div>
        </div>
    );
};

export default Home;