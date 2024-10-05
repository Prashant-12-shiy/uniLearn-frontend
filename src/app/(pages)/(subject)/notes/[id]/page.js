"use client";
import React from "react";
import { useGetSubjects } from "@/services/api/subjectApi";
import { Button } from "@/components/ui/Button";
import { useParams } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const { data: subjectData } = useGetSubjects(id);
  const notes = subjectData?.subject?.notes;

  return (
    <div className="mx-10 max-md:mx-6 max-sm:mx-2 mt-10">
      <h1 className="dark:text-white text-black">Notes</h1>
      <div className="grid grid-cols-5 gap-5 max-md:grid-cols-3 max-sm:grid-cols-2 max-md:gap-3 mt-5">
        {notes?.length === 0 ? (
          <div className="w-[100vh]">No Notes Available. Working on It </div>
        ) : (
          <>
            {notes?.map((note) => (
              <Link href={`/note/${note._id}`} key={note._id}>
                <p className="h-max px-5 max-h-20 py-2 max-sm:text-xs max-sm:px-1 border-black dark:text-black overflow-hidden bg-black dark:bg-white rounded-md ">
                  <h3>{note.title}</h3>
                </p>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
