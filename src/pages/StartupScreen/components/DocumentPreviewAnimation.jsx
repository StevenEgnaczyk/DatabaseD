import React from "react";
import './DocumentPreviewAnimation.css';

import { Worker, Viewer, ScrollMode } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PageViewer = ({ rowClass }) => (
    <div className={`page ${rowClass}`}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
                scrollMode={ScrollMode.Page}
                fileUrl="./Anime.pdf"
            />
        </Worker>
    </div>
);

function DocumentPreviewAnimation() {
    const rows = [
        'row-one', 'row-two', 'row-one', 'row-two', 'row-one',
        'row-two', 'row-one', 'row-two', 'row-one', 'row-two',
        'row-one', 'row-two', 'row-one', 'row-two', 'row-one',
        'row-two', 'row-one', 'row-two', 'row-one', 'row-two'
    ];

    return (
        <div className="document-animation-container">
            {rows.map((rowClass, index) => (
                <PageViewer key={index} rowClass={rowClass} />
            ))}
        </div>
    );
}

export default DocumentPreviewAnimation;
