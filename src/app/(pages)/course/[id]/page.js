"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCourse } from "@/services/api/courseApi";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb.js";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const { data: courseData } = useGetCourse(id);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "University", link: "/university" },
    {
      label: courseData?.university?.name,
      link: `/university/${courseData?.university?._id}`,
    },
    { label: courseData?.name }, // No link for the last item
  ];

  const router = useRouter(); // Initialize the router

  // Function to handle redirects
  const handleNavigation = (subjectId, path) => {
    router.push(`/${path}/${subjectId}`);
  };

  return (
    <div className="mx-7 m-auto h-[100vh] py-10 pt-2">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <h1 className="mt-5 text-4xl font-bold max-sm:text-2xl dark:text-white text-black">{courseData?.name}</h1>
      <p className=" dark:text-[#888] text-gray-600 mt-2 max-sm:text-sm">{courseData?.description}</p>

      <div className="grid grid-cols-2 gap-10 mt-10 max-sm:gap-4 max-sm:grid-cols-1">
        {courseData?.semesters?.map((semester) => (
          <div
            key={semester._id} 
            className="border border-gray-300 border-opacity-70 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 rounded-lg"
          >
            <p className="text-xl font-semibold mb-3 max-sm:text-lg dark:text-white text-black">
              Semester: {semester.semesterNumber}
            </p>
            <hr className="mb-4" />

            {semester?.subjects?.map((subject) => (
              <Dialog key={subject._id}>
                <DialogTrigger asChild>
                  <p className="block max-sm:text-sm mb-2 hover:text-[#76c6e9] transition-colors duration-200 ease-in-out hover:cursor-pointer dark:text-white text-black">
                    {subject.name}
                  </p>
                </DialogTrigger>

                <DialogContent className="dark:bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center max-sm:rounded-md  max-sm:w-[80vw] ">
                  <div className=" p-6 rounded-lg shadow-lg w-full max-w-md ">
                    <DialogHeader className="text-white text-lg font-semibold mb-4">
                      Choose
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-slate-400 transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "syllabus")
                        }
                      >
                        Syllabus
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-slate-400 transition duration-200"
                        onClick={() => handleNavigation(subject._id, "notes")}
                      >
                        Notes
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-slate-400 transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "past-question")
                        }
                      >
                        Past Questions
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-slate-400 transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "projects")
                        }
                      >
                        Projects
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
