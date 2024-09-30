"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useGetSubjects } from '@/services/api/subjectApi';

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
              src={note.contentUrl}
              width="800px"
              height="500px"
              className="pdf-viewer m-auto"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <p>No PDF available</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Page