/* FileUpload.jsx Imports */
import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";

import './FileUpload.css';
import './FileSearchComponents/FileQueryBar.css';
import { toast } from 'react-toastify';

import AssignmentTypeDropdown from './Dropdowns/AssignmentType';
import ClassNameDropdown from './Dropdowns/ClassName';
import ProfessorNameDropdown from './Dropdowns/ProfessorName';
import SemesterDropdown from './Dropdowns/Semester';

import { BsXCircle } from "react-icons/bs";

/* Component for uploading files 
    onClose - function to close the file upload modal */
const FileUpload = ({ onClose }) => {

    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [filePreview, setFilePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    /* Open file dialog when button is clicked */
    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };
    
    /* Display file preview when file is selected */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFilePreview({ path: fileURL });
            setFileName(file.name);
            setFile(file);
        }
    }

    /* Handle File upload */
    const handleSubmit = () => {
        if (!file) {
            toast.error("Please select a file to upload");
            console.log("No file selected for upload.");
            return;
        }

        console.log("Starting file upload for:", file.name);

        const storageRef = ref(storage, `files/${file.name}`); 
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log(`Upload is ${progress}% done`);
        }, (error) => {
            toast.error("Error uploading file");
            console.error("Upload error:", error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File uploaded successfully. Download URL:", downloadURL);
                toast.success("File uploaded successfully!");
            }).catch((error) => {
                console.error("Error getting download URL:", error);
            });
        });
    }

    /* Render the file upload modal */
    return (
        <div className="lightbox">
            <div className="lightbox-content">

                <div className="upload-header">
                    <h2>Upload a file</h2>
                    <BsXCircle onClick={onClose}/>
                </div>

                <div className="file-attributes">
                    <form onSubmit={handleSubmit}>
                        <div className="file-selector">
                            <button
                                onClick={handleButtonClick}
                                className="choose-file-button"
                            >
                                Choose File
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            <p className="file-name">
                                {fileName ? fileName : "File name"}
                            </p>
                        </div>
                        
                        <div className="filter-input">
                            <ClassNameDropdown />
                            <ProfessorNameDropdown />
                            <SemesterDropdown />
                            <AssignmentTypeDropdown />
                        </div>

                        <div className="file-preview">
                            {filePreview ? (
                                <iframe
                                    src={filePreview.path}
                                    className="pdf-preview-2"
                                    title="PDF Preview"
                                    width="100%"
                                    >
                                </iframe>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {filePreview ? (
                            <button className="submit-button" type="submit">Submit</button>
                        ) : (
                            <p></p>
                        )}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default FileUpload;