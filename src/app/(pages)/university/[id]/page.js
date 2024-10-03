"use client";
import { useGetUniversityById } from "@/services/api/universityApi";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb.js";


const Page = () => {
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
        <div className="w-full m-auto flex justify-center h-screen items-center">
        <LoaderCircle className="animate-spin w-32 h-32 dark:text-white text-black max-md:w-20 max-md:h-20" />
      </div>
      ) : (
        <>
           <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="my-10 border border-opacity-40 p-5 rounded-md border-[#888]">
            
            <div className="flex justify-between ">
              <h1 className="text-3xl max-sm:text-xl dark:text-white text-black">{university?.name}</h1>
              <div className="flex gap-10 max-sm:gap-2 items-center justify-center">
                <Image
                  src={university?.logo ? university.logo : "/assets/choice.png"}
                  alt={university?.name}
                  width={40}
                  height={40}
                  className="max-sm:w-6 max-sm:h-6"
                />
                <Link
                  className="hover:underline max-sm:text-sm dark:text-white text-black"
                  href={university?.website}
                  target="_blank"
                >
                  {university?.website}
                </Link>
              </div>
            </div>
            <p className="text-base dark:text-[#888] text-gray-600 mt-2">
              {university?.description}
            </p>
            <p className="mt-3 dark:text-white text-black">
              Course Offered: {university?.coursesOffered.length}
            </p>
          </div>

          <div>
            <h2 className="text-2xl dark:text-white text-black">Courses</h2>

            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              {university?.coursesOffered.map((course, index) => (
                <Link href={`/course/${course._id}`}   key={course._id} >
                <div
                
                  className="mt-5  border border-opacity-40 flex flex-col justify-between shadow-md shadow-slate-800 hover:-translate-y-1 transition-transform duration-300 h-[200px] max-md:h-[250px] max-sm:h-[200px] p-5 rounded-md border-[#888]"
                >
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold dark:text-white text-black">{course?.shortName}</h3>
                    </div>

                    <div>
                    
                      <p className="dark:text-white text-black">{course?.name}</p>
            
                    <p className="text-sm dark:text-[#888] text-gray-600 mt-2">
                      {course?.description}
                    </p>   
                    </div>
                   
                  </div>
                  <p className="mt-3 text-sm dark:text-[#888] text-gray-600">
                    Total Duration: {course?.duration} {"years"}
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

export default Page;
