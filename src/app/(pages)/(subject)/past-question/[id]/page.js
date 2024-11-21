"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const { data: subjectData } = useGetSubjects(id);
  const pastQuestion = subjectData?.subject?.pastQuestions;
  // console.log(pastQuestion);

  return (
    <div>
      {pastQuestion?.length !== 0 ? (
        <>
          {pastQuestion?.map((pastQuestion) => {
            return (
              <div
                key={pastQuestion._id}
                className="mt-10 text-black dark:text-white"
              >
                <div className="flex justify-evenly">
                  <h2>{pastQuestion.name}</h2>
                  <p>{pastQuestion.year}</p>
                </div>

                {pastQuestion?.contentUrl ? (
                  <iframe
                    src={pastQuestion.contentUrl}
                    width="800px"
                    height="500px"
                    className="pdf-viewer m-auto"
                    style={{ border: "none" }}
                  ></iframe>
                ) : (
                  <p>No PDF available</p>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-black dark:text-white">No pastQuestion</p>
      )}
    </div>
  );
};

export default Page;
