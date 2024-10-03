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
import { useAddCourse } from "@/services/api/courseApi";
import { useAddPastQuestion } from "@/services/api/pastQuestionApi";
import { useAddSubject } from "@/services/api/subjectApi";
import FormDialog from "@/components/UploadComponents/Form";

export default function ImageUploadForm() {
  const { register, handleSubmit, reset } = useForm();
  const { register: courseRegister, handleSubmit: courseSubmit } = useForm();
  const { register: subjectRegister, handleSubmit: subjectSubmit } = useForm();
  const { register: notesRegister, handleSubmit: notesSubmit } = useForm();
  const { register: pastQuestionRegister, handleSubmit: pastQuestionSubmit } =
    useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [noteUrl, setNoteUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addUniversityMutation } = useAddUniversity();
  const { mutate: addNoteMutation } = useAddNotes();
  const { mutate: addPastQuestionMutation } = useAddPastQuestion();
  const { mutate: addCourseMutation } = useAddCourse();
  const {mutate: addSubjectMutation } = useAddSubject();

  const isAdmin = cookies.get("admin");
  const router = useRouter();

  useEffect(() => {
    if (isAdmin !== "123") {
      router.push("/"); // Redirect to not authorized page
    }
  }, [isAdmin, router]);

  // const handlePhotoInput = (file) => {
  //   setSelectedFile(file[0]);
  // };
  const handleFileInput = (file) => {
    const file2 = file[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"]; // Add more types if needed

    if (file2) {
        // Check if the file type is PDF or a valid image type
        if (file2.type === "application/pdf" || validImageTypes.includes(file2.type)) {
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
    const formData = new FormData();
    formData.append("file", selectedFile); // Append the image file
    formData.append("upload_preset", uploadPreset); // Append unsigned preset name

    try {
      setLoading(true);

      const { signature, api_key, timestamp } = await fetchSignature(
        uploadPreset
      );

      // Step 2: Create FormData for the Cloudinary upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", uploadPreset);
      formData.append("signature", signature); // Signed signature from the backend
      formData.append("timestamp", timestamp); // Add timestamp for signature
      formData.append("api_key", api_key); // Add API key to the request

      // Step 3: Upload the file to Cloudinary using the signed request
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const { secure_url } = res.data;

      const updatedData = {
        ...data,
        logo: secure_url,
      };
      addUniversityMutation(updatedData);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }

  
  };

  const submitNotes = async (data) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const { signature, api_key, timestamp } = await fetchSignature(
        uploadPreset
      );

      // Step 2: Create FormData for the Cloudinary upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", uploadPreset);
      formData.append("signature", signature); // Signed signature from the backend
      formData.append("timestamp", timestamp); // Add timestamp for signature
      formData.append("api_key", api_key); // Add API key to the request

      // Step 3: Upload the file to Cloudinary using the signed request
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // Update to the correct resource type
        formData
      );

      const { secure_url } = res.data;
      // console.log("File uploaded successfully:", secure_url);

      // Proceed with other logic, e.g., saving the note's URL in your database
      const updatedData = {
        ...data,
        contentUrl: secure_url,
      };
      addNoteMutation(updatedData); /// Send the form data// Assuming this is your mutation for adding the note
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitPastQuestion = async (data) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const { signature, api_key, timestamp } = await fetchSignature(
        uploadPreset
      );

      // Step 2: Create FormData for the Cloudinary upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", uploadPreset);
      formData.append("signature", signature); // Signed signature from the backend
      formData.append("timestamp", timestamp); // Add timestamp for signature
      formData.append("api_key", api_key); // Add API key to the request

      // Step 3: Upload the file to Cloudinary using the signed request
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // Update to the correct resource type
        formData
      );

      const { secure_url } = res.data;
      // console.log("File uploaded successfully:", secure_url);

      // Proceed with other logic, e.g., saving the note's URL in your database
      const updatedData = {
        ...data,
        contentUrl: secure_url,
      };
      addPastQuestionMutation(updatedData); /// Send the form data// Assuming this is your mutation for adding the note
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSubmit = async(data) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const { signature, api_key, timestamp } = await fetchSignature(
        uploadPreset
      );

      // Step 2: Create FormData for the Cloudinary upload
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", uploadPreset);
      formData.append("signature", signature); // Signed signature from the backend
      formData.append("timestamp", timestamp); // Add timestamp for signature
      formData.append("api_key", api_key); // Add API key to the request

      // Step 3: Upload the file to Cloudinary using the signed request
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // Update to the correct resource type
        formData
      );

      const { secure_url } = res.data;
      // console.log("File uploaded successfully:", secure_url);

      // Proceed with other logic, e.g., saving the note's URL in your database
      const updatedData = {
        ...data,
        syllabus: secure_url,
      };
      addSubjectMutation(updatedData); /// Send the form data// Assuming this is your mutation for adding the note
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitCourse = (data) => {
    data.duration = Number(data.duration);

    try {
      addCourseMutation(data, {
        onSuccess: () => {
          console.log("University added successfully!");
        },
        onError: (error) => {
          console.error("Error adding University:", error);
        },
      });
    } catch (error) {
      console.log("Error uploading course:", error);
    }
  };

  return (
    <div className="my-10 w-[70%] m-auto">
      <h1 className="text-center font-semibold text-3xl my-9">Admin Page</h1>
      <h1>University Upload Form</h1>

      <div className="flex flex-col gap-7 w-36">
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
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'code', label: 'Subject Code', type: 'text', required: true },
          { name: 'file', label: 'File', type: 'file', accept: 'application/pdf', required: true }
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
          ]}
          handleFileInput={handleFileInput}
        />
      </div>
    </div>
  );
}
