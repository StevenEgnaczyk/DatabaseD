/* FileUpload.jsx Imports */
import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { db } from "../../../config/firebase";
import { collection, addDoc, updateDoc, increment, doc, getDocs } from "firebase/firestore";
import { useUser } from "../../../config/userContext";
import { query, where } from 'firebase/firestore';

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

    const user = useUser();

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
    const handleSubmit = async (event) => {
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

        // Upload file to Firebase Storage and Firestore
        try {

            const [department, courseID] = selectedClassName.split(" ");

            // Query Firestore to get the professor document by name
            const professorQuery = query(collection(db, "professors"), where("name", "==", selectedProfessorName));
            const professorSnapshot = await getDocs(professorQuery);
            if (professorSnapshot.empty) {
                throw new Error("Professor not found");
            }
            const professorDoc = professorSnapshot.docs[0];
            const professorId = professorDoc.id;

            // Query Firestore to get the assignment type document by name
            const assignmentTypeQuery = query(collection(db, "assignment_types"), where("type", "==", selectedAssignmentType));
            const assignmentTypeSnapshot = await getDocs(assignmentTypeQuery);
            if (assignmentTypeSnapshot.empty) {
                throw new Error("Assignment type not found");
            }
            const assignmentTypeDoc = assignmentTypeSnapshot.docs[0];
            const assignmentTypeId = assignmentTypeDoc.id;

            // Query Firestore to get the semester document by name
            const semesterQuery = query(collection(db, "semesters"), where("semester", "==", selectedSemester));
            const semesterSnapshot = await getDocs(semesterQuery);
            if (semesterSnapshot.empty) {
                throw new Error("Semester not found");
            }
            const semesterDoc = semesterSnapshot.docs[0];
            const semesterId = semesterDoc.id;

            // Query Firestore to get the class name document by name   
            const classNameQuery = query(collection(db, "class_names"), where("department", "==", department), where("course_number", "==", courseID));
            const classNameSnapshot = await getDocs(classNameQuery);
            if (classNameSnapshot.empty) {
                throw new Error("Class name not found");
            }
            const classNameDoc = classNameSnapshot.docs[0];
            const classNameId = classNameDoc.id;

            const uniqueFileName = `${file.name}`;
            const filePath = `${department}/${courseID}/${selectedProfessorName}/${selectedAssignmentType}/${uniqueFileName}`;

            const storageRef = ref(storage, `files/${filePath}`); 
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            }, (error) => {
                toast.error("Error uploading file");
                console.error("Upload error:", error);
            }, async () => {
                try {

                    // Add file reference to Firestore
                    await addDoc(collection(db, "files"), {
                        fileName: uniqueFileName,
                        filePath: filePath,
                        className: selectedClassName,
                        professorName: selectedProfessorName,
                        semester: selectedSemester,
                        assignmentType: selectedAssignmentType,
                        uploadedBy: user.fullName,
                        uploadedAt: new Date(),
                        professorId,
                        assignmentTypeId,
                        semesterId,
                        classNameId
                    });

                    // Update "documents for" property
                    await updateDoc(doc(db, "professors", professorId), {
                        documents_for: increment(1)
                    });
                    await updateDoc(doc(db, "assignment_types", assignmentTypeId), {
                        documents_for: increment(1)
                    });
                    await updateDoc(doc(db, "semesters", semesterId), {
                        documents_for: increment(1)
                    });
                    await updateDoc(doc(db, "class_names", classNameId), {
                        documents_for: increment(1)
                    });
                    toast.success("File uploaded and reference added to Firestore successfully!");
                } catch (error) {
                    toast.error("Error updating documents count: " + error);
                }
            });
        } catch (error) {
            console.error("Error getting document:", error);
            toast.error("Error getting professor document");
        }

        setFile(null);
        setFilePreview(null);
        setFileName("");
        onClose();
        fileInputRef.current.value = "";
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