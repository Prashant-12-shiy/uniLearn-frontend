"use client";
import { useGetUniversityById } from "@/services/api/universityApi";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/breadcrumb.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/BreadCrumb.js"

const page = () => {
  const params = useParams();
  const id = params.id;

  const { data: university, isLoading, error } = useGetUniversityById(id);

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'University', link: '/university' },
    { label: university?.name } // No link for the last item
  ];

  return (
    <div className="h-full mx-7 mb-32">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
           <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="my-10 border border-opacity-40 p-5 rounded-md border-[#888]">
            
            <div className="flex justify-between ">
              <h1 className="text-3xl">{university?.name}</h1>
              <div className="flex gap-10 items-center justify-center">
                <Image
                  src="/assets/Tribhuvan_University_logo.svg.png"
                  alt={university?.name}
                  width={40}
                  height={40}
                />
                <Link
                  className="hover:underline"
                  href={university?.website}
                  target="_blank"
                >
                  {university?.website}
                </Link>
              </div>
            </div>
            <p className="text-base text-[#888] mt-2">
              {university?.description}
            </p>
            <p className="mt-3">
              Course Offered: {university?.coursesOffered.length}
            </p>
          </div>

          <div>
            <h2 className="text-2xl">Courses</h2>

            <div className="grid grid-cols-2 gap-8">
              {university?.coursesOffered.map((course, index) => (
                <Link href={`/course/${course._id}`}   key={course._id} >
                <div
                
                  className="mt-5  border border-opacity-40 flex flex-col justify-between shadow-md shadow-slate-800 hover:-translate-y-1 transition-transform duration-300 p-5 rounded-md border-[#888]"
                >
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold ">{course?.shortName}</h3>
                    </div>

                    <div>
                    
                      <p>{course?.name}</p>
            
                    <p className="text-sm text-[#888] mt-2">
                      {course?.description}
                    </p>   
                    </div>
                   
                  </div>
                  <p className="mt-3 text-sm text-[#888]">
                    Total Semester: {course?.semesters.length}{" "}
                  </p>
                </div>
              </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
