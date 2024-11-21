"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useGetUniversity } from "@/services/api/universityApi";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useDeleteUniversity, useUpdateUniversity } from "@/services/api/universityApi";
import cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
// import choiceImage from "../../../../public/assets/choice.png";
// import DynamicBreadcrumb from "@/components/breadcrumb";

const UniversityCard = ({ university }) => {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: university?.name,
      location: university?.location,
      description: university?.description,
      website: university?.website
    }
  });
  const admin = cookies.get("admin");
  console.log(admin);

  const [isConfirmationMatched, setIsConfirmationMatched] = useState("");
  const [universityId, setUniversityId] = useState("");
  const { mutate: deleteUniversityMutation } = useDeleteUniversity();
  const {mutate: updateUniversityMutation} = useUpdateUniversity();

  const handleDelete = () => {
    deleteUniversityMutation(universityId);
  };

  const handleUpdateUniversity = (data) => {
    const id = universityId;
    
    updateUniversityMutation({id , data});
  }
  return (
    <div className="bg-gradient-to-b from-[#f9f9f9] to-[#e3e3e3] dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#191919] shadow-md dark:text-white  text-white dark:shadow-[#494949] shadow-gray-400 p-4 rounded-md">
      <div className="flex justify-between">
        {admin && (
          <Dialog>
            <DialogTrigger
              onClick={() => {
                setIsConfirmationMatched(""), setUniversityId(university._id);
              }}
            >
              <Trash className="text-black dark:text-white text-end cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                Are you sure you want to delete {university?.name}?{" "}
              </DialogHeader>
              <DialogDescription>
                If Yes then type &quot;I want to Delete&quot; for conformation
              </DialogDescription>
              <Input
                onChange={(e) => setIsConfirmationMatched(e.target.value)}
              />
              <Button
                onClick={handleDelete}
                disabled={isConfirmationMatched !== "I want to Delete"}
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
              onClick={() => {
                setUniversityId(university._id);
              }}
            >
              <Edit className="text-black  dark:text-white text-end cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>Update {university?.name} </DialogHeader>
              <DialogDescription></DialogDescription>
              <form onSubmit={handleSubmit(handleUpdateUniversity)}>
                <label>Name</label>
                <Input type="text" {...register('name')} />
                <br />
                <label>Location</label>
                <Input type="text" {...register('location')} />
                <br />
                <label>Description</label>
                <Textarea type="description" {...register('description')} />
                <br />
                <label>Website</label>
                <Input type="website" {...register('website')} />
                <br/>
                <Button type="submit">Update</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Image
        src={university?.logo ? university.logo : "/assets/choice.png"}
        width={64}
        height={64}
        alt={university?.name || "University logo"}
        className="h-16 w-16 object-contain mx-auto"
      />
      <h3 className="text-lg font-semibold mt-2 text-center text-black dark:text-white">
        {university?.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {university?.location}
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {university?.description}
      </p>

      <Link href={`/university/${university._id}`} key={university._id}>
        <Button className="mt-4 bg-black text-white dark:bg-[#ededed] hover:bg-gray-300 dark:hover:bg-[#bfbfbf] dark:text-black px-4 py-2 rounded-md">
          View More
        </Button>
      </Link>
    </div>
  );
};

const UniversityPage = () => {
  const { data: universityData, isLoading } = useGetUniversity();
  // console.log(universityData);
  // const breadcrumbItems = [
  //   { label: 'Home', link: '/' },
  //   { label: 'University', link: '/university' }
  // ];

  return (
    <div className="dark-university-bg  university-bg  mb-32 ">
      <h1 className="text-center my-16  text-4xl dark:text-white text-black font-semibold">
        Universities
      </h1>
      {isLoading ? (
        <div className="w-full m-auto flex justify-center ">
          <LoaderCircle className="animate-spin w-32 h-32 dark:text-white text-black max-md:w-20 max-md:h-20" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-10 mx-20 max-md:mx-10 max-sm:grid-cols-1">
            {Array.isArray(universityData) && universityData.length > 0 ? (
              universityData.map((university, index) => (
                <UniversityCard key={university._id} university={university} />
              ))
            ) : (
              <p>No university data available.</p> // Optional fallback
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityPage;
