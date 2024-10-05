/* File.jsx Imports */
import React from 'react';
import './File.css';

/* Component for individual files
    file - object containing file information */
const File = ({ file }) => {
    return (

        <div className="file-card">
            <h1>{file.name}</h1>
            
            {/* PDF Preview */}
            <iframe 
                src={'../.' + file.preview}
                className="pdf-preview" 
                title="PDF Preview" 
                width="100%" 
                height="400px">
            </iframe>
            
            {/* File Information */}
            <h3>{file.className}</h3>
            {file.year && <p>Year: {file.year}</p>}
            {file.fileType && <p>Type: {file.fileType}</p>}
            {file.professor && <p>Professor: {file.professor}</p>}
        </div>
    );
};
export default File;