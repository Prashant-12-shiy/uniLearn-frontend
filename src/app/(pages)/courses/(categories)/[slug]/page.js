"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetCategory } from "@/services/api/catagoriesApi";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const { id } = params; // Extract `id` from params

  const { data: categoryData, isLoading, error } = useGetCategory(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-10 max-md:mx-4">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-5 max-md:text-2xl max-sm:text-xl">
        {categoryData?.title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8 max-md:text-base">
        {categoryData?.description}
      </p>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {categoryData?.courses?.map((course) => (
          <div
            key={course._id}
            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            {/* Card Header */}
            <div className="bg-blue-500 text-white rounded-t-lg p-4">
              <h3 className="text-xl font-bold truncate">{course.name}</h3>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              <p className="text-gray-600 dark:text-gray-300">
                Short Name:{" "}
                <span className="font-medium text-gray-800 dark:text-white">
                  {course.shortName}
                </span>
              </p>

              <div className="mt-3">
                <Link href={`/course/${course._id}`}>
                <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                  Explore Course
                </button>
                </Link>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
