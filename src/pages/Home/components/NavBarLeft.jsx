/* NavBar.jsx imports */
import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import './NavBarLeft.css';

/* Component for the left navigation bar */
const NavBarLeft = () => {

    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

    /* Toggle the file upload modal */
    const swapFileUploadState = () => {
        setIsFileUploadOpen(!isFileUploadOpen);
    }

    /* Display saved files */
    function displaySavedFiles() {
    }

    /* Display user's files */
    function displayUsersFiles() {
    }

    /* Render the left navigation bar */
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