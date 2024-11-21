"use client";
import { useGetUniversityById } from "@/services/api/universityApi";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle, Trash, Edit } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb.js";
import cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDeleteCourse } from "@/services/api/courseApi";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
import { ToastContainer } from "react-toastify";
import { useUpdateCourse , useGetCourse} from "@/services/api/courseApi";

const Page = () => {
  const [isConfirmationMatched, setIsConfirmationMatched] = useState("");
  const [courseId, setCourseId] = useState(null);
  const params = useParams();
  const id = params.id;

  const handleDialogOpen = (courseId) => {
    setCourseId(courseId);
  }

  const { data: university, isLoading, error } = useGetUniversityById(id);
  const {data: courseData, isLoading: courseDataLoading} = useGetCourse(courseId);
  console.log(courseData);
  

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      shortName: "",
      description: "",
      duration: 0
    },
  });

  // Update default values only when courseData is available
  useEffect(() => {
    if (courseData) {
      setValue("name", courseData.name || ""); // Set value only if data is available
      setValue("shortName", courseData.shortName || "");
      setValue("description", courseData.description || "");
      setValue("duration", courseData.duration || 0);
    }
  }, [courseData, setValue]);

  const { mutate: DeleteCourseMutation } = useDeleteCourse();
  const { mutate: UpdateCourseMutation } = useUpdateCourse();
  const admin = cookies.get("admin");

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "University", link: "/university" },
    { label: university?.name }, // No link for the last item
  ];

  const handleDeleteCourse = () => {
    const id = courseId;
    DeleteCourseMutation(id);
  };



  const handleUpdateCourse = (data) => {
    const id = courseId;
    UpdateCourseMutation({ id, data });
  };

  if (courseDataLoading) {
    return <div>Loading...</div>;
  }

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
              <h1 className="text-3xl max-sm:text-xl dark:text-white text-black">
                {university?.name}
              </h1>
              <div className="flex gap-10 max-sm:gap-2 items-center justify-center">
                <Image
                  src={
                    university?.logo ? university.logo : "/assets/choice.png"
                  }
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
                <div className="mt-5  border border-opacity-40 flex flex-col justify-between shadow-md shadow-slate-800 hover:-translate-y-1 transition-transform duration-300 h-[200px] max-md:h-fit max-sm:h-fit p-5 rounded-md border-[#888]">
                  <Link href={`/course/${course._id}`} key={course._id}>
                    <div className="flex gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold dark:text-white text-black">
                          {course?.shortName}
                        </h3>
                      </div>

                      <div>
                        <p className="dark:text-white text-black">
                          {course?.name}
                        </p>

                        <p className="text-sm dark:text-[#888] text-gray-600 mt-2">
                          {course?.description}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm dark:text-[#888] text-gray-600">
                      Total Duration: {course?.duration} {"years"}
                    </p>
                  </Link>
                  <div className="flex justify-between">
                    {admin && (
                      <Dialog>
                        <DialogTrigger
                          onClick={() => {
                            setIsConfirmationMatched(""),
                              setCourseId(course._id);
                          }}
                        >
                          <Trash className="text-black dark:text-white text-end cursor-pointer relative z-40 max-w-8 max-md:mt-5" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            Are you sure you want to delete {course?.name}?{" "}
                          </DialogHeader>
                          <DialogDescription>
                            If Yes then type &quot;I want to Delete&quot; for
                            conformation
                          </DialogDescription>
                          <Input
                            onChange={(e) =>
                              setIsConfirmationMatched(e.target.value)
                            }
                          />
                          <Button
                            onClick={handleDeleteCourse}
                            disabled={
                              isConfirmationMatched !== "I want to Delete"
                            }
                            className={`mt-4 ${
                              isConfirmationMatched === "I want to Delete"
                                ? "bg-red-500 hover:bg-red-900"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                          >
                            Delete
                          </Button>
                        </DialogContent>
                      </Dialog>
                    )}
                    {admin && (
                      <Dialog>
                        <DialogTrigger
                         onClick={() => handleDialogOpen(course._id)}
                        >
                          <Edit className="text-black  dark:text-white text-end cursor-pointer  relative z-40" />
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto ">
                          <DialogHeader>Update {course?.name} </DialogHeader>
                          <DialogDescription></DialogDescription>
                          <form onSubmit={handleSubmit(handleUpdateCourse)}>
                            <label>Name</label>
                            <Input type="text" {...register("name")} />
                            <br />
                            <label>Short Name</label>
                            <Input type="text" {...register("shortName")} />
                            <br />
                            <label>Description</label>
                            <Textarea
                              type="description"
                              {...register("description")}
                            />
                            <br />
                            <label>Duration</label>
                            <Input type="number" {...register("duration")} />
                            <br />
                            <Button type="submit">Update</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
