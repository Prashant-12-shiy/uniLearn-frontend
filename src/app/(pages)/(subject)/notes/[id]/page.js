"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const { data: subjectData } = useGetSubjects(id);
  const notes = subjectData?.subject?.notes;

  // console.log(notes);
  toast.warn("Please Refresh Few Times if Pdf is not Loading");

  return (
    <div className="mx-7 h-full dark:text-white text-black">
      <h2>{subjectData?.subject?.name}</h2>

      {notes?.map((note) => (
        <div key={note._id}>
          <h2>{note?.title}</h2>

          {note?.contentUrl ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${note.contentUrl}&embedded=true`}
              width="800px"
              height="700px"
              className="pdf-viewer m-auto max-md:w-[400px] max-sm:w-[300px] max-md:h-[500px]"
              style={{ border: "none" }}
            >
              <Link
                href={note.contentUrl}
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
      ))}
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
