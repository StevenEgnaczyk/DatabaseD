/* File.jsx Imports */
import React, {useState} from 'react';
import './FileLine.css';

import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";


const File = ({ file }) => {

    const [isSaved, setIsSaved] = useState(false);

    const updateSavedState = () => {
        setIsSaved(!isSaved);
    }

    return (
        <div className={"file-line"}>
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
    );
};
export default File;
