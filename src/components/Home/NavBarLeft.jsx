import React from 'react';
import './NavBarLeft.css';

const NavBarLeft = () => {

    function openFileUpload() {
        //Open the file upload page on this click
    }

    function displaySavedFiles() {
        //Displays the users saved files.
    }

    function displayUsersFiles() {
        //Displays the users files in the main screen?
    }

    return(
        <nav className="navbarleft">
            <button className={"file-upload-button"} onClick={openFileUpload}>
                Upload File +
            </button>
            <div className={"file-filters"}>
                <button className={"saved-files-button"} onClick={displaySavedFiles}>
                    Saved Files
                </button>

                <button className={"users-files-button"} onClick={displayUsersFiles}>
                    Your Files
                </button>
            </div>

            <span className={"span-rest"}></span>


        </nav>
    )

}

export default NavBarLeft;