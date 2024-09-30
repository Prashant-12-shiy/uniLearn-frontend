'use client';
import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core'; 
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ fileUrl }) => {
    const toolbarPluginInstance = toolbarPlugin();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    return (
        <div style={{ height: '800px', width: '100%' }}>
            {/* Set up the worker for loading PDFs */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js`}>
                {/* Render the PDF */}
                <Viewer fileUrl={fileUrl} 
                        plugins={[toolbarPluginInstance, defaultLayoutPluginInstance]} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
