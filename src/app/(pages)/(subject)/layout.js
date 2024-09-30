"use client"
import React from 'react'
import { useGetSubjects } from '@/services/api/subjectApi';
import { useParams } from "next/navigation"
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';

const Layout = ({children}) => {
    const params = useParams();
    const id = params.id;
  

    const { data: subjectData } = useGetSubjects(id);

    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "University", link: "/university" },
        {
          label: subjectData?.university?.name,
          link: `/university/${subjectData?.university?._id}`,
        },
        { label: subjectData?.course?.name,
          link: `/course/${subjectData?.course?._id}`,
         }, // No link for the last item
         {
          label: subjectData?.subject?.name,
         }
      ];

  return (
    <div className='mx-6'>  
      <DynamicBreadcrumb items={breadcrumbItems}/>
      {children}
      </div>
  )
}

export default Layout