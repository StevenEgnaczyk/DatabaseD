import React from "react";
import {BsBookmarkFill, BsBookmarkPlus} from "react-icons/bs";

const TableHeader = () => {

    return (
        <div className={"file-line"}>
            <div className={"left-section"}>
                <BsBookmarkFill className={"bookmark-svg"}/>
                <h3>Name</h3>
            </div>
            <div className="right-section">
                <span className="info-item">Year</span>
                <span className="info-item">Type</span>
                <span className="info-item">Professor</span>
            </div>
        </div>
    )

}

export default TableHeader;