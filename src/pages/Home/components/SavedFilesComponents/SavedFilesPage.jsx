import React, {useState} from "react";
import SmallFileQueryBar from "./SmallFileQueryBar";
import './SavedFiles.css'
import File from "../FileSearchComponents/File";
import TableHeader from "../FileSearchComponents/TableHeader";
import FileLine from "../FileSearchComponents/FileLine";
import NoFilesFound from "../NoFilesFound";
import {BsGrid, BsViewStacked} from "react-icons/bs";

const SavedFilesPage = () => {

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
        <div className={"saved-page"}>

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
            <SmallFileQueryBar/>
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
    );
}

export default SavedFilesPage