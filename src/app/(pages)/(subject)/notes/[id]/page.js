"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useGetSubjects } from '@/services/api/subjectApi';
// const PdfViewer = dynamic(() => import('../../../../../components/PdfViewer.js'), { ssr: false });


const Page = () => {
  const params = useParams();
  const id = params.id;

  const { data: subjectData } = useGetSubjects(id);
  const notes = subjectData?.subject?.notes;
  
  console.log(notes);
  
  return (
    <div className='mx-7'>
      <h2>{subjectData?.subject?.name}</h2>

      {notes?.map((note)=> (
         <div key={note._id}> 
            <h2>{note?.title}</h2>

            {note?.contentUrl ? (
              <iframe
              src={`https://docs.google.com/viewer?url=${note.contentUrl}&embedded=true`}
              width="800px"
              height="500px"
              className="pdf-viewer m-auto max-md:w-[400px] max-sm:w-[300px] max-md:h-[300px  ]"
              style={{ border: "none" }}
            ></iframe>
            // <PdfViewer pdfUrl={note.contentUrl} />
          ) : (
            <p>No PDF available</p>
          )}
        </div>
      ))}
    </div>
  )
}


export default Page