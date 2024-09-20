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

export default function ImageUploadForm() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addUniversityMutation } = useAddUniversity();

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
    }
    addUniversityMutation(updatedData);
  };

  return (
    <div className="my-10 w-[70%] m-auto">
      <h1 className="text-center font-semibold text-3xl my-9">Admin Page</h1>
      <h1>University Upload Form</h1>
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
                <Input type="text" {...register("location")} required={true} />
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

      {/* {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )} */}
    </div>
  );
}
