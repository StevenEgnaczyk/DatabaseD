import React, {useState} from 'react';
import './NavBarLeft.css';
import FileUpload from "./FileUpload";

const NavBarLeft = () => {
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

    const swapFileUploadState = () => {
        setIsFileUploadOpen(!isFileUploadOpen);
    }

    function displaySavedFiles() {
        //Displays the users saved files.
    }

    function displayUsersFiles() {
        //Displays the users files in the main screen?
    }

    return(
        <nav className="navbarleft">
            <button className={"file-upload-button"} onClick={swapFileUploadState}>
                Upload File +
            </button>
            {isFileUploadOpen && <FileUpload onClose={swapFileUploadState} />}

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