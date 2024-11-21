"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCourse } from "@/services/api/courseApi";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb.js";
import { Button } from "@/components/ui/Button";
import { LoaderCircle } from "lucide-react";
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
  const { data: courseData, isLoading } = useGetCourse(id);

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
    <div className="mx-7 m-auto h-full py-10 pt-2">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <h1 className="mt-5 text-4xl font-bold max-sm:text-2xl dark:text-white text-black">
        {courseData?.name}
      </h1>
      <p className=" dark:text-[#888] text-gray-600 mt-2 max-sm:text-sm">
        {courseData?.description}
      </p>

      {isLoading ? (
            <div className="w-full m-auto flex justify-center h-screen items-center">
            <LoaderCircle className="animate-spin w-32 h-32 dark:text-white text-black max-md:w-20 max-md:h-20" />
          </div>
      ) :  (
        <div className="grid grid-cols-2 gap-10 mt-10 max-sm:gap-4 max-sm:grid-cols-1">
        {courseData?.semesters?.map((semester) => (
          <div
            key={semester._id}
            className="border border-gray-300 border-opacity-70 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 rounded-lg"
          >
            <p className="text-xl font-semibold mb-3 max-sm:text-lg dark:text-white text-black">
              {semester.semesterNumber < 6 ? (
                <>Year: {semester.semesterNumber} </>
              ) : (
                <>Semester: {semester.semesterNumber} </>
              )}
            </p>
            <hr className="mb-4" />

            {semester?.subjects?.map((subject) => (
              <Dialog key={subject._id}>
                <DialogTrigger asChild >
                  <div className="flex gap-5 pl-2 items-center mb-2 dark:text-white text-black transition-colors duration-200 ease-in-out *:hover:text-[#4d70ca] hover:cursor-pointer">
                  <p>{subject?.code}</p>
                  <p className="block max-sm:text-sm">
                    {subject.name}
                  </p>
                  </div>
                  
                </DialogTrigger>

                <DialogContent className="dark:bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center max-sm:rounded-md  max-sm:w-[80vw] ">
                  <div className=" p-6 rounded-lg shadow-lg w-full max-w-md ">
                    <DialogHeader className="text-white text-lg font-semibold mb-4">
                      Choose
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-[#75a759] transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "syllabus")
                        }
                      >
                        Syllabus
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-[#58a2ca] transition duration-200"
                        onClick={() => handleNavigation(subject._id, "notes")}
                      >
                        Notes
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-[#b9c05e] transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "mcq")
                        }
                      >
                        Practice MCQs
                      </Button>
                      <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-[#9259a7] transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "past-question")
                        }
                      >
                        Past Questions
                      </Button>
                     
                      {/* <Button
                        className="bg-transparent border border-slate-400 text-white hover:bg-[#a75959] transition duration-200"
                        onClick={() =>
                          handleNavigation(subject._id, "projects")
                        }
                      >
                        Projects
                      </Button> */}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ))}
      </div>
      )}
     
    </div>
  );
};

export default Page;
