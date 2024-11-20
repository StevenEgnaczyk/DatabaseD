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

    const [filePreview, setFilePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    // State for dropdown selections
    const [selectedClassName, setSelectedClassName] = useState("");
    const [selectedProfessorName, setSelectedProfessorName] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedAssignmentType, setSelectedAssignmentType] = useState("");

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
    const handleSubmit = (event) => {
        event.preventDefault();

        // Collect unselected dropdowns
        const unselectedDropdowns = [];
        if (!selectedClassName) unselectedDropdowns.push("Class Name");
        if (!selectedProfessorName) unselectedDropdowns.push("Professor Name");
        if (!selectedSemester) unselectedDropdowns.push("Semester");
        if (!selectedAssignmentType) unselectedDropdowns.push("Assignment Type");

        // Validate dropdown selections
        if (unselectedDropdowns.length > 0) {
            toast.error(`All options not selected: ${unselectedDropdowns.join(",")}`);
            return;
        }

        // Validate file selection
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        const uniqueFileName = `${file.name}`;
        const filePath = `${selectedClassName}/${selectedProfessorName}/${selectedAssignmentType}/${uniqueFileName}`;

        const storageRef = ref(storage, `files/${filePath}`); 
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        }, (error) => {
            toast.error("Error uploading file");
            console.error("Upload error:", error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(() => {

                toast.success("File uploaded successfully!");
                setFile(null);
                setFilePreview(null);
                setFileName("");
                onClose();

                fileInputRef.current.value = "";
            }).catch((error) => {
                console.error("Error getting download URL:", error);
                toast.error("Error retrieving download URL");
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
                            <ClassNameDropdown 
                                selectedClassName={selectedClassName} 
                                setSelectedClassName={setSelectedClassName} 
                            />
                            <ProfessorNameDropdown 
                                selectedProfessorName={selectedProfessorName} 
                                setSelectedProfessorName={setSelectedProfessorName} 
                            />
                            <SemesterDropdown 
                                selectedSemester={selectedSemester} 
                                setSelectedSemester={setSelectedSemester} 
                            />
                            <AssignmentTypeDropdown 
                                selectedAssignmentType={selectedAssignmentType} 
                                setSelectedAssignmentType={setSelectedAssignmentType} 
                            />
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