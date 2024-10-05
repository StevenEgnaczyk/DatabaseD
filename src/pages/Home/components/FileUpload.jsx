/* FileUpload.jsx Imports */
import React, { useRef, useState } from "react";
import './FileUpload.css';
import './FileQueryBar.css';

/* Component for uploading files 
    onClose - function to close the file upload modal */
const FileUpload = ({ onClose }) => {

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
        }
    }

    /* Handle File upload */
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    /* Render the file upload modal */
    return (
        <div className="lightbox">
            <div className="lightbox-content">

                <div className="upload-header">
                    <h2>Upload a file</h2>
                    <button className="close-button" onClick={onClose}> X </button>
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
                        
                        <div className="filter-dropdowns">
                            <button type="button">Class</button>
                            <button type="button">Professor</button>
                            <button type="button">Year</button>
                            <button type="button">Assignment</button>
                            <button type="button">File Type</button>
                        </div>

                        <div className="file-preview">
                            {filePreview ? (
                                <iframe
                                    src={filePreview.path}
                                    className="pdf-preview"
                                    title="PDF Preview"
                                    width="100%"
                                    height="500px">
                                </iframe>
                            ) : (
                                <p>No file selected</p>
                            )}
                        </div>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FileUpload;