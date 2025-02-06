import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../config/userContext';
import "./Home.css"

import NavBar from './components/NavBar';
import FileSearchPage from "./components/FileSearchComponents/FileSearchPage";
import NavBarLeft from "./components/NavBarLeft";
import SavedFilesPage from "./components/SavedFilesComponents/SavedFilesPage";

const Home = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeScreen, setActiveScreen] = useState('FileSearchPage');

    useEffect(() => {
        if (user === null && !isLoading) {
            navigate('/');
        } else if (user) {
            setIsLoading(false);
        }
    }, [user, navigate, isLoading]);

    const showFileSearch = () => setActiveScreen('FileSearchPage');
    const showSavedFiles = () => setActiveScreen('SavedFilesPage.jsx');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"full-screen"}>
            <NavBar />
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft showFileSearch={showFileSearch} showSavedFiles={showSavedFiles}/>
                </div>
                <div className={"main-bar"}>
                    {activeScreen === 'FileSearchPage' && <FileSearchPage />}
                    {activeScreen === 'SavedFilesPage.jsx' && <SavedFilesPage />}
                </div>
            </div>
        </div>
    );
};

export default Home;