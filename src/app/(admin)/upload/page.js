"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog.js";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useAddUniversity } from "@/services/api/universityApi";
import { useAddNotes } from "@/services/api/notesApi";
import { fetchSignature } from "@/services/api/signatureApi";
import { useAddCourse, useGetAllCourse } from "@/services/api/courseApi";
import { useAddPastQuestion } from "@/services/api/pastQuestionApi";
import { useAddSubject } from "@/services/api/subjectApi";
import { useAddMcq } from "@/services/api/mcqApi";
import FormDialog from "@/components/UploadComponents/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSubmission } from "@/components/UploadComponents/HandleSubmit";

export default function ImageUploadForm() {
  const { register, handleSubmit, reset } = useForm();
  const { register: courseRegister, handleSubmit: courseSubmit } = useForm();
  const { register: subjectRegister, handleSubmit: subjectSubmit } = useForm();
  const { register: notesRegister, handleSubmit: notesSubmit } = useForm();
  const { register: pastQuestionRegister, handleSubmit: pastQuestionSubmit } =
    useForm();
  const { register: mcqRegister, handleSubmit: mcqSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [noteUrl, setNoteUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addUniversityMutation } = useAddUniversity();
  const { mutate: addNoteMutation } = useAddNotes();
  const { mutate: addPastQuestionMutation } = useAddPastQuestion();
  const { mutate: addCourseMutation } = useAddCourse();
  const { mutate: addSubjectMutation } = useAddSubject();
  const {mutate: addMcqMutation} = useAddMcq()
  const { data: allCourseData } = useGetAllCourse();

  // console.log(allCourseData);

  const isAdmin = cookies.get("admin");
  const router = useRouter();

  // const handlePhotoInput = (file) => {
  //   setSelectedFile(file[0]);
  // };
  const handleFileInput = (file) => {
    const file2 = file[0];
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ]; // Add more types if needed

    if (file2) {
      // Check if the file type is PDF or a valid image type
      if (
        file2.type === "application/pdf" ||
        validImageTypes.includes(file2.type)
      ) {
        setSelectedFile(file2);
      } else {
        console.error("Please select a valid PDF or image file.");
      }
    }
  };

  // const handlePastQuestionInput = (file) => {
  //   const file2 = file[0];
  //   if (file2 && file2.type === "application/pdf") {
  //     setSelectedFile(file2);
  //   } else {
  //     console.error("Please select a valid PDF file.");
  //   }
  // }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const onSubmit = async (data) => {
    await handleSubmission(
      data,
      selectedFile,
      uploadPreset,
      cloudName,
      addUniversityMutation,
      "logo", // key for the uploaded file
      "image" // resource type
    );
  };
  const submitNotes = async (data) => {
    await handleSubmission(
      data,
      selectedFile,
      uploadPreset,
      cloudName,
      addNoteMutation,
      "contentUrl", // key for the uploaded file
      "raw", // resource type for notes
      "notes"
    );
  };

  const submitPastQuestion = async (data) => {
    await handleSubmission(
      data,
      selectedFile,
      uploadPreset,
      cloudName,
      addPastQuestionMutation,
      "contentUrl", // key for the uploaded file
      "raw", // resource type for past questions
      "pastQuestion"
    );
  };
  const handleSubjectSubmit = async (data) => {
    data.semesterNumber = Number(data.semesterNumber);

    await handleSubmission(
      data,
      selectedFile,
      uploadPreset,
      cloudName,
      addSubjectMutation,
      "syllabus", // key for the uploaded file
      "raw", // resource type for syllabus
      "Syllabus"
    );
  };

  const submitCourse = (data) => {
    data.duration = Number(data.duration);

    try {
      addCourseMutation(data);
    } catch (error) {
      console.log("Error uploading course:", error);
    }
  };

  const submitMcqQuestion = (data) => {
    addMcqMutation(data);
  }

  const courseOptions = allCourseData
    ? allCourseData.map((course) => ({
        label: course.name, // Assuming `name` is the field you want to display
        value: course.name, // Assuming `_id` is the unique identifier
      }))
    : [];

  return (
    <div className="my-10 w-[70%] m-auto">
      <h1 className="text-center font-semibold text-3xl my-9 text-black dark:text-white">Admin Page</h1>
      <h1 className="text-black dark:text-white">University Upload Form</h1>

      <div className="flex flex-col gap-7 w-36 text-black dark:text-white">
        <FormDialog
          triggerLabel="Add University"
          title="Add University"
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "location",
              label: "Location",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            { name: "photo", label: "Photo", type: "file", accept: "image/*" },
            { name: "website", label: "Website", type: "text", required: true },
          ]}
          handleFileInput={handleFileInput}
        />

        <FormDialog
          triggerLabel="Add Course"
          title="Add Course"
          onSubmit={courseSubmit(submitCourse)}
          register={courseRegister}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "shortName",
              label: "Short Name",
              type: "text",
              required: true,
            },
            {
              name: "university",
              label: "University",
              type: "select",
              options: [
                {
                  value: "Tribhuvan University",
                  label: "Tribhuvan University",
                },
                {
                  value: "Pokhara University",
                  label: "Pokhara University",
                },
              ],
              required: true,
            },
            {
              name: "duration",
              label: "Duration",
              type: "number",
              require: true,
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
          ]}
          handleFileInput={handleFileInput}
        />

        <FormDialog
          triggerLabel="Add Subject"
          title="Add Subject"
          onSubmit={subjectSubmit(handleSubjectSubmit)}
          register={subjectRegister}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            {
              name: "code",
              label: "Subject Code",
              type: "text",
              required: true,
            },
            {
              name: "course",
              label: "Course",
              type: "select",
              options: courseOptions,
              required: true,
            },
            {
              name: "semesterNumber",
              label: "semesterNumber / Year ",
              type: "number",
              required: true,
            },
            {
              name: "file",
              label: "File",
              type: "file",
              accept: "application/pdf",
            },
          ]}
          handleFileInput={handleFileInput}
        />

        <FormDialog
          triggerLabel="Add Notes"
          title="Add Notes"
          onSubmit={notesSubmit(submitNotes)}
          register={notesRegister}
          fields={[
            { name: "title", label: "Title", type: "text", required: true },
            {
              name: "file",
              label: "File",
              type: "file",
              accept: "application/pdf",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            {
              name: "subject",
              label: "Subject",
              type: "text",
              required: true,
            },
          ]}
          handleFileInput={handleFileInput}
        />

        <FormDialog
          triggerLabel="Add Past Questions"
          title="Add Past Questions"
          onSubmit={pastQuestionSubmit(submitPastQuestion)}
          register={pastQuestionRegister}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "year", label: "Year", type: "number", required: true },
            {
              name: "file",
              label: "File",
              type: "file",
              accept: "application/pdf",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            {
              name: "subject",
              lable: "subject",
              type: "text",
              required: true,
            },
          ]}
          handleFileInput={handleFileInput}
        />

        <FormDialog
          triggerLabel="Add Multiple Choice Questions"
          title="Add Multiple Choice Questions"
          onSubmit={mcqSubmit(submitMcqQuestion)}
          register={mcqRegister}
          fields={[
            {
              name: "subjectCode",
              label: "Subject Code",
              type: "text",
              required: true,
            },
            {
              name: "question",
              label: "Question",
              type: "text",
              required: true,
            },
            {
              name: "options",
              label: "Options",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            {
              name: "correctAnswer",
              label: "Correct Answer",
              type: "text",
              required: true,
            },
          ]}
          handleFileInput={handleFileInput}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
