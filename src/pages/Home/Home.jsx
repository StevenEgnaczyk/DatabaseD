import React, { useState } from 'react';

import "./Home.css"
import NavBar from './components/NavBar';
import NavBarLeft from './components/NavBarLeft';
import FileQueryBar from './components/FileQueryBar';
import File from './components/File';

const Home = ({user, setUser}) => {

    const [files] = useState([
        { name: 'CSE 2221 Study Guide', className: 'Math 101', year: '2021', fileType: 'PDF', professor: 'Dr. Smith', preview: './Anime.pdf' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2221 Study Guide', className: 'Math 101', year: '2021', fileType: 'PDF', professor: 'Dr. Smith', preview: './Anime.pdf' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' }
        // Add more file objects as needed
    ]);
    
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

    const handleFilesPerPageChange = (e) => {
        setFilesPerPage(Number(e.target.value)); 
        setCurrentPage(1); 
    };

    /*
    function toggleDropdown() {
        const dropdown = document.getElementById("dropdown-content");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      }
    */

    return (
        <div>
            <NavBar user={user}/>
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft />
                </div>
                <div className={"main-bar"}>
                    <div className={"file-query"}>
                        <FileQueryBar files={files} setFilteredFiles={setFilteredFiles} />
                    </div>

                    {/* Dropdown to select files per page */}
                    <div className="files-per-page-dropdown">
                        <label htmlFor="files-per-page">Files per page:</label>
                        <select id="files-per-page" value={filesPerPage} onChange={handleFilesPerPageChange}>
                        <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>

                    <div className={"file-display"}>
                    {currentFiles.length > 0 ? (
                            currentFiles.map((file, index) => (
                                <File key={index} file={file} />
                            ))
                        ) : (
                            <p>No files available.</p>
                        )}
                        
                    </div>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;