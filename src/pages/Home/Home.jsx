import React, { useState } from 'react';

import "./Home.css"
import NavBar from './components/NavBar';
import NavBarLeft from './components/NavBarLeft';
import FileQueryBar from './components/FileQueryBar';
import File from './components/File';

import { BsGrid } from "react-icons/bs";
import { BsViewStacked } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import FileLine from "./components/FileLine";
import TableHeader from "./components/TableHeader";
import NoFilesFound from "./components/NoFilesFound";

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
        { name: 'CSE 2221 Study Guide', className: 'Math 101', year: '2021', fileType: 'PDF', professor: 'Dr. Smith', preview: './Anime.pdf' },
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

    const [layoutButtonsOpen, setButtonsOpen] = useState(false);
    const [isGridView, setGridView] = useState(true);

    const showLayoutButtons = () => {
        setButtonsOpen(!layoutButtonsOpen);
    }

    const setFileView = () => {
        setGridView(!isGridView);
        isGridView ? setFilesPerPage(20) : setFilesPerPage(16);
    }

    return (
        <div className={"full-screen"}>
            <NavBar />
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft />
                </div>
                <div className={"main-bar"}>

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
                        {/* Dropdown to select files per page */}
                        {/*<div className="files-per-page-dropdown">*/}
                        {/*    <label htmlFor="files-per-page">Files per page:</label>*/}
                        {/*    <select id="files-per-page" value={filesPerPage} onChange={handleFilesPerPageChange}>*/}
                        {/*        <option value="4">4</option>*/}
                        {/*        <option value="6">6</option>*/}
                        {/*        <option value="8">8</option>*/}
                        {/*        <option value="12">12</option>*/}
                        {/*        <option value="16">16</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"file-display-container"}>
                        <div className={`file-display ${isGridView ? 'grid-layout' : 'stacked-layout'}`}>

                            {!isGridView && <TableHeader />}

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
                        {currentFiles.length > 0 ? (
                            <div className="pagination">
                                <button onClick={prevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span> Page {currentPage} of {totalPages} </span>
                                <button onClick={nextPage} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        ) : (
                            <span/>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;