// // components/PdfViewer.js
// "use client"
// import React from 'react';
// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

// const PdfViewer = ({ pdfUrl }) => {

//     pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


//     const [numPages, setNumPages] = React.useState(null);
//     const [loading, setLoading] = React.useState(true);
//     const [zoom, setZoom] = React.useState(1)

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//         setLoading(false); // Set loading to false when the document has loaded
//     }

//     const zoomIn = () => {
//         setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom level 2
//     };

//     const zoomOut = () => {
//         setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level 0.5
//     };

//   return (
//     <div className="pdfViewer">
//     <div className="pdfContainer">
//     {loading && <div className="loading">Loading...</div>} {/* Display loading message */}
//     <div className="zoomControls sticky">
//                     <button onClick={zoomOut}>-</button>
//                     <span>Zoom: {Math.round(zoom * 100)}%</span>
//                     <button onClick={zoomIn}>+</button>
//                 </div>
//         <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="pdfDocument">
//             {Array.from(new Array(numPages), (el, index) => (
//                <div className="pageContainer" key={`page_${index + 1}`}>
//                <Page 
//                    pageNumber={index + 1} 
//                    className="pdfPage w-full max-md:w-[400px] max-sm:w-[300px]" 
//                    scale={zoom} 
                   
//                />
//                <div className="pageNumber">Page {index + 1} of {numPages}</div> {/* Display page number */}
//            </div>
//             ))}
//         </Document>
//     </div>
// </div>
//   );
// };

// export default PdfViewer;
