import React, { useState } from 'react';

import "./Home.css"
import NavBar from './components/NavBar';
import FileSearchPage from "./components/FileSearchComponents/FileSearchPage";
import NavBarLeft from "./components/NavBarLeft";
import SavedFilesPage from "./components/SavedFilesComponents/SavedFilesPage";


const Home = ({ user }) => {

    const [activeScreen, setActiveScreen] = useState('FileSearchPage')

    const showFileSearch = () => setActiveScreen('FileSearchPage')
    const showSavedFiles = () => setActiveScreen('SavedFilesPage.jsx')


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