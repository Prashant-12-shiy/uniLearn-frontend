// // components/PdfViewer.js
// import { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Set the workerSrc for pdfjs
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

// const PdfViewer = ({ pdfUrl }) => {
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div>
//             <Document
//                 file={pdfUrl}
//                 onLoadSuccess={onDocumentLoadSuccess}
//             >
//                 <Page pageNumber={pageNumber} />
//             </Document>
//             <div>
//                 <p>
//                     Page {pageNumber} of {numPages}
//                 </p>
//                 <button
//                     disabled={pageNumber <= 1}
//                     onClick={() => setPageNumber(pageNumber - 1)}
//                 >
//                     Previous
//                 </button>
//                 <button
//                     disabled={pageNumber >= numPages}
//                     onClick={() => setPageNumber(pageNumber + 1)}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PdfViewer;
