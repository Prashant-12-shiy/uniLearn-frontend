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
import { useAddPastQuestion } from "@/services/api/pastQuestionApi";

export default function ImageUploadForm() {
  const { register, handleSubmit, reset } = useForm();
  const { register: notesRegister, handleSubmit: notesSubmit } = useForm();
  const {register: pastQuestionRegister, handleSubmit: pastQuestionSubmit} = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [noteUrl, setNoteUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addUniversityMutation } = useAddUniversity();
  const { mutate: addNoteMutation } = useAddNotes();
  const { mutate: addPastQuestionMutation } = useAddPastQuestion();

  const isAdmin = cookies.get("admin");
  const router = useRouter();

  useEffect(() => {
    if (isAdmin !== "123") {
      router.push("/"); // Redirect to not authorized page
    }
  }, [isAdmin, router]);

  const handlePhotoInput = (file) => {
    setSelectedFile(file[0]);
  };
  
  const handleNoteInput = (file) => {
    const file2 = file[0];
    if (file2 && file2.type === "application/pdf") {
      setSelectedFile(file2);
    } else {
      console.error("Please select a valid PDF file.");
    }
  };

  const handlePastQuestionInput = (file) => {
    const file2 = file[0];
    if (file2 && file2.type === "application/pdf") {
      setSelectedFile(file2);
    } else {
      console.error("Please select a valid PDF file.");
    }
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", selectedFile); // Append the image file
    formData.append("upload_preset", uploadPreset); // Append unsigned preset name

    try {
      setLoading(true);

      // Directly upload to Cloudinary using the unsigned upload preset
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const { secure_url } = res.data;
      setImageUrl(secure_url);
      reset(); // Reset the form
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }

    const updatedData = {
      ...data,
      logo: imageUrl,
    };
    addUniversityMutation(updatedData);
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
      console.log("File uploaded successfully:", secure_url);

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
      console.log("File uploaded successfully:", secure_url);

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

  return (
    <div className="my-10 w-[70%] m-auto">
      <h1 className="text-center font-semibold text-3xl my-9">Admin Page</h1>
      <h1>University Upload Form</h1>

      <div className="flex flex-col gap-7 w-36">
        <Dialog>
          <DialogTrigger className="border p-2 rounded-lg">
            Add University
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add University</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between">
                <div>
                  <label htmlFor="name">Name</label>
                  <Input type="text" {...register("name")} required={true} />
                </div>

                <div>
                  <label htmlFor="location">Location</label>
                  <Input
                    type="text"
                    {...register("location")}
                    required={true}
                  />
                </div>
              </div>

              <label htmlFor="description">Description</label>
              <Textarea
                type="text"
                {...register("description")}
                required={true}
              />

              <div>
                <div>
                  <Input
                    type="file"
                    className="text-center"
                    onChange={(e) => handlePhotoInput(e.target.files)}
                  />
                </div>

                <div>
                  <label htmlFor="website">Website</label>
                  <Input type="text" {...register("website")} required={true} />
                </div>
              </div>
              <Button className="bg-[#4b99e6] hover:bg-[#4a8bed]" type="submit">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="border p-2 rounded-lg">
            Add Notes
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Notes</DialogTitle>
            </DialogHeader>

            <form onSubmit={notesSubmit(submitNotes)}>
              <div className="flex justify-between gap-5 items-center">
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    type="text"
                    {...notesRegister("title")}
                    required={true}
                  />
                </div>

                <div>
                  <label htmlFor="file">File</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleNoteInput(e.target.files)}
                    required={true}
                  />
                </div>
              </div>

              <label htmlFor="description">Description</label>
              <Textarea
                type="text"
                {...notesRegister("description")}
                required={true}
              />

              <Button className="bg-[#4b99e6] hover:bg-[#4a8bed]" type="submit">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="border p-2 rounded-lg">
            Add Past Questions
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>  Add Past Questions</DialogTitle>
            </DialogHeader>

            <form onSubmit={pastQuestionSubmit(submitPastQuestion)}>
              <div className="flex justify-between gap-5 items-center">
              <div>
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    {...pastQuestionRegister("name")}
                    required={true}
                  />
                </div>

                <div>
                  <label htmlFor="year">Year</label>
                  <Input
                    type="number"
                    {...pastQuestionRegister("year")}
                    required={true}
                  />
                </div>

                <div>
                  <label htmlFor="file">File</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handlePastQuestionInput(e.target.files)}
                    required={true}
                  />
                </div>
              </div>

              <label htmlFor="description">Description</label>
              <Textarea
                type="text"
                {...pastQuestionRegister("description")}
                required={true}
              />

              <Button className="bg-[#4b99e6] hover:bg-[#4a8bed]" type="submit">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
