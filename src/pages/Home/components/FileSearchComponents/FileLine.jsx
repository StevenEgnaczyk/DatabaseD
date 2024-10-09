/* File.jsx Imports */
import React, {useState} from 'react';
import './FileLine.css';

import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";


const File = ({ file }) => {

    const [isSaved, setIsSaved] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const updateSavedState = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    }

    const openFile = () => {
        setIsOpen(!isOpen);
    }

    return (

        isOpen ? (
            <div className={"lightbox"} onClick={openFile}>
                <div className={`opened-file`}>
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
                    >
                    </iframe>

                    {/* File Information */}
                    <div className={"pdf-info"}>
                        <div className={"left-info"}>
                            <h3>{file.className}</h3>
                            {file.professor && <p>{file.professor}</p>}
                        </div>
                        <div className={"right-info"}>
                            {file.year && <p>{file.year}</p>}
                            {file.fileType && <p>{file.fileType}</p>}
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className={"file-line"} onClick={openFile}>
                    <div className={"left-section"}>
                        {isSaved ? (<BsBookmarkFill className={"bookmark-svg"} onClick={updateSavedState}/>
                        ) : (
                            <BsBookmarkPlus className={"bookmark-svg"} onClick={updateSavedState}/>
                        )}
                        <h3> {file.name}</h3>
                    </div>

                    <div className="right-section">
                        {file.year && <span className="info-item">Year: {file.year}</span>}
                        {file.fileType && <span className="info-item">Type: {file.fileType}</span>}
                        {file.professor && <span className="info-item">Professor: {file.professor}</span>}
                    </div>
                </div>
        )
    );
};
export default File;
