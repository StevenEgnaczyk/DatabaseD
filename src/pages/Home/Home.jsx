import React, { useState } from 'react';

import "./Home.css"
import NavBar from './components/NavBar';
import NavBarLeft from './components/NavBarLeft';
import FileQueryBar from './components/FileQueryBar';
import File from './components/File';

const Home = ({ user }) => {
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
    
    const [filteredFiles, setFilteredFiles] = useState(files); 
    const [currentPage, setCurrentPage] = useState(1); 

    const filesPerPage = 8; //how many files do we want

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

    return (
        <div className={"full-screen"}>
            <NavBar />
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft />
                </div>
                <div className={"main-bar"}>
                    <div className={"file-query"}>
                        <FileQueryBar files={files} setFilteredFiles={setFilteredFiles} />
                    </div>
                    <div className={"file-display-container"}>
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
        </div>
    );
};

export default Home;