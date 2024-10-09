/* File.jsx Imports */
import React, {useState} from 'react';
import './File.css';

import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";


const File = ({ file }) => {

    const [isSaved, setIsSaved] = useState(false);

    const updateSavedState = () => {
        setIsSaved(!isSaved);
    }

    return (

        <div className="file-card">
            <div className={"top-row"}>
                <h1>{file.name}</h1>
                {isSaved ? (<BsBookmarkFill className={"bookmark-svg"} onClick={updateSavedState}/>
                ) : (
                    <BsBookmarkPlus className={"bookmark-svg"} onClick={updateSavedState}/>
                )}
            </div>

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
