import React, { useState } from 'react';
import "./Home.css"
import NavBar from './../../components/Home/NavBar';
import NavBarLeft from './../../components/Home/NavBarLeft';
import FileQueryBar from './../../components/Home/FileQueryBar';
import File from './../../components/Home/File';

const Home = ({ user }) => {
    const [files] = useState([
        { name: 'CSE 2221 Study Guide', className: 'Math 101', year: '2021', fileType: 'PDF', professor: 'Dr. Smith', preview: './Anime.pdf' },
        { name: 'CSE 2222 Assignment', className: 'Math 102', year: '2022', fileType: 'DOCX', professor: 'Dr. Johnson', preview: './Assignment.docx' },
        // Add more file objects as needed
    ]);
    
    const [filteredFiles, setFilteredFiles] = useState(files); // Initialize with full files

    return (
        <div>
            <NavBar />
            <div className={"page-container"}>
                <div className={"side-bar"}>
                    <NavBarLeft />
                </div>
                <div className={"main-bar"}>
                    <div className={"file-query"}>
                        <FileQueryBar files={files} setFilteredFiles={setFilteredFiles} />
                    </div>
                    <div className={"file-display"}>
                        {filteredFiles.map((file, index) => (
                            <File key={index} file={file} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;