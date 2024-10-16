/* NavBar.jsx imports */
import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import './NavBarLeft.css';

import { BsPlusLg } from "react-icons/bs";

import { BsFileEarmarkCheckFill } from "react-icons/bs";

import { BsFillFileEarmarkLockFill } from "react-icons/bs";

import { BsFillHouseFill } from "react-icons/bs";



/* Component for the left navigation bar */
const NavBarLeft = ({ showFileSearch, showSavedFiles}) => {

    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

    /* Toggle the file upload modal */
    const swapFileUploadState = () => {
        setIsFileUploadOpen(!isFileUploadOpen);
    }

    /* Display user's files */
    function displayUsersFiles() {
    }

    /* Render the left navigation bar */
    return(
        <nav className="navbarleft">
            <div className={"file-upload button"} onClick={swapFileUploadState}>
                <BsPlusLg className={"upload-svg"} />
                <p>Upload File</p>
            </div>
            {isFileUploadOpen && <FileUpload onClose={swapFileUploadState} />}

            <div className={"line"}></div>

            <div className={"file-filters"}>
                <div className={"home button"} onClick={showFileSearch}>
                    <BsFillHouseFill className={"home-svg"} />
                    <p>Home</p>
                </div>
                <div className={"saved-files button"} onClick={showSavedFiles}>
                    <BsFileEarmarkCheckFill className={"saved-svg"}/>
                    <p>Saved Files</p>
                </div>

                <div className={"users-files button"} onClick={displayUsersFiles}>
                    <BsFillFileEarmarkLockFill className={"user-svg"}/>
                    <p>Your Files</p>
                </div>
            </div>

            <div className={"line"}></div>

            <span className={"span-rest"}></span>
        </nav>
    )

}
export default NavBarLeft;