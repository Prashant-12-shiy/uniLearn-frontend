"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const params = useParams();
  const id = params.id;

  const { data: subjectData, isLoading } = useGetSubjects(id);
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
 toast.warn("Please Refresh Few Times if Pdf is not Loading");

  return (
    <div className="mx-7">
      {/* <DynamicBreadcrumb items={breadcrumbItems}/> */}
      <h1 className="text-3xl mb-7 dark:text-white text-black">{subjectData?.subject?.name}</h1>

      <div>
      {subjectData?.subject?.syllabus ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${subjectData?.subject?.syllabus}&embedded=true`}
              width="800px"
              height="900px"
              className="pdf-viewer m-auto max-md:w-[400px] max-sm:w-[300px] max-md:h-[430px]"
              style={{ border: "none" }}
            >
              <Link
                href={subjectData?.subject?.syllabus}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </Link>
            </iframe>
          ) : (
            <p>Loading PDF...</p>
          )}
      </div>
      <ToastContainer
  className="max-md:text-sm w-full  max-md:w-[50vw]"
  position="bottom-left"
  autoClose={3000}
  limit={1}
/>
    </div>
  );
};

export default Page;
