"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCourse } from "@/services/api/courseApi";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/breadcrumb";

const page = () => {
  const params = useParams();
  const id = params.id;
  const { data: courseData } = useGetCourse(id);

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'University', link: '/university' },
    { label: courseData?.university?.name, link: `/university/${courseData?.university?._id}` },
    { label: courseData?.name } // No link for the last item
  ];

  return (
    <div className="mx-7 m-auto h-[100vh] py-10 pt-2">
         <DynamicBreadcrumb items={breadcrumbItems} />
      <h1 className="mt-5 text-4xl font-bold">{courseData?.name}</h1>
      <p className=" text-[#888] mt-2">{courseData?.description}</p>

      <div className="grid grid-cols-2 gap-10 mt-10">
        {courseData?.semesters?.map((semester) => (
          <div
            key={semester._id}
            className="border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 rounded-lg"
          >
            <p className="text-xl font-semibold mb-3">
              Semester: {semester.semesterNumber}
            </p>
            <hr className="mb-4" />

            {semester?.subjects?.map((subject) => (
              <Link
                key={subject._id}
                href={`/subject/${subject._id}`}
                className="block mb-2 hover:text-[#76c6e9] transition-colors duration-200 ease-in-out"
              >
                {subject.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
