
// src/Home.jsx
import React from 'react';
import "./Home.css"
import NavBar from './../../components/Home/NavBar';
import NavBarLeft from './../../components/Home/NavBarLeft';
import FileQueryBar from './../../components/Home/FileQueryBar';
import File from './../../components/Home/File';


const Home = ({ user }) => {
    return (
        <div>
            <NavBar />
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft />
                </div>
                <div className={"main-bar"}>
                    <div className={"file-query"}>
                        <FileQueryBar />
                    </div>
                    <div className={"file-display"}>
                        <File />
                        <File />
                        <File />
                        <File />
                        <File />
                        <File />
                        <File />

                        {/* This is where the files will be displayed. Eventually
                        We'll want the files to be queried from the database. But
                        I'm adding a bunch of fake ones here for testing purposes*/}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;