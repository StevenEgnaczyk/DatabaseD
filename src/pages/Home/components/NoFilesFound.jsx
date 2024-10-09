import React from "react";

import './NoFilesFound.css';


import { BsEmojiFrown } from "react-icons/bs";

const NoFilesFound = () => {
    return (
        <div className={"none-found-container"}>
            <h1>NO FILES FOUND</h1>
            <BsEmojiFrown className={"frown-svg"}/>
            <p>Try searching for something else</p>
        </div>
    )
}

export default NoFilesFound