"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const { data: subjectData } = useGetSubjects(id);
  const notes = subjectData?.subject?.notes;

  // console.log(notes);

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
    </div>
  );
};

export default Page;
