"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb.js";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const { data: subjectData } = useGetSubjects(id);
  // console.log(subjectData);

  // const breadcrumbItems = [
  //   { label: "Home", link: "/" },
  //   { label: "University", link: "/university" },
  //   {
  //     label: subjectData?.university?.name,
  //     link: `/university/${subjectData?.university?._id}`,
  //   },
  //   { label: subjectData?.course?.name,
  //     link: `/course/${subjectData?.course?._id}`,
  //    }, // No link for the last item
  //    {
  //     label: subjectData?.subject?.name,
  //    }
  // ];

  return (
    <div className="mx-7">
      {/* <DynamicBreadcrumb items={breadcrumbItems}/> */}
      <h1 className="text-3xl mb-7 dark:text-white text-black">{subjectData?.name}</h1>

      <div>
        {subjectData?.subject?.syllabus.map((syllabus) => {
          return (
            <div key={syllabus._id} className="mb-5 dark:text-white text-black">
              <h2 className="text-2xl font-semibold mb-2 ">{syllabus.title}</h2>
              <hr />
              <div className="flex justify-between mb-2 font-semibold">
                {" "}
                <p>{syllabus.subtitle} </p> <p className="">{syllabus.hrs}</p>{" "}
              </div>
              <p className="text-sm text-[#888]">{syllabus.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
