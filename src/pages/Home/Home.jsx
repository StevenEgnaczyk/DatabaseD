
// src/Home.jsx
import React from 'react';
import "./Home.css"

function returnToLogin(){
    window.location.href = "./pages/Login.jsx";
}
const Home = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            <div>
                <button onClick={returnToLogin}>Log out</button>
            </div>
        </div>
    );
};

export default Home;