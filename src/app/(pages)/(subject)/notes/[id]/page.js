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
    <div className="mx-10 max-md:mx-6 mt-10">
      <h1>Notes</h1>
      <div className="grid grid-cols-5 gap-5 mt-5">
        {notes?.map((note) => (
          <Link href={`/note/${note._id}` }  key={note._id}>
        
          <Button>
            <h3>{note.title}</h3>
          </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
