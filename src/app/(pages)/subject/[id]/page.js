"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetSubjects } from '@/services/api/subjectApi'

const page = () => {
    const params = useParams();
    const id = params.id;

    const {data: subjectData} = useGetSubjects(id); 
    console.log(subjectData);
    
  return (
    <div className='mx-7'>
        <h1 className='text-3xl mb-7'>{subjectData?.name}</h1>

        
    </div>
  )
}

export default page