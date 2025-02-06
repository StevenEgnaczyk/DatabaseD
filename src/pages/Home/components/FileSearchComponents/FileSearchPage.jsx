import React, {useState, useEffect} from "react";
import {BsGrid, BsViewStacked} from "react-icons/bs";
import FileQueryBar from "./FileQueryBar";
import TableHeader from "./TableHeader";
import File from "./File";
import FileLine from "./FileLine";
import NoFilesFound from "./../NoFilesFound";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import './FileSearch.css'
const FileSearchPage = () => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const allFiles = [];
                const storage = getStorage();
                
                /* Get all files from the files collection */
                const filesRef = collection(db, 'files');
                const filesSnapshot = await getDocs(filesRef);
                
                /* Process each file */
                for (const doc of filesSnapshot.docs) {
                    const fileData = doc.data();
                    const filePath = "files/" + fileData.filePath;      
                    
                    /* Create a reference to the file in Storage - using the full path directly */
                    const fileRef = ref(storage, filePath);

                    try {
                        /* Get the download URL */
                        const downloadURL = await getDownloadURL(fileRef);
                        
                        allFiles.push({
                            name: fileData.fileName,
                            type: fileData.assignmentType,
                            professor: fileData.professorName,
                            className: fileData.className,
                            department: fileData.className.split(' ')[0],
                            year: new Date(fileData.uploadedAt.seconds * 1000).getFullYear(),
                            preview: downloadURL,
                            fileType: 'PDF'
                        });
                    } catch (urlError) {
                        console.error(`Error getting download URL for ${fileData.fileName}:`, urlError);
                        /* Still add the file even if we can't get the preview URL */
                        allFiles.push({
                            name: fileData.fileName,
                            type: fileData.assignmentType,
                            professor: fileData.professorName,
                            className: fileData.className,
                            department: fileData.className.split(' ')[0],
                            year: new Date(fileData.uploadedAt.seconds * 1000).getFullYear(),
                            preview: '',
                            fileType: 'PDF'
                        });
                    }
                }
                
                setFiles(allFiles);
                setFilteredFiles(allFiles);
            } catch (error) {
                console.error("Error fetching files: ", error);
            }
        };

        fetchFiles();
    }, []);

    const [filesPerPage, setFilesPerPage] = useState(8);
    const [filteredFiles, setFilteredFiles] = useState(files);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredFiles.length / filesPerPage)
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [isGridView, setGridView] = useState(true);

    const setFileView = () => {
        setGridView(!isGridView);
        isGridView ? setFilesPerPage(20) : setFilesPerPage(16);
    }

    return (
        <div>
            <div className="layout-buttons">
                <div className={`layout-toggle-icon ${isGridView ? 'grid' : 'list'}`} onClick={setFileView}>
                    <div className="icon-wrapper grid-icon">
                        <BsGrid className="icon" />
                    </div>
                    <div className="icon-wrapper list-icon">
                        <BsViewStacked className="icon" />
                    </div>
                </div>
            </div>

            <div className={"file-query"}>
                <FileQueryBar files={files} setFilteredFiles={setFilteredFiles} />
            </div>
            <div className={"file-display-container"}>
                <div className={`file-display ${isGridView ? 'grid-layout' : 'stacked-layout'}`}>

                    {!isGridView && currentFiles.length > 0 && <TableHeader />}

                    {currentFiles.length > 0 ? (
                        currentFiles.map((file, index) => (
                            isGridView ?
                                <File key={index} file={file} /> :
                                <div>
                                    <FileLine key={index} file={file} />
                                </div>
                        ))
                    ) : (
                        <NoFilesFound />
                    )}
                </div>
                {currentFiles.length > 0 && (
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default FileSearchPage;