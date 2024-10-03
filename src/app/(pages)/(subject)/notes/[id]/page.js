"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";
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
  toast.warn("Please Refresh Few Times if Pdf is not Loading", {
    toastId: 1,
  });

  return (
    <div className="mx-7 h-full dark:text-white mt-6 text-black">
      <h2 className="text-2xl">{subjectData?.subject?.name} Notes</h2>

      {notes?.length === 0 ? (
        <p className="dark:text-white text-black">
          Pdf Not available Working on It
        </p>
      ) : (
        <>
          {notes?.map((note) => (
            <div key={note._id} className="mt-10">
              <h2 className="ml-10 text-xl my-4">{note?.title}</h2>

              {note?.contentUrl ? (
                <div >
                  <Button className="flex justify-center mb-4 ml-10 items-center">
                  <Download />
                  <a className="text-end w-full" href={note.contentUrl} download="filename.pdf" target="_blank">
                    Download PDF
                  </a>
                  </Button>

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
                </div>
              ) : (
                <p className="dark:text-white text-black">
                  Pdf Not available Working on It
                </p>
              )}
            </div>
          ))}
        </>
      )}

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
